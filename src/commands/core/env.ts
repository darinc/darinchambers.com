/**
 * Env Command
 *
 * Displays all environment variables in the current session. Shows variable names and
 * their values in NAME=value format, sorted alphabetically for easy reading. Environment
 * variables persist across commands and can be set with the export command.
 */
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
    execute: (_args: string[], _stdin?: string) => {
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
