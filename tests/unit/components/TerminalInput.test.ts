import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TerminalInput } from '../../../src/components/TerminalInput';
import { setupInputDOM, cleanupDOM, getElement, setupGlobalMocks } from '../../helpers/dom-setup';

describe('TerminalInput', () => {
  let terminalInput: TerminalInput;
  let inputElement: HTMLInputElement;
  let promptElement: HTMLElement;

  beforeEach(() => {
    setupGlobalMocks();
    setupInputDOM();
    inputElement = getElement<HTMLInputElement>('terminal-input');
    promptElement = getElement('terminal-prompt');
    terminalInput = new TerminalInput(inputElement, promptElement);
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('Basic Operations', () => {
    it('should get input value', () => {
      inputElement.value = 'test command';
      expect(terminalInput.getValue()).toBe('test command');
    });

    it('should clear input', () => {
      inputElement.value = 'test';
      terminalInput.clear();
      expect(inputElement.value).toBe('');
    });

    it('should focus input element', () => {
      const focusSpy = vi.spyOn(inputElement, 'focus');
      terminalInput.focus();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should set prompt text', () => {
      terminalInput.setPrompt('user@host:~$');
      expect(promptElement.textContent).toBe('user@host:~$');
    });
  });

  describe('History Management', () => {
    beforeEach(() => {
      terminalInput.setAvailableCommands(['ls', 'cd', 'pwd']);
    });

    it('should add command to history', () => {
      terminalInput.addToHistory('ls -la');
      expect(terminalInput.getHistory()).toContain('ls -la');
    });

    it('should not add empty commands to history', () => {
      terminalInput.addToHistory('');
      terminalInput.addToHistory('   ');

      expect(terminalInput.getHistory().length).toBe(0);
    });

    it('should navigate up through history', () => {
      terminalInput.addToHistory('command1');
      terminalInput.addToHistory('command2');
      terminalInput.addToHistory('command3');

      // Simulate ArrowUp
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      inputElement.dispatchEvent(event);

      expect(inputElement.value).toBe('command3');
    });

    it('should navigate up multiple times', () => {
      terminalInput.addToHistory('command1');
      terminalInput.addToHistory('command2');
      terminalInput.addToHistory('command3');

      // ArrowUp twice
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(inputElement.value).toBe('command2');
    });

    it('should navigate down through history', () => {
      terminalInput.addToHistory('command1');
      terminalInput.addToHistory('command2');

      // Go up twice
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      // Go down once
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(inputElement.value).toBe('command2');
    });

    it('should restore current input when navigating back down', () => {
      terminalInput.addToHistory('oldCommand');

      inputElement.value = 'current typing';

      // Go up
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(inputElement.value).toBe('oldCommand');

      // Go back down
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(inputElement.value).toBe('current typing');
    });

    it('should do nothing when navigating up with empty history', () => {
      inputElement.value = 'test';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(inputElement.value).toBe('test');
    });

    it('should stop at oldest history entry', () => {
      terminalInput.addToHistory('command1');

      // Try to go up twice (only one command in history)
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(inputElement.value).toBe('command1');
    });

    it('should reset history index after adding new command', () => {
      terminalInput.addToHistory('command1');

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      terminalInput.addToHistory('command2');

      // Should start from the end again
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(inputElement.value).toBe('command2');
    });

    it('should return a copy of history array', () => {
      terminalInput.addToHistory('command1');

      const history = terminalInput.getHistory();
      history.push('modified');

      expect(terminalInput.getHistory().length).toBe(1);
    });
  });

  describe('Tab Completion', () => {
    beforeEach(() => {
      terminalInput.setAvailableCommands(['ls', 'list', 'cd', 'cat', 'clear']);
    });

    it('should complete when single match exists', () => {
      inputElement.value = 'cd';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('cd');
    });

    it('should complete partial command with single match', () => {
      inputElement.value = 'cle';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('clear');
    });

    it('should find common prefix with multiple matches', () => {
      inputElement.value = 'l';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      // Common prefix of 'ls' and 'list' is 'l', no extension
      expect(inputElement.value).toBe('l');
    });

    it('should not change input when no common prefix extension', () => {
      inputElement.value = 'c';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('c'); // 'c' is common to cat, cd, clear
    });

    it('should do nothing on empty input', () => {
      inputElement.value = '';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('');
    });

    it('should do nothing when no matches', () => {
      inputElement.value = 'xyz';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('xyz');
    });

    it('should handle commands case-insensitively', () => {
      inputElement.value = 'L';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      // Should find matches for 'ls' and 'list', but no common prefix extension
      expect(inputElement.value).toBe('L');
    });

    it('should update available commands', () => {
      terminalInput.setAvailableCommands(['newcmd']);

      inputElement.value = 'new';
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('newcmd');
    });
  });

  describe('Enter Key Submission', () => {
    it('should call callback on Enter key', () => {
      const callback = vi.fn();
      terminalInput.onSubmit(callback);

      inputElement.value = 'test command';
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).toHaveBeenCalledWith('test command');
    });

    it('should call callback with empty value', () => {
      const callback = vi.fn();
      terminalInput.onSubmit(callback);

      inputElement.value = '';
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).toHaveBeenCalledWith('');
    });

    it('should not call callback on other keys', () => {
      const callback = vi.fn();
      terminalInput.onSubmit(callback);

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Event Prevention', () => {
    it('should prevent default on ArrowUp', () => {
      terminalInput.addToHistory('test');

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      inputElement.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default on ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      inputElement.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default on Tab', () => {
      terminalInput.setAvailableCommands(['test']);

      const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      inputElement.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long history', () => {
      for (let i = 0; i < 1000; i++) {
        terminalInput.addToHistory(`command${i}`);
      }

      expect(terminalInput.getHistory().length).toBe(1000);
    });

    it('should handle very long commands', () => {
      const longCommand = 'a'.repeat(10000);
      terminalInput.addToHistory(longCommand);

      expect(terminalInput.getHistory()[0]).toBe(longCommand);
    });

    it('should clear current input when clearing', () => {
      inputElement.value = 'test';
      terminalInput.addToHistory('old');

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      terminalInput.clear();

      expect(inputElement.value).toBe('');
    });

    it('should handle special characters in commands', () => {
      terminalInput.addToHistory('echo "hello world" && ls');

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(inputElement.value).toBe('echo "hello world" && ls');
    });

    it('should handle whitespace-only input for tab completion', () => {
      terminalInput.setAvailableCommands(['test']);
      inputElement.value = '   ';

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(inputElement.value).toBe('   ');
    });
  });
});
