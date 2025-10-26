import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { CommandDispatcher } from '../utils/CommandDispatcher';
import type { Command } from '../commands/Command';
import type { AliasManager } from '../utils/AliasManager';

export class Terminal {
  private input: TerminalInput;
  private output: TerminalOutput;
  private dispatcher: CommandDispatcher;
  private aliasManager: AliasManager | null = null;
  private username: string = 'darin';
  private hostname: string = 'darinchambers.com';
  private currentPath: string = '~';

  constructor() {
    const outputElement = document.getElementById('terminal-output');
    const inputElement = document.getElementById('terminal-input') as HTMLInputElement;
    const promptElement = document.getElementById('terminal-prompt') as HTMLElement;

    if (!outputElement || !inputElement || !promptElement) {
      throw new Error('Required terminal elements not found');
    }

    this.output = new TerminalOutput(outputElement);
    this.input = new TerminalInput(inputElement, promptElement);
    this.dispatcher = new CommandDispatcher();

    this.setupInputHandler();
    this.setupClickHandler(outputElement);
    this.updatePrompt();
  }

  private setupClickHandler(outputElement: HTMLElement): void {
    // Click anywhere in terminal output to focus input
    outputElement.addEventListener('click', () => {
      this.input.focus();
    });
  }

  private setupInputHandler(): void {
    this.input.onSubmit(async (value) => {
      const trimmedValue = value.trim();

      // Echo command
      this.output.writeCommand(this.getPromptString(), trimmedValue);

      // Add to history
      this.input.addToHistory(trimmedValue);

      // Execute command
      if (trimmedValue) {
        // Resolve aliases
        const resolvedCommand = this.aliasManager ? this.aliasManager.resolve(trimmedValue) : trimmedValue;
        const result = await this.dispatcher.dispatch(resolvedCommand);

        // Handle clear command specially
        if (result.output === '__CLEAR__') {
          this.output.clear();
        } else if (result.output) {
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

      // Clear input
      this.input.clear();
      this.input.focus();
    });
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

  setAliasManager(aliasManager: AliasManager): void {
    this.aliasManager = aliasManager;
  }

  async executeCommand(command: string): Promise<void> {
    // Echo command
    this.output.writeCommand(this.getPromptString(), command);

    // Add to history
    this.input.addToHistory(command);

    // Execute command
    if (command.trim()) {
      // Resolve aliases
      const resolvedCommand = this.aliasManager ? this.aliasManager.resolve(command) : command;
      const result = await this.dispatcher.dispatch(resolvedCommand);

      // Handle clear command specially
      if (result.output === '__CLEAR__') {
        this.output.clear();
      } else if (result.output) {
        if (result.error) {
          this.output.writeError(result.output);
        } else {
          this.output.write(result.output);
        }
      }
    }

    // Ensure input is focused after command execution
    this.input.focus();
  }
}
