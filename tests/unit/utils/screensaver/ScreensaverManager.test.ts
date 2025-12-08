/**
 * Unit tests for ScreensaverManager
 *
 * Tests screensaver activation, deactivation, timer management, and settings integration.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FileSystemService } from '../../../../src/utils/fs/FileSystemService';
import { ScreensaverManager } from '../../../../src/utils/screensaver/ScreensaverManager';
import { SettingsManager } from '../../../../src/utils/SettingsManager';
import type { Terminal } from '../../../../src/components/Terminal';
import type { FileSystemNode } from '../../../../src/utils/fs/types';

describe('ScreensaverManager', () => {
  let screensaverManager: ScreensaverManager;
  let settingsManager: SettingsManager;
  let mockTerminal: Terminal;
  let fs: FileSystemService;

  beforeEach(() => {
    // Clear timers and localStorage
    vi.clearAllTimers();
    vi.useFakeTimers();
    localStorage.clear();

    // Create mock filesystem
    const mockRoot: FileSystemNode = {
      name: '',
      type: 'directory',
      children: new Map([
        [
          'home',
          {
            name: 'home',
            type: 'directory',
            children: new Map([
              [
                'darin',
                {
                  name: 'darin',
                  type: 'directory',
                  children: new Map(),
                },
              ],
            ]),
          },
        ],
      ]),
    };
    fs = new FileSystemService(mockRoot);

    // Create settings manager
    settingsManager = new SettingsManager(fs);

    // Create mock terminal
    mockTerminal = {
      executeCommand: vi.fn(),
    } as unknown as Terminal;

    // Create screensaver manager
    screensaverManager = new ScreensaverManager(settingsManager, mockTerminal);
  });

  afterEach(() => {
    screensaverManager.destroy();
    vi.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create a ScreensaverManager instance', () => {
      expect(screensaverManager).toBeInstanceOf(ScreensaverManager);
    });

    it('should start in idle state', () => {
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should read enabled state from settings', () => {
      expect(screensaverManager.isEnabled()).toBe(true); // Default is true
    });

    it('should read timeout from settings', () => {
      expect(screensaverManager.getTimeout()).toBe(5); // Default is 5 minutes
    });
  });

  describe('Activity Recording', () => {
    it('should reset idle timer on activity', () => {
      screensaverManager.startIdleTimer();

      // Record activity before timeout
      vi.advanceTimersByTime(60000); // 1 minute
      screensaverManager.recordActivity();

      // Advance to where timeout would have occurred
      vi.advanceTimersByTime(240000); // 4 more minutes (total would be 5)

      // Should not have activated (timer was reset)
      expect(screensaverManager.getState()).toBe('idle');
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });

    it('should update last activity time', () => {
      screensaverManager.recordActivity();
      const before = screensaverManager.getIdleTime();

      vi.advanceTimersByTime(5000);
      const after = screensaverManager.getIdleTime();

      // After advancing time, idle time should be greater
      expect(after).toBeGreaterThan(before);

      // Recording activity should reset it
      screensaverManager.recordActivity();
      const afterActivity = screensaverManager.getIdleTime();
      expect(afterActivity).toBeLessThan(after);
    });

    it('should deactivate screensaver if active', () => {
      screensaverManager.startIdleTimer();

      // Trigger screensaver activation
      vi.advanceTimersByTime(5 * 60 * 1000); // 5 minutes
      expect(screensaverManager.getState()).toBe('active');

      // Record activity (should deactivate)
      screensaverManager.recordActivity();

      expect(screensaverManager.getState()).toBe('idle');
    });
  });

  describe('Idle Timer Management', () => {
    it('should start idle timer when enabled', () => {
      screensaverManager.startIdleTimer();
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should not start timer when disabled', () => {
      settingsManager.setScreensaverEnabled(false);
      screensaverManager.startIdleTimer();
      expect(screensaverManager.getState()).toBe('disabled');
    });

    it('should activate screensaver after timeout', () => {
      screensaverManager.startIdleTimer();

      // Fast-forward past timeout (5 minutes)
      vi.advanceTimersByTime(5 * 60 * 1000);

      expect(screensaverManager.getState()).toBe('active');
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('matrix', false);
    });

    it('should not activate if disabled', () => {
      settingsManager.setScreensaverEnabled(false);
      screensaverManager.startIdleTimer();

      vi.advanceTimersByTime(5 * 60 * 1000);

      expect(screensaverManager.getState()).toBe('disabled');
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });

    it('should respect custom timeout', () => {
      settingsManager.setScreensaverTimeout(10); // 10 minutes
      screensaverManager.handleSettingsChange();
      screensaverManager.startIdleTimer();

      // Should not activate at 5 minutes
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('idle');

      // Should activate at 10 minutes
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');
    });
  });

  describe('Screensaver Activation', () => {
    it('should execute configured screensaver command', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('matrix', false);
    });

    it('should execute custom screensaver command', () => {
      settingsManager.setActiveScreensaver('stars');
      screensaverManager.handleSettingsChange();
      screensaverManager.startIdleTimer();

      vi.advanceTimersByTime(5 * 60 * 1000);

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('stars', false);
    });

    it('should set state to active', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);

      expect(screensaverManager.getState()).toBe('active');
    });

    it('should not activate twice if already active', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);

      // Try to activate again
      vi.advanceTimersByTime(5 * 60 * 1000);

      // Should only have called executeCommand once
      expect(mockTerminal.executeCommand).toHaveBeenCalledTimes(1);
    });

    it('should clear idle timer when activated', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);

      // State should be active, not idle
      expect(screensaverManager.getState()).toBe('active');
    });
  });

  describe('Screensaver Deactivation', () => {
    beforeEach(() => {
      // Activate screensaver
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');
    });

    it('should deactivate screensaver', () => {
      screensaverManager.deactivateScreensaver();
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should restart idle timer after deactivation', () => {
      screensaverManager.deactivateScreensaver();

      // Should activate again after timeout
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');
    });

    it('should not deactivate if not active', () => {
      screensaverManager.deactivateScreensaver();
      screensaverManager.deactivateScreensaver(); // Second call

      // Should not throw or cause issues
      expect(screensaverManager.getState()).toBe('idle');
    });
  });

  describe('Settings Integration', () => {
    it('should update state when settings changed', () => {
      screensaverManager.startIdleTimer();
      expect(screensaverManager.getState()).toBe('idle');

      settingsManager.setScreensaverEnabled(false);
      screensaverManager.handleSettingsChange();

      expect(screensaverManager.getState()).toBe('disabled');
    });

    it('should restart timer when timeout changed', () => {
      screensaverManager.startIdleTimer();

      settingsManager.setScreensaverTimeout(2); // 2 minutes
      screensaverManager.handleSettingsChange();

      // Should activate at new timeout (2 minutes)
      vi.advanceTimersByTime(2 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');
    });

    it('should re-enable when settings changed', () => {
      settingsManager.setScreensaverEnabled(false);
      screensaverManager.handleSettingsChange();
      expect(screensaverManager.getState()).toBe('disabled');

      settingsManager.setScreensaverEnabled(true);
      screensaverManager.handleSettingsChange();
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should clear timer when disabled via settings', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(2 * 60 * 1000);

      settingsManager.setScreensaverEnabled(false);
      screensaverManager.handleSettingsChange();

      // Advance past original timeout
      vi.advanceTimersByTime(10 * 60 * 1000);

      // Should not have activated
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });
  });

  describe('Configuration Methods', () => {
    describe('setEnabled', () => {
      it('should enable screensaver', () => {
        screensaverManager.setEnabled(true);
        expect(screensaverManager.isEnabled()).toBe(true);
      });

      it('should disable screensaver', () => {
        screensaverManager.setEnabled(false);
        expect(screensaverManager.isEnabled()).toBe(false);
      });

      it('should update state when disabled', () => {
        screensaverManager.startIdleTimer();
        screensaverManager.setEnabled(false);
        expect(screensaverManager.getState()).toBe('disabled');
      });
    });

    describe('setTimeout', () => {
      it('should set timeout in valid range', () => {
        screensaverManager.setTimeout(10);
        expect(screensaverManager.getTimeout()).toBe(10);
      });

      it('should validate minimum timeout', () => {
        expect(() => screensaverManager.setTimeout(0)).toThrow();
      });

      it('should validate maximum timeout', () => {
        expect(() => screensaverManager.setTimeout(61)).toThrow();
      });

      it('should restart timer with new timeout', () => {
        screensaverManager.startIdleTimer();
        screensaverManager.setTimeout(1);

        // Should activate at 1 minute
        vi.advanceTimersByTime(1 * 60 * 1000);
        expect(screensaverManager.getState()).toBe('active');
      });
    });

    describe('setActiveScreensaver', () => {
      it('should set active screensaver command', () => {
        screensaverManager.setActiveScreensaver('stars');

        screensaverManager.startIdleTimer();
        vi.advanceTimersByTime(5 * 60 * 1000);

        expect(mockTerminal.executeCommand).toHaveBeenCalledWith('stars', false);
      });
    });
  });

  describe('State Management', () => {
    it('should return current state', () => {
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should track idle time', () => {
      const before = screensaverManager.getIdleTime();
      vi.advanceTimersByTime(5000);
      const after = screensaverManager.getIdleTime();

      expect(after).toBeGreaterThan(before);
    });

    it('should reset idle time on activity', () => {
      vi.advanceTimersByTime(5000);
      const before = screensaverManager.getIdleTime();

      screensaverManager.recordActivity();
      const after = screensaverManager.getIdleTime();

      expect(after).toBeLessThan(before);
    });
  });

  describe('Page Visibility Integration', () => {
    it('should pause timer when tab hidden', () => {
      screensaverManager.startIdleTimer();

      // Simulate tab becoming hidden
      Object.defineProperty(document, 'hidden', {
        writable: true,
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event('visibilitychange'));

      // Advance time while hidden
      vi.advanceTimersByTime(10 * 60 * 1000);

      // Should not have activated
      expect(screensaverManager.getState()).toBe('idle');
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });

    it('should resume timer when tab visible', () => {
      screensaverManager.startIdleTimer();

      // Simulate tab becoming hidden
      Object.defineProperty(document, 'hidden', {
        writable: true,
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event('visibilitychange'));

      // Simulate tab becoming visible again
      Object.defineProperty(document, 'hidden', {
        writable: true,
        configurable: true,
        value: false,
      });
      document.dispatchEvent(new Event('visibilitychange'));

      // Should activate after timeout
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');
    });

    it('should not resume timer when tab visible if disabled', () => {
      screensaverManager.startIdleTimer();
      screensaverManager.setEnabled(false);

      // Simulate tab becoming visible
      Object.defineProperty(document, 'hidden', {
        writable: true,
        configurable: true,
        value: false,
      });
      document.dispatchEvent(new Event('visibilitychange'));

      // Should remain disabled
      expect(screensaverManager.getState()).toBe('disabled');
    });
  });

  describe('Cleanup', () => {
    it('should clear timer on destroy', () => {
      screensaverManager.startIdleTimer();
      screensaverManager.destroy();

      // Advance past timeout
      vi.advanceTimersByTime(10 * 60 * 1000);

      // Should not have activated
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });

    it('should set state to disabled on destroy', () => {
      screensaverManager.startIdleTimer();
      screensaverManager.destroy();

      expect(screensaverManager.getState()).toBe('disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle executeCommand throwing error', () => {
      (mockTerminal.executeCommand as ReturnType<typeof vi.fn>).mockImplementation(() => {
        throw new Error('Command execution failed');
      });

      screensaverManager.startIdleTimer();

      // The error will be thrown when the timer executes
      expect(() => {
        vi.advanceTimersByTime(5 * 60 * 1000);
      }).toThrow('Command execution failed');

      // State should remain idle since activation was interrupted by error
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should handle rapid activity recording', () => {
      screensaverManager.startIdleTimer();

      // Record activity many times rapidly
      for (let i = 0; i < 100; i++) {
        screensaverManager.recordActivity();
      }

      // Should not cause issues
      expect(screensaverManager.getState()).toBe('idle');
    });

    it('should handle settings changes while active', () => {
      screensaverManager.startIdleTimer();
      vi.advanceTimersByTime(5 * 60 * 1000);
      expect(screensaverManager.getState()).toBe('active');

      settingsManager.setScreensaverTimeout(10);
      screensaverManager.handleSettingsChange();

      // Should still be active (settings change doesn't deactivate)
      expect(screensaverManager.getState()).toBe('active');
    });
  });
});
