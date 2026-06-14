/**
 * Tests for GameController - the fullscreen Polar Tetris overlay lifecycle.
 *
 * The engine's render loop is stubbed (requestAnimationFrame returns without
 * recursing) so these tests focus on overlay construction, key routing, the Esc
 * menu, quit/teardown, and high-score display.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameController } from '../../../src/components/GameController';
import { setupGlobalMocks } from '../../helpers/dom-setup';
import { installCanvasMock } from '../../helpers/mockCanvasContext';
import type { ColorScheme } from '../../../src/types/settings';
import type { ThemeManager } from '../../../src/utils/ThemeManager';
import type { Mock } from 'vitest';

const COLOR_SCHEME: ColorScheme = {
  '--terminal-bg': '#000',
  '--terminal-fg': '#0f0',
  '--terminal-accent': '#0ff',
  '--terminal-dim': '#080',
  '--terminal-error': '#f00',
  '--terminal-cursor': '#0f0',
  '--terminal-bg-secondary': '#111',
};

function makeThemeManager(): ThemeManager {
  return { getCurrentColors: () => ({ ...COLOR_SCHEME }) } as unknown as ThemeManager;
}

function key(k: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key: k, cancelable: true, bubbles: true });
}

function menuButton(text: string): HTMLButtonElement {
  const btns = Array.from(document.querySelectorAll<HTMLButtonElement>('.pt-menu .pt-menu-btn'));
  const btn = btns.find((b) => b.textContent === text);
  if (!btn) throw new Error(`menu button "${text}" not found`);
  return btn;
}

function menuEl(): HTMLElement {
  const el = document.querySelector<HTMLElement>('.pt-menu');
  if (!el) throw new Error('menu element not found');
  return el;
}

describe('GameController', () => {
  let controller: GameController;
  let refocus: Mock<() => void>;

  beforeEach(() => {
    setupGlobalMocks();
    installCanvasMock();
    vi.stubGlobal('requestAnimationFrame', () => 1); // never invoke -> no render recursion
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    localStorage.clear();
    document.body.innerHTML = '<input id="terminal-input" type="text" />';
    refocus = vi.fn<() => void>();
    controller = new GameController(makeThemeManager(), refocus);
  });

  afterEach(() => {
    // Ensure teardown so the spawn interval doesn't leak across tests.
    if (controller.isActive()) {
      document.dispatchEvent(key('Escape'));
      try {
        menuButton('Quit game').click();
      } catch {
        /* already torn down */
      }
    }
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  describe('launch', () => {
    it('creates the overlay and marks the controller active', () => {
      controller.launch();
      expect(controller.isActive()).toBe(true);
      expect(document.querySelector('.pt-overlay')).not.toBeNull();
      expect(document.querySelector('.pt-canvas')).not.toBeNull();
      expect(document.body.classList.contains('pt-active')).toBe(true);
    });

    it('moves focus off the terminal input', () => {
      const input = document.getElementById('terminal-input') as HTMLInputElement;
      input.focus();
      expect(document.activeElement).toBe(input);
      controller.launch();
      expect(document.activeElement).not.toBe(input);
    });

    it('does not create a second overlay when launched twice', () => {
      controller.launch();
      controller.launch();
      expect(document.querySelectorAll('.pt-overlay').length).toBe(1);
    });

    it('shows the persisted high score', () => {
      localStorage.setItem('polartetris.highScore', '4242');
      controller.launch();
      expect(document.querySelector('.pt-best')?.textContent).toBe('BEST 4242');
    });

    it('disables the terminal input so keystrokes cannot leak behind the overlay', () => {
      const input = document.getElementById('terminal-input') as HTMLInputElement;
      expect(input.disabled).toBe(false);
      controller.launch();
      expect(input.disabled).toBe(true);
    });
  });

  describe('key routing', () => {
    it('captures and prevents default for gameplay keys', () => {
      controller.launch();
      const ev = key('ArrowLeft');
      document.dispatchEvent(ev);
      expect(ev.defaultPrevented).toBe(true);
    });

    it('ignores keys it does not handle', () => {
      controller.launch();
      const ev = key('x');
      document.dispatchEvent(ev);
      expect(ev.defaultPrevented).toBe(false);
    });
  });

  describe('Esc menu', () => {
    it('opens the menu (pausing) on Escape', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      expect(menuEl().hidden).toBe(false);
    });

    it('resumes via the menu, hiding it again', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      menuButton('Resume').click();
      expect(menuEl().hidden).toBe(true);
    });

    it('Enter activates the focused (Resume) item', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      document.dispatchEvent(key('Enter'));
      expect(menuEl().hidden).toBe(true);
    });

    it('toggles the sound label from the menu', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      const soundBtn = menuButton('Sound: On');
      soundBtn.click();
      expect(soundBtn.textContent).toBe('Sound: Off');
    });

    it('opens the menu when the tab is hidden', () => {
      controller.launch();
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      expect(menuEl().hidden).toBe(false);
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    });
  });

  describe('quit', () => {
    it('tears down the overlay and refocuses the terminal', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      menuButton('Quit game').click();
      expect(controller.isActive()).toBe(false);
      expect(document.querySelector('.pt-overlay')).toBeNull();
      expect(document.body.classList.contains('pt-active')).toBe(false);
      expect(refocus).toHaveBeenCalledTimes(1);
      expect((document.getElementById('terminal-input') as HTMLInputElement).disabled).toBe(false);
    });
  });

  describe('gameplay key routing', () => {
    it('handles every gameplay key without throwing', () => {
      controller.launch();
      const keys = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp',
        ' ',
        'a',
        'A',
        'o',
        'O',
        'm',
      ];
      for (const k of keys) {
        const ev = key(k);
        document.dispatchEvent(ev);
        expect(ev.defaultPrevented).toBe(true);
      }
    });

    it("'m' toggles sound (mute then unmute)", () => {
      controller.launch();
      document.dispatchEvent(key('m')); // mute
      document.dispatchEvent(key('m')); // unmute (covers the resume path)
      // open the menu to read back the label
      document.dispatchEvent(key('Escape'));
      expect(menuButton('Sound: On')).toBeDefined();
    });

    it('routes a resize event to the game', () => {
      controller.launch();
      expect(() => window.dispatchEvent(new Event('resize'))).not.toThrow();
    });
  });

  describe('menu navigation', () => {
    it('arrows move the selection and Enter activates Restart', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      document.dispatchEvent(key('ArrowDown')); // Resume -> Restart
      document.dispatchEvent(key('Enter')); // activate Restart
      expect(menuEl().hidden).toBe(true);
      expect(controller.isActive()).toBe(true);
    });

    it('wraps selection upward and resumes with q', () => {
      controller.launch();
      document.dispatchEvent(key('Escape'));
      document.dispatchEvent(key('ArrowUp')); // wraps to last item
      document.dispatchEvent(key('q')); // resume
      expect(menuEl().hidden).toBe(true);
    });
  });

  describe('touch controls', () => {
    function touchButton(aria: string): HTMLButtonElement {
      const btn = document.querySelector<HTMLButtonElement>(`.pt-touch-btn[aria-label="${aria}"]`);
      if (!btn) throw new Error(`touch button "${aria}" not found`);
      return btn;
    }

    it('movement buttons act during play', () => {
      controller.launch();
      expect(() => {
        touchButton('Move right').dispatchEvent(
          new Event('pointerdown', { bubbles: true, cancelable: true })
        );
      }).not.toThrow();
    });

    it('the menu button opens the menu', () => {
      controller.launch();
      touchButton('Menu').dispatchEvent(
        new Event('pointerdown', { bubbles: true, cancelable: true })
      );
      expect(menuEl().hidden).toBe(false);
    });
  });
});
