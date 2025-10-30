import type { Command } from '../Command';
import type { Terminal } from '../../components/Terminal';

export function createWhoamiCommand(terminal: Terminal): Command {
  return {
    name: 'whoami',
    description: 'Display current username',
    execute: (_args: string[], _stdin?: string) => {
      return { output: terminal.getUsername() };
    }
  };
}
