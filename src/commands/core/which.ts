/**
 * Which Command
 *
 * Locates commands and displays their path in the virtual filesystem.
 * Shows whether a command exists in /usr/bin/ (core) or /usr/local/bin/ (custom),
 * and handles aliases by showing what they resolve to.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { AliasManager } from '../../utils/AliasManager';
import type { CommandDispatcher } from '../../utils/CommandDispatcher';
import type { Command } from '../Command';

// Commands located in /usr/local/bin (custom commands)
const LOCAL_BIN_COMMANDS = new Set(['about', 'portfolio', 'blog', 'contact', 'settings']);

export function createWhichCommand(
  dispatcher: CommandDispatcher,
  aliasManager: AliasManager
): Command {
  return {
    name: 'which',
    description: 'Locate a command and display its path',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: which [-a] <command> [command ...]

Description:
  Locate a command and display its path

Options:
  -a               Show all matching paths
  --help           Show this help message

Examples:
  which ls         # /usr/bin/ls
  which about      # /usr/local/bin/about
  which ll         # ll: aliased to ls -alh
  which ls cat     # Check multiple commands`,
        };
      }

      const positionals = cmdArgs.getAllPositionals();

      if (positionals.length === 0) {
        return {
          output: 'which: missing command argument\nUsage: which [-a] <command> [command ...]',
          error: true,
        };
      }

      const showAll = cmdArgs.hasFlag('a');
      const results: string[] = [];
      let hasError = false;

      for (const name of positionals) {
        const result = locateCommand(name, dispatcher, aliasManager, showAll);
        if (result.error) {
          hasError = true;
        }
        results.push(result.output);
      }

      const response: { output: string; error?: boolean } = {
        output: results.join('\n'),
      };

      if (hasError) {
        response.error = true;
      }

      return response;
    },
  };
}

function locateCommand(
  name: string,
  dispatcher: CommandDispatcher,
  aliasManager: AliasManager,
  showAll: boolean
): { output: string; error?: boolean } {
  const outputs: string[] = [];

  // Check if it's an alias first
  const aliasValue = aliasManager.getAlias(name);
  if (aliasValue) {
    outputs.push(`${name}: aliased to ${aliasValue}`);
    if (!showAll) {
      return { output: outputs.join('\n') };
    }
  }

  // Check if it's a registered command
  const commandNames = dispatcher.getCommandNames();
  const isCommand = commandNames.includes(name.toLowerCase());

  if (isCommand) {
    const path = LOCAL_BIN_COMMANDS.has(name.toLowerCase())
      ? `/usr/local/bin/${name}`
      : `/usr/bin/${name}`;
    outputs.push(path);
  }

  if (outputs.length === 0) {
    return {
      output: `which: ${name}: command not found`,
      error: true,
    };
  }

  return { output: outputs.join('\n') };
}
