/**
 * Fullscreen mode controller.
 *
 * Used by boot/shutdown/reboot sequences: hides the header, nav, and input line,
 * then exits on the next user interaction (or after an optional timeout) and runs
 * an optional follow-up command on exit. Extracted from Terminal so the
 * orchestrator doesn't own this lifecycle directly.
 */
const CHROME_IDS = ['terminal-header', 'terminal-nav', 'terminal-input-line'] as const;
const EXIT_EVENTS = ['keydown', 'click', 'touchstart', 'wheel'] as const;

export class FullscreenController {
  private active = false;
  private exitHandler: (() => void) | null = null;
  private exitCommand: string | null = null;

  /**
   * @param runExitCommand Runs a follow-up command (clearing first) when fullscreen exits.
   */
  constructor(private readonly runExitCommand: (command: string) => void) {}

  /**
   * Enter fullscreen, hiding the terminal chrome.
   * @param exitCommand Optional command to run when fullscreen exits.
   * @param duration Optional auto-exit delay in ms.
   */
  enter(exitCommand?: string, duration?: number): void {
    if (this.active) return;

    this.active = true;
    this.exitCommand = exitCommand ?? null;
    this.setChromeHidden(true);

    this.exitHandler = () => this.exit();

    // Delay listeners so the Enter key that triggered this command doesn't
    // immediately exit fullscreen mode.
    setTimeout(() => {
      if (!this.active || !this.exitHandler) return;
      for (const evt of EXIT_EVENTS) {
        document.addEventListener(evt, this.exitHandler, { once: true });
      }
    }, 100);

    if (duration !== undefined) {
      setTimeout(() => this.exit(), duration);
    }
  }

  /**
   * Clear state and listeners WITHOUT restoring the chrome.
   * Used when transitioning between fullscreen commands (e.g. reboot -> boot).
   */
  reset(): void {
    this.active = false;
    this.exitCommand = null;
    this.removeListeners();
  }

  private exit(): void {
    if (!this.active) return;

    this.active = false;
    const exitCommand = this.exitCommand;
    this.exitCommand = null;

    this.setChromeHidden(false);
    this.removeListeners();

    if (exitCommand) {
      // Small delay to let the UI restore before running the follow-up command.
      setTimeout(() => this.runExitCommand(exitCommand), 100);
    }
  }

  private removeListeners(): void {
    if (!this.exitHandler) return;
    for (const evt of EXIT_EVENTS) {
      document.removeEventListener(evt, this.exitHandler);
    }
    this.exitHandler = null;
  }

  private setChromeHidden(hidden: boolean): void {
    for (const id of CHROME_IDS) {
      document.getElementById(id)?.classList.toggle('fullscreen-hidden', hidden);
    }
  }
}
