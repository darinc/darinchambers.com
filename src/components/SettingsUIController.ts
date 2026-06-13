/**
 * UI-event-to-command bridge.
 *
 * Wires DOM events to terminal commands and keeps settings panels in sync,
 * extracted from Terminal so the orchestrator stays focused. Handles:
 * - the `terminal-command` custom event (from SettingsUI buttons),
 * - `data-command` button/anchor clicks via event delegation (CSP-safe; no
 *   inline handlers), routing through the router when the command maps to a path,
 * - settings-control `change` events (checkbox/color/range/select -> command),
 * - live `input` updates for range value displays,
 * - re-rendering open settings panels when settings change.
 */
import { sanitizeHtml } from '../utils/sanitizeHtml';
import { generateSettingsUI } from './SettingsUI';
import type { SettingsManager } from '../utils/SettingsManager';
import type { ThemeManager } from '../utils/ThemeManager';

interface RouterLike {
  navigate(path: string, clearTerminal?: boolean): void;
  getPathForCommand(command: string): string | null;
}

export interface SettingsUIDeps {
  settingsManager?: SettingsManager;
  themeManager?: ThemeManager;
  /** Execute a command (without clearing the terminal first). */
  executeCommand: (command: string) => void;
  /** Accessor for the router, if one is wired up. */
  getRouter: () => RouterLike | undefined;
  /** Called after a settings change (e.g. to update the prompt + screensaver). */
  onSettingsChanged: () => void;
}

export class SettingsUIController {
  constructor(private readonly deps: SettingsUIDeps) {
    // Listen for settings commands dispatched from the UI
    document.addEventListener('terminal-command', (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      this.deps.executeCommand(customEvent.detail);
    });

    document.addEventListener('click', (e: Event) => this.handleClick(e));
    document.addEventListener('change', (e: Event) => this.handleChange(e));
    document.addEventListener('input', (e: Event) => this.handleInput(e));

    // Refresh open panels + update prompt/screensaver when settings change
    document.addEventListener('settings-changed', () => {
      this.refreshPanels();
      this.deps.onSettingsChanged();
    });
  }

  /**
   * Event delegation for `data-command` buttons/anchors (replaces inline event
   * handlers so a strict CSP can be used). Navigation links are excluded — they
   * have their own handlers that should run first.
   */
  private handleClick(e: Event): void {
    const target = e.target as HTMLElement;

    if (target.closest('[data-command]') && !target.closest('.nav-link')) {
      const button = target.closest('[data-command]')!;
      const command = button.getAttribute('data-command');
      if (!command) return;

      // Prevent default behavior for anchor tags
      if (button.tagName === 'A') {
        e.preventDefault();
      }

      // If the command maps to a route, navigate so the URL + callbacks update
      const router = this.deps.getRouter();
      if (router) {
        const path = router.getPathForCommand(command);
        if (path) {
          router.navigate(path, false);
          return;
        }
      }

      this.deps.executeCommand(command);
    }
  }

  /** Translate settings-control changes (checkbox/color/range/select) into commands. */
  private handleChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const commandTemplate = target.getAttribute('data-command-template');
    const settingType = target.getAttribute('data-setting-type');

    if (!commandTemplate) return;

    let command = '';

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      command = `${commandTemplate} ${target.checked ? 'on' : 'off'}`;
    } else if (target instanceof HTMLInputElement && target.type === 'color') {
      command = `${commandTemplate} ${target.value}`;
    } else if (target instanceof HTMLInputElement && target.type === 'range') {
      command = `${commandTemplate} ${target.value}`;
    } else if (target instanceof HTMLSelectElement) {
      // font-family values can contain spaces, so quote them
      command =
        settingType === 'font-family'
          ? `${commandTemplate} "${target.value}"`
          : `${commandTemplate} ${target.value}`;
    }

    if (command) {
      this.deps.executeCommand(command);
    }
  }

  /** Update the live value display next to range sliders as they move. */
  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.type !== 'range') return;

    const settingType = target.getAttribute('data-setting-type');

    if (settingType === 'font-size') {
      const display = document.getElementById('font-size-value');
      if (display) display.textContent = `${target.value}px`;
    } else if (settingType === 'animation-speed') {
      const display = document.getElementById('animation-speed-value');
      if (display) display.textContent = `${target.value}x`;
    }
  }

  /** Re-render any open settings panels with the current settings. */
  refreshPanels(): void {
    const { settingsManager, themeManager } = this.deps;
    if (!settingsManager || !themeManager) return;

    const panels = document.querySelectorAll('[data-settings-panel]');
    if (panels.length === 0) return;

    // Remember whether focus was inside a panel so we can restore it after refresh
    const wasInPanel = Array.from(panels).some((panel) => panel.contains(document.activeElement));

    const freshHTML = generateSettingsUI(settingsManager, themeManager);

    panels.forEach((panel) => {
      const cleanHTML = freshHTML
        .replace(
          '<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',
          ''
        )
        .replace(/<\/aside>$/, '');
      panel.innerHTML = sanitizeHtml(cleanHTML);
    });

    if (wasInPanel) {
      const firstFocusable = panels[0].querySelector<HTMLElement>('button, input, select');
      firstFocusable?.focus();
    }
  }

  /**
   * Focus the first focusable element in a freshly rendered settings panel.
   * Called after settings command output is displayed.
   */
  focusPanelIfPresent(): void {
    // Wait for the DOM update before focusing
    setTimeout(() => {
      const panel = document.querySelector('[data-settings-panel]');
      const firstFocusable = panel?.querySelector<HTMLElement>('button, input, select');
      firstFocusable?.focus();
    }, 0);
  }
}
