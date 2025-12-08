/**
 * Unit tests for ActivityMonitor
 *
 * Tests activity detection, debouncing, and event listener management.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ActivityMonitor } from '../../../../src/utils/screensaver/ActivityMonitor';

describe('ActivityMonitor', () => {
  let activityMonitor: ActivityMonitor;
  let callbackMock: () => void;

  beforeEach(() => {
    // Clear any existing timers
    vi.clearAllTimers();
    vi.useFakeTimers();

    // Create callback mock
    callbackMock = vi.fn() as () => void;

    // Create activity monitor
    activityMonitor = new ActivityMonitor(callbackMock, 100);
  });

  afterEach(() => {
    // Stop monitoring and clean up
    activityMonitor.stop();
    vi.useRealTimers();
  });

  describe('Initialization', () => {
    it('should create an ActivityMonitor instance', () => {
      expect(activityMonitor).toBeInstanceOf(ActivityMonitor);
    });

    it('should not be monitoring initially', () => {
      expect(activityMonitor.isActive()).toBe(false);
    });

    it('should accept custom debounce delay', () => {
      const customCallback = vi.fn() as () => void;
      const customMonitor = new ActivityMonitor(customCallback, 200);
      expect(customMonitor).toBeInstanceOf(ActivityMonitor);
      customMonitor.stop();
    });
  });

  describe('Start and Stop', () => {
    it('should start monitoring when start() is called', () => {
      activityMonitor.start();
      expect(activityMonitor.isActive()).toBe(true);
    });

    it('should stop monitoring when stop() is called', () => {
      activityMonitor.start();
      activityMonitor.stop();
      expect(activityMonitor.isActive()).toBe(false);
    });

    it('should not start twice if already monitoring', () => {
      activityMonitor.start();
      activityMonitor.start(); // Second call should be no-op
      expect(activityMonitor.isActive()).toBe(true);
    });

    it('should not stop twice if already stopped', () => {
      activityMonitor.stop();
      activityMonitor.stop(); // Second call should be no-op
      expect(activityMonitor.isActive()).toBe(false);
    });
  });

  describe('Keyboard Activity Detection', () => {
    it('should detect keydown events', () => {
      activityMonitor.start();

      // Simulate keydown event
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      // Fast-forward past debounce delay
      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('should not detect keydown events when not monitoring', () => {
      // Don't start monitoring

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('should detect multiple keydown events', () => {
      activityMonitor.start();

      // Simulate multiple keydown events with debounce delay between them
      const event1 = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event1);
      vi.advanceTimersByTime(100);

      const event2 = new KeyboardEvent('keydown', { key: 'b' });
      document.dispatchEvent(event2);
      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('Mouse Activity Detection', () => {
    it('should detect click events', () => {
      activityMonitor.start();

      const event = new MouseEvent('click');
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('should not detect click events when not monitoring', () => {
      const event = new MouseEvent('click');
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('should detect multiple click events', () => {
      activityMonitor.start();

      const event1 = new MouseEvent('click');
      document.dispatchEvent(event1);
      vi.advanceTimersByTime(100);

      const event2 = new MouseEvent('click');
      document.dispatchEvent(event2);
      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('Touch Activity Detection', () => {
    it('should detect touchstart events', () => {
      activityMonitor.start();

      const event = new TouchEvent('touchstart');
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('should not detect touchstart events when not monitoring', () => {
      const event = new TouchEvent('touchstart');
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('Debouncing Behavior', () => {
    it('should debounce rapid activity events', () => {
      activityMonitor.start();

      // Simulate rapid events (within debounce window)
      const event1 = new KeyboardEvent('keydown', { key: 'a' });
      const event2 = new KeyboardEvent('keydown', { key: 'b' });
      const event3 = new KeyboardEvent('keydown', { key: 'c' });

      document.dispatchEvent(event1);
      vi.advanceTimersByTime(50); // Not past debounce delay

      document.dispatchEvent(event2);
      vi.advanceTimersByTime(50); // Still not past debounce delay

      document.dispatchEvent(event3);
      vi.advanceTimersByTime(100); // Now past debounce delay

      // Should only call once (last event after debounce delay)
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('should respect custom debounce delay', () => {
      const customCallback = vi.fn() as () => void;
      const customMonitor = new ActivityMonitor(customCallback, 200);
      customMonitor.start();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      // Should not call before debounce delay
      vi.advanceTimersByTime(100);
      expect(customCallback).not.toHaveBeenCalled();

      // Should call after debounce delay
      vi.advanceTimersByTime(100);
      expect(customCallback).toHaveBeenCalledTimes(1);

      customMonitor.stop();
    });

    it('should reset debounce timer on each activity', () => {
      activityMonitor.start();

      // First event
      const event1 = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event1);
      vi.advanceTimersByTime(50);

      // Second event resets timer
      const event2 = new KeyboardEvent('keydown', { key: 'b' });
      document.dispatchEvent(event2);
      vi.advanceTimersByTime(50);

      // Callback not called yet (timer was reset)
      expect(callbackMock).not.toHaveBeenCalled();

      // Complete the debounce delay
      vi.advanceTimersByTime(50);
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Listener Cleanup', () => {
    it('should remove event listeners when stopped', () => {
      activityMonitor.start();
      activityMonitor.stop();

      // Events should not trigger callback after stop
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('should clear pending debounce timer when stopped', () => {
      activityMonitor.start();

      // Trigger event
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      // Stop before debounce completes
      activityMonitor.stop();

      // Fast-forward past debounce delay
      vi.advanceTimersByTime(100);

      // Callback should not be called (timer was cleared)
      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('should be able to restart after stopping', () => {
      activityMonitor.start();
      activityMonitor.stop();
      activityMonitor.start();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mixed Activity Sources', () => {
    it('should detect activity from multiple sources', () => {
      activityMonitor.start();

      // Keyboard event
      const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(keyEvent);
      vi.advanceTimersByTime(100);

      // Mouse event
      const mouseEvent = new MouseEvent('click');
      document.dispatchEvent(mouseEvent);
      vi.advanceTimersByTime(100);

      // Touch event
      const touchEvent = new TouchEvent('touchstart');
      document.dispatchEvent(touchEvent);
      vi.advanceTimersByTime(100);

      expect(callbackMock).toHaveBeenCalledTimes(3);
    });

    it('should debounce mixed activity sources', () => {
      activityMonitor.start();

      // Rapid mixed events
      const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
      const mouseEvent = new MouseEvent('click');
      const touchEvent = new TouchEvent('touchstart');

      document.dispatchEvent(keyEvent);
      vi.advanceTimersByTime(30);

      document.dispatchEvent(mouseEvent);
      vi.advanceTimersByTime(30);

      document.dispatchEvent(touchEvent);
      vi.advanceTimersByTime(100);

      // Should only call once (debounced)
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle callback that throws an error', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Callback error');
      });

      const errorMonitor = new ActivityMonitor(errorCallback, 100);
      errorMonitor.start();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      // The error will be thrown when timer executes
      // We just verify the callback was set up correctly
      expect(() => {
        vi.advanceTimersByTime(100);
      }).toThrow('Callback error');

      errorMonitor.stop();
    });

    it('should handle zero debounce delay', () => {
      const zeroCallback = vi.fn() as () => void;
      const zeroDebounceMonitor = new ActivityMonitor(zeroCallback, 0);
      zeroDebounceMonitor.start();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      vi.advanceTimersByTime(0);

      expect(zeroCallback).toHaveBeenCalledTimes(1);

      zeroDebounceMonitor.stop();
    });
  });
});
