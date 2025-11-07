/**
 * Whoami Command
 *
 * Displays the current username from the terminal session. Mimics the Unix whoami
 * command, providing a simple way to identify the active user in the virtual terminal.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { Terminal } from '../../components/Terminal';
import type { Command } from '../Command';

export function createWhoamiCommand(terminal: Terminal): Command {
  return {
    name: 'whoami',
    description: 'Display current username',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`,
        };
      }

      return { output: terminal.getUsername() };
    },
  };
}
