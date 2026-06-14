/**
 * Exit Command
 *
 * If the current user is root, switches back to the regular user and resets HOME/USER/PWD.
 * If the current user is the regular user, returns a random funny response since there's
 * nowhere to exit to.
 */
import { PATHS } from '../../constants';
import { siteConfig } from '../../site.config';
import { CommandArgs } from '../../utils/CommandArgs';
import type { Terminal } from '../../components/Terminal';
import type { EnvVarManager } from '../../utils/EnvVarManager';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

const FUNNY_RESPONSES = [
  'There is no escape.',
  'You can check out any time you like, but you can never leave.',
  'no',
  'no thank you',
  'nope',
  'exit: permission denied: too interesting to leave',
  `logout\nConnection to ${siteConfig.domain} closed.\n\n...just kidding. Welcome back.`,
];

export function createExitCommand(
  terminal: Terminal,
  envVarManager: EnvVarManager,
  fileSystem: IFileSystem,
  onPathChange: (path: string) => void
): Command {
  return {
    name: 'exit',
    description: 'Exit the current session',
    aliases: ['logout'],
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: exit

Description:
  Exit the current session. If logged in as root (via sudo su),
  returns to the regular user. Otherwise, displays a message.

Aliases:
  logout

Examples:
  exit                 # Exit root session or display message
  logout               # Same as exit`,
        };
      }

      // If root, switch back to the regular user
      if (terminal.getUsername() === 'root') {
        terminal.setUsername(siteConfig.username);
        envVarManager.setVariable('HOME', PATHS.HOME);
        envVarManager.setVariable('USER', siteConfig.username);
        envVarManager.setVariable('PWD', PATHS.HOME);
        fileSystem.changeDirectory(PATHS.HOME);
        onPathChange(fileSystem.getShortPath());
        return { output: '' };
      }

      // If regular user, return a random funny response
      const index = Math.floor(Math.random() * FUNNY_RESPONSES.length);
      return { output: FUNNY_RESPONSES[index] };
    },
  };
}
