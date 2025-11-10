import { sanitizeHtml } from '../utils/sanitizeHtml';
import type { SettingsManager } from '../utils/SettingsManager';

export class TerminalOutput {
  private outputElement: HTMLElement;
  private inputLineElement: HTMLElement | null;
  private settingsManager: SettingsManager | null = null;

  constructor(outputElement: HTMLElement) {
    this.outputElement = outputElement;
    this.inputLineElement = document.getElementById('terminal-input-line');
  }

  /**
   * Sets the settings manager for accessing auto-scroll behavior setting.
   */
  setSettingsManager(manager: SettingsManager): void {
    this.settingsManager = manager;
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

  writeHTML(html: string, scrollBehavior?: 'top' | 'bottom'): void {
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

    this.performScroll(html, scrollBehavior);
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
   */
  private scrollToCommand(): void {
    const commandLines = this.outputElement.querySelectorAll('.output-line');
    if (commandLines.length >= 2) {
      // Get second-to-last element (last is the input line)
      const lastCommand = commandLines[commandLines.length - 2];
      lastCommand.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      // Fallback to bottom if we can't find the command
      this.scrollToBottom();
    }
  }

  /**
   * Determines and performs the appropriate scroll behavior.
   *
   * @param output The output content (for line counting)
   * @param explicitBehavior Optional explicit scroll behavior from command
   */
  private performScroll(output: string, explicitBehavior?: 'top' | 'bottom'): void {
    // If explicit behavior is provided, use it
    if (explicitBehavior === 'top') {
      this.scrollToCommand();
      return;
    }
    if (explicitBehavior === 'bottom') {
      this.scrollToBottom();
      return;
    }

    // Check auto-scroll feature flag
    const autoScrollEnabled = this.settingsManager?.getAutoScrollBehavior() ?? true;

    if (!autoScrollEnabled) {
      // Feature disabled, use classic behavior
      this.scrollToBottom();
      return;
    }

    // Auto-detect based on line count
    const lineCount = output.split('\n').length;
    if (lineCount > 50) {
      this.scrollToCommand();
    } else {
      this.scrollToBottom();
    }
  }
}
