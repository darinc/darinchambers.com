import { PipelineParser } from './PipelineParser';
import type { AliasManager } from './AliasManager';
import type { CommandDispatcher } from './CommandDispatcher';
import type { EnvVarManager } from './EnvVarManager';
import type { CommandResult } from '../commands/Command';

/**
 * CommandExecutor handles the execution of commands by resolving aliases,
 * detecting pipelines, and dispatching to the appropriate handler.
 *
 * This class extracts execution logic from Terminal.ts to create a clear
 * separation between UI concerns (Terminal) and business logic (CommandExecutor).
 */
export class CommandExecutor {
  constructor(
    private dispatcher: CommandDispatcher,
    private aliasManager: AliasManager,
    private envVarManager?: EnvVarManager
  ) {}

  /**
   * Execute a command string, handling variable expansion, alias resolution,
   * and pipeline detection.
   *
   * @param command - The raw command string to execute
   * @returns Promise resolving to the command result
   */
  public async execute(command: string): Promise<CommandResult> {
    const trimmedValue = command.trim();

    // Return empty result for empty commands
    if (!trimmedValue) {
      return { output: '' };
    }

    // Resolve any aliases first (before environment variable expansion)
    const resolvedCommand = this.aliasManager.resolve(trimmedValue);

    // Expand environment variables after alias resolution
    const expandedCommand = this.envVarManager
      ? this.envVarManager.expandVariables(resolvedCommand)
      : resolvedCommand;

    // Detect pipelines and dispatch to appropriate handler
    const result = PipelineParser.hasPipe(expandedCommand)
      ? await this.dispatcher.dispatchPipeline(expandedCommand)
      : await this.dispatcher.dispatch(expandedCommand);

    return result;
  }
}
