import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';

export function createLsCommand(fs: FileSystem): Command {
  return {
    name: 'ls',
    description: 'List directory contents',
    execute: (args: string[], stdin?: string) => {
      try {
        const path = args[0] || '.';
        const items = fs.list(path);

        if (items.length === 0) {
          return { output: '' };
        }

        return { output: items.join('  ') };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
