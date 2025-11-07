import { CommandParser, type ParsedCommand } from './CommandParser';
import { AppError, CommandNotFoundError } from './errors';
import { PipelineParser } from './PipelineParser';
import type { Command, CommandResult } from '../commands/Command';

export class CommandDispatcher {
  private commands = new Map<string, Command>();

  registerCommand(command: Command): void {
    this.commands.set(command.name.toLowerCase(), command);

    // Register aliases
    if (command.aliases) {
      command.aliases.forEach((alias) => {
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
      const err = new CommandNotFoundError(parsed.command);
      return {
        output: `${err.message}\nType 'help' for available commands.`,
        error: true,
      };
    }

    try {
      return await command.execute(parsed.args);
    } catch (error) {
      // Standardize all errors into a CommandResult
      if (error instanceof AppError) {
        return { output: error.message, error: true };
      } else if (error instanceof Error) {
        return { output: `Error: ${error.message}`, error: true };
      }
      return { output: 'An unknown error occurred.', error: true };
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
          error: true,
        };
      }

      try {
        result = await command.execute(parsed.args, stdin);

        // Stop pipeline on error
        if (result.error) {
          return result;
        }
      } catch (error) {
        // Standardize all errors into a CommandResult
        if (error instanceof AppError) {
          return { output: error.message, error: true };
        } else if (error instanceof Error) {
          return { output: `Error: ${error.message}`, error: true };
        }
        return { output: 'An unknown error occurred.', error: true };
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
