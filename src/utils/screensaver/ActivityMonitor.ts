/**
 * ActivityMonitor Service
 *
 * Monitors user activity across the application to track when the user is active.
 * Uses event delegation at the document level to capture all user interactions.
 * Debounces activity callbacks to avoid excessive function calls.
 */

import type { ActivityCallback } from '../../types/screensaver';

export class ActivityMonitor {
  private callback: ActivityCallback;
  private debounceMs: number;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private isMonitoring = false;

  // Bound event handlers for proper cleanup
  private boundHandleActivity: () => void;

  /**
   * Creates a new ActivityMonitor
   *
   * @param callback - Function to call when activity is detected (debounced)
   * @param debounceMs - Debounce delay in milliseconds (default: 100ms)
   */
  constructor(callback: ActivityCallback, debounceMs = 100) {
    this.callback = callback;
    this.debounceMs = debounceMs;
    this.boundHandleActivity = this.handleActivity.bind(this);
  }

  /**
   * Start monitoring user activity
   */
  start(): void {
    if (this.isMonitoring) {
      return; // Already monitoring
    }

    this.isMonitoring = true;

    // Listen for keyboard events
    document.addEventListener('keydown', this.boundHandleActivity);

    // Listen for mouse clicks
    document.addEventListener('click', this.boundHandleActivity);

    // Listen for touch events (mobile)
    document.addEventListener('touchstart', this.boundHandleActivity, { passive: true });

    // Note: We intentionally do NOT listen to mousemove to avoid over-sensitivity
  }

  /**
   * Stop monitoring user activity and clean up event listeners
   */
  stop(): void {
    if (!this.isMonitoring) {
      return; // Not monitoring
    }

    this.isMonitoring = false;

    // Remove all event listeners
    document.removeEventListener('keydown', this.boundHandleActivity);
    document.removeEventListener('click', this.boundHandleActivity);
    document.removeEventListener('touchstart', this.boundHandleActivity);

    // Clear any pending debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  /**
   * Handle activity events (debounced)
   * This method is called for all monitored events
   */
  private handleActivity(): void {
    // Clear existing debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.callback();
      this.debounceTimer = null;
    }, this.debounceMs);
  }

  /**
   * Check if activity monitoring is currently active
   */
  isActive(): boolean {
    return this.isMonitoring;
  }
}
