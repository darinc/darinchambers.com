import './styles/index.css';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { FileSystemService } from './utils/fs/FileSystemService';
import { FileSystemInitializer } from './utils/fs/FileSystemInitializer';
import type { IFileSystem } from './utils/fs/IFileSystem';
import { AliasManager } from './utils/AliasManager';
import { CommandDispatcher } from './utils/CommandDispatcher';
import { CommandExecutor } from './utils/CommandExecutor';
import type { Command } from './commands/Command';
import { PATHS, COMMAND_SIGNALS } from './constants';
import type { NavItem } from './components/Navigation';
import { createLsCommand } from './commands/fs/ls';
import { createCdCommand } from './commands/fs/cd';
import { createPwdCommand } from './commands/fs/pwd';
import { createCatCommand } from './commands/fs/cat';
import { createTreeCommand } from './commands/fs/tree';
import { createHistoryCommand } from './commands/core/history';
import { createAliasCommand } from './commands/core/alias';
import { createUnaliasCommand } from './commands/core/unalias';
import { createWhoamiCommand } from './commands/core/whoami';
import { createRenderCommand } from './commands/core/render';
import { createEnvCommand } from './commands/core/env';
import { createExportCommand } from './commands/core/export';
import { dateCommand } from './commands/core/date';
import { echoCommand } from './commands/core/echo';
import { createAboutCommand } from './commands/local/about';
import { portfolioCommand } from './commands/local/portfolio';
import { createBlogCommand } from './commands/local/blog';
import { createContactCommand } from './commands/local/contact';
import { createSkillsCommand } from './commands/local/skills';
import { MarkdownService } from './utils/MarkdownService';
import { SettingsManager } from './utils/SettingsManager';
import { ThemeManager } from './utils/ThemeManager';
import { EnvVarManager } from './utils/EnvVarManager';
import { createSettingsCommand } from './commands/local/settings';
import { Router } from './utils/Router';

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

// Initialize navigation (will be updated with router after router creation)
const navLinksElement = document.getElementById('nav-links');
if (!navLinksElement) {
  throw new Error('Navigation links element not found');
}

let navigation: Navigation;

// Register basic commands
const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  execute: (_args: string[], _stdin?: string) => {
    try {
      const content = fileSystem.readFile(PATHS.CONTENT_HELP);
      const html = MarkdownService.render(content);
      return { output: html, html: true };
    } catch (error) {
      return {
        output: error instanceof Error ? error.message : String(error),
        error: true
      };
    }
  }
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: (_args: string[], _stdin?: string) => {
    // This will be handled by Terminal.clear() method or TerminalOutput.clear()
    // We return a special marker that the terminal should intercept
    return { output: COMMAND_SIGNALS.CLEAR_SCREEN };
  }
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
const skillsCommand = createSkillsCommand(fileSystem);
const blogCommand = createBlogCommand(fileSystem);

// Create render command
const renderCommand = createRenderCommand(fileSystem);

// Create settings command
const settingsCommand = createSettingsCommand(fileSystem, settingsManager, themeManager);

// Create environment variable commands
const envCommand = createEnvCommand(envVarManager);
const exportCommand = createExportCommand(envVarManager);

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
  skillsCommand,
  settingsCommand
]);

// Set up navigation items
const navItems: NavItem[] = [
  { label: 'about', command: 'about' },
  { label: 'portfolio', command: 'portfolio' },
  { label: 'blog', command: 'blog' },
  { label: 'contact', command: 'contact' },
  { label: 'skills', command: 'skills' },
  { label: 'settings', command: 'settings' },
  { label: 'help', command: 'help' }
];

// Display welcome message
const welcomeMessage = `Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;

terminal.writeWelcome(welcomeMessage);

// Initialize router for URL-based navigation
const router = new Router(terminal);

// Connect router to terminal for URL sync when typing commands
terminal.setRouter(router);

// Initialize navigation with router integration
navigation = new Navigation(navLinksElement, (command: string) => {
  // Determine the path for this command
  const commandToPath: Record<string, string> = {
    'about': '/about',
    'portfolio': '/portfolio',
    'blog': '/blog',
    'contact': '/contact',
    'skills': '/skills',
    'settings': '/settings',
    'help': '/help'
  };

  const path = commandToPath[command];
  if (path) {
    router.navigate(path, true);
  } else {
    terminal.executeCommand(command, true);
  }
});

// Set navigation items
navigation.setItems(navItems);

// Handle initial route based on URL
router.handleInitialRoute();

terminal.focus();
