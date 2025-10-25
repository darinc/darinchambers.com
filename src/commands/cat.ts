import type { Command } from './Command';
import type { FileSystem } from '../utils/FileSystem';

export function createCatCommand(fs: FileSystem): Command {
  return {
    name: 'cat',
    description: 'Display file contents',
    execute: (args: string[]) => {
      if (args.length === 0) {
        return {
          output: 'cat: missing file operand',
          error: true
        };
      }

      try {
        const content = fs.readFile(args[0]);
        return { output: content };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
