/**
 * Rmdir Command
 *
 * Removes empty directories from the virtual filesystem. Only removes
 * directories that contain no files or subdirectories. Use rm -r for
 * recursive deletion.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

const HELP_TEXT = `Usage: rmdir DIRECTORY...

Description:
  Remove empty directories from the filesystem

Options:
  --help               Display this help and exit

Examples:
  rmdir mydir          # Remove an empty directory
  rmdir dir1 dir2      # Remove multiple empty directories`;

export function createRmdirCommand(fs: IFileSystem): Command {
  return {
    name: 'rmdir',
    description: 'Remove empty directories',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return { output: HELP_TEXT };
      }

      const paths = cmdArgs.getAllPositionals();

      if (paths.length === 0) {
        return {
          output: "rmdir: missing operand\nTry 'rmdir --help' for more information",
          error: true,
        };
      }

      const results: string[] = [];
      let hasError = false;

      for (const path of paths) {
        try {
          if (!fs.exists(path)) {
            results.push(`rmdir: failed to remove '${path}': No such file or directory`);
            hasError = true;
            continue;
          }

          if (!fs.isDirectory(path)) {
            results.push(`rmdir: failed to remove '${path}': Not a directory`);
            hasError = true;
            continue;
          }

          // deleteDirectory without recursive flag will error if not empty
          fs.deleteDirectory(path);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          // Rewrite the error message prefix from rm to rmdir
          results.push(message.replace(/^rm:/, 'rmdir:'));
          hasError = true;
        }
      }

      return {
        output: results.join('\n'),
        error: hasError,
      };
    },
  };
}
