/**
 * Date Command
 *
 * Displays the current date and time in the system's default format.
 * Provides a quick way to check the current timestamp.
 */
import type { Command } from '../Command';

export const dateCommand: Command = {
  name: 'date',
  description: 'Display current date and time',
  execute: (_args: string[], _stdin?: string) => {
    const now = new Date();
    const dateString = now.toString();
    return { output: dateString };
  },
};
