import type { Command } from './Command';
import type { FileSystem } from '../utils/FileSystem';

export function createCdCommand(fs: FileSystem, onPathChange: (path: string) => void): Command {
  return {
    name: 'cd',
    description: 'Change directory',
    execute: (args: string[]) => {
      try {
        const path = args[0] || '~';
        fs.changeDirectory(path);
        onPathChange(fs.getShortPath());
        return { output: '' };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
