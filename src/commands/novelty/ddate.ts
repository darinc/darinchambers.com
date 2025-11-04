import type { Command } from '../Command';
import { CommandArgs } from '../../utils/CommandArgs';
import {
  toDiscordian,
  formatDiscordian,
  parseDate,
  parseDateNumeric
} from '../../utils/discordian';

/**
 * ddate command - Display date in Discordian calendar format
 *
 * The Discordian calendar (also called the Erisian calendar) is an alternative
 * calendar used by Discordians. It divides the year into 5 seasons of 73 days each.
 */
export const ddateCommand: Command = {
  name: 'ddate',
  description: 'Display date in Discordian calendar',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: ddate [DATE]

Display the current date (or specified date) in Discordian calendar format.

The Discordian calendar has 5 seasons of 73 days each:
  Chaos, Discord, Confusion, Bureaucracy, The Aftermath

Special days:
  - St. Tib's Day: February 29 in leap years (outside normal calendar)
  - Apostle Days: Day 5 of each season

Examples:
  ddate                    Show current date
  ddate "2025-01-01"       Show specific date (YYYY-MM-DD format)
  ddate "1/1/2025"         Show specific date (MM/DD/YYYY format)
  ddate 12 21 2025         Show specific date (month day year)

Options:
  --help                   Display this help message`
      };
    }

    let targetDate: Date;

    // No arguments: use current date
    if (cmdArgs.positionalCount === 0) {
      targetDate = new Date();
    }
    // Single string argument: parse as date string
    else if (cmdArgs.positionalCount === 1) {
      const dateStr = cmdArgs.getPositional(0)!;
      const parsed = parseDate(dateStr);

      if (!parsed) {
        return {
          output: `ddate: invalid date '${dateStr}'`,
          error: true
        };
      }

      targetDate = parsed;
    }
    // Three numeric arguments: month day year (standard ddate format)
    else if (cmdArgs.positionalCount === 3) {
      const month = parseInt(cmdArgs.getPositional(0)!, 10);
      const day = parseInt(cmdArgs.getPositional(1)!, 10);
      const year = parseInt(cmdArgs.getPositional(2)!, 10);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return {
          output: 'ddate: invalid numeric date arguments',
          error: true
        };
      }

      const parsed = parseDateNumeric(day, month, year);
      if (!parsed) {
        return {
          output: `ddate: invalid date ${month}/${day}/${year}`,
          error: true
        };
      }

      targetDate = parsed;
    }
    else {
      return {
        output: 'ddate: invalid arguments\nTry \'ddate --help\' for more information.',
        error: true
      };
    }

    // Convert to Discordian and format output
    const ddate = toDiscordian(targetDate);
    const formatted = formatDiscordian(ddate);

    return { output: formatted };
  }
};
