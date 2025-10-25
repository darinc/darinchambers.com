import './styles/terminal.css';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import { FileSystem } from './utils/FileSystem';
import type { Command } from './commands/Command';
import type { NavItem } from './components/Navigation';
import { createLsCommand } from './commands/ls';
import { createCdCommand } from './commands/cd';
import { createPwdCommand } from './commands/pwd';
import { createCatCommand } from './commands/cat';

// Initialize terminal
const terminal = new Terminal();

// Initialize file system
const fileSystem = new FileSystem();
terminal.setCurrentPath(fileSystem.getShortPath());

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
  help     - Display this help message
  clear    - Clear the terminal screen
  ls       - List directory contents
  cd       - Change directory
  pwd      - Print working directory
  cat      - Display file contents

Navigation:
  Try 'ls' to see files, 'cd /home/darin' to explore, 'cat README.txt' to read files.`
    };
  }
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  execute: () => {
    const outputElement = document.getElementById('terminal-output');
    if (outputElement) {
      outputElement.innerHTML = '';
    }
    return { output: '' };
  }
};

// Create file system commands
const lsCommand = createLsCommand(fileSystem);
const cdCommand = createCdCommand(fileSystem, (path: string) => terminal.setCurrentPath(path));
const pwdCommand = createPwdCommand(fileSystem);
const catCommand = createCatCommand(fileSystem);

terminal.registerCommands([
  helpCommand,
  clearCommand,
  lsCommand,
  cdCommand,
  pwdCommand,
  catCommand
]);

// Set up navigation items
const navItems: NavItem[] = [
  { label: 'help', command: 'help' },
  { label: 'ls', command: 'ls' },
  { label: 'pwd', command: 'pwd' },
  { label: 'clear', command: 'clear' }
];

navigation.setItems(navItems);

// Display welcome message
const welcomeMessage = `Welcome to darinchambers.com

Technologist, Inventor | Building What's Next on Rock-Solid Foundations

Type 'help' to see available commands, or click a command above.
Try 'cat README.txt' to get started, or 'cd /home/darin' to explore more.
`;

terminal.writeWelcome(welcomeMessage);
terminal.focus();
