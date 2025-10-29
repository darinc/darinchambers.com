import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createCdCommand(
  fs: IFileSystem,
  onPathChange: (path: string) => void,
  onUsernameChange: (username: string) => void
): Command {
  return {
    name: 'cd',
    description: 'Change directory',
    execute: (args: string[], stdin?: string) => {
      try {
        const path = args[0] || '~';
        fs.changeDirectory(path);
        const newPath = fs.getCurrentPath();

        // Update username based on home directory
        if (newPath === '/home/guest' || newPath.startsWith('/home/guest/')) {
          onUsernameChange('guest');
          fs.setCurrentUsername('guest');
        } else if (newPath === '/home/darin' || newPath.startsWith('/home/darin/')) {
          onUsernameChange('darin');
          fs.setCurrentUsername('darin');
        }

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
