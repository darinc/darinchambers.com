/**
 * Mkdir Command
 *
 * Creates directories in the virtual filesystem. Supports -p flag for
 * creating parent directories. Without -p, errors if parent doesn't exist.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

const HELP_TEXT = `Usage: mkdir [OPTION]... DIRECTORY...

Description:
  Create directories in the filesystem

Options:
  -p                   Create parent directories as needed
  --help               Display this help and exit

Examples:
  mkdir mydir          # Create a directory
  mkdir -p a/b/c       # Create nested directories
  mkdir dir1 dir2      # Create multiple directories`;

export function createMkdirCommand(fs: IFileSystem): Command {
  return {
    name: 'mkdir',
    description: 'Create directories',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return { output: HELP_TEXT };
      }

      const createParents = cmdArgs.hasFlag('p');
      const paths = cmdArgs.getAllPositionals();

      if (paths.length === 0) {
        return {
          output: "mkdir: missing operand\nTry 'mkdir --help' for more information",
          error: true,
        };
      }

      const results: string[] = [];
      let hasError = false;

      for (const path of paths) {
        try {
          if (fs.exists(path) && fs.isDirectory(path)) {
            if (createParents) {
              // mkdir -p silently succeeds if directory already exists
              continue;
            }
            results.push(`mkdir: cannot create directory '${path}': File exists`);
            hasError = true;
            continue;
          }

          if (!createParents) {
            // Without -p, check that parent directory exists
            const parts = path.replace(/\/+$/, '').split('/');
            if (parts.length > 1) {
              const parentPath = parts.slice(0, -1).join('/') || '/';
              if (!fs.exists(parentPath) || !fs.isDirectory(parentPath)) {
                results.push(`mkdir: cannot create directory '${path}': No such file or directory`);
                hasError = true;
                continue;
              }
            }
          }

          fs.createDirectory(path);
        } catch (error) {
          results.push(error instanceof Error ? error.message : String(error));
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
