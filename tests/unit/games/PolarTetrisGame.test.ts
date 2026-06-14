/**
 * Tests for the Polar Tetris engine.
 *
 * Game logic is exercised directly (it is independent of the canvas); the render
 * loop is covered separately with a mocked 2D context and manually-driven frames.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  PolarTetrisGame,
  POLAR_TETRIS_CONSTANTS,
} from '../../../src/games/polarTetris/PolarTetrisGame';
import { installCanvasMock } from '../../helpers/mockCanvasContext';
import type {
  ActivePiece,
  GameStats,
  PolarTetrisOptions,
} from '../../../src/games/polarTetris/PolarTetrisGame';

const { S, MAX_PLAYABLE_ROW } = POLAR_TETRIS_CONSTANTS;

const COLORS = { bg: '#000', grid: '#111', text: '#0f0' };

function makeGame(options: Partial<PolarTetrisOptions> = {}): PolarTetrisGame {
  const canvas = document.createElement('canvas');
  return new PolarTetrisGame(canvas, { colors: COLORS, random: () => 0, ...options });
}

describe('PolarTetrisGame', () => {
  beforeEach(() => {
    installCanvasMock(); // jsdom lacks getContext; silence its warning + allow render
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('canMove', () => {
    it('allows movement on an empty board', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 0, s: 0, type: 'I', orientation: 1 }; // horizontal
      expect(game.canMove(piece, 0, 0)).toBe(true);
    });

    it('rejects movement past the innermost playable ring', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: MAX_PLAYABLE_ROW, s: 0, type: 'O', orientation: 0 };
      expect(game.canMove(piece, 1, 0)).toBe(false);
    });

    it('rejects movement into an occupied cell', () => {
      const game = makeGame();
      game.getBoard()[1][0] = 'cyan';
      const piece: ActivePiece = { r: 0, s: 0, type: 'I', orientation: 1 };
      expect(game.canMove(piece, 1, 0)).toBe(false);
    });

    it('wraps sectors around the circle', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 0, s: S - 1, type: 'O', orientation: 0 };
      expect(game.canMove(piece, 0, 1)).toBe(true);
    });
  });

  describe('movePiece', () => {
    it('moves a piece into free space and mutates it', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 0, s: 5, type: 'O', orientation: 0 };
      expect(game.movePiece(piece, 1, 0)).toBe(true);
      expect(piece.r).toBe(1);
    });

    it('returns false and does not move when blocked', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: MAX_PLAYABLE_ROW, s: 5, type: 'O', orientation: 0 };
      expect(game.movePiece(piece, 1, 0)).toBe(false);
      expect(piece.r).toBe(MAX_PLAYABLE_ROW);
    });

    it('wraps the sector index when moving sideways', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 0, s: S - 1, type: 'O', orientation: 0 };
      game.movePiece(piece, 0, 1);
      expect(piece.s).toBe(0);
    });
  });

  describe('rotatePiece', () => {
    it('rotates a T piece clockwise when there is room', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 5, s: 5, type: 'T', orientation: 0 };
      expect(game.rotatePiece(piece, true)).toBe(true);
      expect(piece.orientation).toBe(1);
    });

    it('rotates counter-clockwise (wrapping the orientation index)', () => {
      const game = makeGame();
      const piece: ActivePiece = { r: 5, s: 5, type: 'T', orientation: 0 };
      expect(game.rotatePiece(piece, false)).toBe(true);
      expect(piece.orientation).toBe(3);
    });
  });

  describe('generatePiece', () => {
    it('returns a valid piece on an empty board', () => {
      const game = makeGame();
      const piece = game.generatePiece();
      expect(piece).not.toBeNull();
      expect(piece?.r).toBe(0);
      expect(piece?.s).toBeGreaterThanOrEqual(0);
      expect(piece?.s).toBeLessThan(S);
    });

    it('returns null when the outer ring is full (top-out)', () => {
      const game = makeGame();
      game.getBoard()[0].fill('cyan');
      expect(game.generatePiece()).toBeNull();
    });
  });

  describe('checkRows', () => {
    it('clears a full ring, awards score, and notifies', () => {
      const stats: GameStats[] = [];
      const game = makeGame({ onStatsChange: (s) => stats.push(s) });
      game.getBoard()[MAX_PLAYABLE_ROW].fill('cyan');
      expect(game.checkRows()).toBe(1);
      expect(game.getStats().score).toBe(100);
      expect(game.getStats().rows).toBe(1);
      expect(game.getBoard()[MAX_PLAYABLE_ROW].every((c) => c === null)).toBe(true);
      expect(stats.at(-1)?.score).toBe(100);
    });

    it('returns 0 and leaves the board when no ring is full', () => {
      const game = makeGame();
      game.getBoard()[MAX_PLAYABLE_ROW][0] = 'cyan';
      expect(game.checkRows()).toBe(0);
      expect(game.getStats().score).toBe(0);
    });
  });

  describe('level progression', () => {
    it('advances to level 2 after 10 rings and speeds up the drop', () => {
      const game = makeGame();
      expect(game.getDropInterval()).toBe(1000);
      for (let i = 0; i < 10; i++) {
        game.getBoard()[MAX_PLAYABLE_ROW].fill('cyan');
        game.checkRows();
      }
      expect(game.getStats().rows).toBe(10);
      expect(game.getStats().level).toBe(2);
      expect(game.getDropInterval()).toBe(950);
    });
  });

  describe('player input', () => {
    it('moves the current piece right', () => {
      const game = makeGame();
      game.getActivePieces().push({ r: 0, s: 0, type: 'I', orientation: 1 });
      game.moveRight();
      expect(game.getCurrentPiece()?.s).toBe(1);
    });

    it('hard drop lands the current piece and clears it from play', () => {
      const game = makeGame();
      game.getActivePieces().push({ r: 0, s: 7, type: 'O', orientation: 0 });
      game.hardDrop();
      expect(game.getActivePieces().length).toBe(0);
      const filled = game.getBoard().some((row) => row.some((c) => c !== null));
      expect(filled).toBe(true);
    });

    it('ignores input while paused', () => {
      const game = makeGame();
      game.getActivePieces().push({ r: 0, s: 0, type: 'O', orientation: 0 });
      game.pause();
      game.moveRight();
      expect(game.getCurrentPiece()?.s).toBe(0);
    });

    it('soft drop moves the current piece inward', () => {
      const game = makeGame();
      game.getActivePieces().push({ r: 0, s: 3, type: 'O', orientation: 0 });
      game.softDrop();
      expect(game.getCurrentPiece()?.r).toBe(1);
    });

    it('rotates the current piece counter-clockwise via input', () => {
      const game = makeGame();
      game.getActivePieces().push({ r: 5, s: 5, type: 'T', orientation: 0 });
      game.rotateCCW();
      expect(game.getCurrentPiece()?.orientation).toBe(3);
    });

    it('hard drop is a no-op when there is no active piece', () => {
      const game = makeGame();
      expect(() => game.hardDrop()).not.toThrow();
    });

    it('toggleInvert does not throw', () => {
      const game = makeGame();
      expect(() => game.toggleInvert()).not.toThrow();
    });
  });

  describe('pause / resume', () => {
    it('toggles paused state', () => {
      const game = makeGame();
      expect(game.isPaused()).toBe(false);
      game.togglePause();
      expect(game.isPaused()).toBe(true);
      game.togglePause();
      expect(game.isPaused()).toBe(false);
      game.destroy();
    });

    it('resume after pause clears cleanly', () => {
      const game = makeGame();
      game.pause();
      expect(game.isPaused()).toBe(true);
      game.resume();
      expect(game.isPaused()).toBe(false);
      game.destroy();
    });
  });

  describe('restart', () => {
    it('resets the score and seeds new pieces', () => {
      const game = makeGame();
      game.getBoard()[MAX_PLAYABLE_ROW].fill('cyan');
      game.checkRows();
      expect(game.getStats().score).toBe(100);
      game.restart();
      expect(game.getStats().score).toBe(0);
      expect(game.getActivePieces().length).toBeGreaterThan(0);
      game.destroy();
    });
  });

  describe('game over', () => {
    it('ends the game when a piece cannot spawn', () => {
      const onGameOver = vi.fn();
      const game = makeGame({ onGameOver });
      game.spawnPiece(); // nextPiece is null before seeding -> top-out
      expect(game.isGameOver()).toBe(true);
      expect(onGameOver).toHaveBeenCalledTimes(1);
    });
  });

  describe('render loop', () => {
    it('renders to the canvas across frames and drops over time', () => {
      const frames: ((t: number) => void)[] = [];
      vi.stubGlobal('requestAnimationFrame', (cb: (t: number) => void) => {
        frames.push(cb);
        return frames.length;
      });
      vi.stubGlobal('cancelAnimationFrame', vi.fn());

      const ctx = installCanvasMock();
      const game = makeGame();
      game.start();
      expect(frames.length).toBeGreaterThan(0);
      frames[0](0); // first frame seeds the drop clock
      frames[frames.length - 1](5000); // past dropInterval -> triggers a drop + render
      expect((ctx.clearRect as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
      expect((ctx.arc as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
      game.destroy();
    });

    it('renders inverted display, secondary pieces, and a running level-up', () => {
      const frames: ((t: number) => void)[] = [];
      vi.stubGlobal('requestAnimationFrame', (cb: (t: number) => void) => {
        frames.push(cb);
        return frames.length;
      });
      vi.stubGlobal('cancelAnimationFrame', vi.fn());

      const ctx = installCanvasMock();
      const game = makeGame();
      game.start();
      game.toggleInvert(); // covers the inverted radius path in drawCell
      game.getActivePieces().push({ r: 2, s: 10, type: 'T', orientation: 0 }); // 2nd piece -> gray
      game.getBoard()[MAX_PLAYABLE_ROW][4] = 'red'; // covers drawBoard
      // Level up while the spawn timer is live -> updateLevel restarts the timer.
      for (let i = 0; i < 10; i++) {
        game.getBoard()[MAX_PLAYABLE_ROW].fill('cyan');
        game.checkRows();
      }
      expect(game.getStats().level).toBe(2);
      frames[0](0);
      frames[frames.length - 1](5000);
      expect((ctx.fillText as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
      game.destroy();
    });

    it('is safe to destroy before starting', () => {
      const game = makeGame();
      expect(() => game.destroy()).not.toThrow();
    });

    it('resizes the canvas backing store from the viewport', () => {
      const canvas = document.createElement('canvas');
      const game = new PolarTetrisGame(canvas, { colors: COLORS, random: () => 0 });
      game.resize();
      expect(canvas.width).toBeGreaterThan(0);
      expect(canvas.height).toBe(canvas.width);
    });
  });
});
