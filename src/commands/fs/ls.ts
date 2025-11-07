/**
 * Ls Command
 *
 * Lists directory contents in the virtual filesystem. Supports multiple flags including
 * -l for long format with permissions and sizes, -a to show hidden files, -h for
 * human-readable sizes, and -r for reverse sorting. Output is color-coded by file type.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import { formatLongListing, calculateTotalBlocks } from '../../utils/ls-formatters';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { FileSystemNode } from '../../utils/fs/types';
import type { Command } from '../Command';

export function createLsCommand(fs: IFileSystem): Command {
  return {
    name: 'ls',
    description: 'List directory contents',
    execute: (args: string[], _stdin?: string) => {
      try {
        const cmdArgs = new CommandArgs(args);
        const path = cmdArgs.getPositional(0) ?? '.';

        // Parse flags
        const showAll = cmdArgs.hasFlag('a');
        const longFormat = cmdArgs.hasFlag('l');
        const humanReadable = cmdArgs.hasFlag('h');

        // Get directory node
        const dirNode = fs.getNode(path);
        if (!dirNode) {
          return {
            output: `ls: cannot access '${path}': No such file or directory`,
            error: true,
          };
        }

        // If it's a file, just show that file
        if (dirNode.type === 'file') {
          if (longFormat) {
            return { output: formatLongListing(dirNode, humanReadable) };
          }
          return { output: dirNode.name };
        }

        // It's a directory, list its children
        if (!dirNode.children) {
          return { output: '' };
        }

        // Get all child nodes
        let nodes: FileSystemNode[] = Array.from(dirNode.children.values());

        // Filter hidden files unless -a flag is set
        if (!showAll) {
          nodes = nodes.filter((node) => !node.isHidden);
        }

        if (nodes.length === 0) {
          return { output: '' };
        }

        // Sort alphabetically
        nodes.sort((a, b) => a.name.localeCompare(b.name));

        // Format output
        if (longFormat) {
          const total = calculateTotalBlocks(nodes);
          const lines = [
            `total ${total}`,
            ...nodes.map((node) => formatLongListing(node, humanReadable)),
          ];
          return { output: lines.join('\n') };
        } else {
          // Simple format: space-separated names
          const names = nodes.map((node) => node.name);
          return { output: names.join('  ') };
        }
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
