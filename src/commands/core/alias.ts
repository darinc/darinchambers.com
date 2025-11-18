/**
 * Alias Command
 *
 * Creates and displays command aliases for shortening or customizing command names.
 * Allows users to define shortcuts (e.g., alias ll='ls -la') and list all active aliases.
 * Aliases are persisted to the virtual filesystem.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { AliasManager } from '../../utils/AliasManager';
import type { Command } from '../Command';

export function createAliasCommand(aliasManager: AliasManager): Command {
  return {
    name: 'alias',
    description: 'Create or display command aliases',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`,
        };
      }

      // If no arguments, display all aliases
      if (args.length === 0) {
        const aliases = aliasManager.getAllAliases();
        if (aliases.size === 0) {
          return { output: 'No aliases defined.' };
        }

        const lines = Array.from(aliases.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([name, command]) => {
            const isDefault = aliasManager.isDefaultAlias(name);
            return `alias ${name}='${command}'${isDefault ? ' (default)' : ''}`;
          });

        return { output: lines.join('\n') };
      }

      // Parse alias definition: alias name=command
      // Note: CommandParser already strips quotes, so we receive "boo=echo boo" not "boo='echo boo'"
      const input = args.join(' ');
      const match = /^(\S+)=(.+)$/.exec(input);

      if (!match) {
        return {
          output: `Usage: alias name='command'\n       alias (to list all aliases)`,
          error: true,
        };
      }

      const [, name, command] = match;

      try {
        aliasManager.setAlias(name, command);
        return { output: `Alias created: ${name}='${command}'` };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
