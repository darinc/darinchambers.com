import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';

export function createPwdCommand(fs: FileSystem): Command {
  return {
    name: 'pwd',
    description: 'Print working directory',
    execute: () => {
      return { output: fs.getCurrentPath() };
    }
  };
}
