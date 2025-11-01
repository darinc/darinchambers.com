import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { CommandDispatcher } from '../utils/CommandDispatcher';
import { CommandExecutor } from '../utils/CommandExecutor';
import type { Command, CommandResult } from '../commands/Command';
import { COMMAND_SIGNALS } from '../constants';

export class Terminal {
  private input: TerminalInput;
  private output: TerminalOutput;
  private username: string = 'darin';
  private hostname: string = 'darinchambers.com';
  private currentPath: string = '~';

  constructor(
    private dispatcher: CommandDispatcher,
    private executor: CommandExecutor
  ) {
    const outputElement = document.getElementById('terminal-output');
    const inputElement = document.getElementById('terminal-input') as HTMLInputElement;
    const promptElement = document.getElementById('terminal-prompt') as HTMLElement;

    if (!outputElement || !inputElement || !promptElement) {
      throw new Error('Required terminal elements not found');
    }

    this.output = new TerminalOutput(outputElement);
    this.input = new TerminalInput(inputElement, promptElement);

    this.setupInputHandler();
    this.setupClickHandler(outputElement);
    this.setupSettingsUIHandler();
    this.updatePrompt();
  }

  private setupClickHandler(outputElement: HTMLElement): void {
    // Click anywhere in terminal output to focus input
    outputElement.addEventListener('click', () => {
      this.input.focus();
    });
  }

  private setupSettingsUIHandler(): void {
    // Listen for settings commands from UI
    document.addEventListener('terminal-command', (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      this.executeCommand(customEvent.detail, false);
    });
  }

  private setupInputHandler(): void {
    this.input.onSubmit(async (value) => {
      const trimmedValue = value.trim();

      // Echo command
      this.output.writeCommand(this.getPromptString(), trimmedValue);

      // Add to history
      this.input.addToHistory(trimmedValue);

      // Execute command via executor
      if (trimmedValue) {
        const result = await this.executor.execute(trimmedValue);
        this.displayResult(result);
      }

      // Clear input and focus
      this.input.clear();
      this.input.focus();
    });
  }

  /**
   * Display command result to terminal output.
   * Handles special signals, errors, HTML, and plain text output.
   */
  private displayResult(result: CommandResult): void {
    // Handle clear command specially
    if (result.output === COMMAND_SIGNALS.CLEAR_SCREEN) {
      this.output.clear();
    } else if (result.output && !result.raw) {
      // Skip display if raw flag is set (piping context)
      if (result.error) {
        this.output.writeError(result.output);
      } else if (result.html) {
        // Render HTML content
        this.output.writeHTML(result.output);
      } else {
        // Regular text output
        this.output.write(result.output);
      }
    }
  }

  private getPromptString(): string {
    return `${this.username}@${this.hostname}:${this.currentPath}$`;
  }

  private updatePrompt(): void {
    this.input.setPrompt(this.getPromptString());
  }

  registerCommand(command: Command): void {
    this.dispatcher.registerCommand(command);
    this.input.setAvailableCommands(this.dispatcher.getCommandNames());
  }

  registerCommands(commands: Command[]): void {
    commands.forEach(cmd => this.registerCommand(cmd));
  }

  writeWelcome(message: string): void {
    this.output.write(message);
  }

  setUsername(username: string): void {
    this.username = username;
    this.updatePrompt();
  }

  getUsername(): string {
    return this.username;
  }

  setCurrentPath(path: string): void {
    this.currentPath = path;
    this.updatePrompt();
  }

  focus(): void {
    this.input.focus();
  }

  getInput(): TerminalInput {
    return this.input;
  }

  /**
   * Execute a command programmatically (e.g., from navigation clicks).
   * Supports pipelines, aliases, and all command features via CommandExecutor.
   *
   * @param command - The command string to execute
   * @param clearFirst - Whether to clear the terminal before execution
   */
  async executeCommand(command: string, clearFirst: boolean = false): Promise<void> {
    // Clear terminal first if requested (e.g., from navigation clicks)
    if (clearFirst) {
      this.output.clear();
    }

    // Echo command
    this.output.writeCommand(this.getPromptString(), command);

    // Add to history
    this.input.addToHistory(command);

    // Execute command via executor
    if (command.trim()) {
      const result = await this.executor.execute(command);
      this.displayResult(result);
    }

    // Ensure input is focused after command execution
    this.input.focus();
  }
}
