import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FullscreenController } from '../../../src/components/FullscreenController';

const CHROME_IDS = ['terminal-header', 'terminal-nav', 'terminal-input-line'];

function chromeHidden(): boolean[] {
  return CHROME_IDS.map((id) =>
    document.getElementById(id)!.classList.contains('fullscreen-hidden')
  );
}

describe('FullscreenController', () => {
  let exitCommands: string[];
  let controller: FullscreenController;

  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = CHROME_IDS.map((id) => `<div id="${id}"></div>`).join('');
    exitCommands = [];
    controller = new FullscreenController((command) => exitCommands.push(command));
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('hides the chrome on enter and restores it on the next interaction', () => {
    controller.enter();
    expect(chromeHidden()).toEqual([true, true, true]);

    vi.advanceTimersByTime(100); // listeners attach after the guard delay
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(chromeHidden()).toEqual([false, false, false]);
  });

  it('runs the exit command (after a delay) when exiting', () => {
    controller.enter('boot');
    vi.advanceTimersByTime(100);
    document.dispatchEvent(new MouseEvent('click'));

    expect(exitCommands).toEqual([]); // delayed
    vi.advanceTimersByTime(100);
    expect(exitCommands).toEqual(['boot']);
  });

  it('auto-exits after the given duration', () => {
    controller.enter(undefined, 500);
    expect(chromeHidden()).toEqual([true, true, true]);

    vi.advanceTimersByTime(500);
    expect(chromeHidden()).toEqual([false, false, false]);
  });

  it('ignores a second enter while already active', () => {
    controller.enter(); // no exit command
    controller.enter('boot'); // should be ignored, exit command stays null

    vi.advanceTimersByTime(100);
    document.dispatchEvent(new MouseEvent('click'));
    vi.advanceTimersByTime(100);

    expect(exitCommands).toEqual([]);
  });

  it('reset() clears state without restoring chrome or running the command', () => {
    controller.enter('boot');
    controller.reset();

    // Chrome intentionally left hidden for the transition to the next command
    expect(chromeHidden()).toEqual([true, true, true]);

    vi.advanceTimersByTime(200);
    document.dispatchEvent(new MouseEvent('click'));
    vi.advanceTimersByTime(200);

    expect(exitCommands).toEqual([]);
  });
});
