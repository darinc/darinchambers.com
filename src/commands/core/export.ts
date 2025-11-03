import type { Command } from '../Command';
import type { EnvVarManager } from '../../utils/EnvVarManager';

/**
 * Creates the export command to set environment variables.
 *
 * Supports multiple formats:
 * - export VAR=value (set variable)
 * - export VAR (display single variable)
 * - export (display all variables, same as env)
 *
 * @param envVarManager - Environment variable manager instance
 * @returns Command implementation for export
 */
export function createExportCommand(envVarManager: EnvVarManager): Command {
  return {
    name: 'export',
    description: 'Set or display environment variables',
    execute: (args: string[], _stdin?: string) => {
      try {
        // No arguments: display all variables (like env)
        if (args.length === 0) {
          const allVars = envVarManager.getAllVariables();

          if (allVars.size === 0) {
            return { output: '' };
          }

          // Sort variables alphabetically
          const sorted = Array.from(allVars.entries()).sort((a, b) =>
            a[0].localeCompare(b[0])
          );

          // Format as NAME=value
          const output = sorted
            .map(([name, value]) => `${name}=${value}`)
            .join('\n');

          return { output };
        }

        // Process each argument
        const results: string[] = [];

        for (const arg of args) {
          // Check if it's an assignment (VAR=value)
          const assignmentMatch = arg.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

          if (assignmentMatch) {
            // Set variable
            const [, name, value] = assignmentMatch;
            envVarManager.setVariable(name, value);
          } else {
            // Display single variable
            const value = envVarManager.getVariable(arg);
            if (value !== undefined) {
              results.push(`${arg}=${value}`);
            } else {
              results.push(`export: ${arg}: not found`);
            }
          }
        }

        return { output: results.join('\n') };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
