import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createCatCommand(fs: IFileSystem): Command {
  return {
    name: 'cat',
    description: 'Display file contents',
    execute: (args: string[], stdin?: string) => {
      if (args.length === 0) {
        return {
          output: 'cat: missing file operand',
          error: true
        };
      }

      try {
        const content = fs.readFile(args[0]);
        return {
          output: content,
          raw: true  // Mark as raw for piping
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
