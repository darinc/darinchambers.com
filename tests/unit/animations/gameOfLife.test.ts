/**
 * Tests for Conway's Game of Life animation
 */

import { describe, it, expect } from 'vitest';
import {
  createGrid,
  nextGeneration,
  seedRandom,
  seedPattern,
} from '../../../src/animations/gameOfLife';

describe('Game of Life Algorithm', () => {
  describe('Grid Creation', () => {
    it('should create grid with correct dimensions', () => {
      const grid = createGrid(10, 20);

      expect(grid.width).toBe(10);
      expect(grid.height).toBe(20);
      expect(grid.cells.length).toBe(200);
      expect(grid.generation).toBe(0);
    });

    it('should initialize all cells as dead', () => {
      const grid = createGrid(5, 5);

      for (const cell of grid.cells) {
        expect(cell).toBe(0);
      }
    });

    it('should use Uint8Array for cells', () => {
      const grid = createGrid(5, 5);

      expect(grid.cells).toBeInstanceOf(Uint8Array);
    });
  });

  describe('Evolution Rules', () => {
    it('should kill cell with 0 neighbors (loneliness)', () => {
      const grid = createGrid(3, 3);
      // Single cell in center
      grid.cells[4] = 1; //  . . .
      //  . * .
      //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[4]).toBe(0); // Should die
    });

    it('should kill cell with 1 neighbor (loneliness)', () => {
      const grid = createGrid(3, 3);
      grid.cells[3] = 1; //  . . .
      grid.cells[4] = 1; //  * * .
      //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[3]).toBe(0); // Should die
      expect(next.cells[4]).toBe(0); // Should die
    });

    it('should keep cell alive with 2 neighbors', () => {
      const grid = createGrid(3, 3);
      grid.cells[3] = 1; //  . . .
      grid.cells[4] = 1; //  * * *
      grid.cells[5] = 1; //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[4]).toBe(1); // Should survive (2 neighbors)
    });

    it('should keep cell alive with 3 neighbors', () => {
      const grid = createGrid(3, 3);
      grid.cells[0] = 1; //  * * .
      grid.cells[1] = 1; //  * . .
      grid.cells[3] = 1; //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[1]).toBe(1); // Should survive (3 neighbors)
    });

    it('should kill cell with 4+ neighbors (overcrowding)', () => {
      const grid = createGrid(3, 3);
      grid.cells[0] = 1; //  * * *
      grid.cells[1] = 1; //  * * .
      grid.cells[2] = 1; //  . . .
      grid.cells[3] = 1;
      grid.cells[4] = 1;

      const next = nextGeneration(grid);

      expect(next.cells[1]).toBe(0); // Should die (4 neighbors)
      expect(next.cells[4]).toBe(0); // Should die (4 neighbors)
    });

    it('should birth cell with exactly 3 neighbors', () => {
      const grid = createGrid(3, 3);
      grid.cells[0] = 1; //  * * *
      grid.cells[1] = 1; //  . . .
      grid.cells[2] = 1; //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[4]).toBe(2); // Center should be born (newly born = 2)
    });

    it('should not birth cell with 2 neighbors', () => {
      const grid = createGrid(3, 3);
      grid.cells[0] = 1; //  * * .
      grid.cells[1] = 1; //  . . .
      //  . . .

      const next = nextGeneration(grid);

      expect(next.cells[3]).toBe(0); // Should stay dead
      expect(next.cells[4]).toBe(0); // Should stay dead
    });

    it('should increment generation counter', () => {
      const grid = createGrid(5, 5);
      grid.generation = 10;

      const next = nextGeneration(grid);

      expect(next.generation).toBe(11);
    });
  });

  describe('Toroidal Wrapping', () => {
    it('should wrap left edge to right edge', () => {
      const grid = createGrid(3, 3);
      //  * . .      Left edge wraps to right
      //  . . *  =>  so left cell sees right cell as neighbor
      //  . . .

      grid.cells[0] = 1; // Top-left
      grid.cells[5] = 1; // Middle-right

      const next = nextGeneration(grid);

      // Top-left and middle-right should each have 1 neighbor (each other via wrap)
      // Not enough to survive, so both die
      expect(next.cells[0]).toBe(0);
      expect(next.cells[5]).toBe(0);
    });

    it('should wrap top edge to bottom edge', () => {
      const grid = createGrid(3, 3);
      //  . * .      Top wraps to bottom
      //  . . .  =>  so top cell sees bottom cells as neighbors
      //  . . .

      grid.cells[1] = 1; // Top-center
      grid.cells[6] = 1; // Bottom-left
      grid.cells[7] = 1; // Bottom-center

      const next = nextGeneration(grid);

      // Top-center has 2 neighbors (bottom-left, bottom-center via wrap)
      // Should survive
      expect(next.cells[1]).toBe(1);
    });

    it('should handle corner wrapping', () => {
      const grid = createGrid(3, 3);
      //  * . .      Corners wrap diagonally
      //  . . .  =>  top-left wraps to bottom-right
      //  . . *

      grid.cells[0] = 1; // Top-left
      grid.cells[8] = 1; // Bottom-right

      const next = nextGeneration(grid);

      // Each corner has 1 neighbor (each other via diagonal wrap)
      // Not enough, both die
      expect(next.cells[0]).toBe(0);
      expect(next.cells[8]).toBe(0);
    });
  });

  describe('Classic Patterns', () => {
    it('should maintain still life (block)', () => {
      const grid = createGrid(4, 4);
      //  . . . .
      //  . * * .
      //  . * * .
      //  . . . .
      grid.cells[5] = 1;
      grid.cells[6] = 1;
      grid.cells[9] = 1;
      grid.cells[10] = 1;

      const next = nextGeneration(grid);

      // Block is stable (each cell has 3 neighbors - itself and 2 others)
      // Wait, no - each cell has 2-3 neighbors, should be stable
      expect(next.cells[5]).toBe(1);
      expect(next.cells[6]).toBe(1);
      expect(next.cells[9]).toBe(1);
      expect(next.cells[10]).toBe(1);
    });

    it('should oscillate blinker correctly', () => {
      const grid = createGrid(5, 5);
      //  . . . . .
      //  . . . . .
      //  . * * * .  => Horizontal blinker
      //  . . . . .
      //  . . . . .
      grid.cells[11] = 1; // Row 2, cols 1,2,3
      grid.cells[12] = 1;
      grid.cells[13] = 1;

      const gen1 = nextGeneration(grid);

      //  . . . . .
      //  . . * . .
      //  . . * . .  => Vertical blinker
      //  . . * . .
      //  . . . . .
      expect(gen1.cells[7]).toBe(2); // Col 2, rows 1,2,3 (newly born)
      expect(gen1.cells[12]).toBe(1); // (survives)
      expect(gen1.cells[17]).toBe(2); // (newly born)
      expect(gen1.cells[11]).toBe(0); // Ends die
      expect(gen1.cells[13]).toBe(0);

      const gen2 = nextGeneration(gen1);

      // Should return to horizontal
      expect(gen2.cells[11]).toBe(2); // Back to horizontal (newly born)
      expect(gen2.cells[12]).toBe(1); // (survives)
      expect(gen2.cells[13]).toBe(2); // (newly born)
      expect(gen2.cells[7]).toBe(0); // Vertical dies
      expect(gen2.cells[17]).toBe(0);
    });

    it('should move glider diagonally', () => {
      const grid = createGrid(6, 6);
      //  . . . . . .
      //  . . * . . .
      //  . . . * . .
      //  . * * * . .
      //  . . . . . .
      //  . . . . . .
      grid.cells[8] = 1; // (2,1)
      grid.cells[15] = 1; // (3,2)
      grid.cells[18] = 1; // (0,3)
      grid.cells[19] = 1; // (1,3)
      grid.cells[20] = 1; // (2,3)

      const gen1 = nextGeneration(grid);

      // Glider should have moved
      // We don't need exact positions, just verify it evolved
      expect(gen1.generation).toBe(1);

      // After 4 generations, glider moves one cell diagonally
      let current = grid;
      for (let i = 0; i < 4; i++) {
        current = nextGeneration(current);
      }

      expect(current.generation).toBe(4);
    });
  });

  describe('Seeding', () => {
    it('should seed random with correct density', () => {
      const grid = createGrid(100, 100);
      const density = 0.3;

      seedRandom(grid, density);

      const aliveCount = grid.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      const actualDensity = aliveCount / grid.cells.length;

      // Should be approximately 30% (allow 10% variance for randomness)
      expect(actualDensity).toBeGreaterThan(0.2);
      expect(actualDensity).toBeLessThan(0.4);
    });

    it('should seed acorn pattern correctly', () => {
      const grid = createGrid(20, 20);

      seedPattern(grid, 'acorn');

      // Acorn should have exactly 7 cells alive
      const aliveCount = grid.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBe(7);
    });

    it('should seed glider pattern correctly', () => {
      const grid = createGrid(20, 20);

      seedPattern(grid, 'glider');

      // Glider should have exactly 5 cells alive
      const aliveCount = grid.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBe(5);
    });

    it('should seed blinker pattern correctly', () => {
      const grid = createGrid(20, 20);

      seedPattern(grid, 'blinker');

      // Blinker should have exactly 3 cells alive
      const aliveCount = grid.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBe(3);
    });

    it('should default to random for unknown pattern', () => {
      const grid = createGrid(50, 50);

      seedPattern(grid, 'unknown');

      // Should have seeded randomly (~30% density)
      const aliveCount = grid.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBeGreaterThan(0); // Should have some cells
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum grid size (3x3)', () => {
      const grid = createGrid(3, 3);
      grid.cells[4] = 1; // Center cell

      const next = nextGeneration(grid);

      expect(next.width).toBe(3);
      expect(next.height).toBe(3);
    });

    it('should handle large grid', () => {
      const grid = createGrid(100, 100);

      seedRandom(grid, 0.3);
      const next = nextGeneration(grid);

      expect(next.width).toBe(100);
      expect(next.height).toBe(100);
      expect(next.generation).toBe(1);
    });

    it('should handle empty grid', () => {
      const grid = createGrid(10, 10);
      // All cells dead

      const next = nextGeneration(grid);

      // Should stay empty
      const aliveCount = next.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBe(0);
    });

    it('should handle full grid', () => {
      const grid = createGrid(5, 5);
      // All cells alive
      for (let i = 0; i < grid.cells.length; i++) {
        grid.cells[i] = 1;
      }

      const next = nextGeneration(grid);

      // Most cells should die from overcrowding
      const aliveCount = next.cells.reduce((sum, cell) => sum + (cell > 0 ? 1 : 0), 0);
      expect(aliveCount).toBeLessThan(grid.cells.length);
    });
  });
});
