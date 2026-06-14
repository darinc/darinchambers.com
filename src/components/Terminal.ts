import { stopAllLifeAnimations } from '../animations/gameOfLife';
import { stopAllMatrixAnimations } from '../animations/matrixRain';
import { COMMAND_SIGNALS } from '../constants';
import { siteConfig } from '../site.config';
import { initEmailProtection } from '../utils/EmailProtection';
import { PromptFormatter, type PromptContext } from '../utils/PromptFormatter';
import { FullscreenController } from './FullscreenController';
import { SettingsUIController } from './SettingsUIController';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import type { Command, CommandResult } from '../commands/Command';
import type { CommandDispatcher } from '../utils/CommandDispatcher';
import type { CommandExecutor } from '../utils/CommandExecutor';
import type { EnvVarManager } from '../utils/EnvVarManager';
import type { IFileSystem } from '../utils/fs/IFileSystem';
import type { ScreensaverManager } from '../utils/screensaver/ScreensaverManager';
import type { SettingsManager } from '../utils/SettingsManager';
import type { ThemeManager } from '../utils/ThemeManager';

// Forward declaration to avoid circular dependency
interface IRouter {
  syncUrlToCommand(command: string): void;
  navigate(path: string, clearTerminal?: boolean): void;
  getPathForCommand(command: string): string | null;
}

export class Terminal {
  private input: TerminalInput;
  private output: TerminalOutput;
  private username = siteConfig.username;
  private hostname = siteConfig.domain;
  private currentPath = '~';
  private promptFormatter: PromptFormatter;
  private router?: IRouter;
  private screensaverManager?: ScreensaverManager;
  private inputInterceptor: ((value: string) => void | Promise<void>) | null = null;
  private readonly fullscreen: FullscreenController;
  private readonly settingsUI: SettingsUIController;

  constructor(
    private dispatcher: CommandDispatcher,
    private executor: CommandExecutor,
    private settingsManager?: SettingsManager,
    private themeManager?: ThemeManager,
    private envVarManager?: EnvVarManager
  ) {
    const outputElement = document.getElementById('terminal-output');
    const inputElement = document.getElementById('terminal-input') as HTMLInputElement;
    const promptElement = document.getElementById('terminal-prompt')!;

    if (!outputElement || !inputElement || !promptElement) {
      throw new Error('Required terminal elements not found');
    }

    this.output = new TerminalOutput(outputElement);
    this.input = new TerminalInput(inputElement, promptElement);
    this.promptFormatter = new PromptFormatter(envVarManager);
    this.fullscreen = new FullscreenController(
      (command) => void this.executeCommand(command, true)
    );
    this.settingsUI = new SettingsUIController({
      settingsManager: this.settingsManager,
      themeManager: this.themeManager,
      executeCommand: (command) => void this.executeCommand(command, false),
      getRouter: () => this.router,
      onSettingsChanged: () => {
        this.updatePrompt();
        this.screensaverManager?.handleSettingsChange();
      },
    });

    this.setupInputHandler();
    this.setupClickHandler(outputElement);
    this.setupKeyboardHandlers();
    this.setupMobileViewportHandler();
    this.updatePrompt();
  }

  private setupClickHandler(outputElement: HTMLElement): void {
    // Click anywhere in terminal output to focus input
    outputElement.addEventListener('click', (e: MouseEvent) => {
      // Don't focus if user has selected text (they may be trying to copy)
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return; // User has selected text, don't steal focus
      }

      // Don't focus if clicking on interactive elements (graphs, buttons, links, etc.)
      const target = e.target as HTMLElement;
      const interactiveSelectors = [
        'svg',
        'button',
        'a',
        'input',
        'select',
        'textarea',
        '[data-graph]',
        '[data-graph-src]',
        '.graph-container',
      ].join(', ');

      const isInteractive = target.closest(interactiveSelectors);
      if (isInteractive) {
        return; // User is interacting with content, don't steal focus
      }

      // Force focus (user explicitly clicked in terminal area)
      this.input.focus(true);
    });
  }

  private setupKeyboardHandlers(): void {
    // Handle Escape key to close settings panels and return focus to input
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Find any open settings panels
        const settingsPanels = document.querySelectorAll('[data-settings-panel]');
        if (settingsPanels.length > 0) {
          // If we're inside a settings panel, return focus to terminal input
          const activeElement = document.activeElement;
          if (activeElement && settingsPanels[0].contains(activeElement)) {
            e.preventDefault();
            // Force focus since user intentionally pressed Escape
            this.input.focus(true);
          }
        }
      }
    });
  }

  private setupMobileViewportHandler(): void {
    // Only set up if Visual Viewport API is available (mobile browsers)
    if (!window.visualViewport) {
      return;
    }

    let lastHeight = window.visualViewport.height;

    // Listen for viewport resize events (triggered by mobile keyboard)
    window.visualViewport.addEventListener('resize', () => {
      const currentHeight = window.visualViewport!.height;

      // Keyboard was dismissed (viewport height increased)
      if (currentHeight > lastHeight) {
        this.scrollToHeader();
      }

      lastHeight = currentHeight;
    });
  }

  private scrollToHeader(): void {
    // Scroll to the top to show the header
    requestAnimationFrame(() => {
      const header = document.getElementById('terminal-header');
      if (header) {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback: scroll window to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  private setupInputHandler(): void {
    this.input.onSubmit(async (value) => {
      // Check for input interceptor (e.g., password prompt for sudo)
      if (this.inputInterceptor) {
        const interceptor = this.inputInterceptor;
        this.inputInterceptor = null;
        this.input.clear();
        // Do NOT echo input (it's a password) or add to history
        await interceptor(value.trim());
        setTimeout(() => this.input.focus(true), 100);
        return;
      }

      const trimmedValue = value.trim();

      // Clear input immediately (before async operations)
      this.input.clear();

      // Echo command
      this.output.writeCommand(this.getPromptString(), trimmedValue);

      // Add to history
      this.input.addToHistory(trimmedValue);

      // Execute command via executor
      if (trimmedValue) {
        const result = await this.executor.execute(trimmedValue);
        this.displayResult(result);

        // Sync URL to match the command that was executed
        if (this.router) {
          this.router.syncUrlToCommand(trimmedValue);
        }
      }

      // Focus input after scroll behavior completes
      // Delay ensures focus happens after performScrollBehavior's RAF chain + 50ms timeout
      setTimeout(() => {
        this.input.focus(true);
      }, 100);
    });
  }

  /**
   * Display command result to terminal output.
   * Handles special signals, errors, HTML, and plain text output.
   */
  private displayResult(result: CommandResult): void {
    // Handle clear before output if requested
    if (result.clearBefore) {
      this.output.clear();
    }

    // Handle fullscreen mode (hide header/nav)
    if (result.fullscreen) {
      this.fullscreen.enter(result.fullscreenExitCommand, result.fullscreenDuration);
    }

    // Handle clear command specially
    if (result.output === COMMAND_SIGNALS.CLEAR_SCREEN) {
      this.output.clear();

      // Reset URL to home route when clearing terminal
      if (this.router && window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
    } else if (result.output && !result.raw) {
      // Skip display if raw flag is set (piping context)
      if (result.error) {
        this.output.writeError(result.output);
      } else if (result.html) {
        // Render HTML content with callback for scroll behavior
        this.output.writeHTML(result.output, () => {
          // Initialize any graphs in the newly rendered HTML (async)
          if (typeof window.initializeGraphs === 'function') {
            void window.initializeGraphs();
          }
          // Initialize email protection for any protected email links
          initEmailProtection();
          this.output.performScrollBehavior(result.scrollBehavior);
        });

        // Focus settings panel if it was just rendered
        this.settingsUI.focusPanelIfPresent();
      } else {
        // Regular text output with callback for scroll behavior
        this.output.write(result.output, undefined, () => {
          this.output.performScrollBehavior(result.scrollBehavior);
        });
      }
    }

    // Handle scheduled follow-up command (e.g., reboot → boot)
    if (result.scheduledCommand) {
      const { command, delayMs, clearBefore } = result.scheduledCommand;
      setTimeout(() => {
        // Reset fullscreen state so the scheduled command can re-enter
        // with its own settings (e.g., boot sets fullscreenDuration)
        this.fullscreen.reset();
        if (clearBefore) {
          this.output.clear();
        }
        void this.executeCommand(command, true);
      }, delayMs);
    }
  }

  private getPromptString(): string {
    // Build prompt context
    const context: PromptContext = {
      user: this.username,
      hostname: this.hostname,
      pwd: this.envVarManager?.getVariable('PWD') ?? this.currentPath,
      shortPwd: this.currentPath,
      lastDir: PromptFormatter.getLastDir(this.currentPath),
      isRoot: this.username === 'root',
    };

    // Get prompt format from settings or use default
    const format = this.settingsManager?.getSetting('prompt')?.format ?? '\\u@\\h:\\W\\$ ';

    // Format and return prompt
    return this.promptFormatter.format(format, context);
  }

  private updatePrompt(): void {
    this.input.setPrompt(this.getPromptString());
  }

  registerCommand(command: Command): void {
    this.dispatcher.registerCommand(command);
    this.input.setAvailableCommands(this.dispatcher.getCommandNames());
  }

  registerCommands(commands: Command[]): void {
    commands.forEach((cmd) => this.registerCommand(cmd));
  }

  /**
   * Set the file system for tab completion of file paths.
   * Call this after Terminal is initialized.
   *
   * @param fileSystem - FileSystem instance
   */
  setFileSystem(fileSystem: IFileSystem): void {
    this.input.setFileSystem(fileSystem);
  }

  writeWelcome(message: string): void {
    this.output.write(message, undefined, () => {
      this.output.performScrollBehavior();
    });
  }

  setUsername(username: string): void {
    this.username = username;
    this.updatePrompt();
  }

  getUsername(): string {
    return this.username;
  }

  setCurrentPath(path: string): void {
    this.currentPath = path;
    this.updatePrompt();
  }

  setInputInterceptor(handler: ((value: string) => void | Promise<void>) | null): void {
    this.inputInterceptor = handler;
  }

  writeOutput(text: string): void {
    this.output.write(text);
  }

  writeError(text: string): void {
    this.output.writeError(text);
  }

  /**
   * Display a CommandResult using the full rendering pipeline
   * (handles HTML, errors, scroll behavior, etc.)
   */
  showResult(result: CommandResult): void {
    this.displayResult(result);
  }

  /**
   * Show or hide the input line (prompt + input field).
   * Used by commands that run animations and want to hide the prompt.
   */
  setInputLineVisible(visible: boolean): void {
    const inputLine = document.getElementById('terminal-input-line');
    if (inputLine) {
      inputLine.style.display = visible ? '' : 'none';
    }
  }

  focus(force = false): void {
    this.input.focus(force);
  }

  getInput(): TerminalInput {
    return this.input;
  }

  /**
   * Get the TerminalOutput instance
   * Used by ScreensaverManager to mark screensaver output
   */
  getOutput(): TerminalOutput {
    return this.output;
  }

  /**
   * Stop all active screensaver animations
   * This ensures animations are cleaned up when screensaver is dismissed
   */
  private stopScreensaverAnimations(): void {
    stopAllMatrixAnimations();
    stopAllLifeAnimations();
  }

  /**
   * Clear screensaver output and stop animations
   * Called by ScreensaverManager when user activity is detected
   */
  clearScreensaver(): void {
    this.stopScreensaverAnimations();
    this.output.clearScreensaverOutput();
  }

  /**
   * Set the router for URL synchronization.
   * Call this after both Terminal and Router are initialized.
   *
   * @param router - Router instance
   */
  setRouter(router: IRouter): void {
    this.router = router;
  }

  /**
   * Set the screensaver manager for screensaver functionality.
   * Call this after both Terminal and ScreensaverManager are initialized.
   *
   * @param screensaverManager - ScreensaverManager instance
   */
  setScreensaverManager(screensaverManager: ScreensaverManager): void {
    this.screensaverManager = screensaverManager;
  }

  /**
   * Execute a command programmatically (e.g., from navigation clicks).
   * Supports pipelines, aliases, and all command features via CommandExecutor.
   *
   * @param command - The command string to execute
   * @param clearFirst - Whether to clear the terminal before execution
   */
  async executeCommand(command: string, clearFirst = false): Promise<void> {
    // Clear terminal first if requested (e.g., from navigation clicks)
    if (clearFirst) {
      this.output.clear();
    }

    // Echo command
    this.output.writeCommand(this.getPromptString(), command);

    // Add to history
    this.input.addToHistory(command);

    // Execute command via executor
    if (command.trim()) {
      const result = await this.executor.execute(command);
      this.displayResult(result);
    }

    // Clear input (don't force focus on mobile for programmatic commands)
    this.input.clear();
    this.input.focus();
  }
}
