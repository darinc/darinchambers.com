/**
 * Pwd Command
 *
 * Prints the current working directory path in the virtual filesystem.
 * Displays the absolute path from the filesystem root, helping users
 * navigate and understand their current location.
 */
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createPwdCommand(fs: IFileSystem): Command {
  return {
    name: 'pwd',
    description: 'Print working directory',
    execute: (_args: string[], _stdin?: string) => {
      return { output: fs.getCurrentPath() };
    },
  };
}
