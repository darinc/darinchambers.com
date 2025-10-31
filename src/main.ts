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
import { dateCommand } from './commands/core/date';
import { echoCommand } from './commands/core/echo';
import { createAboutCommand } from './commands/local/about';
import { portfolioCommand } from './commands/local/portfolio';
import { createBlogCommand } from './commands/local/blog';
import { createContactCommand } from './commands/local/contact';
import { createSkillsCommand } from './commands/local/skills';
import { MarkdownService } from './utils/MarkdownService';

// Initialize header
const headerElement = document.getElementById('terminal-header');
if (!headerElement) {
  throw new Error('Header element not found');
}
new Header(headerElement);

// Initialize file system
const rootNode = FileSystemInitializer.createDefaultStructure();
const fileSystem: IFileSystem = new FileSystemService(rootNode);

// Initialize command execution infrastructure
const dispatcher = new CommandDispatcher();
const aliasManager = new AliasManager(fileSystem);
const executor = new CommandExecutor(dispatcher, aliasManager);

// Initialize terminal with dependencies
const terminal = new Terminal(dispatcher, executor);
terminal.setCurrentPath(fileSystem.getShortPath());

// Initialize navigation
const navLinksElement = document.getElementById('nav-links');
if (!navLinksElement) {
  throw new Error('Navigation links element not found');
}

const navigation = new Navigation(navLinksElement, (command: string) => {
  terminal.executeCommand(command, true);
});

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
  (username: string) => terminal.setUsername(username)
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

terminal.registerCommands([
  helpCommand,
  clearCommand,
  historyCommand,
  dateCommand,
  echoCommand,
  whoamiCommand,
  aliasCommand,
  unaliasCommand,
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
  skillsCommand
]);

// Set up navigation items
const navItems: NavItem[] = [
  { label: 'about', command: 'about' },
  { label: 'portfolio', command: 'portfolio' },
  { label: 'blog', command: 'blog' },
  { label: 'contact', command: 'contact' },
  { label: 'skills', command: 'skills' },
  { label: 'help', command: 'help' }
];

navigation.setItems(navItems);

// Display welcome message
const welcomeMessage = `Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;

terminal.writeWelcome(welcomeMessage);
terminal.focus();
