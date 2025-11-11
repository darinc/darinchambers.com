import { vi } from 'vitest';
import { createAliasCommand } from '../../src/commands/core/alias';
import { dateCommand } from '../../src/commands/core/date';
import { echoCommand } from '../../src/commands/core/echo';
import { createEnvCommand } from '../../src/commands/core/env';
import { createExportCommand } from '../../src/commands/core/export';
import { createHistoryCommand } from '../../src/commands/core/history';
import { createRenderCommand } from '../../src/commands/core/render';
import { createWhoamiCommand } from '../../src/commands/core/whoami';
import { createCatCommand } from '../../src/commands/fs/cat';
import { createCdCommand } from '../../src/commands/fs/cd';
import { createLsCommand } from '../../src/commands/fs/ls';
import { createPwdCommand } from '../../src/commands/fs/pwd';
import { createTreeCommand } from '../../src/commands/fs/tree';
import { createAboutCommand } from '../../src/commands/local/about';
import { createBlogCommand } from '../../src/commands/local/blog';
import { createContactCommand } from '../../src/commands/local/contact';
import { createPortfolioCommand } from '../../src/commands/local/portfolio';
import { createSettingsCommand } from '../../src/commands/local/settings';
import { Terminal } from '../../src/components/Terminal';
import { TerminalOutput } from '../../src/components/TerminalOutput';
import { AliasManager } from '../../src/utils/AliasManager';
import { CommandDispatcher } from '../../src/utils/CommandDispatcher';
import { CommandExecutor } from '../../src/utils/CommandExecutor';
import { EnvVarManager } from '../../src/utils/EnvVarManager';
import { SettingsManager } from '../../src/utils/SettingsManager';
import { ThemeManager } from '../../src/utils/ThemeManager';
import { setupTerminalDOM, cleanupDOM, getElement } from './dom-setup';
import { createMockFileSystem } from './mock-filesystem';
import type { Command } from '../../src/commands/Command';
import type { TerminalInput } from '../../src/components/TerminalInput';
import type { IFileSystem } from '../../src/utils/fs/IFileSystem';

// Re-export getElement for use in tests
export { getElement };

export interface IntegrationTestContext {
  terminal: Terminal;
  terminalInput: TerminalInput;
  terminalOutput: TerminalOutput;
  dispatcher: CommandDispatcher;
  executor: CommandExecutor;
  settingsManager: SettingsManager;
  themeManager: ThemeManager;
  aliasManager: AliasManager;
  envVarManager: EnvVarManager;
  fileSystem: IFileSystem;
}

/**
 * Sets up a complete terminal environment for integration testing.
 * Mimics the initialization in main.ts with all dependencies wired up.
 */
export function setupCompleteTerminal(): IntegrationTestContext {
  // Mock scrollIntoView for jsdom compatibility
  Element.prototype.scrollIntoView = vi.fn();

  // Set up mock localStorage
  setupMockLocalStorage();

  // Set up DOM
  setupTerminalDOM();

  // Create file system
  const fileSystem = createMockFileSystem();

  // Initialize managers
  const settingsManager = new SettingsManager(fileSystem);
  const themeManager = new ThemeManager(settingsManager);
  const aliasManager = new AliasManager(fileSystem);
  const envVarManager = new EnvVarManager(fileSystem, 'darin', 'darinchambers.com');

  // Apply theme to ensure CSS variables are set
  themeManager.applyCurrentTheme();

  // Initialize command system
  const dispatcher = new CommandDispatcher();
  const executor = new CommandExecutor(dispatcher, aliasManager, envVarManager);

  // Initialize Terminal (it will create its own TerminalInput and TerminalOutput)
  const terminal = new Terminal(dispatcher, executor, settingsManager, themeManager, envVarManager);

  terminal.setFileSystem(fileSystem);

  // Get the input and output instances from Terminal (not creating new ones)
  const terminalInput = terminal.getInput();

  // Get output element from DOM
  const outputElement = getElement<HTMLDivElement>('terminal-output');
  const terminalOutput = new TerminalOutput(outputElement);

  // Create context to pass to registerAllCommands
  const context: IntegrationTestContext = {
    terminal,
    terminalInput,
    terminalOutput,
    dispatcher,
    executor,
    settingsManager,
    themeManager,
    aliasManager,
    envVarManager,
    fileSystem,
  };

  // Register all commands
  registerAllCommands(context);

  return context;
}

/**
 * Registers all available commands with the terminal.
 * Mimics the command registration in main.ts.
 */
function registerAllCommands(context: IntegrationTestContext): void {
  const { terminal, fileSystem, aliasManager, envVarManager, terminalOutput, terminalInput } =
    context;

  // Core commands
  terminal.registerCommand(echoCommand);
  terminal.registerCommand(dateCommand);
  terminal.registerCommand(createWhoamiCommand(envVarManager));
  terminal.registerCommand(createHistoryCommand(terminalInput));
  terminal.registerCommand(createAliasCommand(aliasManager));
  terminal.registerCommand(createEnvCommand(envVarManager));
  terminal.registerCommand(createExportCommand(envVarManager));
  terminal.registerCommand(createRenderCommand(terminalOutput));

  // Help command (defined inline like in main.ts)
  const helpCommand: Command = {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      output:
        'Available commands: ls, cd, pwd, cat, tree, echo, date, about, blog, portfolio, contact, settings, alias, env, history, render, help, clear, whoami',
    }),
  };
  terminal.registerCommand(helpCommand);

  // Clear command (defined inline like in main.ts)
  const clearCommand: Command = {
    name: 'clear',
    description: 'Clear the terminal screen',
    execute: () => {
      terminalOutput.clear();
      return { output: '' };
    },
  };
  terminal.registerCommand(clearCommand);

  // Filesystem commands (created with factory functions)
  terminal.registerCommand(createLsCommand(fileSystem));
  terminal.registerCommand(
    createCdCommand(fileSystem, (path: string) => terminal.setCurrentPath(path), envVarManager)
  );
  terminal.registerCommand(createPwdCommand(fileSystem));
  terminal.registerCommand(createCatCommand(fileSystem));
  terminal.registerCommand(createTreeCommand(fileSystem));

  // Local commands (created with factory functions)
  terminal.registerCommand(createAboutCommand(fileSystem));
  terminal.registerCommand(createBlogCommand(fileSystem));
  terminal.registerCommand(createPortfolioCommand(fileSystem));
  terminal.registerCommand(createContactCommand());
  terminal.registerCommand(
    createSettingsCommand(fileSystem, context.settingsManager, context.themeManager)
  );
}

/**
 * Executes a command and waits for async operations to complete.
 */
export async function executeCommandAndWait(
  terminal: Terminal,
  command: string,
  waitMs = 100
): Promise<void> {
  await terminal.executeCommand(command);
  // Wait for DOM updates and async operations
  await new Promise((resolve) => setTimeout(resolve, waitMs));
}

/**
 * Gets the last output line from the terminal.
 */
export function getLastOutputLine(): HTMLElement | null {
  const lines = document.querySelectorAll('.output-line');
  return lines.length > 0 ? (lines[lines.length - 1] as HTMLElement) : null;
}

/**
 * Gets all output lines from the terminal.
 */
export function getAllOutputLines(): HTMLElement[] {
  return Array.from(document.querySelectorAll('.output-line'));
}

/**
 * Gets the nth output line (0-indexed).
 */
export function getOutputLine(index: number): HTMLElement | null {
  const lines = document.querySelectorAll('.output-line');
  return index < lines.length ? (lines[index] as HTMLElement) : null;
}

/**
 * Clears all terminal output.
 */
export function clearTerminalOutput(): void {
  const outputElement = document.getElementById('terminal-output');
  if (outputElement) {
    outputElement.innerHTML = '';
  }
}

/**
 * Simulates user typing in the terminal input.
 */
export function typeInTerminal(input: string): void {
  const inputElement = getElement<HTMLInputElement>('terminal-input');
  inputElement.value = input;
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
}

/**
 * Simulates user pressing Enter in the terminal.
 */
export async function pressEnter(terminal: Terminal): Promise<void> {
  const inputElement = getElement<HTMLInputElement>('terminal-input');
  const command = inputElement.value;
  await executeCommandAndWait(terminal, command);
}

/**
 * Simulates a complete user interaction: type command and press Enter.
 */
export async function typeAndExecute(terminal: Terminal, command: string): Promise<void> {
  typeInTerminal(command);
  await pressEnter(terminal);
}

/**
 * Gets the current value of a CSS variable on the document root.
 */
export function getCSSVariable(variableName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * Waits for a condition to be true (useful for async operations).
 */
export async function waitFor(
  condition: () => boolean,
  timeoutMs = 1000,
  intervalMs = 50
): Promise<void> {
  const startTime = Date.now();
  while (!condition()) {
    if (Date.now() - startTime > timeoutMs) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

/**
 * Tears down the integration test environment.
 */
export function teardownIntegrationTest(): void {
  cleanupDOM();
  localStorage.clear();
}

/**
 * Creates a mock localStorage for testing.
 */
export function setupMockLocalStorage(): void {
  // Only set up once per test run - don't recreate if already exists
  if (window.localStorage && typeof window.localStorage.getItem === 'function') {
    return;
  }

  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      get length() {
        return Object.keys(store).length;
      },
      key: (index: number) => {
        const keys = Object.keys(store);
        return keys[index] || null;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
}

/**
 * Sets up a mock window.location for testing that updates on pushState.
 */
export function setupMockLocation(): void {
  // Track history stack manually
  const historyStack: { pathname: string; search: string; hash: string }[] = [
    { pathname: '/', search: '', hash: '' },
  ];
  let currentIndex = 0;

  // Create a mutable location object
  const mockLocation = {
    pathname: '/',
    search: '',
    hash: '',
    href: 'http://localhost:5173/',
    origin: 'http://localhost:5173',
    protocol: 'http:',
    host: 'localhost:5173',
    hostname: 'localhost',
    port: '5173',
  };

  // Helper to update location from history entry
  const updateLocation = (entry: { pathname: string; search: string; hash: string }) => {
    mockLocation.pathname = entry.pathname;
    mockLocation.search = entry.search;
    mockLocation.hash = entry.hash;
    mockLocation.href = `http://localhost:5173${entry.pathname}${entry.search}${entry.hash}`;
  };

  // Replace window.location with our mock
  delete (window as any).location;
  window.location = mockLocation as any;

  // Mock pushState to update window.location
  const originalPushState = window.history.pushState.bind(window.history);
  window.history.pushState = (state: any, unused: string, url?: string | URL | null) => {
    // Call original pushState
    originalPushState(state, unused, url);

    // Update our mock location
    if (url) {
      const urlString = url.toString();
      const urlObj = new URL(urlString, 'http://localhost:5173');
      const entry = {
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
      };

      // Remove any forward history
      historyStack.splice(currentIndex + 1);
      // Add new entry
      historyStack.push(entry);
      currentIndex = historyStack.length - 1;

      updateLocation(entry);
    }
  };

  // Mock back() to navigate backward
  const originalBack = window.history.back.bind(window.history);
  window.history.back = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLocation(historyStack[currentIndex]);
    }
    originalBack();
  };

  // Mock forward() to navigate forward
  const originalForward = window.history.forward.bind(window.history);
  window.history.forward = () => {
    if (currentIndex < historyStack.length - 1) {
      currentIndex++;
      updateLocation(historyStack[currentIndex]);
    }
    originalForward();
  };
}
