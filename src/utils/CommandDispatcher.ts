import type { Command, CommandResult } from '../commands/Command';
import { CommandParser, type ParsedCommand } from './CommandParser';
import { PipelineParser } from './PipelineParser';

export class CommandDispatcher {
  private commands: Map<string, Command> = new Map();

  registerCommand(command: Command): void {
    this.commands.set(command.name.toLowerCase(), command);

    // Register aliases
    if (command.aliases) {
      command.aliases.forEach(alias => {
        this.commands.set(alias.toLowerCase(), command);
      });
    }
  }

  async dispatch(input: string): Promise<CommandResult> {
    const parsed: ParsedCommand = CommandParser.parse(input);

    if (!parsed.command) {
      return { output: '' };
    }

    const command = this.commands.get(parsed.command);

    if (!command) {
      return {
        output: `Command not found: ${parsed.command}\nType 'help' for available commands.`,
        error: true
      };
    }

    try {
      return await command.execute(parsed.args);
    } catch (error) {
      return {
        output: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      };
    }
  }

  async dispatchPipeline(input: string): Promise<CommandResult> {
    const commandStrings = PipelineParser.parse(input);

    if (commandStrings.length === 0) {
      return { output: '' };
    }

    let result: CommandResult = { output: '' };

    for (let i = 0; i < commandStrings.length; i++) {
      const cmdString = commandStrings[i];
      const stdin = i === 0 ? undefined : result.output;

      const parsed: ParsedCommand = CommandParser.parse(cmdString);

      if (!parsed.command) {
        return { output: '' };
      }

      const command = this.commands.get(parsed.command);

      if (!command) {
        return {
          output: `Command not found: ${parsed.command}\nType 'help' for available commands.`,
          error: true
        };
      }

      try {
        result = await command.execute(parsed.args, stdin);

        // Stop pipeline on error
        if (result.error) {
          return result;
        }
      } catch (error) {
        return {
          output: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
          error: true
        };
      }
    }

    return result;
  }

  getCommands(): Command[] {
    // Return unique commands (filter out aliases)
    const uniqueCommands = new Map<string, Command>();
    this.commands.forEach((command, key) => {
      if (command.name === key) {
        uniqueCommands.set(key, command);
      }
    });
    return Array.from(uniqueCommands.values());
  }

  getCommandNames(): string[] {
    return Array.from(this.commands.keys());
  }
}
