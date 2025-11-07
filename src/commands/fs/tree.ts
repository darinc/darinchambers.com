/**
 * Tree Command
 *
 * Displays directory structure in a visual tree format with ASCII art branch characters.
 * Supports the -L flag to limit directory depth and shows file counts at the bottom.
 * Provides an intuitive way to visualize the filesystem hierarchy.
 */
import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { CommandArgs } from '../../utils/CommandArgs';

export function createTreeCommand(fs: IFileSystem): Command {
  return {
    name: 'tree',
    description: 'Display directory tree structure',
    execute: (args: string[], _stdin?: string) => {
      try {
        // Parse command arguments
        const cmdArgs = new CommandArgs(args);
        const path = cmdArgs.getPositional(0) || '.';
        let maxDepth = 4;

        // Check for -L flag (depth limit)
        const depthFlag = cmdArgs.getFlag('L');
        if (depthFlag !== undefined) {
          if (typeof depthFlag === 'boolean') {
            return {
              output: 'tree: -L flag requires a depth value',
              error: true
            };
          }
          const depth = parseInt(depthFlag, 10);
          if (isNaN(depth) || depth < 1) {
            return {
              output: 'tree: invalid level, must be a positive integer',
              error: true
            };
          }
          maxDepth = depth;
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
