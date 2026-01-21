import './styles/index.css';
import { initBootSequenceObserver } from './animations/bootSequence';
import { initBsodObserver } from './animations/bsodAnimation';
import { initLifeObserver } from './animations/gameOfLife';
import { initMatrixRainObserver } from './animations/matrixRain';
import { createAliasCommand } from './commands/core/alias';
import { dateCommand } from './commands/core/date';
import { echoCommand } from './commands/core/echo';
import { createEnvCommand } from './commands/core/env';
import { createExportCommand } from './commands/core/export';
import { createHistoryCommand } from './commands/core/history';
import { createRenderCommand } from './commands/core/render';
import { createUnaliasCommand } from './commands/core/unalias';
import { createWhichCommand } from './commands/core/which';
import { createWhoamiCommand } from './commands/core/whoami';
import { createCatCommand } from './commands/fs/cat';
import { createCdCommand } from './commands/fs/cd';
import { createLsCommand } from './commands/fs/ls';
import { createPwdCommand } from './commands/fs/pwd';
import { createTreeCommand } from './commands/fs/tree';
import { createAboutCommand } from './commands/local/about';
import { createBlogCommand } from './commands/local/blog';
import { createContactCommand } from './commands/local/contact';
import { createPortfolioCommand } from './commands/local/portfolio';
import { createSettingsCommand } from './commands/local/settings';
import { bootCommand } from './commands/novelty/boot';
import { bsodCommand } from './commands/novelty/bsod';
import { ddateCommand } from './commands/novelty/ddate';
import { figletCommand } from './commands/novelty/figlet';
import { createLifeCommand } from './commands/novelty/life';
import { lolcatCommand } from './commands/novelty/lolcat';
import { createMatrixCommand } from './commands/novelty/matrix';
import { rebootCommand } from './commands/novelty/reboot';
import { shutdownCommand } from './commands/novelty/shutdown';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Terminal } from './components/Terminal';
import { PATHS, COMMAND_SIGNALS } from './constants';
import { SCREENSAVER_CONSTANTS } from './constants';
import { AliasManager } from './utils/AliasManager';
import { CommandArgs } from './utils/CommandArgs';
import { CommandDispatcher } from './utils/CommandDispatcher';
import { CommandExecutor } from './utils/CommandExecutor';
import { EnvVarManager } from './utils/EnvVarManager';
import { FileSystemInitializer } from './utils/fs/FileSystemInitializer';
import { FileSystemService } from './utils/fs/FileSystemService';
import { MarkdownService } from './utils/MarkdownService';
import { Router } from './utils/Router';
import { ActivityMonitor } from './utils/screensaver/ActivityMonitor';
import { ScreensaverManager } from './utils/screensaver/ScreensaverManager';
import { SettingsManager } from './utils/SettingsManager';
import { ThemeManager } from './utils/ThemeManager';
import type { Command } from './commands/Command';
import type { NavItem } from './components/Navigation';
import type { IFileSystem } from './utils/fs/IFileSystem';

// Initialize header
const headerElement = document.getElementById('terminal-header');
if (!headerElement) {
  throw new Error('Header element not found');
}
new Header(headerElement);

// Initialize file system
const rootNode = FileSystemInitializer.createDefaultStructure();
const fileSystem: IFileSystem = new FileSystemService(rootNode);

// Initialize settings management
const settingsManager = new SettingsManager(fileSystem);
const themeManager = new ThemeManager(settingsManager);

// Initialize environment variables
const envVarManager = new EnvVarManager(fileSystem, 'darin', 'darinchambers.com');

// Apply saved settings BEFORE terminal initialization
themeManager.applyCurrentTheme();

// Apply font settings
const fontSettings = settingsManager.getSetting('font');
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--terminal-font-size', `${fontSettings.size}px`);
  document.documentElement.style.setProperty('--terminal-font-family', fontSettings.family);
}

// Apply scan lines
const scanLinesEnabled = settingsManager.getScanLines();
if (typeof document !== 'undefined') {
  if (!scanLinesEnabled) {
    document.body.classList.add('no-scan-lines');
  }
}

// Apply glow effect
const glowEnabled = settingsManager.getGlow();
if (typeof document !== 'undefined') {
  if (!glowEnabled) {
    document.body.classList.add('no-glow');
  }
}

// Apply page border
const borderEnabled = settingsManager.getBorder();
if (typeof document !== 'undefined') {
  if (borderEnabled) {
    document.body.classList.add('border-enabled');
  }
}

// Apply animation speed
const animSpeed = settingsManager.getAnimationSpeed();
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--terminal-animation-speed', animSpeed.toString());
}

// Initialize command execution infrastructure
const dispatcher = new CommandDispatcher();
const aliasManager = new AliasManager(fileSystem);
const executor = new CommandExecutor(dispatcher, aliasManager, envVarManager);

// Initialize terminal with dependencies
const terminal = new Terminal(dispatcher, executor, settingsManager, themeManager, envVarManager);
terminal.setCurrentPath(fileSystem.getShortPath());
terminal.setFileSystem(fileSystem);

// Initialize navigation (will be updated with router after router creation)
const navLinksElement = document.getElementById('nav-links');
if (!navLinksElement) {
  throw new Error('Navigation links element not found');
}

// Register basic commands
const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  execute: async (args: string[], _stdin?: string) => {
    try {
      // If a command name is provided, show help for that command
      if (args.length > 0) {
        const commandName = args[0];
        // Try to execute the command with --help flag
        const result = await dispatcher.dispatch(`${commandName} --help`);
        return result;
      }

      // Otherwise show the main help content
      const content = fileSystem.readFile(PATHS.CONTENT_HELP);
      const html = MarkdownService.render(content);
      return { output: html, html: true, scrollBehavior: 'top' };
    } catch (error) {
      return {
        output: error instanceof Error ? error.message : String(error),
        error: true,
      };
    }
  },
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: (args: string[], _stdin?: string) => {
    // Parse arguments
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`,
      };
    }

    // This will be handled by Terminal.clear() method or TerminalOutput.clear()
    // We return a special marker that the terminal should intercept
    return { output: COMMAND_SIGNALS.CLEAR_SCREEN };
  },
};

// Create file system commands
const lsCommand = createLsCommand(fileSystem);
const cdCommand = createCdCommand(
  fileSystem,
  (path: string) => terminal.setCurrentPath(path),
  envVarManager
);
const pwdCommand = createPwdCommand(fileSystem);
const catCommand = createCatCommand(fileSystem);
const treeCommand = createTreeCommand(fileSystem);

// Create history command
const historyCommand = createHistoryCommand(terminal.getInput());

// Create alias commands
const aliasCommand = createAliasCommand(aliasManager);
const unaliasCommand = createUnaliasCommand(aliasManager);

// Create whoami command
const whoamiCommand = createWhoamiCommand(terminal);

// Create content commands
const aboutCommand = createAboutCommand(fileSystem);
const contactCommand = createContactCommand(fileSystem);
const portfolioCommand = createPortfolioCommand(fileSystem);
const blogCommand = createBlogCommand(fileSystem);

// Create render command
const renderCommand = createRenderCommand(fileSystem);

// Create settings command
const settingsCommand = createSettingsCommand(fileSystem, settingsManager, themeManager);

// Create environment variable commands
const envCommand = createEnvCommand(envVarManager);
const exportCommand = createExportCommand(envVarManager);

// Create novelty commands
const matrixCommand = createMatrixCommand(themeManager);
const lifeCommand = createLifeCommand(themeManager);

// Create which command
const whichCommand = createWhichCommand(dispatcher, aliasManager);

terminal.registerCommands([
  helpCommand,
  clearCommand,
  historyCommand,
  dateCommand,
  echoCommand,
  whoamiCommand,
  aliasCommand,
  unaliasCommand,
  envCommand,
  exportCommand,
  lsCommand,
  cdCommand,
  pwdCommand,
  catCommand,
  treeCommand,
  renderCommand,
  aboutCommand,
  portfolioCommand,
  blogCommand,
  contactCommand,
  settingsCommand,
  ddateCommand,
  figletCommand,
  lolcatCommand,
  matrixCommand,
  lifeCommand,
  bootCommand,
  shutdownCommand,
  rebootCommand,
  bsodCommand,
  whichCommand,
]);

// Set up navigation items
const navItems: NavItem[] = [
  { label: 'about', command: 'about' },
  { label: 'portfolio', command: 'portfolio' },
  { label: 'blog', command: 'blog' },
  { label: 'contact', command: 'contact' },
  { label: 'settings', command: 'settings' },
  { label: 'help', command: 'help' },
];

// Display welcome message
const welcomeMessage = `Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;

terminal.writeWelcome(welcomeMessage);

// Initialize router for URL-based navigation
const router = new Router(terminal, fileSystem);

// Connect router to terminal for URL sync when typing commands
terminal.setRouter(router);

// Initialize navigation with router integration
const navigation = new Navigation(navLinksElement, (command: string) => {
  // Determine the path for this command
  const commandToPath: Record<string, string> = {
    about: '/about',
    portfolio: '/portfolio',
    blog: '/blog',
    contact: '/contact',
    skills: '/skills',
    settings: '/settings',
    help: '/help',
  };

  const path = commandToPath[command];
  if (path) {
    router.navigate(path, true);
  } else {
    void terminal.executeCommand(command, true);
  }
});

// Set navigation items
navigation.setItems(navItems);

// Connect router to navigation for aria-current updates
router.onRouteChange((command: string) => {
  navigation.setActiveItem(command);
});

// Handle initial route based on URL
router.handleInitialRoute();

// Set initial active navigation item
const initialCommand = router.getCurrentCommand();
if (initialCommand) {
  navigation.setActiveItem(initialCommand);
}

// Initialize animation observers
initMatrixRainObserver();
initLifeObserver();
initBootSequenceObserver();
initBsodObserver();

// Initialize screensaver system
const screensaverManager = new ScreensaverManager(settingsManager, terminal);

// Inject screensaver manager into terminal
terminal.setScreensaverManager(screensaverManager);

// Set up activity monitoring
const activityMonitor = new ActivityMonitor(
  () => screensaverManager.recordActivity(),
  SCREENSAVER_CONSTANTS.ACTIVITY_DEBOUNCE_MS
);
activityMonitor.start();

// Start idle timer if screensaver is enabled
if (screensaverManager.isEnabled()) {
  screensaverManager.startIdleTimer();
}

// Initialize SVG Graph Network visualizations
// This function finds all elements with data-graph or data-graph-src attributes and initializes them
async function initializeGraphs(): Promise<void> {
  // Check if window.SVGGraphNetwork is available
  if (typeof window.SVGGraphNetwork === 'undefined') {
    console.warn('SVGGraphNetwork library not loaded');
    return;
  }

  // Handle inline data-graph attributes (backward compatibility)
  const inlineContainers = document.querySelectorAll('[data-graph]');
  inlineContainers.forEach((container) => {
    // Check if already initialized
    if (container.hasAttribute('data-graph-initialized')) {
      return;
    }

    const containerElement = container as HTMLElement;
    const containerId = containerElement.id || 'unknown';

    try {
      const graphData = container.getAttribute('data-graph');
      if (!graphData) {
        console.warn(`Graph container ${containerId} has no data-graph attribute`);
        return;
      }

      // The browser automatically decodes HTML entities in attribute values
      const graphOptions: unknown = JSON.parse(graphData);

      // Allow data-graph-theme attribute to override JSON config theme
      const themeAttr = container.getAttribute('data-graph-theme');
      if (
        themeAttr &&
        graphOptions &&
        typeof graphOptions === 'object' &&
        'config' in graphOptions
      ) {
        (graphOptions.config as Record<string, unknown>).theme = themeAttr;
      }

      // Use the container's ID if it has one, otherwise the library accepts the element
      // Pass the entire options object (includes data and config) to constructor
      new window.SVGGraphNetwork(containerElement.id || containerElement, graphOptions);

      // Mark as initialized
      container.setAttribute('data-graph-initialized', 'true');
    } catch (error) {
      console.error(`Failed to initialize graph ${containerId}:`, error);
      // Mark as initialized anyway to prevent infinite retry loops
      container.setAttribute('data-graph-initialized', 'true');
      container.setAttribute('data-graph-error', 'true');
    }
  });

  // Handle external data-graph-src attributes (fetch from JSON files)
  const externalContainers = document.querySelectorAll('[data-graph-src]');

  for (const container of externalContainers) {
    // Check if already initialized
    if (container.hasAttribute('data-graph-initialized')) {
      continue;
    }

    const containerElement = container as HTMLElement;
    const containerId = containerElement.id || 'unknown';
    const src = container.getAttribute('data-graph-src');

    if (!src) {
      console.warn(`Graph container ${containerId} has no data-graph-src attribute`);
      continue;
    }

    try {
      // Fetch external JSON file
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
      }
      const graphOptions: unknown = await response.json();

      // Allow data-graph-theme attribute to override JSON config theme
      const themeAttr = container.getAttribute('data-graph-theme');
      if (
        themeAttr &&
        graphOptions &&
        typeof graphOptions === 'object' &&
        'config' in graphOptions
      ) {
        (graphOptions.config as Record<string, unknown>).theme = themeAttr;
      }

      // Initialize the graph
      // Pass the entire options object (includes data and config) to constructor
      new window.SVGGraphNetwork(containerElement.id || containerElement, graphOptions);

      // Mark as initialized
      container.setAttribute('data-graph-initialized', 'true');
    } catch (error) {
      console.error(`Failed to initialize graph ${containerId} from ${src}:`, error);
      // Mark as initialized anyway to prevent infinite retry loops
      container.setAttribute('data-graph-initialized', 'true');
      container.setAttribute('data-graph-error', 'true');
    }
  }
}

// Initialize graphs on load
void initializeGraphs();

// Make initializeGraphs available globally for explicit calls after content loads
window.initializeGraphs = initializeGraphs;

// Note: Input focuses automatically via autofocus attribute in HTML
