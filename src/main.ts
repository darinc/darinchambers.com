import './styles/terminal.css';
import { Terminal } from './components/Terminal';
import { Navigation } from './components/Navigation';
import type { Command } from './commands/Command';
import type { NavItem } from './components/Navigation';

// Initialize terminal
const terminal = new Terminal();

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

More commands coming soon! Type a command and press Enter to execute.`
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

terminal.registerCommands([helpCommand, clearCommand]);

// Set up navigation items
const navItems: NavItem[] = [
  { label: 'help', command: 'help' },
  { label: 'clear', command: 'clear' }
];

navigation.setItems(navItems);

// Display welcome message
const welcomeMessage = `Welcome to darinchambers.com

Technologist, Inventor | Building What's Next on Rock-Solid Foundations

Type 'help' to see available commands, or click a command above.
`;

terminal.writeWelcome(welcomeMessage);
terminal.focus();
