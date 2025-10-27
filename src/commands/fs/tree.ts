import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';

export function createTreeCommand(fs: FileSystem): Command {
  return {
    name: 'tree',
    description: 'Display directory tree structure',
    execute: (args: string[], stdin?: string) => {
      try {
        let path = '.';
        let maxDepth = 4;

        // Parse arguments
        for (let i = 0; i < args.length; i++) {
          if (args[i] === '-L' && i + 1 < args.length) {
            const depth = parseInt(args[i + 1], 10);
            if (isNaN(depth) || depth < 1) {
              return {
                output: 'tree: invalid level, must be a positive integer',
                error: true
              };
            }
            maxDepth = depth;
            i++; // Skip next arg as it's the depth value
          } else if (!args[i].startsWith('-')) {
            path = args[i];
          }
        }

        const lines = fs.getTree(path, maxDepth);
        return { output: lines.join('\n') };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
