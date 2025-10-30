import type { Command } from '../Command';
import type { AliasManager } from '../../utils/AliasManager';

export function createUnaliasCommand(aliasManager: AliasManager): Command {
  return {
    name: 'unalias',
    description: 'Remove command aliases',
    execute: (args: string[], _stdin?: string) => {
      if (args.length === 0) {
        return {
          output: 'Usage: unalias name',
          error: true
        };
      }

      const name = args[0];
      const removed = aliasManager.removeAlias(name);

      if (removed) {
        return { output: `Alias removed: ${name}` };
      } else {
        return {
          output: `unalias: ${name}: not found`,
          error: true
        };
      }
    }
  };
}
