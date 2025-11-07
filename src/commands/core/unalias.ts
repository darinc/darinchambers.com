/**
 * Unalias Command
 *
 * Removes command aliases created with the alias command. Accepts one or more alias
 * names to remove, allowing users to clean up their custom command shortcuts.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { AliasManager } from '../../utils/AliasManager';
import type { Command } from '../Command';

export function createUnaliasCommand(aliasManager: AliasManager): Command {
  return {
    name: 'unalias',
    description: 'Remove command aliases',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`,
        };
      }

      if (args.length === 0) {
        return {
          output: "Usage: unalias name\nTry 'unalias --help' for more information.",
          error: true,
        };
      }

      const name = args[0];
      const removed = aliasManager.removeAlias(name);

      if (removed) {
        return { output: `Alias removed: ${name}` };
      } else {
        return {
          output: `unalias: ${name}: not found`,
          error: true,
        };
      }
    },
  };
}
