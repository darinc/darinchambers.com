import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createCdCommand(
  fs: IFileSystem,
  onPathChange: (path: string) => void
): Command {
  return {
    name: 'cd',
    description: 'Change directory',
    execute: (args: string[], _stdin?: string) => {
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
