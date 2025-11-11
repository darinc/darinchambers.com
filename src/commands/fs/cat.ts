/**
 * Cat Command
 *
 * Displays the contents of files from the virtual filesystem. Can concatenate multiple
 * files and supports reading from stdin for use in command pipelines. Outputs raw file
 * content without interpretation or formatting.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createCatCommand(fs: IFileSystem): Command {
  return {
    name: 'cat',
    description: 'Display file contents',
    execute: (args: string[], stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`,
        };
      }

      // If no arguments, try to read from stdin
      if (args.length === 0) {
        if (stdin !== undefined) {
          return {
            output: stdin,
          };
        }
        return {
          output: "cat: missing file operand\nTry 'cat --help' for more information",
          error: true,
        };
      }

      try {
        const content = fs.readFile(args[0]);
        return {
          output: content,
        };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
