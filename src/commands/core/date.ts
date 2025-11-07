/**
 * Date Command
 *
 * Displays the current date and time in the system's default format.
 * Provides a quick way to check the current timestamp.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { Command } from '../Command';

export const dateCommand: Command = {
  name: 'date',
  description: 'Display current date and time',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`,
      };
    }

    const now = new Date();
    const dateString = now.toString();
    return { output: dateString };
  },
};
