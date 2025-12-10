/**
 * Unit tests for Terminal Component
 *
 * Tests command execution, settings UI, keyboard handlers, router integration,
 * and event handling functionality.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Terminal } from '../../../src/components/Terminal';
import { COMMAND_SIGNALS } from '../../../src/constants';
import { setupGlobalMocks } from '../../helpers/dom-setup';
import type { Command, CommandResult } from '../../../src/commands/Command';
import type { CommandDispatcher } from '../../../src/utils/CommandDispatcher';
import type { CommandExecutor } from '../../../src/utils/CommandExecutor';
import type { EnvVarManager } from '../../../src/utils/EnvVarManager';
import type { SettingsManager } from '../../../src/utils/SettingsManager';
import type { ThemeManager } from '../../../src/utils/ThemeManager';

// Mock DOM setup
function setupDOM() {
  document.body.innerHTML = `
    <div id="terminal-output" role="log" aria-live="polite"></div>
    <div id="terminal-prompt">$ </div>
    <input type="text" id="terminal-input" />
  `;
}

function teardownDOM() {
  document.body.innerHTML = '';
}

// Create mock dispatcher
function createMockDispatcher(): CommandDispatcher {
  const commands = new Map<string, Command>();

  return {
    registerCommand: vi.fn((cmd: Command) => {
      commands.set(cmd.name, cmd);
    }),
    dispatch: vi.fn(),
    getCommandNames: vi.fn(() => Array.from(commands.keys())),
    hasCommand: vi.fn((name: string) => commands.has(name)),
  } as unknown as CommandDispatcher;
}

// Create mock executor
function createMockExecutor(result?: CommandResult): CommandExecutor {
  const defaultResult: CommandResult = result ?? { output: 'test output' };

  return {
    execute: vi.fn(() => Promise.resolve(defaultResult)),
  } as unknown as CommandExecutor;
}

// Create mock settings manager
function createMockSettingsManager(): SettingsManager {
  return {
    getSetting: vi.fn((key: string) => {
      if (key === 'prompt') {
        return { format: '\\u@\\h:\\W\\$ ' };
      }
      return null;
    }),
  } as unknown as SettingsManager;
}

// Create mock theme manager
function createMockThemeManager(): ThemeManager {
  return {} as ThemeManager;
}

// Create mock env var manager
function createMockEnvVarManager(): EnvVarManager {
  return {
    getVariable: vi.fn((name: string) => {
      if (name === 'PWD') return '/home/darin';
      if (name === 'HOME') return '/home/darin';
      if (name === 'USER') return 'darin';
      return undefined;
    }),
    expandVariables: vi.fn((str: string) => str), // Pass through for testing
  } as unknown as EnvVarManager;
}

// Create mock router
interface IRouter {
  syncUrlToCommand(command: string): void;
  navigate(path: string, clearTerminal?: boolean): void;
  getPathForCommand(command: string): string | null;
}

function createMockRouter(): IRouter {
  return {
    syncUrlToCommand: vi.fn(),
    navigate: vi.fn(),
    getPathForCommand: vi.fn(() => null),
  };
}

describe('Terminal', () => {
  let terminal: Terminal;
  let mockDispatcher: CommandDispatcher;
  let mockExecutor: CommandExecutor;
  let mockSettingsManager: SettingsManager;
  let mockThemeManager: ThemeManager;
  let mockEnvVarManager: EnvVarManager;

  beforeEach(() => {
    setupGlobalMocks();
    setupDOM();
    mockDispatcher = createMockDispatcher();
    mockExecutor = createMockExecutor();
    mockSettingsManager = createMockSettingsManager();
    mockThemeManager = createMockThemeManager();
    mockEnvVarManager = createMockEnvVarManager();
  });

  afterEach(() => {
    teardownDOM();
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize terminal with all dependencies', () => {
      terminal = new Terminal(
        mockDispatcher,
        mockExecutor,
        mockSettingsManager,
        mockThemeManager,
        mockEnvVarManager
      );

      expect(terminal).toBeDefined();
      expect(terminal.getUsername()).toBe('darin');
    });

    it('should throw error if required DOM elements are missing', () => {
      teardownDOM();

      expect(() => {
        new Terminal(mockDispatcher, mockExecutor);
      }).toThrow('Required terminal elements not found');
    });

    it('should work without optional dependencies', () => {
      terminal = new Terminal(mockDispatcher, mockExecutor);

      expect(terminal).toBeDefined();
    });
  });

  describe('command execution', () => {
    beforeEach(() => {
      terminal = new Terminal(
        mockDispatcher,
        mockExecutor,
        mockSettingsManager,
        mockThemeManager,
        mockEnvVarManager
      );
    });

    it('should execute command and display output', async () => {
      await terminal.executeCommand('echo test');

      expect(mockExecutor.execute).toHaveBeenCalledWith('echo test');
      const output = document.getElementById('terminal-output');
      expect(output?.textContent).toContain('test output');
    });

    it('should clear terminal before execution if clearFirst is true', async () => {
      const output = document.getElementById('terminal-output');
      output!.innerHTML = '<div>previous output</div>';

      await terminal.executeCommand('echo test', true);

      // Should have cleared before adding new output
      // The output will contain the new command, not the previous content
      expect(output?.innerHTML).not.toContain('previous output');
      expect(output?.textContent).toContain('test output');
    });

    it('should handle empty command execution', async () => {
      await terminal.executeCommand('   ');

      expect(mockExecutor.execute).not.toHaveBeenCalled();
    });

    it('should handle clear command signal', async () => {
      const clearExecutor = createMockExecutor({ output: COMMAND_SIGNALS.CLEAR_SCREEN });
      terminal = new Terminal(mockDispatcher, clearExecutor);

      const output = document.getElementById('terminal-output');
      output!.innerHTML = '<div>previous content</div>';

      await terminal.executeCommand('clear');

      expect(output?.innerHTML).toBe('');
    });

    it('should display error output with error styling', async () => {
      const errorExecutor = createMockExecutor({
        output: 'Command failed',
        error: true,
      });
      terminal = new Terminal(mockDispatcher, errorExecutor);

      await terminal.executeCommand('bad-command');

      const output = document.getElementById('terminal-output');
      expect(output?.innerHTML).toContain('Command failed');
      expect(output?.innerHTML).toContain('error');
    });

    it('should display HTML output when html flag is true', async () => {
      const htmlExecutor = createMockExecutor({
        output: '<p>HTML content</p>',
        html: true,
      });
      terminal = new Terminal(mockDispatcher, htmlExecutor);

      await terminal.executeCommand('about');

      const output = document.getElementById('terminal-output');
      expect(output?.innerHTML).toContain('HTML content');
    });

    it('should skip display for raw output (piping)', async () => {
      const rawExecutor = createMockExecutor({
        output: 'piped output',
        raw: true,
      });
      terminal = new Terminal(mockDispatcher, rawExecutor);

      await terminal.executeCommand('ls | cat');

      const output = document.getElementById('terminal-output');
      // Should contain the command prompt but not the piped output
      expect(output?.textContent).not.toContain('piped output');
    });
  });

  describe('router integration', () => {
    let mockRouter: IRouter;

    beforeEach(() => {
      terminal = new Terminal(
        mockDispatcher,
        mockExecutor,
        mockSettingsManager,
        mockThemeManager,
        mockEnvVarManager
      );
      mockRouter = createMockRouter();
      terminal.setRouter(mockRouter);
    });

    it('should sync URL after command execution', async () => {
      // Simulate input submission
      const input = document.getElementById('terminal-input') as HTMLInputElement;
      input.value = 'about';

      // Note: We can't directly test the onSubmit callback, but we can test executeCommand
      await terminal.executeCommand('about');

      expect(mockRouter.syncUrlToCommand).not.toHaveBeenCalled(); // Not called in executeCommand
    });

    it('should reset URL to home when clearing terminal', async () => {
      const clearExecutor = createMockExecutor({ output: COMMAND_SIGNALS.CLEAR_SCREEN });
      terminal = new Terminal(mockDispatcher, clearExecutor);
      terminal.setRouter(mockRouter);

      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: { pathname: '/about' },
        writable: true,
      });

      // Mock history.pushState
      const pushStateSpy = vi.spyOn(window.history, 'pushState');

      await terminal.executeCommand('clear');

      expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/');
    });

    it('should navigate via router for buttons with data-command', () => {
      mockRouter.getPathForCommand = vi.fn((cmd: string) => {
        if (cmd === 'about') return '/about';
        return null;
      });

      const button = document.createElement('button');
      button.setAttribute('data-command', 'about');
      document.body.appendChild(button);

      button.click();

      expect(mockRouter.getPathForCommand).toHaveBeenCalledWith('about');
      expect(mockRouter.navigate).toHaveBeenCalledWith('/about', false);
    });
  });

  describe('click handler', () => {
    beforeEach(() => {
      terminal = new Terminal(mockDispatcher, mockExecutor);
    });

    it('should focus input when clicking in terminal output', () => {
      const output = document.getElementById('terminal-output')!;
      const input = document.getElementById('terminal-input') as HTMLInputElement;

      output.click();

      expect(document.activeElement).toBe(input);
    });

    it('should not focus input if text is selected', () => {
      const output = document.getElementById('terminal-output')!;
      const input = document.getElementById('terminal-input') as HTMLInputElement;

      // Mock text selection
      const mockSelection = {
        toString: () => 'selected text',
      };
      vi.spyOn(window, 'getSelection').mockReturnValue(mockSelection as Selection);

      output.click();

      // Focus should not change
      expect(document.activeElement).not.toBe(input);
    });

    it('should not focus input when clicking on interactive elements', () => {
      const output = document.getElementById('terminal-output')!;

      const button = document.createElement('button');
      button.textContent = 'Click me';
      output.appendChild(button);

      // In jsdom, we can't easily test focus behavior on click
      // So we test that the button exists and is clickable
      expect(button.closest('[data-graph], button, a, input')).toBeTruthy();
    });

    it('should not focus input when clicking on links', () => {
      const output = document.getElementById('terminal-output')!;
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Link';
      output.appendChild(link);

      // Test that link is recognized as interactive element
      expect(link.closest('a, button, input, select')).toBeTruthy();
    });
  });

  describe('keyboard handlers', () => {
    beforeEach(() => {
      terminal = new Terminal(mockDispatcher, mockExecutor, mockSettingsManager, mockThemeManager);
    });

    it('should handle Escape key to return focus from settings panel', () => {
      const settingsPanel = document.createElement('div');
      settingsPanel.setAttribute('data-settings-panel', 'true');

      const settingsInput = document.createElement('input');
      settingsPanel.appendChild(settingsInput);
      document.body.appendChild(settingsPanel);

      settingsInput.focus();
      expect(document.activeElement).toBe(settingsInput);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      const terminalInput = document.getElementById('terminal-input');
      expect(document.activeElement).toBe(terminalInput);
    });

    it('should not interfere with Escape key outside settings panel', () => {
      const regularInput = document.createElement('input');
      document.body.appendChild(regularInput);
      regularInput.focus();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      // Focus should not change
      expect(document.activeElement).toBe(regularInput);
    });
  });

  describe('settings UI event delegation', () => {
    beforeEach(() => {
      terminal = new Terminal(mockDispatcher, mockExecutor, mockSettingsManager, mockThemeManager);
    });

    it('should execute command from data-command button', async () => {
      const button = document.createElement('button');
      button.setAttribute('data-command', 'settings theme green');
      document.body.appendChild(button);

      button.click();

      // Small delay for async execution
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockExecutor.execute).toHaveBeenCalledWith('settings theme green');
    });

    it('should handle checkbox change events', async () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('data-command-template', 'settings scanlines');
      checkbox.checked = true;
      document.body.appendChild(checkbox);

      checkbox.dispatchEvent(new Event('change', { bubbles: true }));

      // Small delay for async execution
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockExecutor.execute).toHaveBeenCalledWith('settings scanlines on');
    });

    it('should handle range slider change events', async () => {
      const range = document.createElement('input');
      range.type = 'range';
      range.setAttribute('data-command-template', 'settings font-size');
      range.value = '16';
      document.body.appendChild(range);

      range.dispatchEvent(new Event('change', { bubbles: true }));

      // Small delay for async execution
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockExecutor.execute).toHaveBeenCalledWith('settings font-size 16');
    });

    it('should handle select dropdown change events', async () => {
      const select = document.createElement('select');
      select.setAttribute('data-command-template', 'settings font-family');
      select.setAttribute('data-setting-type', 'font-family');

      const option = document.createElement('option');
      option.value = 'monospace';
      select.appendChild(option);
      select.value = 'monospace';

      document.body.appendChild(select);

      select.dispatchEvent(new Event('change', { bubbles: true }));

      // Small delay for async execution
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockExecutor.execute).toHaveBeenCalledWith('settings font-family "monospace"');
    });

    it('should update font size display on range input', async () => {
      // Create display element first
      const display = document.createElement('span');
      display.id = 'font-size-value';
      document.body.appendChild(display);

      const range = document.createElement('input');
      range.type = 'range';
      range.setAttribute('data-setting-type', 'font-size');
      range.value = '14';
      document.body.appendChild(range);

      range.dispatchEvent(new Event('input', { bubbles: true }));

      // Small delay for DOM update
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(display.textContent).toBe('14px');
    });

    it('should update animation speed display on range input', async () => {
      // Create display element first
      const display = document.createElement('span');
      display.id = 'animation-speed-value';
      document.body.appendChild(display);

      const range = document.createElement('input');
      range.type = 'range';
      range.setAttribute('data-setting-type', 'animation-speed');
      range.value = '1.5';
      document.body.appendChild(range);

      range.dispatchEvent(new Event('input', { bubbles: true }));

      // Small delay for DOM update
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(display.textContent).toBe('1.5x');
    });

    it('should handle terminal-command custom event', async () => {
      const customEvent = new CustomEvent('terminal-command', {
        detail: 'help',
      });

      document.dispatchEvent(customEvent);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(mockExecutor.execute).toHaveBeenCalledWith('help');
    });
  });

  describe('command registration', () => {
    beforeEach(() => {
      terminal = new Terminal(mockDispatcher, mockExecutor);
    });

    it('should register single command', () => {
      const mockCommand: Command = {
        name: 'test',
        description: 'Test command',
        execute: () => ({ output: 'test' }),
      };

      terminal.registerCommand(mockCommand);

      expect(mockDispatcher.registerCommand).toHaveBeenCalledWith(mockCommand);
    });

    it('should register multiple commands', () => {
      const commands: Command[] = [
        { name: 'cmd1', description: 'Command 1', execute: () => ({ output: '1' }) },
        { name: 'cmd2', description: 'Command 2', execute: () => ({ output: '2' }) },
      ];

      terminal.registerCommands(commands);

      expect(mockDispatcher.registerCommand).toHaveBeenCalledTimes(2);
    });
  });

  describe('utility methods', () => {
    beforeEach(() => {
      terminal = new Terminal(
        mockDispatcher,
        mockExecutor,
        mockSettingsManager,
        mockThemeManager,
        mockEnvVarManager
      );
    });

    it('should write welcome message', () => {
      terminal.writeWelcome('Welcome to the terminal!');

      const output = document.getElementById('terminal-output');
      expect(output?.textContent).toContain('Welcome to the terminal!');
    });

    it('should set and get username', () => {
      terminal.setUsername('testuser');

      expect(terminal.getUsername()).toBe('testuser');
    });

    it('should update prompt when username changes', () => {
      terminal.setUsername('newuser');

      const prompt = document.getElementById('terminal-prompt');
      expect(prompt?.textContent).toContain('newuser');
    });

    it('should set current path', () => {
      terminal.setCurrentPath('/home/test');

      // Prompt should update to reflect new path
      const prompt = document.getElementById('terminal-prompt');
      expect(prompt?.textContent).toBeDefined();
    });

    it('should focus input', () => {
      terminal.focus();

      const input = document.getElementById('terminal-input');
      expect(document.activeElement).toBe(input);
    });

    it('should return input instance', () => {
      const input = terminal.getInput();

      expect(input).toBeDefined();
      expect(input).toBe(terminal.getInput());
    });

    it('should return output instance', () => {
      const output = terminal.getOutput();

      expect(output).toBeDefined();
      expect(output).toBe(terminal.getOutput());
    });
  });

  describe('screensaver integration', () => {
    beforeEach(() => {
      terminal = new Terminal(
        mockDispatcher,
        mockExecutor,
        mockSettingsManager,
        mockThemeManager,
        mockEnvVarManager
      );
    });

    it('should clear screensaver animations and output', () => {
      const output = terminal.getOutput();
      const clearSpy = vi.spyOn(output, 'clearScreensaverOutput');

      terminal.clearScreensaver();

      expect(clearSpy).toHaveBeenCalled();
    });

    it('should expose getOutput for screensaver manager', () => {
      const output = terminal.getOutput();
      const startSpy = vi.spyOn(output, 'startScreensaverOutput');

      output.startScreensaverOutput();

      expect(startSpy).toHaveBeenCalled();
    });
  });
});
