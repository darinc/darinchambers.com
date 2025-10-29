import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createPwdCommand(fs: IFileSystem): Command {
  return {
    name: 'pwd',
    description: 'Print working directory',
    execute: (args: string[], stdin?: string) => {
      return { output: fs.getCurrentPath() };
    }
  };
}
