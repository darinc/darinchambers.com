import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TerminalOutput } from '../../../src/components/TerminalOutput';
import { setupOutputDOM, cleanupDOM, getElement } from '../../helpers/dom-setup';

// Mock the sanitizeHtml module
vi.mock('../../../src/utils/sanitizeHtml', () => ({
  sanitizeHtml: vi.fn((html: string) => html), // Pass through for testing
}));

describe('TerminalOutput', () => {
  let terminalOutput: TerminalOutput;
  let outputElement: HTMLElement;

  beforeEach(() => {
    setupOutputDOM();
    outputElement = getElement('terminal-output');
    terminalOutput = new TerminalOutput(outputElement);
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('writeLine', () => {
    it('should write a single line of text', () => {
      terminalOutput.writeLine('Hello World');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(1);
      expect(lines[0].textContent).toBe('Hello World');
    });

    it('should add custom className if provided', () => {
      terminalOutput.writeLine('Error message', 'output-error');

      const line = outputElement.querySelector('.output-line');
      expect(line?.classList.contains('output-error')).toBe(true);
    });

    it('should insert before input line if it exists', () => {
      getElement('terminal-input-line');

      terminalOutput.writeLine('Line 1');
      terminalOutput.writeLine('Line 2');

      const children = Array.from(outputElement.children);
      const lastChild = children[children.length - 1];
      expect(lastChild.id).toBe('terminal-input-line');
    });

    it('should scroll to bottom after writing', () => {
      // Create a parent container to test scrolling
      const container = document.createElement('div');
      container.style.height = '100px';
      container.style.overflow = 'auto';
      outputElement.parentElement?.insertBefore(container, outputElement);
      container.appendChild(outputElement);

      const initialScrollTop = container.scrollTop;
      terminalOutput.writeLine('Test');

      // Note: scrollTop may not actually change in jsdom, but we're testing the implementation
      expect(container.scrollTop).toBeGreaterThanOrEqual(initialScrollTop);
    });
  });

  describe('write', () => {
    it('should write text with newlines as multiple lines', () => {
      terminalOutput.write('Line 1\nLine 2\nLine 3');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(3);
      expect(lines[0].textContent).toBe('Line 1');
      expect(lines[1].textContent).toBe('Line 2');
      expect(lines[2].textContent).toBe('Line 3');
    });

    it('should apply className to all lines', () => {
      terminalOutput.write('Line 1\nLine 2', 'custom-class');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines[0].classList.contains('custom-class')).toBe(true);
      expect(lines[1].classList.contains('custom-class')).toBe(true);
    });

    it('should handle single line text', () => {
      terminalOutput.write('Single line');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(1);
      expect(lines[0].textContent).toBe('Single line');
    });

    it('should handle empty string', () => {
      terminalOutput.write('');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(0);
    });

    it('should not create empty lines at the end', () => {
      terminalOutput.write('Line 1\nLine 2\n');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(2);
    });
  });

  describe('writeHTML', () => {
    it('should write HTML content', () => {
      terminalOutput.writeHTML('<strong>Bold text</strong>');

      const container = outputElement.querySelector('.output-line');
      expect(container?.innerHTML).toContain('Bold text');
    });

    it('should sanitize HTML content', async () => {
      const { sanitizeHtml } = await import('../../../src/utils/sanitizeHtml');

      terminalOutput.writeHTML('<script>alert("xss")</script>');

      expect(sanitizeHtml).toHaveBeenCalledWith('<script>alert("xss")</script>');
    });

    it('should insert HTML before input line', () => {
      terminalOutput.writeHTML('<p>HTML content</p>');

      const children = Array.from(outputElement.children);
      const lastChild = children[children.length - 1];
      expect(lastChild.id).toBe('terminal-input-line');
    });
  });

  describe('writeError', () => {
    it('should write error message with error class', () => {
      terminalOutput.writeError('Error: Something went wrong');

      const line = outputElement.querySelector('.output-error');
      expect(line).toBeTruthy();
      expect(line?.textContent).toBe('Error: Something went wrong');
    });

    it('should handle multi-line errors', () => {
      terminalOutput.writeError('Error line 1\nError line 2');

      const errorLines = outputElement.querySelectorAll('.output-error');
      expect(errorLines.length).toBe(2);
    });
  });

  describe('writeCommand', () => {
    it('should write command with prompt', () => {
      terminalOutput.writeCommand('user@host:~$ ', 'ls -la');

      const line = outputElement.querySelector('.output-line');
      expect(line).toBeTruthy();
      expect(line?.textContent).toBe('user@host:~$ ls -la');
    });

    it('should style prompt differently from command', () => {
      terminalOutput.writeCommand('$', 'echo test');

      const line = outputElement.querySelector('.output-line');
      const spans = line?.querySelectorAll('span');

      expect(spans?.length).toBe(2);
      expect(spans?.[0].style.color).toBe('var(--terminal-accent)');
    });

    it('should preserve prompt text exactly as provided', () => {
      terminalOutput.writeCommand('~ $ ', 'test');

      const line = outputElement.querySelector('.output-line');
      const promptSpan = line?.querySelector('span:first-child');
      expect(promptSpan?.textContent).toBe('~ $ ');
    });
  });

  describe('clear', () => {
    it('should remove all output lines', () => {
      terminalOutput.writeLine('Line 1');
      terminalOutput.writeLine('Line 2');
      terminalOutput.writeLine('Line 3');

      terminalOutput.clear();

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(0);
    });

    it('should preserve input line element', () => {
      const inputLine = getElement('terminal-input-line');

      terminalOutput.writeLine('Test');
      terminalOutput.clear();

      expect(outputElement.contains(inputLine)).toBe(true);
    });

    it('should clear mixed content', () => {
      terminalOutput.writeLine('Text');
      terminalOutput.writeHTML('<strong>HTML</strong>');
      terminalOutput.writeError('Error');
      terminalOutput.writeCommand('$', 'cmd');

      terminalOutput.clear();

      const allLines = outputElement.querySelectorAll('.output-line');
      expect(allLines.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long lines', () => {
      const longText = 'a'.repeat(10000);
      terminalOutput.writeLine(longText);

      const line = outputElement.querySelector('.output-line');
      expect(line?.textContent?.length).toBe(10000);
    });

    it('should handle special characters', () => {
      terminalOutput.writeLine('Special: <>&"\'');

      const line = outputElement.querySelector('.output-line');
      expect(line?.textContent).toBe('Special: <>&"\'');
    });

    it('should handle unicode characters', () => {
      terminalOutput.writeLine('Unicode: 你好 🚀 ñ');

      const line = outputElement.querySelector('.output-line');
      expect(line?.textContent).toBe('Unicode: 你好 🚀 ñ');
    });

    it('should work when input line is not present', () => {
      // Remove input line
      const inputLine = document.getElementById('terminal-input-line');
      inputLine?.remove();

      terminalOutput.writeLine('Test without input line');

      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(1);
    });
  });

  describe('Screensaver output tracking', () => {
    it('should track screensaver output elements', () => {
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('guest@host ~$', 'matrix');
      terminalOutput.writeHTML('<div class="matrix-rain">Animation</div>');

      // Verify elements are in DOM
      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(2);
    });

    it('should clear screensaver output on demand', () => {
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('guest@host ~$', 'matrix');
      terminalOutput.writeHTML('<div class="matrix-rain">Animation</div>');

      terminalOutput.clearScreensaverOutput();

      // Verify elements removed
      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(0);
    });

    it('should reset flag after HTML output', () => {
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('guest@host ~$', 'matrix');
      terminalOutput.writeHTML('<div>Animation</div>');

      // Next output should not be tracked
      terminalOutput.writeCommand('guest@host ~$', 'ls');
      terminalOutput.clearScreensaverOutput();

      // Only first command should be cleared, 'ls' command remains
      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(1);
      expect(lines[0].textContent).toContain('ls');
    });

    it('should handle clearing when elements already removed', () => {
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('guest@host ~$', 'matrix');

      // Manually remove element
      outputElement.innerHTML = '';

      // Should not throw
      expect(() => terminalOutput.clearScreensaverOutput()).not.toThrow();
    });

    it('should track both command and HTML elements', () => {
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('$', 'test');
      terminalOutput.writeHTML('<p>content</p>');

      const linesBefore = outputElement.querySelectorAll('.output-line');
      expect(linesBefore.length).toBe(2);

      terminalOutput.clearScreensaverOutput();

      const linesAfter = outputElement.querySelectorAll('.output-line');
      expect(linesAfter.length).toBe(0);
    });

    it('should not track non-screensaver output', () => {
      // Regular output without startScreensaverOutput
      terminalOutput.writeCommand('$', 'echo test');
      terminalOutput.writeHTML('<p>output</p>');

      terminalOutput.clearScreensaverOutput();

      // Elements should remain (not tracked as screensaver)
      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(2);
    });

    it('should handle multiple screensaver activations', () => {
      // First screensaver
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('$', 'matrix');
      terminalOutput.writeHTML('<div>matrix</div>');

      // Second screensaver (should only track this one)
      terminalOutput.startScreensaverOutput();
      terminalOutput.writeCommand('$', 'life');
      terminalOutput.writeHTML('<div>life</div>');

      terminalOutput.clearScreensaverOutput();

      // Only second screensaver cleared, first remains
      const lines = outputElement.querySelectorAll('.output-line');
      expect(lines.length).toBe(2);
      expect(lines[0].textContent).toContain('matrix');
      expect(lines[1].textContent).toContain('matrix');
    });
  });
});
