import type { Command } from '../Command';
import type { TerminalInput } from '../../components/TerminalInput';

export function createHistoryCommand(input: TerminalInput): Command {
  return {
    name: 'history',
    description: 'Display command history',
    execute: (_args: string[], _stdin?: string) => {
      const history = input.getHistory();

      if (history.length === 0) {
        return { output: 'No commands in history.' };
      }

      const lines = history.map((cmd, index) => {
        const lineNumber = (index + 1).toString().padStart(5, ' ');
        return `${lineNumber}  ${cmd}`;
      });

      return { output: lines.join('\n') };
    }
  };
}
