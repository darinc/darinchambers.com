import type { IFileSystem } from '../utils/fs/IFileSystem';

export class TerminalInput {
  private inputElement: HTMLInputElement;
  private promptElement: HTMLElement;
  private history: string[] = [];
  private historyIndex = -1;
  private currentInput = '';
  private availableCommands: string[] = [];
  private fileSystem?: IFileSystem;

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
    const input = this.inputElement.value;
    if (!input) return;

    // Parse input to detect if we're completing a file path
    const parts = input.split(/\s+/);

    // If we only have one part, complete commands
    if (parts.length === 1) {
      this.completeCommand(input.trim());
    } else {
      // Complete file path for the last argument
      this.completeFilePath(parts);
    }
  }

  private completeCommand(input: string): void {
    const matches = this.availableCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));

    if (matches.length === 1) {
      this.inputElement.value = matches[0];
    } else if (matches.length > 1) {
      const commonPrefix = this.findCommonPrefix(matches);
      if (commonPrefix.length > input.length) {
        this.inputElement.value = commonPrefix;
      }
    }
  }

  private completeFilePath(parts: string[]): void {
    if (!this.fileSystem) return;

    const lastPart = parts[parts.length - 1];
    const beforeLastPart = parts.slice(0, -1).join(' ');

    // Determine the directory to search and the prefix to match
    let searchDir = this.fileSystem.getCurrentPath();
    let prefix = lastPart;

    // If the path contains a slash, split into directory and prefix
    const lastSlash = lastPart.lastIndexOf('/');
    if (lastSlash !== -1) {
      const dirPart = lastPart.substring(0, lastSlash + 1);
      prefix = lastPart.substring(lastSlash + 1);

      // Resolve the directory path
      if (dirPart.startsWith('/')) {
        searchDir = dirPart;
      } else {
        // Relative path - combine with current directory
        searchDir = this.resolvePath(this.fileSystem.getCurrentPath(), dirPart);
      }
    }

    // Get all files/directories in the search directory
    try {
      if (!this.fileSystem.exists(searchDir) || !this.fileSystem.isDirectory(searchDir)) {
        return;
      }

      const entries = this.fileSystem.list(searchDir);
      const matches = entries.filter((entry) =>
        entry.toLowerCase().startsWith(prefix.toLowerCase())
      );

      if (matches.length === 0) return;

      // Get the common prefix
      const commonPrefix = this.findCommonPrefix(matches);

      // Build the completed path
      let completedPath: string;
      if (lastSlash !== -1) {
        const dirPart = lastPart.substring(0, lastSlash + 1);
        completedPath = dirPart + commonPrefix;
      } else {
        completedPath = commonPrefix;
      }

      // If there's exactly one match and it's a directory, add a trailing slash
      if (matches.length === 1) {
        const fullPath = this.resolvePath(searchDir, matches[0]);
        if (this.fileSystem.isDirectory(fullPath)) {
          completedPath += '/';
        }
      }

      // Update the input
      this.inputElement.value = beforeLastPart + (beforeLastPart ? ' ' : '') + completedPath;
    } catch {
      // Silently fail if directory doesn't exist or can't be read
      return;
    }
  }

  private resolvePath(base: string, relative: string): string {
    // Simple path resolution - handle . and ..
    if (relative.startsWith('/')) {
      return relative;
    }

    const parts = base.split('/').filter((p) => p);
    const relativeParts = relative.split('/').filter((p) => p);

    for (const part of relativeParts) {
      if (part === '..') {
        parts.pop();
      } else if (part !== '.') {
        parts.push(part);
      }
    }

    return '/' + parts.join('/');
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
    this.inputElement.focus({ preventScroll: true });
  }

  setPrompt(prompt: string): void {
    this.promptElement.textContent = prompt;
  }

  setAvailableCommands(commands: string[]): void {
    this.availableCommands = commands;
  }

  setFileSystem(fileSystem: IFileSystem): void {
    this.fileSystem = fileSystem;
  }

  getHistory(): string[] {
    return [...this.history];
  }

  onSubmit(callback: (value: string) => void | Promise<void>): void {
    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = this.getValue();
        void callback(value);
      }
    });
  }
}
