/**
 * Alias Command
 *
 * Creates and displays command aliases for shortening or customizing command names.
 * Allows users to define shortcuts (e.g., alias ll='ls -la') and list all active aliases.
 * Aliases are persisted to the virtual filesystem.
 */
import type { Command } from '../Command';
import type { AliasManager } from '../../utils/AliasManager';

export function createAliasCommand(aliasManager: AliasManager): Command {
  return {
    name: 'alias',
    description: 'Create or display command aliases',
    execute: (args: string[], _stdin?: string) => {
      // If no arguments, display all aliases
      if (args.length === 0) {
        const aliases = aliasManager.getAllAliases();
        if (aliases.size === 0) {
          return { output: 'No aliases defined.' };
        }

        const lines = Array.from(aliases.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([name, command]) => `alias ${name}='${command}'`);

        return { output: lines.join('\n') };
      }

      // Parse alias definition: alias name=command
      // Note: CommandParser already strips quotes, so we receive "boo=echo boo" not "boo='echo boo'"
      const input = args.join(' ');
      const match = input.match(/^(\S+)=(.+)$/);

      if (!match) {
        return {
          output: `Usage: alias name='command'\n       alias (to list all aliases)`,
          error: true
        };
      }

      const [, name, command] = match;

      try {
        aliasManager.setAlias(name, command);
        return { output: `Alias created: ${name}='${command}'` };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
