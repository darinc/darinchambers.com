import { COMMAND_SIGNALS } from '../constants';
import { PromptFormatter, type PromptContext } from '../utils/PromptFormatter';
import { sanitizeHtml } from '../utils/sanitizeHtml';
import { generateSettingsUI } from './SettingsUI';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import type { Command, CommandResult } from '../commands/Command';
import type { CommandDispatcher } from '../utils/CommandDispatcher';
import type { CommandExecutor } from '../utils/CommandExecutor';
import type { EnvVarManager } from '../utils/EnvVarManager';
import type { IFileSystem } from '../utils/fs/IFileSystem';
import type { SettingsManager } from '../utils/SettingsManager';
import type { ThemeManager } from '../utils/ThemeManager';

// Forward declaration to avoid circular dependency
interface IRouter {
  syncUrlToCommand(command: string): void;
}

export class Terminal {
  private input: TerminalInput;
  private output: TerminalOutput;
  private username = 'darin';
  private hostname = 'darinchambers.com';
  private currentPath = '~';
  private promptFormatter: PromptFormatter;
  private router?: IRouter;

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

    this.setupInputHandler();
    this.setupClickHandler(outputElement);
    this.setupSettingsUIHandler();
    this.setupKeyboardHandlers();
    this.updatePrompt();
  }

  private setupClickHandler(outputElement: HTMLElement): void {
    // Click anywhere in terminal output to focus input
    outputElement.addEventListener('click', () => {
      // Don't focus if user has selected text (they may be trying to copy)
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return; // User has selected text, don't steal focus
      }

      this.input.focus();
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
            this.input.focus();
          }
        }
      }
    });
  }

  private setupSettingsUIHandler(): void {
    // Listen for settings commands from UI
    document.addEventListener('terminal-command', (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      void this.executeCommand(customEvent.detail, false);
    });

    // Event delegation for settings UI controls (replaces inline event handlers)
    // This enables strict CSP by avoiding inline onclick/onchange handlers
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      // Handle buttons with data-command attribute
      // Exclude navigation buttons (they have their own click handlers that should run first)
      if (target.closest('[data-command]') && !target.closest('.nav-link')) {
        const button = target.closest('[data-command]')!;
        const command = button.getAttribute('data-command');
        if (command) {
          // Prevent default behavior for anchor tags
          if (button.tagName === 'A') {
            e.preventDefault();
          }
          void this.executeCommand(command, false);
        }
      }
    });

    // Handle input changes (checkboxes, ranges, selects, color pickers)
    document.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      const commandTemplate = target.getAttribute('data-command-template');
      const settingType = target.getAttribute('data-setting-type');

      if (!commandTemplate) return;

      let command = '';

      // Handle checkboxes
      if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        command = `${commandTemplate} ${target.checked ? 'on' : 'off'}`;
      }
      // Handle color pickers
      else if (target instanceof HTMLInputElement && target.type === 'color') {
        command = `${commandTemplate} ${target.value}`;
      }
      // Handle range sliders
      else if (target instanceof HTMLInputElement && target.type === 'range') {
        command = `${commandTemplate} ${target.value}`;
      }
      // Handle select dropdowns (font-family needs quotes)
      else if (target instanceof HTMLSelectElement) {
        if (settingType === 'font-family') {
          command = `${commandTemplate} "${target.value}"`;
        } else {
          command = `${commandTemplate} ${target.value}`;
        }
      }

      if (command) {
        void this.executeCommand(command, false);
      }
    });

    // Handle range input updates for live value display
    document.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.type === 'range') {
        const settingType = target.getAttribute('data-setting-type');

        // Update font size display
        if (settingType === 'font-size') {
          const displayElement = document.getElementById('font-size-value');
          if (displayElement) {
            displayElement.textContent = `${target.value}px`;
          }
        }
        // Update animation speed display
        else if (settingType === 'animation-speed') {
          const displayElement = document.getElementById('animation-speed-value');
          if (displayElement) {
            displayElement.textContent = `${target.value}x`;
          }
        }
      }
    });

    // Listen for settings changes to refresh all settings panels and update prompt
    document.addEventListener('settings-changed', () => {
      this.refreshSettingsPanels();
      this.updatePrompt();
    });
  }

  private refreshSettingsPanels(): void {
    if (!this.settingsManager || !this.themeManager) {
      return;
    }

    // Find all settings panels in the DOM
    const panels = document.querySelectorAll('[data-settings-panel]');
    if (panels.length === 0) {
      return;
    }

    // Store currently focused element to restore focus after refresh
    const wasInPanel = Array.from(panels).some((panel) => panel.contains(document.activeElement));

    // Generate fresh HTML with current settings
    const freshHTML = generateSettingsUI(this.settingsManager, this.themeManager);

    // Update each panel's content (sanitize to prevent XSS)
    panels.forEach((panel) => {
      const cleanHTML = freshHTML
        .replace(
          '<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',
          ''
        )
        .replace(/<\/aside>$/, '');
      panel.innerHTML = sanitizeHtml(cleanHTML);
    });

    // If focus was in the panel before refresh, move it to first focusable element
    if (wasInPanel && panels.length > 0) {
      const firstPanel = panels[0];
      const firstFocusable = firstPanel.querySelector<HTMLElement>('button, input, select');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }

  /**
   * Focus first focusable element in newly rendered settings panel.
   * Called after settings command output is displayed.
   */
  private focusSettingsPanelIfPresent(): void {
    // Use setTimeout to wait for DOM update
    setTimeout(() => {
      const settingsPanel = document.querySelector('[data-settings-panel]');
      if (settingsPanel) {
        const firstFocusable = settingsPanel.querySelector<HTMLElement>('button, input, select');
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }, 0);
  }

  private setupInputHandler(): void {
    this.input.onSubmit(async (value) => {
      const trimmedValue = value.trim();

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

      // Clear input and focus
      this.input.clear();
      this.input.focus();
    });
  }

  /**
   * Display command result to terminal output.
   * Handles special signals, errors, HTML, and plain text output.
   */
  private displayResult(result: CommandResult): void {
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
          this.output.performScrollBehavior(result.scrollBehavior);
        });

        // Focus settings panel if it was just rendered
        this.focusSettingsPanelIfPresent();
      } else {
        // Regular text output with callback for scroll behavior
        this.output.write(result.output, undefined, () => {
          this.output.performScrollBehavior(result.scrollBehavior);
        });
      }
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

  focus(): void {
    this.input.focus();
  }

  getInput(): TerminalInput {
    return this.input;
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

    // Clear input and ensure it is focused after command execution
    this.input.clear();
    this.input.focus();
  }
}
