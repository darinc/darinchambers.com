import { sanitizeHtml } from '../utils/sanitizeHtml';

export class TerminalOutput {
  private outputElement: HTMLElement;
  private inputLineElement: HTMLElement | null;

  constructor(outputElement: HTMLElement) {
    this.outputElement = outputElement;
    this.inputLineElement = document.getElementById('terminal-input-line');
  }

  writeLine(text: string, className?: string): void {
    const line = document.createElement('div');
    line.className = 'output-line' + (className ? ` ${className}` : '');
    line.textContent = text;

    // Insert before the input line if it exists, otherwise append
    if (this.inputLineElement && this.inputLineElement.parentElement === this.outputElement) {
      this.outputElement.insertBefore(line, this.inputLineElement);
    } else {
      this.outputElement.appendChild(line);
    }

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

  writeHTML(html: string): void {
    const container = document.createElement('div');
    container.className = 'output-line';
    // Sanitize HTML to prevent XSS attacks
    container.innerHTML = sanitizeHtml(html);

    // Insert before the input line if it exists, otherwise append
    if (this.inputLineElement && this.inputLineElement.parentElement === this.outputElement) {
      this.outputElement.insertBefore(container, this.inputLineElement);
    } else {
      this.outputElement.appendChild(container);
    }

    this.scrollToBottom();
  }

  writeError(text: string, associatedElementId?: string): void {
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      if (index < lines.length - 1 || line) {
        const errorLine = document.createElement('div');
        errorLine.className = 'output-line output-error';
        errorLine.textContent = line;

        // Add unique ID and role="alert" for immediate announcement
        const errorId = `error-${Date.now()}-${index}`;
        errorLine.id = errorId;
        errorLine.setAttribute('role', 'alert');

        // If there's an associated element, link it with aria-describedby
        if (associatedElementId && index === 0) {
          const associatedElement = document.getElementById(associatedElementId);
          if (associatedElement) {
            const existingDescribedBy = associatedElement.getAttribute('aria-describedby');
            if (existingDescribedBy) {
              associatedElement.setAttribute('aria-describedby', `${existingDescribedBy} ${errorId}`);
            } else {
              associatedElement.setAttribute('aria-describedby', errorId);
            }
          }
        }

        // Insert before the input line if it exists, otherwise append
        if (this.inputLineElement && this.inputLineElement.parentElement === this.outputElement) {
          this.outputElement.insertBefore(errorLine, this.inputLineElement);
        } else {
          this.outputElement.appendChild(errorLine);
        }
      }
    });

    this.scrollToBottom();
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

    // Insert before the input line if it exists, otherwise append
    if (this.inputLineElement && this.inputLineElement.parentElement === this.outputElement) {
      this.outputElement.insertBefore(line, this.inputLineElement);
    } else {
      this.outputElement.appendChild(line);
    }

    this.scrollToBottom();
  }

  clear(): void {
    // Clear all content except the input line
    const children = Array.from(this.outputElement.children);
    children.forEach(child => {
      if (child.id !== 'terminal-input-line') {
        child.remove();
      }
    });
  }

  private scrollToBottom(): void {
    const container = this.outputElement.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
