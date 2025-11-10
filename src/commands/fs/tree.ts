/**
 * Tree Command
 *
 * Displays directory structure in a visual tree format with ASCII art branch characters.
 * Supports the -L flag to limit directory depth and shows file counts at the bottom.
 * Provides an intuitive way to visualize the filesystem hierarchy.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createTreeCommand(fs: IFileSystem): Command {
  return {
    name: 'tree',
    description: 'Display directory tree structure',
    execute: (args: string[], _stdin?: string) => {
      try {
        // Parse command arguments
        const cmdArgs = new CommandArgs(args);

        if (cmdArgs.hasFlag('help')) {
          return {
            output: `Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`,
          };
        }

        const path = cmdArgs.getPositional(0) ?? '.';
        let maxDepth = 4;

        // Check for -L flag (depth limit)
        const depthFlag = cmdArgs.getFlag('L');
        if (depthFlag !== undefined) {
          if (typeof depthFlag === 'boolean') {
            return {
              output:
                "tree: -L flag requires a depth value\nTry 'tree --help' for more information",
              error: true,
            };
          }
          const depth = parseInt(depthFlag, 10);
          if (isNaN(depth) || depth < 1) {
            return {
              output:
                "tree: invalid level, must be a positive integer\nTry 'tree --help' for more information",
              error: true,
            };
          }
          maxDepth = depth;
        }

        const lines = fs.getTree(path, maxDepth);
        const output = lines.join('\n');
        // Use scrollBehavior for deep trees (auto-detect will handle it)
        return { output, scrollBehavior: 'top' };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
