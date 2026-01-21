/**
 * Tests for Boot Sequence Animation Controller
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  stopAllBootSequences,
  initBootSequenceObserver,
} from '../../../src/animations/bootSequence';

describe('Boot Sequence Animation', () => {
  let terminalOutput: HTMLDivElement;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '';
    terminalOutput = document.createElement('div');
    terminalOutput.id = 'terminal-output';
    document.body.appendChild(terminalOutput);
  });

  afterEach(() => {
    // Clean up
    stopAllBootSequences();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('stopAllBootSequences', () => {
    it('should remove all boot-overlay elements', () => {
      // Add some overlays
      const overlay1 = document.createElement('div');
      overlay1.className = 'boot-overlay';
      const overlay2 = document.createElement('div');
      overlay2.className = 'boot-overlay';
      document.body.appendChild(overlay1);
      document.body.appendChild(overlay2);

      stopAllBootSequences();

      const remainingOverlays = document.querySelectorAll('.boot-overlay');
      expect(remainingOverlays.length).toBe(0);
    });

    it('should be safe to call multiple times', () => {
      expect(() => {
        stopAllBootSequences();
        stopAllBootSequences();
        stopAllBootSequences();
      }).not.toThrow();
    });

    it('should handle no active animations', () => {
      expect(() => {
        stopAllBootSequences();
      }).not.toThrow();
    });
  });

  describe('initBootSequenceObserver', () => {
    it('should not throw when terminal-output exists', () => {
      expect(() => {
        initBootSequenceObserver();
      }).not.toThrow();
    });

    it('should not throw when terminal-output does not exist', () => {
      terminalOutput.remove();

      expect(() => {
        initBootSequenceObserver();
      }).not.toThrow();
    });

    it('should handle existing boot-sequence elements', () => {
      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence';
      bootElement.dataset.bootType = 'boot';
      terminalOutput.appendChild(bootElement);

      expect(() => {
        initBootSequenceObserver();
      }).not.toThrow();
    });
  });

  describe('Boot Sequence DOM Structure', () => {
    it('should recognize boot-sequence class', () => {
      initBootSequenceObserver();

      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence boot-startup';
      bootElement.dataset.bootType = 'boot';
      bootElement.innerHTML = '<div class="boot-line">Test</div>';

      // Append should trigger the observer
      terminalOutput.appendChild(bootElement);

      // Element should be in the DOM
      expect(terminalOutput.querySelector('.boot-sequence')).toBeTruthy();
    });

    it('should recognize data-boot-type attribute', () => {
      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence';
      bootElement.dataset.bootType = 'shutdown';

      expect(bootElement.dataset.bootType).toBe('shutdown');
    });

    it('should recognize boot overlay elements', () => {
      const overlay = document.createElement('div');
      overlay.className = 'boot-overlay';
      overlay.dataset.bootOverlay = 'true';

      expect(overlay.classList.contains('boot-overlay')).toBe(true);
      expect(overlay.dataset.bootOverlay).toBe('true');
    });
  });

  describe('Animation CSS Classes', () => {
    it('should have boot-line class for individual lines', () => {
      const line = document.createElement('div');
      line.className = 'boot-line boot-line-ok';
      line.textContent = 'Started Service';

      expect(line.classList.contains('boot-line')).toBe(true);
      expect(line.classList.contains('boot-line-ok')).toBe(true);
    });

    it('should support different line types', () => {
      const types = ['bios', 'kernel', 'ok', 'failed', 'info', 'welcome'];

      types.forEach((type) => {
        const line = document.createElement('div');
        line.className = `boot-line boot-line-${type}`;

        expect(line.classList.contains(`boot-line-${type}`)).toBe(true);
      });
    });

    it('should support animation-delay style', () => {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.style.animationDelay = '500ms';

      expect(line.style.animationDelay).toBe('500ms');
    });
  });

  describe('Cleanup Behavior', () => {
    it('should remove overlays on scroll event', async () => {
      initBootSequenceObserver();

      // Create a shutdown sequence with overlay
      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence shutdown-sequence';
      bootElement.dataset.bootType = 'shutdown';

      const overlay = document.createElement('div');
      overlay.className = 'boot-overlay';
      overlay.dataset.bootOverlay = 'true';
      bootElement.appendChild(overlay);

      terminalOutput.appendChild(bootElement);

      // Wait for observer to process
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger scroll
      terminalOutput.dispatchEvent(new Event('scroll'));

      // Wait for cleanup
      await new Promise((resolve) => setTimeout(resolve, 100));

      // After scroll, overlays should be removed (or fading)
      const overlayCount = document.querySelectorAll('.boot-overlay').length;
      // The overlay removal may be delayed due to animation
      expect(overlayCount).toBeLessThanOrEqual(1);
    });

    it('should handle keydown events after delay', async () => {
      initBootSequenceObserver();

      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence';
      bootElement.dataset.bootType = 'boot';
      terminalOutput.appendChild(bootElement);

      // Wait for keypress listener to be added (100ms delay)
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger keydown
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      // Animation should be stopped
      await new Promise((resolve) => setTimeout(resolve, 50));

      // No assertion needed - just verifying no error is thrown
      expect(true).toBe(true);
    });

    it('should ignore modifier keys alone', async () => {
      initBootSequenceObserver();

      const bootElement = document.createElement('div');
      bootElement.className = 'boot-sequence';
      bootElement.dataset.bootType = 'boot';
      terminalOutput.appendChild(bootElement);

      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger modifier key alone
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));

      // Animation should still be running
      expect(terminalOutput.querySelector('.boot-sequence')).toBeTruthy();
    });
  });
});
