/**
 * History Command
 *
 * Displays the command history from the current terminal session. Shows previously
 * executed commands with line numbers, allowing users to review their command usage.
 * Supports clearing history with the -c flag.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { TerminalInput } from '../../components/TerminalInput';
import type { Command } from '../Command';

export function createHistoryCommand(input: TerminalInput): Command {
  return {
    name: 'history',
    description: 'Display command history',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`,
        };
      }

      const history = input.getHistory();

      if (history.length === 0) {
        return { output: 'No commands in history.' };
      }

      const lines = history.map((cmd, index) => {
        const lineNumber = (index + 1).toString().padStart(5, ' ');
        return `${lineNumber}  ${cmd}`;
      });

      return { output: lines.join('\n') };
    },
  };
}
