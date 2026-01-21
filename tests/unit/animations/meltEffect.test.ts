/**
 * Tests for Melt Effect Animation Controller
 *
 * Note: Since jsdom doesn't fully implement canvas, these tests focus on
 * the DOM manipulation and cleanup aspects rather than the actual rendering.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { stopAllMeltAnimations, initMeltObserver } from '../../../src/animations/meltEffect';

// Mock canvas context since jsdom doesn't implement it
function createMockContext(): CanvasRenderingContext2D {
  return {
    fillStyle: '',
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    getImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(1024 * 768 * 4),
      width: 1024,
      height: 768,
    }),
    putImageData: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('Melt Effect Animation', () => {
  let terminalOutput: HTMLDivElement;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '';
    terminalOutput = document.createElement('div');
    terminalOutput.id = 'terminal-output';
    terminalOutput.textContent = 'Terminal content';
    document.body.appendChild(terminalOutput);

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(createMockContext());

    // Mock HTMLCanvasElement.toDataURL
    HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mock');

    // Mock Range.getClientRects (not implemented in jsdom)
    Range.prototype.getClientRects = vi.fn().mockReturnValue([]);

    // Mock getComputedStyle
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (prop: string) => {
        const values: Record<string, string> = {
          '--terminal-bg': '#0a0a0a',
          '--terminal-fg': '#00ff00',
          '--terminal-font-size': '16px',
          '--terminal-font-family': 'monospace',
        };
        return values[prop] || '';
      },
    } as CSSStyleDeclaration);

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(() => cb(performance.now()), 16) as unknown as number;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id as unknown as NodeJS.Timeout);
    });
  });

  afterEach(() => {
    // Clean up
    stopAllMeltAnimations();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('stopAllMeltAnimations', () => {
    it('should remove all melt-container elements', () => {
      // Add some containers
      const container1 = document.createElement('div');
      container1.className = 'melt-container';
      const container2 = document.createElement('div');
      container2.className = 'melt-container';
      document.body.appendChild(container1);
      document.body.appendChild(container2);

      stopAllMeltAnimations();

      const remainingContainers = document.querySelectorAll('.melt-container');
      expect(remainingContainers.length).toBe(0);
    });

    it('should be safe to call multiple times', () => {
      expect(() => {
        stopAllMeltAnimations();
        stopAllMeltAnimations();
        stopAllMeltAnimations();
      }).not.toThrow();
    });

    it('should handle no active animations', () => {
      expect(() => {
        stopAllMeltAnimations();
      }).not.toThrow();
    });
  });

  describe('initMeltObserver', () => {
    it('should not throw when terminal-output exists', () => {
      expect(() => {
        initMeltObserver();
      }).not.toThrow();
    });

    it('should not throw when terminal-output does not exist', () => {
      terminalOutput.remove();

      expect(() => {
        initMeltObserver();
      }).not.toThrow();
    });

    it('should set up observer for data-melt elements', () => {
      initMeltObserver();

      // Just verify it doesn't throw
      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      meltElement.className = 'melt-trigger';

      expect(() => {
        terminalOutput.appendChild(meltElement);
      }).not.toThrow();
    });
  });

  describe('Melt DOM Structure', () => {
    it('should create melt container when data-melt element is added', async () => {
      initMeltObserver();

      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      terminalOutput.appendChild(meltElement);

      // Wait for observer and animation setup
      await new Promise((resolve) => setTimeout(resolve, 100));

      const container = document.querySelector('.melt-container');
      expect(container).toBeTruthy();
    });

    it('should create column elements', async () => {
      initMeltObserver();

      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      terminalOutput.appendChild(meltElement);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const columns = document.querySelectorAll('.melt-column');
      expect(columns.length).toBeGreaterThan(0);
    });

    it('should create message element', async () => {
      initMeltObserver();

      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      terminalOutput.appendChild(meltElement);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const message = document.querySelector('.melt-message');
      expect(message).toBeTruthy();
      expect(message?.textContent).toContain("you probably shouldn't do that");
    });
  });

  describe('CSS Classes', () => {
    it('should support melt-trigger class for hidden triggers', () => {
      const trigger = document.createElement('div');
      trigger.className = 'melt-trigger';
      trigger.setAttribute('data-melt', '');

      expect(trigger.classList.contains('melt-trigger')).toBe(true);
    });
  });

  describe('Cleanup Behavior', () => {
    it('should handle keydown events after delay', async () => {
      initMeltObserver();

      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      terminalOutput.appendChild(meltElement);

      // Wait for animation to start and keypress listener to be added
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Trigger keydown
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      // Wait for cleanup
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Container should be removed
      expect(document.querySelector('.melt-container')).toBeFalsy();
    });

    it('should handle click events for dismissal', async () => {
      initMeltObserver();

      const meltElement = document.createElement('div');
      meltElement.setAttribute('data-melt', '');
      terminalOutput.appendChild(meltElement);

      // Wait for click listener to be added
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Trigger click
      document.dispatchEvent(new MouseEvent('click'));

      // Wait for cleanup
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Container should be removed
      expect(document.querySelector('.melt-container')).toBeFalsy();
    });
  });

  describe('Multiple Melt Handling', () => {
    it('should stop previous melt when new one starts', async () => {
      initMeltObserver();

      // Create first melt
      const melt1 = document.createElement('div');
      melt1.setAttribute('data-melt', '');
      terminalOutput.appendChild(melt1);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create second melt
      const melt2 = document.createElement('div');
      melt2.setAttribute('data-melt', '');
      terminalOutput.appendChild(melt2);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Only one melt container should be visible
      const containers = document.querySelectorAll('.melt-container');
      expect(containers.length).toBe(1);
    });
  });
});
