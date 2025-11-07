export class TerminalInput {
  private inputElement: HTMLInputElement;
  private promptElement: HTMLElement;
  private history: string[] = [];
  private historyIndex = -1;
  private currentInput = '';
  private availableCommands: string[] = [];

  constructor(inputElement: HTMLInputElement, promptElement: HTMLElement) {
    this.inputElement = inputElement;
    this.promptElement = promptElement;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.navigateHistory('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.navigateHistory('down');
        break;
      case 'Tab':
        e.preventDefault();
        this.handleTabCompletion();
        break;
    }
  }

  private navigateHistory(direction: 'up' | 'down'): void {
    if (this.history.length === 0) return;

    if (this.historyIndex === -1) {
      this.currentInput = this.inputElement.value;
    }

    if (direction === 'up') {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.history[this.history.length - 1 - this.historyIndex];
      }
    } else {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.history[this.history.length - 1 - this.historyIndex];
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.inputElement.value = this.currentInput;
      }
    }
  }

  private handleTabCompletion(): void {
    const input = this.inputElement.value.trim();
    if (!input) return;

    const matches = this.availableCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));

    if (matches.length === 1) {
      this.inputElement.value = matches[0];
    } else if (matches.length > 1) {
      // Find common prefix
      const commonPrefix = this.findCommonPrefix(matches);
      if (commonPrefix.length > input.length) {
        this.inputElement.value = commonPrefix;
      }
    }
  }

  private findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix)) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  }

  addToHistory(command: string): void {
    if (command.trim()) {
      this.history.push(command);
      this.historyIndex = -1;
      this.currentInput = '';
    }
  }

  getValue(): string {
    return this.inputElement.value;
  }

  clear(): void {
    this.inputElement.value = '';
    this.currentInput = '';
    this.historyIndex = -1;
  }

  focus(): void {
    this.inputElement.focus();
  }

  setPrompt(prompt: string): void {
    this.promptElement.textContent = prompt;
  }

  setAvailableCommands(commands: string[]): void {
    this.availableCommands = commands;
  }

  getHistory(): string[] {
    return [...this.history];
  }

  onSubmit(callback: (value: string) => void): void {
    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = this.getValue();
        callback(value);
      }
    });
  }
}
