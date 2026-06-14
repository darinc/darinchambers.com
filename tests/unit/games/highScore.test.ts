/**
 * Tests for Polar Tetris high-score persistence.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadHighScore, saveHighScore } from '../../../src/games/polarTetris/highScore';

describe('highScore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('returns 0 when nothing is stored', () => {
    expect(loadHighScore()).toBe(0);
  });

  it('persists a new best and reads it back', () => {
    expect(saveHighScore(1500)).toBe(1500);
    expect(loadHighScore()).toBe(1500);
  });

  it('does not lower the stored best', () => {
    saveHighScore(1500);
    expect(saveHighScore(900)).toBe(1500);
    expect(loadHighScore()).toBe(1500);
  });

  it('ignores a non-numeric stored value', () => {
    localStorage.setItem('polartetris.highScore', 'not-a-number');
    expect(loadHighScore()).toBe(0);
  });

  it('treats a stored 0 as no record', () => {
    localStorage.setItem('polartetris.highScore', '0');
    expect(loadHighScore()).toBe(0);
  });

  it('returns 0 when localStorage.getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadHighScore()).toBe(0);
  });

  it('does not throw when localStorage.setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => saveHighScore(2000)).not.toThrow();
  });
});
