/**
 * Man Command
 *
 * Displays manual pages for commands in traditional Unix man-page format.
 * Wraps the existing --help output with NAME header and SEE ALSO footer.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { CommandDispatcher } from '../../utils/CommandDispatcher';
import type { Command } from '../Command';

export function createManCommand(dispatcher: CommandDispatcher): Command {
  return {
    name: 'man',
    description: 'Display manual pages for commands',
    execute: async (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: man <command>

Description:
  Display manual pages for commands

Options:
  --help           Show this help message

Examples:
  man ls           # Show manual page for ls
  man help         # Show manual page for help`,
        };
      }

      const positionals = cmdArgs.getAllPositionals();

      if (positionals.length === 0) {
        return {
          output: "What manual page do you want?\nFor example, try 'man help'.",
          error: true,
        };
      }

      const commandName = positionals[0].toLowerCase();
      const commandNames = dispatcher.getCommandNames();

      if (!commandNames.includes(commandName)) {
        return {
          output: `No manual entry for ${positionals[0]}`,
          error: true,
        };
      }

      // Get the command's description
      const commands = dispatcher.getCommands();
      const command = commands.find((cmd) => cmd.name === commandName);
      const description = command ? command.description : commandName;

      // Get the raw --help output
      const helpResult = await dispatcher.dispatch(`${commandName} --help`);
      const helpText = helpResult.output;

      // Build the man page header
      const header = `${commandName}(1)`;
      const section = 'User Commands';
      const padding = Math.max(0, 60 - header.length * 2 - section.length);
      const headerLine = `${header}${' '.repeat(Math.floor(padding / 2))}${section}${' '.repeat(Math.ceil(padding / 2))}${header}`;

      // Build related commands (a few core commands for SEE ALSO)
      const relatedCommands = ['help', 'which']
        .filter((name) => name !== commandName)
        .map((name) => `${name}(1)`)
        .join(', ');

      const manPage = [
        headerLine,
        '',
        'NAME',
        `    ${commandName} - ${description}`,
        '',
        helpText,
        '',
        'SEE ALSO',
        `    ${relatedCommands}`,
      ].join('\n');

      return { output: manPage };
    },
  };
}
