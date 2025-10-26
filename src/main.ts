import './styles/terminal.css';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import { FileSystem } from './utils/FileSystem';
import { AliasManager } from './utils/AliasManager';
import type { Command } from './commands/Command';
import type { NavItem } from './components/Navigation';
import { createLsCommand } from './commands/ls';
import { createCdCommand } from './commands/cd';
import { createPwdCommand } from './commands/pwd';
import { createCatCommand } from './commands/cat';
import { createTreeCommand } from './commands/tree';
import { createHistoryCommand } from './commands/history';
import { createAliasCommand } from './commands/alias';
import { createUnaliasCommand } from './commands/unalias';
import { dateCommand } from './commands/date';
import { aboutCommand } from './commands/about';
import { portfolioCommand } from './commands/portfolio';
import { blogCommand } from './commands/blog';
import { contactCommand } from './commands/contact';
import { skillsCommand } from './commands/skills';

// Initialize terminal
const terminal = new Terminal();

// Initialize file system
const fileSystem = new FileSystem();
terminal.setCurrentPath(fileSystem.getShortPath());

// Initialize alias manager
const aliasManager = new AliasManager(fileSystem);
terminal.setAliasManager(aliasManager);

// Initialize navigation
const navLinksElement = document.getElementById('nav-links');
if (!navLinksElement) {
  throw new Error('Navigation links element not found');
}

const navigation = new Navigation(navLinksElement, (command: string) => {
  terminal.executeCommand(command);
});

// Register basic commands
const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  execute: () => {
    return {
      output: `Available commands:

CORE COMMANDS
  help       - Display this help message
  clear      - Clear the terminal screen
  history    - Display command history
  date       - Display current date and time
  alias      - Create or display command aliases
  unalias    - Remove command aliases
  about      - Learn about my background and expertise
  portfolio  - View my projects and accomplishments
  blog       - Read my blog posts
  contact    - Get in touch with me
  skills     - See my technical skills

FILE SYSTEM COMMANDS
  ls         - List directory contents
  cd         - Change directory
  pwd        - Print working directory
  cat        - Display file contents
  tree       - Display directory tree structure

GETTING STARTED
  Try 'about' to learn more about me
  Try 'portfolio' to see my work
  Try 'tree' to see the directory structure`
    };
  }
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: () => {
    // This will be handled by Terminal.clear() method or TerminalOutput.clear()
    // We return a special marker that the terminal should intercept
    return { output: '__CLEAR__' };
  }
};

// Create file system commands
const lsCommand = createLsCommand(fileSystem);
const cdCommand = createCdCommand(fileSystem, (path: string) => terminal.setCurrentPath(path));
const pwdCommand = createPwdCommand(fileSystem);
const catCommand = createCatCommand(fileSystem);
const treeCommand = createTreeCommand(fileSystem);

// Create history command
const historyCommand = createHistoryCommand(terminal.getInput());

// Create alias commands
const aliasCommand = createAliasCommand(aliasManager);
const unaliasCommand = createUnaliasCommand(aliasManager);

terminal.registerCommands([
  helpCommand,
  clearCommand,
  historyCommand,
  dateCommand,
  aliasCommand,
  unaliasCommand,
  lsCommand,
  cdCommand,
  pwdCommand,
  catCommand,
  treeCommand,
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
const welcomeMessage = `Welcome to darinchambers.com

Technologist, Inventor | Building What's Next on Rock-Solid Foundations

Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;

terminal.writeWelcome(welcomeMessage);
terminal.focus();
