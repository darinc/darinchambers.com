/**
 * Whoami Command
 *
 * Displays the current username from the terminal session. Mimics the Unix whoami
 * command, providing a simple way to identify the active user in the virtual terminal.
 */
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
