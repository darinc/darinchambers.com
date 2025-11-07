/**
 * Pwd Command
 *
 * Prints the current working directory path in the virtual filesystem.
 * Displays the absolute path from the filesystem root, helping users
 * navigate and understand their current location.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createPwdCommand(fs: IFileSystem): Command {
  return {
    name: 'pwd',
    description: 'Print working directory',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`,
        };
      }

      return { output: fs.getCurrentPath() };
    },
  };
}
