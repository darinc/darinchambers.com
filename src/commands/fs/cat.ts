/**
 * Cat Command
 *
 * Displays the contents of files from the virtual filesystem. Can concatenate multiple
 * files and supports reading from stdin for use in command pipelines. Outputs raw file
 * content without interpretation or formatting.
 */
import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createCatCommand(fs: IFileSystem): Command {
  return {
    name: 'cat',
    description: 'Display file contents',
    execute: (args: string[], _stdin?: string) => {
      if (args.length === 0) {
        return {
          output: 'cat: missing file operand',
          error: true
        };
      }

      try {
        const content = fs.readFile(args[0]);
        return {
          output: content
        };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
