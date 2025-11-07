/**
 * Env Command
 *
 * Displays all environment variables in the current session. Shows variable names and
 * their values in NAME=value format, sorted alphabetically for easy reading. Environment
 * variables persist across commands and can be set with the export command.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { EnvVarManager } from '../../utils/EnvVarManager';
import type { Command } from '../Command';

/**
 * Creates the env command to list all environment variables.
 *
 * @param envVarManager - Environment variable manager instance
 * @returns Command implementation for env
 */
export function createEnvCommand(envVarManager: EnvVarManager): Command {
  return {
    name: 'env',
    description: 'Display all environment variables',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`,
        };
      }

      try {
        const allVars = envVarManager.getAllVariables();

        if (allVars.size === 0) {
          return { output: '' };
        }

        // Sort variables alphabetically for consistent output
        const sorted = Array.from(allVars.entries()).sort((a, b) => a[0].localeCompare(b[0]));

        // Format as NAME=value
        const output = sorted.map(([name, value]) => `${name}=${value}`).join('\n');

        return { output };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
