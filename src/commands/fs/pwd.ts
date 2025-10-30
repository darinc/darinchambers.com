import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';

export function createPwdCommand(fs: IFileSystem): Command {
  return {
    name: 'pwd',
    description: 'Print working directory',
    execute: (_args: string[], _stdin?: string) => {
      return { output: fs.getCurrentPath() };
    }
  };
}
