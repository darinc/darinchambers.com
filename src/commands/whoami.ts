import type { Command } from './Command';
import type { Terminal } from '../components/Terminal';

export function createWhoamiCommand(terminal: Terminal): Command {
  return {
    name: 'whoami',
    description: 'Display current username',
    execute: () => {
      return { output: terminal.getUsername() };
    }
  };
}
