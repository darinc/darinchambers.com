/**
 * Cd Command
 *
 * Changes the current working directory in the virtual filesystem. Supports absolute
 * and relative paths, tilde (~) expansion for home directory, and special '-' argument
 * to return to the previous directory. Updates PWD and OLDPWD environment variables.
 */
import type { EnvVarManager } from '../../utils/EnvVarManager';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createCdCommand(
  fs: IFileSystem,
  onPathChange: (path: string) => void,
  envVarManager?: EnvVarManager
): Command {
  return {
    name: 'cd',
    description: 'Change directory (supports - for previous directory)',
    execute: (args: string[], _stdin?: string) => {
      try {
        let targetPath = args[0] || '~';

        // Handle 'cd -' to go to previous directory
        if (targetPath === '-' && envVarManager) {
          const oldPwd = envVarManager.getVariable('OLDPWD');
          if (!oldPwd) {
            return {
              output: 'cd: OLDPWD not set',
              error: true,
            };
          }
          targetPath = oldPwd;
        }

        // Store current directory as OLDPWD before changing
        if (envVarManager) {
          const currentPwd = envVarManager.getVariable('PWD') || fs.getCurrentPath();
          envVarManager.setVariable('OLDPWD', currentPwd);
        }

        // Change directory
        fs.changeDirectory(targetPath);

        // Update PWD environment variable
        if (envVarManager) {
          envVarManager.setVariable('PWD', fs.getCurrentPath());
        }

        // Update terminal prompt
        onPathChange(fs.getShortPath());

        return { output: '' };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
