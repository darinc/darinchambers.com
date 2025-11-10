import { sanitizeHtml } from '../utils/sanitizeHtml';

export class TerminalOutput {
  private outputElement: HTMLElement;
  private inputLineElement: HTMLElement | null;

  constructor(outputElement: HTMLElement) {
    this.outputElement = outputElement;
    this.inputLineElement = document.getElementById('terminal-input-line');
  }

  writeLine(text: string, className?: string, onComplete?: () => void): void {
    const line = document.createElement('div');
    line.className = 'output-line' + (className ? ` ${className}` : '');
    line.textContent = text;

    // Insert before the input line if it exists, otherwise append
    if (this.inputLineElement && this.inputLineElement.parentElement === this.outputElement) {
      this.outputElement.insertBefore(line, this.inputLineElement);
    } else {
      this.outputElement.appendChild(line);
    }

    // Call callback synchronously after DOM insertion
    if (onComplete) {
      onComplete();
    }
  }

  write(text: string, className?: string, onComplete?: () => void): void {
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      if (index < lines.length - 1 || line) {
        this.writeLine(line, className);
      }
    });

    // Call callback synchronously after DOM insertion
    if (onComplete) {
      onComplete();
    }
  }

  writeHTML(html: string, onComplete?: () => void): void {
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

    // Call callback synchronously after DOM insertion
    if (onComplete) {
      onComplete();
    }
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
              associatedElement.setAttribute(
                'aria-describedby',
                `${existingDescribedBy} ${errorId}`
              );
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

    // Errors should always be visible at bottom
    this.scrollToBottom();
  }

  writeCommand(prompt: string, command: string, onComplete?: () => void): void {
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

    // Call callback synchronously after DOM insertion
    if (onComplete) {
      onComplete();
    }
  }

  clear(): void {
    // Clear all content except the input line
    const children = Array.from(this.outputElement.children);
    children.forEach((child) => {
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

  /**
   * Scrolls to the last command line instead of the bottom.
   * Creates a "normal page" experience where user scrolls down to read content.
   * Uses browser-native scrollIntoView for reliable positioning.
   */
  private scrollToCommand(): void {
    const commandLines = this.outputElement.querySelectorAll('.output-line');
    // Need at least 2 elements: command (length-2) and output (length-1)
    // Note: input line is NOT included in .output-line query results
    if (commandLines.length >= 2) {
      // Get second-to-last element (the command that triggered the output)
      // Structure: [...older content, command, output]
      const lastCommand = commandLines[commandLines.length - 2] as HTMLElement;

      // Use browser-native scrollIntoView - more reliable than manual calculations
      lastCommand.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      // Fallback to bottom if we can't find the command
      this.scrollToBottom();
    }
  }

  /**
   * Public method to perform scroll behavior.
   * Uses double requestAnimationFrame to ensure HTML content is fully laid out.
   *
   * @param explicitBehavior Scroll behavior ('top' scrolls to command, 'bottom' or undefined scrolls to bottom)
   */
  performScrollBehavior(explicitBehavior?: 'top' | 'bottom'): void {
    // Use double RAF to ensure content is fully laid out before scrolling
    // First RAF: browser schedules a paint
    // Second RAF: paint has completed, layout is stable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (explicitBehavior === 'top') {
          this.scrollToCommand();
        } else {
          // Default to bottom for classic terminal behavior
          this.scrollToBottom();
        }
      });
    });
  }
}
