export class TerminalOutput {
  private outputElement: HTMLElement;

  constructor(outputElement: HTMLElement) {
    this.outputElement = outputElement;
  }

  writeLine(text: string, className?: string): void {
    const line = document.createElement('div');
    line.className = 'output-line' + (className ? ` ${className}` : '');
    line.textContent = text;
    this.outputElement.appendChild(line);
    this.scrollToBottom();
  }

  write(text: string, className?: string): void {
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      if (index < lines.length - 1 || line) {
        this.writeLine(line, className);
      }
    });
  }

  writeError(text: string): void {
    this.write(text, 'output-error');
  }

  writeCommand(prompt: string, command: string): void {
    const line = document.createElement('div');
    line.className = 'output-line';

    const promptSpan = document.createElement('span');
    promptSpan.style.color = 'var(--terminal-accent)';
    promptSpan.style.fontWeight = 'bold';
    promptSpan.textContent = prompt + ' ';

    const commandSpan = document.createElement('span');
    commandSpan.textContent = command;

    line.appendChild(promptSpan);
    line.appendChild(commandSpan);
    this.outputElement.appendChild(line);
    this.scrollToBottom();
  }

  clear(): void {
    this.outputElement.innerHTML = '';
  }

  private scrollToBottom(): void {
    const container = this.outputElement.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
