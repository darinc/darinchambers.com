import './styles/terminal.css';
import { Terminal } from './components/Terminal';
import type { Command } from './commands/Command';

// Initialize terminal
const terminal = new Terminal();

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

// Display welcome message
const welcomeMessage = `Welcome to darinchambers.com

Technologist, Inventor | Building What's Next on Rock-Solid Foundations

Type 'help' to see available commands.
`;

terminal.writeWelcome(welcomeMessage);
terminal.focus();
