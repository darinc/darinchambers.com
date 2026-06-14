/**
 * PolarTetrisGame - a Tetris variant played on a polar (radial) grid.
 *
 * Faithful port of the original `polarblocks.html` prototype: pieces fall inward
 * along concentric rings, a spawn timer drops MULTIPLE concurrent pieces, and the
 * drop/rotate/line-clear/level logic is preserved verbatim. The engine is wrapped
 * in a class so the terminal's GameController can own its lifecycle, and rendering
 * is isolated from logic so the game rules can be unit-tested without a canvas.
 *
 * Coordinates: `r` is the ring (0 = outer edge, larger = closer to centre), `s` is
 * the angular sector (0..S-1, wrapping). Only rings 0..MAX_PLAYABLE_ROW are playable.
 */

/** Grid: number of rings. */
const R = 24;
/** Grid: number of angular sectors. */
const S = 30;
/** Highest playable ring index (rings beyond this are the inner dead zone). */
const MAX_PLAYABLE_ROW = 17;

/** A board cell holds a colour string when filled, or null when empty. */
type Cell = string | null;

/** The seven standard tetromino identifiers. */
export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

/** Offset of a single block from a piece's origin, as [dRing, dSector]. */
type Offset = readonly [number, number];

/** Definition of a tetromino: its colour and per-orientation block offsets. */
interface PieceDef {
  readonly color: string;
  readonly orientations: readonly (readonly Offset[])[];
}

/** A live, falling piece. */
export interface ActivePiece {
  r: number;
  s: number;
  type: PieceType;
  orientation: number;
}

/** Snapshot of the player-facing counters. */
export interface GameStats {
  score: number;
  level: number;
  rows: number;
}

/** Theme colours pulled from the active terminal theme. */
export interface PolarTetrisColors {
  bg: string;
  grid: string;
  text: string;
}

/**
 * Sound hooks. The engine fires these at gameplay events; the implementation
 * (WebAudio) lives elsewhere so the engine stays testable. All optional.
 */
export interface GameSound {
  move(): void;
  rotate(): void;
  lock(): void;
  clear(lines: number): void;
  levelUp(): void;
  gameOver(): void;
}

/** Construction options. */
export interface PolarTetrisOptions {
  colors: PolarTetrisColors;
  sound?: GameSound;
  /** Injectable RNG for deterministic tests. Defaults to Math.random. */
  random?: () => number;
  /** Fired whenever score/level/rows change. */
  onStatsChange?: (stats: GameStats) => void;
  /** Fired once when the board tops out. */
  onGameOver?: (stats: GameStats) => void;
}

const PIECES: Record<PieceType, PieceDef> = {
  I: {
    color: 'cyan',
    orientations: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [-3, 0],
      ],
      [
        [0, 0],
        [0, -1],
        [0, -2],
        [0, -3],
      ],
    ],
  },
  O: {
    color: 'yellow',
    orientations: [
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    ],
  },
  T: {
    color: 'purple',
    orientations: [
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [-1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, -1],
      ],
    ],
  },
  S: {
    color: 'green',
    orientations: [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, -1],
        [2, -1],
      ],
    ],
  },
  Z: {
    color: 'red',
    orientations: [
      [
        [0, 0],
        [0, 1],
        [1, -1],
        [1, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
    ],
  },
  J: {
    color: 'blue',
    orientations: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, -1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [-2, 1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, -2],
        [-1, -2],
      ],
    ],
  },
  L: {
    color: 'orange',
    orientations: [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [-1, 2],
      ],
      [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [-2, -1],
      ],
      [
        [0, 0],
        [0, -1],
        [0, -2],
        [1, -2],
      ],
    ],
  },
};

const PIECE_TYPES = Object.keys(PIECES) as PieceType[];

const BASE_DROP_INTERVAL = 1000;
const BASE_SPAWN_INTERVAL = 4000;

export class PolarTetrisGame {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly colors: PolarTetrisColors;
  private readonly sound?: GameSound;
  private readonly random: () => number;
  private readonly onStatsChange?: (stats: GameStats) => void;
  private readonly onGameOver?: (stats: GameStats) => void;

  // Geometry (recomputed on resize).
  private size = 0;
  private center = 0;
  private radiusStep = 0;

  // Board + pieces.
  private board: Cell[][] = [];
  private activePieces: ActivePiece[] = [];
  private currentPieceIndex = 0;
  private nextPiece: ActivePiece | null = null;

  // Counters.
  private score = 0;
  private rowsCleared = 0;
  private level = 1;

  // Timing.
  private dropInterval = BASE_DROP_INTERVAL;
  private currentSpawnInterval = BASE_SPAWN_INTERVAL;
  private lastDropTime = 0;
  private resetDropClock = true;
  private spawnTimer: ReturnType<typeof setInterval> | null = null;
  private animationId: number | null = null;

  // Display flags.
  private paused = false;
  private gameOver = false;
  private destroyed = false;
  private isInvertedDisplay = false;
  private showGrid = true;

  constructor(canvas: HTMLCanvasElement, options: PolarTetrisOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.colors = options.colors;
    this.sound = options.sound;
    this.random = options.random ?? Math.random;
    this.onStatsChange = options.onStatsChange;
    this.onGameOver = options.onGameOver;
    this.resetBoardState();
    this.resize();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  /** Initialise board + pieces and start the render and spawn loops. */
  start(): void {
    this.resetBoardState();
    this.seedInitialPieces();
    this.startSpawnTimer();
    this.resetDropClock = true;
    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  /** Tear everything down: cancel RAF, clear timers, no dangling state. */
  destroy(): void {
    this.destroyed = true;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.clearSpawnTimer();
  }

  /** Restart a fresh game in place (used by the menu's "Restart"). */
  restart(): void {
    this.resetBoardState();
    this.gameOver = false;
    this.paused = false;
    this.seedInitialPieces();
    this.startSpawnTimer();
    this.resetDropClock = true;
    this.emitStats();
  }

  /** Pause play (stops the spawn timer); rendering continues. */
  pause(): void {
    if (this.paused || this.gameOver) return;
    this.paused = true;
    this.clearSpawnTimer();
  }

  /** Resume play after a pause. */
  resume(): void {
    if (!this.paused || this.gameOver) return;
    this.paused = false;
    this.startSpawnTimer();
    this.resetDropClock = true;
  }

  togglePause(): void {
    if (this.paused) this.resume();
    else this.pause();
  }

  isPaused(): boolean {
    return this.paused;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getStats(): GameStats {
    return { score: this.score, level: this.level, rows: this.rowsCleared };
  }

  /** Recompute canvas backing store + polar geometry for the current viewport. */
  resize(): void {
    const dpr =
      typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 900;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    const size = Math.max(240, Math.floor(Math.min(vw, vh) * 0.9));

    this.size = size;
    this.center = size / 2;
    this.radiusStep = size / 2 / R;

    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // ---------------------------------------------------------------------------
  // Player input (called by the controller). All no-op when paused/over.
  // ---------------------------------------------------------------------------

  moveLeft(): void {
    this.applyMove(0, -1, true);
  }

  moveRight(): void {
    this.applyMove(0, 1, true);
  }

  softDrop(): void {
    this.applyMove(1, 0, false);
  }

  hardDrop(): void {
    const piece = this.getCurrentPiece();
    if (!this.canInput() || !piece) return;
    while (this.movePiece(piece, 1, 0)) {
      /* fall to the bottom */
    }
    this.landPiece(piece);
  }

  rotateCW(): void {
    this.applyRotate(true);
  }

  rotateCCW(): void {
    this.applyRotate(false);
  }

  toggleInvert(): void {
    this.isInvertedDisplay = !this.isInvertedDisplay;
  }

  private applyMove(dr: number, ds: number, isHorizontal: boolean): void {
    const piece = this.getCurrentPiece();
    if (!this.canInput() || !piece) return;
    if (this.movePiece(piece, dr, ds) && isHorizontal) {
      this.sound?.move();
    }
  }

  private applyRotate(clockwise: boolean): void {
    const piece = this.getCurrentPiece();
    if (!this.canInput() || !piece) return;
    if (this.rotatePiece(piece, clockwise)) {
      this.sound?.rotate();
    }
  }

  private canInput(): boolean {
    return !this.paused && !this.gameOver && this.activePieces.length > 0;
  }

  getCurrentPiece(): ActivePiece | undefined {
    return this.activePieces[this.currentPieceIndex];
  }

  // ---------------------------------------------------------------------------
  // Game logic (pure of canvas; unit-tested directly)
  // ---------------------------------------------------------------------------

  /** True if `piece` can shift by (dr, ds) without leaving the board or colliding. */
  canMove(piece: ActivePiece, dr: number, ds: number): boolean {
    const { r, s, type, orientation } = piece;
    return PIECES[type].orientations[orientation].every(([odr, ods]) => {
      const nr = r + dr + odr;
      const ns = (s + ds + ods + S) % S;
      if (nr < 0 || nr > MAX_PLAYABLE_ROW) return false;
      return !this.board[nr][ns];
    });
  }

  /** Shift `piece` by (dr, ds) if legal. Returns whether it moved. */
  movePiece(piece: ActivePiece, dr: number, ds: number): boolean {
    if (!this.canMove(piece, dr, ds)) return false;
    piece.r += dr;
    piece.s = (piece.s + ds + S) % S;
    return true;
  }

  /** Rotate `piece` (no wall-kicks, faithful to original). Returns whether it rotated. */
  rotatePiece(piece: ActivePiece, clockwise: boolean): boolean {
    const orientations = PIECES[piece.type].orientations;
    const newOrientation =
      (piece.orientation + (clockwise ? 1 : -1) + orientations.length) % orientations.length;
    const candidate: ActivePiece = { ...piece, orientation: newOrientation };
    if (!this.canMove(candidate, 0, 0)) return false;
    piece.orientation = newOrientation;
    return true;
  }

  /** Settle `piece` into the board, remove it from play, and resolve line clears. */
  landPiece(piece: ActivePiece): void {
    const { r, s, type, orientation } = piece;
    PIECES[type].orientations[orientation].forEach(([dr, ds]) => {
      const nr = r + dr;
      const ns = (s + ds + S) % S;
      if (nr >= 0 && nr <= MAX_PLAYABLE_ROW) this.board[nr][ns] = PIECES[type].color;
    });
    this.activePieces = this.activePieces.filter((p) => p !== piece);
    if (this.currentPieceIndex >= this.activePieces.length) {
      this.currentPieceIndex = this.activePieces.length - 1;
    }
    this.sound?.lock();
    this.checkRows();
  }

  /** Clear any full rings, shift outer rings inward, and update score/level. */
  checkRows(): number {
    let clearedThisTurn = 0;
    for (let r = 0; r <= MAX_PLAYABLE_ROW; r++) {
      if (this.board[r].every((cell) => cell)) {
        clearedThisTurn++;
        this.board[r].fill(null);
        for (let rr = r - 1; rr >= 0; rr--) this.board[rr + 1] = [...this.board[rr]];
        this.board[0].fill(null);
      }
    }
    if (clearedThisTurn > 0) {
      this.rowsCleared += clearedThisTurn;
      this.score += 100 * clearedThisTurn;
      this.sound?.clear(clearedThisTurn);
      this.updateLevel();
      this.emitStats();
    }
    return clearedThisTurn;
  }

  /** Recompute level from rows cleared and speed up drop/spawn cadence. */
  updateLevel(): void {
    const newLevel = Math.floor(this.rowsCleared / 10) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
      this.currentSpawnInterval = Math.max(500, BASE_SPAWN_INTERVAL - 200 * (this.level - 1));
      if (this.spawnTimer !== null) this.startSpawnTimer();
      this.dropInterval = Math.max(50, BASE_DROP_INTERVAL - 50 * (this.level - 1));
      this.sound?.levelUp();
    }
  }

  /** Pick a random tetromino in a random sector that has room, or null if topped out. */
  generatePiece(): ActivePiece | null {
    const type = PIECE_TYPES[Math.floor(this.random() * PIECE_TYPES.length)];
    const possibleSectors: number[] = [];
    for (let s = 0; s < S; s++) {
      if (this.canMove({ r: 0, s, type, orientation: 0 }, 0, 0)) possibleSectors.push(s);
    }
    if (possibleSectors.length === 0) return null;
    const s = possibleSectors[Math.floor(this.random() * possibleSectors.length)];
    return { r: 0, s, type, orientation: 0 };
  }

  /** Promote the queued piece to active and queue the next, or end the game. */
  spawnPiece(): void {
    if (this.nextPiece && this.canMove(this.nextPiece, 0, 0)) {
      this.activePieces.push(this.nextPiece);
      if (this.activePieces.length === 1) this.currentPieceIndex = 0;
      this.nextPiece = this.generatePiece();
    } else {
      this.endGame();
    }
  }

  private endGame(): void {
    this.gameOver = true;
    this.paused = true;
    this.clearSpawnTimer();
    this.sound?.gameOver();
    this.onGameOver?.(this.getStats());
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private resetBoardState(): void {
    this.board = Array.from({ length: R }, () => Array<Cell>(S).fill(null));
    this.activePieces = [];
    this.currentPieceIndex = 0;
    this.nextPiece = null;
    this.score = 0;
    this.rowsCleared = 0;
    this.level = 1;
    this.dropInterval = BASE_DROP_INTERVAL;
    this.currentSpawnInterval = BASE_SPAWN_INTERVAL;
    this.isInvertedDisplay = false;
  }

  private seedInitialPieces(): void {
    this.nextPiece = this.generatePiece();
    if (this.nextPiece) {
      this.activePieces.push(this.nextPiece);
      this.currentPieceIndex = 0;
      this.nextPiece = this.generatePiece();
    }
  }

  private startSpawnTimer(): void {
    this.clearSpawnTimer();
    this.spawnTimer = setInterval(() => this.spawnPiece(), this.currentSpawnInterval);
  }

  private clearSpawnTimer(): void {
    if (this.spawnTimer !== null) {
      clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }
  }

  private emitStats(): void {
    this.onStatsChange?.(this.getStats());
  }

  // ---------------------------------------------------------------------------
  // Render loop
  // ---------------------------------------------------------------------------

  private loop(timestamp: number): void {
    if (this.destroyed) return;

    if (!this.paused && !this.gameOver) {
      if (this.resetDropClock) {
        this.lastDropTime = timestamp;
        this.resetDropClock = false;
      }
      if (timestamp - this.lastDropTime > this.dropInterval) {
        // Snapshot: landing mutates activePieces while we iterate.
        for (const piece of [...this.activePieces]) {
          if (!this.activePieces.includes(piece)) continue;
          if (!this.movePiece(piece, 1, 0)) this.landPiece(piece);
        }
        this.lastDropTime = timestamp;
      }
    }

    this.render();
    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  private render(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.size, this.size);
    ctx.fillStyle = this.colors.bg;
    ctx.fillRect(0, 0, this.size, this.size);
    this.drawGrid(ctx);
    this.drawBoard(ctx);
    this.drawPieces(ctx);
    this.drawNextPiece(ctx);
    this.drawScore(ctx);
  }

  private drawGrid(ctx: CanvasRenderingContext2D): void {
    if (!this.showGrid) return;
    ctx.strokeStyle = this.colors.grid;
    ctx.lineWidth = 1;
    for (let k = 0; k <= MAX_PLAYABLE_ROW + 1; k++) {
      ctx.beginPath();
      ctx.arc(this.center, this.center, (R - k) * this.radiusStep, 0, 2 * Math.PI);
      ctx.stroke();
    }
    const innerRadius = (R - (MAX_PLAYABLE_ROW + 1)) * this.radiusStep;
    const outerRadius = this.size / 2;
    for (let s = 0; s < S; s++) {
      const theta = s * ((2 * Math.PI) / S);
      ctx.beginPath();
      ctx.moveTo(
        this.center + innerRadius * Math.cos(theta),
        this.center + innerRadius * Math.sin(theta)
      );
      ctx.lineTo(
        this.center + outerRadius * Math.cos(theta),
        this.center + outerRadius * Math.sin(theta)
      );
      ctx.stroke();
    }
  }

  private drawCell(ctx: CanvasRenderingContext2D, r: number, s: number, color: string): void {
    const displayR = this.isInvertedDisplay ? MAX_PLAYABLE_ROW - r : r;
    const radiusInner = (R - displayR - 1) * this.radiusStep;
    const radiusOuter = (R - displayR) * this.radiusStep;
    const thetaStart = s * ((2 * Math.PI) / S);
    const thetaEnd = (s + 1) * ((2 * Math.PI) / S);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.center, this.center, radiusOuter, thetaStart, thetaEnd, false);
    ctx.lineTo(
      this.center + radiusInner * Math.cos(thetaEnd),
      this.center + radiusInner * Math.sin(thetaEnd)
    );
    ctx.arc(this.center, this.center, radiusInner, thetaEnd, thetaStart, true);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = this.colors.bg;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private drawBoard(ctx: CanvasRenderingContext2D): void {
    for (let r = 0; r <= MAX_PLAYABLE_ROW; r++) {
      for (let s = 0; s < S; s++) {
        const cell = this.board[r][s];
        if (cell) this.drawCell(ctx, r, s, cell);
      }
    }
  }

  private drawPieces(ctx: CanvasRenderingContext2D): void {
    this.activePieces.forEach((piece, index) => {
      const { r, s, type, orientation } = piece;
      const color = index === this.currentPieceIndex ? PIECES[type].color : 'gray';
      PIECES[type].orientations[orientation].forEach(([dr, ds]) => {
        const nr = r + dr;
        const ns = (s + ds + S) % S;
        if (nr >= 0 && nr <= MAX_PLAYABLE_ROW) this.drawCell(ctx, nr, ns, color);
      });
    });
  }

  private drawNextPiece(ctx: CanvasRenderingContext2D): void {
    if (!this.nextPiece) return;
    ctx.save();
    ctx.globalAlpha = 0.5;
    const { r, s, type, orientation } = this.nextPiece;
    PIECES[type].orientations[orientation].forEach(([dr, ds]) => {
      const nr = r + dr;
      const ns = (s + ds + S) % S;
      if (nr >= 0 && nr <= MAX_PLAYABLE_ROW) this.drawCell(ctx, nr, ns, PIECES[type].color);
    });
    ctx.restore();
  }

  private drawScore(ctx: CanvasRenderingContext2D): void {
    ctx.font = '16px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.text;
    ctx.fillText(`Score: ${this.score}`, this.center, this.center - 20);
    ctx.fillText(`Level: ${this.level}`, this.center, this.center);
    ctx.fillText(`Rows: ${this.rowsCleared}`, this.center, this.center + 20);
  }

  // ---------------------------------------------------------------------------
  // Test accessors
  // ---------------------------------------------------------------------------

  /** @internal Exposed for tests: the live board (mutable). */
  getBoard(): Cell[][] {
    return this.board;
  }

  /** @internal Exposed for tests: the live active-piece list (mutable). */
  getActivePieces(): ActivePiece[] {
    return this.activePieces;
  }

  /** @internal Exposed for tests: current drop cadence in ms. */
  getDropInterval(): number {
    return this.dropInterval;
  }
}

export const POLAR_TETRIS_CONSTANTS = { R, S, MAX_PLAYABLE_ROW } as const;
