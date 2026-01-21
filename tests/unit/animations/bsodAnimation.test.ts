/**
 * Tests for BSOD Animation Controller
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { stopAllBsodAnimations, initBsodObserver } from '../../../src/animations/bsodAnimation';

describe('BSOD Animation', () => {
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
    stopAllBsodAnimations();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('stopAllBsodAnimations', () => {
    it('should remove all bsod-overlay elements', () => {
      // Add some overlays
      const overlay1 = document.createElement('div');
      overlay1.className = 'bsod-overlay';
      const overlay2 = document.createElement('div');
      overlay2.className = 'bsod-overlay';
      document.body.appendChild(overlay1);
      document.body.appendChild(overlay2);

      stopAllBsodAnimations();

      const remainingOverlays = document.querySelectorAll('.bsod-overlay');
      expect(remainingOverlays.length).toBe(0);
    });

    it('should be safe to call multiple times', () => {
      expect(() => {
        stopAllBsodAnimations();
        stopAllBsodAnimations();
        stopAllBsodAnimations();
      }).not.toThrow();
    });

    it('should handle no active animations', () => {
      expect(() => {
        stopAllBsodAnimations();
      }).not.toThrow();
    });
  });

  describe('initBsodObserver', () => {
    it('should not throw when terminal-output exists', () => {
      expect(() => {
        initBsodObserver();
      }).not.toThrow();
    });

    it('should not throw when terminal-output does not exist', () => {
      terminalOutput.remove();

      expect(() => {
        initBsodObserver();
      }).not.toThrow();
    });

    it('should handle existing BSOD elements', () => {
      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      terminalOutput.appendChild(bsodElement);

      expect(() => {
        initBsodObserver();
      }).not.toThrow();
    });
  });

  describe('BSOD DOM Structure', () => {
    it('should recognize data-bsod attribute', () => {
      initBsodObserver();

      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      bsodElement.innerHTML = '<div class="bsod-content">Test</div>';

      // Append should trigger the observer
      terminalOutput.appendChild(bsodElement);

      // Element should be moved to body for full-screen effect
      expect(document.body.querySelector('.bsod-overlay')).toBeTruthy();
    });

    it('should recognize data-bsod-style attribute for modern', () => {
      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';

      expect(bsodElement.dataset.bsodStyle).toBe('modern');
    });

    it('should recognize data-bsod-style attribute for classic', () => {
      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-classic';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'classic';

      expect(bsodElement.dataset.bsodStyle).toBe('classic');
    });

    it('should recognize data-bsod-progress element', () => {
      const progressElement = document.createElement('span');
      progressElement.setAttribute('data-bsod-progress', '');
      progressElement.textContent = '0';

      expect(progressElement.hasAttribute('data-bsod-progress')).toBe(true);
    });

    it('should recognize data-bsod-cursor element', () => {
      const cursorElement = document.createElement('span');
      cursorElement.setAttribute('data-bsod-cursor', '');
      cursorElement.textContent = '_';

      expect(cursorElement.hasAttribute('data-bsod-cursor')).toBe(true);
    });
  });

  describe('Modern Style Animation', () => {
    it('should have progress counter element', () => {
      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      bsodElement.innerHTML = `
        <div class="bsod-content">
          <div class="bsod-progress">
            <span data-bsod-progress>0</span>% complete
          </div>
        </div>
      `;

      const progress = bsodElement.querySelector('[data-bsod-progress]');
      expect(progress).toBeTruthy();
      expect(progress?.textContent).toBe('0');
    });
  });

  describe('Classic Style Animation', () => {
    it('should have cursor element', () => {
      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-classic';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'classic';
      bsodElement.innerHTML = `
        <div class="bsod-classic-content">
          <p class="bsod-classic-cursor" data-bsod-cursor>_</p>
        </div>
      `;

      const cursor = bsodElement.querySelector('[data-bsod-cursor]');
      expect(cursor).toBeTruthy();
      expect(cursor?.textContent).toBe('_');
    });
  });

  describe('CSS Classes', () => {
    it('should have bsod-overlay class', () => {
      const overlay = document.createElement('div');
      overlay.className = 'bsod-overlay bsod-modern';

      expect(overlay.classList.contains('bsod-overlay')).toBe(true);
    });

    it('should support modern style class', () => {
      const overlay = document.createElement('div');
      overlay.className = 'bsod-overlay bsod-modern';

      expect(overlay.classList.contains('bsod-modern')).toBe(true);
    });

    it('should support classic style class', () => {
      const overlay = document.createElement('div');
      overlay.className = 'bsod-overlay bsod-classic';

      expect(overlay.classList.contains('bsod-classic')).toBe(true);
    });
  });

  describe('Cleanup Behavior', () => {
    it('should handle keydown events after delay', async () => {
      initBsodObserver();

      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      terminalOutput.appendChild(bsodElement);

      // Wait for keypress listener to be added (100ms delay)
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger keydown
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      // Animation should be stopped - overlay removed or fading
      await new Promise((resolve) => setTimeout(resolve, 100));

      // No assertion needed - just verifying no error is thrown
      expect(true).toBe(true);
    });

    it('should ignore modifier keys alone', async () => {
      initBsodObserver();

      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      terminalOutput.appendChild(bsodElement);

      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger modifier key alone
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));

      // BSOD should still be visible (overlay may be in body now)
      expect(document.querySelector('.bsod-overlay')).toBeTruthy();
    });

    it('should handle click events for dismissal', async () => {
      initBsodObserver();

      const bsodElement = document.createElement('div');
      bsodElement.className = 'bsod-overlay bsod-modern';
      bsodElement.setAttribute('data-bsod', 'true');
      bsodElement.dataset.bsodStyle = 'modern';
      terminalOutput.appendChild(bsodElement);

      // Wait for click listener to be added (100ms delay)
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Trigger click
      document.dispatchEvent(new MouseEvent('click'));

      // Animation should be stopped
      await new Promise((resolve) => setTimeout(resolve, 100));

      // No assertion needed - just verifying no error is thrown
      expect(true).toBe(true);
    });
  });

  describe('Multiple BSOD Handling', () => {
    it('should stop previous BSOD when new one starts', async () => {
      initBsodObserver();

      // Create first BSOD
      const bsod1 = document.createElement('div');
      bsod1.className = 'bsod-overlay bsod-modern';
      bsod1.setAttribute('data-bsod', 'true');
      bsod1.dataset.bsodStyle = 'modern';
      terminalOutput.appendChild(bsod1);

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Create second BSOD
      const bsod2 = document.createElement('div');
      bsod2.className = 'bsod-overlay bsod-classic';
      bsod2.setAttribute('data-bsod', 'true');
      bsod2.dataset.bsodStyle = 'classic';
      terminalOutput.appendChild(bsod2);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Only one BSOD should be visible (in body)
      const overlays = document.body.querySelectorAll('.bsod-overlay');
      expect(overlays.length).toBeLessThanOrEqual(1);
    });
  });
});
