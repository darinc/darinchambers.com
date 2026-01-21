/**
 * Rm Command
 *
 * Removes files and directories from the virtual filesystem. Supports recursive
 * deletion with -r flag and forced deletion with -f flag. When deleting command
 * files from /usr/bin or /usr/local/bin, the corresponding command is unregistered.
 * Contains an easter egg: `rm -rf /` triggers a screen melt effect.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { CommandDispatcher } from '../../utils/CommandDispatcher';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

const HELP_TEXT = `Usage: rm [OPTION]... FILE...

Description:
  Remove files or directories from the filesystem

Options:
  -r, -R, --recursive  Remove directories and their contents recursively
  -f, --force          Ignore nonexistent files, never prompt
  --help               Display this help and exit

Examples:
  rm file.txt          # Remove a file
  rm -r mydir          # Remove a directory and its contents
  rm -f missing.txt    # No error if file doesn't exist
  rm -rf /             # Don't try this at home`;

/**
 * Generate the melt effect HTML for the rm -rf / easter egg
 */
function generateMeltEffectHtml(): string {
  return `<div data-melt class="melt-trigger"></div>`;
}

export function createRmCommand(fs: IFileSystem, dispatcher: CommandDispatcher): Command {
  return {
    name: 'rm',
    description: 'Remove files or directories',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return { output: HELP_TEXT };
      }

      // Check for boolean flags (short flags) and long flags
      // Note: CommandArgs treats -f as a value flag, and --recursive/--force consume next args
      const recursiveFlag = cmdArgs.getFlag('recursive');
      const forceFlag = cmdArgs.getFlag('force');
      const fFlag = cmdArgs.getFlag('f');

      const recursive = cmdArgs.hasFlag('r') || cmdArgs.hasFlag('R') || recursiveFlag !== undefined;
      const force = cmdArgs.hasFlag('f') || forceFlag !== undefined;

      // Collect paths from positional args
      const paths = [...cmdArgs.getAllPositionals()];

      // If flags consumed paths as values, add them back
      // This handles cases like `--recursive mydir` where `mydir` becomes the value
      // Also handles `-f filename` where filename becomes the value of -f
      if (typeof recursiveFlag === 'string') {
        paths.push(recursiveFlag);
      }
      if (typeof forceFlag === 'string') {
        paths.push(forceFlag);
      }
      if (typeof fFlag === 'string') {
        paths.push(fFlag);
      }

      if (paths.length === 0) {
        return {
          output: "rm: missing operand\nTry 'rm --help' for more information",
          error: true,
        };
      }

      // Easter egg: rm -rf / triggers melt effect
      if (recursive && force) {
        const hasRoot = paths.some((p: string) => {
          // Normalize path to check if it's root
          if (p === '/') return true;
          if (p === '/' + '*') return true;
          return false;
        });

        if (hasRoot) {
          return {
            output: generateMeltEffectHtml(),
            html: true,
          };
        }
      }

      const results: string[] = [];
      let hasError = false;

      for (const path of paths) {
        try {
          const exists = fs.exists(path);

          if (!exists) {
            if (!force) {
              results.push(`rm: cannot remove '${path}': No such file or directory`);
              hasError = true;
            }
            continue;
          }

          const isDir = fs.isDirectory(path);

          if (isDir) {
            if (!recursive) {
              results.push(`rm: cannot remove '${path}': Is a directory`);
              hasError = true;
              continue;
            }
            fs.deleteDirectory(path, true);
          } else {
            // Check if this is a command in /usr/bin or /usr/local/bin
            const normalizedPath = path.startsWith('/')
              ? path
              : `${fs.getCurrentPath()}/${path}`.replace(/\/+/g, '/');

            if (
              normalizedPath.startsWith('/usr/bin/') ||
              normalizedPath.startsWith('/usr/local/bin/')
            ) {
              const commandName = normalizedPath.split('/').pop();
              if (commandName) {
                dispatcher.unregisterCommand(commandName);
              }
            }

            fs.deleteFile(path);
          }
        } catch (error) {
          if (!force) {
            results.push(error instanceof Error ? error.message : String(error));
            hasError = true;
          }
        }
      }

      // With force flag, we don't report errors
      if (force) {
        return {
          output: '',
          error: false,
        };
      }

      return {
        output: results.join('\n'),
        error: hasError,
      };
    },
  };
}
