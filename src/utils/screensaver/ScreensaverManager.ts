/**
 * ScreensaverManager Service
 *
 * Manages the screensaver system including activity tracking, timeout management,
 * and screensaver activation/deactivation.
 *
 * This service coordinates with SettingsManager for configuration and Terminal
 * for executing screensaver commands.
 */

import { SCREENSAVER_CONSTANTS } from '../../constants';
import type { Terminal } from '../../components/Terminal';
import type { ScreensaverState } from '../../types/screensaver';
import type { SettingsManager } from '../SettingsManager';

export class ScreensaverManager {
  private settingsManager: SettingsManager;
  private terminal: Terminal;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private state: ScreensaverState = 'idle';
  private lastActivityTime = Date.now();

  /**
   * Creates a new ScreensaverManager
   *
   * @param settingsManager - SettingsManager instance for configuration
   * @param terminal - Terminal instance for executing screensaver commands
   */
  constructor(settingsManager: SettingsManager, terminal: Terminal) {
    this.settingsManager = settingsManager;
    this.terminal = terminal;

    this.setupVisibilityListener();
  }

  /**
   * Record user activity and reset the idle timer
   * This should be called by ActivityMonitor when user interacts with the page
   */
  recordActivity(): void {
    this.lastActivityTime = Date.now();

    // If screensaver is active, deactivate it
    if (this.state === 'active') {
      this.deactivateScreensaver();
      return;
    }

    // Reset the idle timer
    this.resetIdleTimer();
  }

  /**
   * Start the idle timer
   * This begins monitoring for inactivity
   */
  startIdleTimer(): void {
    if (!this.isEnabled()) {
      this.state = 'disabled';
      return;
    }

    this.state = 'idle';
    this.resetIdleTimer();
  }

  /**
   * Reset the idle timer
   * Clears the existing timer and starts a new one
   */
  private resetIdleTimer(): void {
    // Clear existing timer
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }

    // Don't set a new timer if disabled
    if (!this.isEnabled()) {
      this.state = 'disabled';
      return;
    }

    // Don't set timer if screensaver is active
    if (this.state === 'active') {
      return;
    }

    // Set new timer
    const timeoutMs = this.getTimeoutMs();
    this.idleTimer = setTimeout(() => {
      this.activateScreensaver();
    }, timeoutMs);

    this.state = 'idle';
  }

  /**
   * Activate the screensaver
   * Executes the configured screensaver command
   */
  private activateScreensaver(): void {
    // Double-check that screensaver is still enabled
    if (!this.isEnabled()) {
      return;
    }

    // Don't activate if already active
    if (this.state === 'active') {
      return;
    }

    // Get the screensaver command from settings
    const screensaverCommand = this.settingsManager.getActiveScreensaver();

    // Mark next terminal output as screensaver content
    // This must happen BEFORE executeCommand so output is tracked
    this.terminal.getOutput().startScreensaverOutput();

    // Execute the screensaver command
    // Use executeCommand with clearFirst=false to let command handle display
    // Second parameter false means don't add to history
    void this.terminal.executeCommand(screensaverCommand, false);

    // Update state
    this.state = 'active';

    // Clear the idle timer since we're now active
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  /**
   * Deactivate the screensaver
   * Returns to idle state and restarts the timer
   */
  deactivateScreensaver(): void {
    if (this.state !== 'active') {
      return;
    }

    // Clear screensaver output and stop animations
    this.terminal.clearScreensaver();

    // Update state
    this.state = 'idle';

    // Restart idle timer
    this.resetIdleTimer();
  }

  /**
   * Handle settings changes
   * Restarts the timer with new settings
   */
  handleSettingsChange(): void {
    const enabled = this.isEnabled();

    if (!enabled) {
      // Disable screensaver
      this.state = 'disabled';
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
    } else {
      // Re-enable screensaver
      if (this.state === 'disabled') {
        this.startIdleTimer();
      } else if (this.state === 'idle') {
        // Restart timer with new timeout
        this.resetIdleTimer();
      }
    }
  }

  /**
   * Check if screensaver is enabled
   */
  isEnabled(): boolean {
    return this.settingsManager.getScreensaverEnabled();
  }

  /**
   * Get the configured timeout in milliseconds
   */
  private getTimeoutMs(): number {
    const minutes = this.settingsManager.getScreensaverTimeout();
    return minutes * 60 * 1000; // Convert minutes to milliseconds
  }

  /**
   * Get the configured timeout in minutes
   */
  getTimeout(): number {
    return this.settingsManager.getScreensaverTimeout();
  }

  /**
   * Set whether screensaver is enabled
   */
  setEnabled(enabled: boolean): void {
    this.settingsManager.setScreensaverEnabled(enabled);
    this.handleSettingsChange();
  }

  /**
   * Set the screensaver timeout in minutes
   */
  setTimeout(minutes: number): void {
    // Validate range
    if (
      minutes < SCREENSAVER_CONSTANTS.MIN_TIMEOUT_MINUTES ||
      minutes > SCREENSAVER_CONSTANTS.MAX_TIMEOUT_MINUTES
    ) {
      throw new Error(
        `Timeout must be between ${SCREENSAVER_CONSTANTS.MIN_TIMEOUT_MINUTES} and ${SCREENSAVER_CONSTANTS.MAX_TIMEOUT_MINUTES} minutes`
      );
    }

    this.settingsManager.setScreensaverTimeout(minutes);
    this.handleSettingsChange();
  }

  /**
   * Set the active screensaver command
   */
  setActiveScreensaver(command: string): void {
    this.settingsManager.setActiveScreensaver(command);
  }

  /**
   * Get current screensaver state
   */
  getState(): ScreensaverState {
    return this.state;
  }

  /**
   * Get time since last activity in milliseconds
   */
  getIdleTime(): number {
    return Date.now() - this.lastActivityTime;
  }

  /**
   * Setup Page Visibility API listener
   * Pauses timer when tab is hidden, resumes when visible
   */
  private setupVisibilityListener(): void {
    if (typeof document === 'undefined') {
      return; // Not in browser environment
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Tab is hidden - pause timer
        if (this.idleTimer) {
          clearTimeout(this.idleTimer);
          this.idleTimer = null;
        }
      } else {
        // Tab is visible - resume timer if idle
        if (this.state === 'idle' && this.isEnabled()) {
          this.resetIdleTimer();
        }
      }
    });
  }

  /**
   * Cleanup - stop timer and remove listeners
   * Should be called when the manager is no longer needed
   */
  destroy(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    this.state = 'disabled';
  }
}
