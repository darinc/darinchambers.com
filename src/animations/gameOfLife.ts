/**
 * Conway's Game of Life Animation Controller
 *
 * Implements Conway's Game of Life cellular automaton with:
 * - Toroidal topology (wrapping edges)
 * - Classic rules: birth (3 neighbors), survival (2-3), death (otherwise)
 * - Canvas-based rendering with theme integration
 * - requestAnimationFrame loop for smooth animation
 */

// Cell states: 0=dead, 1=alive, 2=newly born (for visual effects)
type CellState = 0 | 1 | 2;

interface LifeGrid {
  width: number;
  height: number;
  cells: Uint8Array;
  generation: number;
}

interface LifeAnimation {
  animationId: number | null;
  grid: LifeGrid;
  canvas: HTMLCanvasElement;
  speed: number; // Generations per second
  lastUpdate: number;
  cellWidth: number;
  cellHeight: number;
  stopAnimation: () => void;
}

interface ThemeColors {
  accent: string;
  dim: string;
  bg: string;
}

// Map of active animations keyed by canvas element
const activeAnimations = new Map<HTMLElement, LifeAnimation>();

// ============================================================================
// Grid Operations
// ============================================================================

/**
 * Create a new empty grid
 */
export function createGrid(width: number, height: number): LifeGrid {
  return {
    width,
    height,
    cells: new Uint8Array(width * height),
    generation: 0,
  };
}

/**
 * Get cell state at (x, y)
 */
function getCell(grid: LifeGrid, x: number, y: number): CellState {
  return grid.cells[y * grid.width + x] as CellState;
}

/**
 * Set cell state at (x, y)
 */
function setCell(grid: LifeGrid, x: number, y: number, state: CellState): void {
  grid.cells[y * grid.width + x] = state;
}

/**
 * Wrap coordinate to grid bounds (toroidal topology)
 */
function wrap(value: number, max: number): number {
  return ((value % max) + max) % max;
}

/**
 * Count live neighbors (8-way) with toroidal wrapping
 */
function countNeighbors(grid: LifeGrid, x: number, y: number): number {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue; // Skip self
      const nx = wrap(x + dx, grid.width);
      const ny = wrap(y + dy, grid.height);
      if (getCell(grid, nx, ny) > 0) count++; // Any non-zero is alive
    }
  }
  return count;
}

/**
 * Compute next generation using Conway's rules
 */
export function nextGeneration(grid: LifeGrid): LifeGrid {
  const newGrid = createGrid(grid.width, grid.height);
  newGrid.generation = grid.generation + 1;

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const neighbors = countNeighbors(grid, x, y);
      const isAlive = getCell(grid, x, y) > 0;

      if (isAlive) {
        // Survival: 2-3 neighbors
        setCell(newGrid, x, y, neighbors === 2 || neighbors === 3 ? 1 : 0);
      } else {
        // Birth: exactly 3 neighbors (mark as newly born)
        setCell(newGrid, x, y, neighbors === 3 ? 2 : 0);
      }
    }
  }

  return newGrid;
}

// ============================================================================
// Grid Seeding
// ============================================================================

/**
 * Seed grid with random cells
 */
export function seedRandom(grid: LifeGrid, density: number): void {
  for (let i = 0; i < grid.cells.length; i++) {
    grid.cells[i] = Math.random() < density ? 1 : 0;
  }
}

/**
 * Seed grid with a classic pattern
 */
export function seedPattern(grid: LifeGrid, pattern: string): void {
  const cx = Math.floor(grid.width / 2);
  const cy = Math.floor(grid.height / 2);

  switch (pattern) {
    case 'acorn':
      // Acorn: evolves for 5000+ generations
      //   *
      //     *
      // **  ***
      setCell(grid, cx + 1, cy - 1, 1);
      setCell(grid, cx + 3, cy, 1);
      setCell(grid, cx, cy + 1, 1);
      setCell(grid, cx + 1, cy + 1, 1);
      setCell(grid, cx + 4, cy + 1, 1);
      setCell(grid, cx + 5, cy + 1, 1);
      setCell(grid, cx + 6, cy + 1, 1);
      break;

    case 'glider':
      // Glider: classic spaceship
      //   *
      // * *
      //  **
      setCell(grid, cx + 1, cy - 1, 1);
      setCell(grid, cx - 1, cy, 1);
      setCell(grid, cx + 1, cy, 1);
      setCell(grid, cx, cy + 1, 1);
      setCell(grid, cx + 1, cy + 1, 1);
      break;

    case 'blinker':
      // Blinker: simplest oscillator (period 2)
      // ***
      setCell(grid, cx - 1, cy, 1);
      setCell(grid, cx, cy, 1);
      setCell(grid, cx + 1, cy, 1);
      break;

    default:
      // Default to random
      seedRandom(grid, 0.3);
  }
}

// ============================================================================
// Rendering
// ============================================================================

/**
 * Get current theme colors from CSS custom properties
 */
function getThemeColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue('--terminal-accent').trim(),
    dim: styles.getPropertyValue('--terminal-dim').trim(),
    bg: styles.getPropertyValue('--terminal-bg').trim(),
  };
}

/**
 * Render grid to canvas
 */
function renderGrid(
  ctx: CanvasRenderingContext2D,
  grid: LifeGrid,
  colors: ThemeColors,
  cellWidth: number,
  cellHeight: number
): void {
  // Clear canvas
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Render cells
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const state = getCell(grid, x, y);
      if (state === 0) continue; // Skip dead cells

      // Color: newly born = accent (bright), alive = dim
      ctx.fillStyle = state === 2 ? colors.accent : colors.dim;
      ctx.globalAlpha = state === 2 ? 1.0 : 0.7;

      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }

  ctx.globalAlpha = 1.0;
}

// ============================================================================
// Animation Control
// ============================================================================

/**
 * Stop all active Life animations
 */
export function stopAllLifeAnimations(): void {
  activeAnimations.forEach((animation) => {
    animation.stopAnimation();
  });
  activeAnimations.clear();
}

/**
 * Setup cleanup triggers (stop on scroll, new content, or removal)
 */
function setupCleanupTriggers(canvas: HTMLCanvasElement, animation: LifeAnimation): void {
  // Stop on scroll
  const scrollHandler = () => {
    animation.stopAnimation();
  };
  window.addEventListener('scroll', scrollHandler, { once: true });

  // Stop on new terminal output (new .output-line added)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement && node.classList.contains('output-line')) {
            animation.stopAnimation();
            observer.disconnect();
            return;
          }
        }
      }
    }
  });

  const outputDiv = document.querySelector('.terminal-output');
  if (outputDiv) {
    observer.observe(outputDiv, { childList: true });
  }

  // Stop on canvas removal
  const removalObserver = new MutationObserver(() => {
    if (!document.body.contains(canvas)) {
      animation.stopAnimation();
      removalObserver.disconnect();
    }
  });

  removalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Cleanup on stop
  const originalStop = animation.stopAnimation;
  animation.stopAnimation = () => {
    window.removeEventListener('scroll', scrollHandler);
    observer.disconnect();
    removalObserver.disconnect();
    originalStop();
  };
}

/**
 * Start Life animation on a canvas element
 */
export function startLifeAnimation(
  canvas: HTMLCanvasElement,
  speed: number,
  density: number,
  pattern?: string
): void {
  // Stop all previous animations
  stopAllLifeAnimations();

  // Get canvas dimensions
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Parse data attributes if provided
  const dataSpeed = canvas.dataset.speed;
  const dataDensity = canvas.dataset.density;
  const dataPattern = canvas.dataset.pattern;

  const actualSpeed = dataSpeed ? parseFloat(dataSpeed) : speed;
  const actualDensity = dataDensity ? parseFloat(dataDensity) : density;
  const actualPattern = dataPattern ?? pattern;

  // Calculate grid dimensions (cell size ~10px)
  const cellSize = 10;
  const gridWidth = Math.floor(canvas.width / cellSize);
  const gridHeight = Math.floor(canvas.height / cellSize);
  const cellWidth = canvas.width / gridWidth;
  const cellHeight = canvas.height / gridHeight;

  // Initialize grid
  const grid = createGrid(gridWidth, gridHeight);
  if (actualPattern && actualPattern !== 'random') {
    seedPattern(grid, actualPattern);
  } else {
    seedRandom(grid, actualDensity);
  }

  // Create animation state
  const animation: LifeAnimation = {
    animationId: null,
    grid,
    canvas,
    speed: actualSpeed,
    lastUpdate: performance.now(),
    cellWidth,
    cellHeight,
    stopAnimation: () => {
      if (animation.animationId !== null) {
        cancelAnimationFrame(animation.animationId);
        animation.animationId = null;
      }
      activeAnimations.delete(canvas);
    },
  };

  activeAnimations.set(canvas, animation);

  // Render initial state
  const initialColors = getThemeColors();
  renderGrid(ctx, animation.grid, initialColors, animation.cellWidth, animation.cellHeight);

  // Animation loop
  function updateLoop(timestamp: number): void {
    if (!animation.animationId) return;

    const msPerGeneration = 1000 / animation.speed;

    if (timestamp - animation.lastUpdate >= msPerGeneration) {
      animation.grid = nextGeneration(animation.grid);
      const colors = getThemeColors();
      if (ctx) {
        renderGrid(ctx, animation.grid, colors, animation.cellWidth, animation.cellHeight);
      }
      animation.lastUpdate = timestamp;
    }

    animation.animationId = requestAnimationFrame(updateLoop);
  }

  // Start animation
  animation.animationId = requestAnimationFrame(updateLoop);

  // Setup cleanup triggers
  setupCleanupTriggers(canvas, animation);
}

/**
 * Initialize MutationObserver to auto-start animations on .life-grid elements
 */
export function initLifeObserver(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            // Check if the added node is a life grid
            if (node.classList.contains('life-grid') && node instanceof HTMLCanvasElement) {
              startLifeAnimation(node, 2, 0.3);
            }

            // Check children for life grids
            const lifeGrids = node.querySelectorAll<HTMLCanvasElement>('.life-grid');
            if (lifeGrids.length > 0) {
              // Use requestAnimationFrame to ensure DOM is fully ready
              requestAnimationFrame(() => {
                lifeGrids.forEach((canvas) => {
                  startLifeAnimation(canvas, 2, 0.3);
                });
              });
            }
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
