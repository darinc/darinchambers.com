/**
 * GameController - owns the fullscreen Polar Tetris overlay and its lifecycle.
 *
 * Analogous to FullscreenController, but for an interactive game rather than a
 * passive boot/shutdown sequence. It builds an overlay that covers the terminal,
 * blurs the prompt, and captures keyboard input at the document level (capture
 * phase, with stopPropagation) so gameplay keys never reach the terminal input.
 *
 * Esc (or `q`/`p`) opens an in-game menu that pauses play; the menu offers
 * Resume / Restart / Sound toggle / Quit game. "Quit game" performs the full
 * teardown - cancel RAF, clear timers, remove listeners, close the AudioContext,
 * remove the overlay - persists the high score, and refocuses the terminal prompt.
 */
import { loadHighScore, saveHighScore } from '../games/polarTetris/highScore';
import { PolarTetrisGame } from '../games/polarTetris/PolarTetrisGame';
import { SoundFX } from '../games/polarTetris/SoundFX';
import type { GameStats, PolarTetrisColors } from '../games/polarTetris/PolarTetrisGame';
import type { ThemeManager } from '../utils/ThemeManager';

type GameState = 'playing' | 'menu' | 'over';

interface TouchControl {
  label: string;
  ariaLabel: string;
  action: () => void;
}

export class GameController {
  private active = false;
  private state: GameState = 'playing';

  private game: PolarTetrisGame | null = null;
  private sound: SoundFX | null = null;
  private bestScore = 0;

  private overlay: HTMLElement | null = null;
  private terminalInput: HTMLInputElement | null = null;
  private bestEl: HTMLElement | null = null;
  private scoreEl: HTMLElement | null = null;
  private menuEl: HTMLElement | null = null;
  private soundButton: HTMLButtonElement | null = null;
  private gameOverEl: HTMLElement | null = null;
  private gameOverStatsEl: HTMLElement | null = null;

  private menuButtons: HTMLButtonElement[] = [];
  private menuIndex = 0;

  constructor(
    private readonly themeManager: ThemeManager,
    private readonly refocusTerminal: () => void
  ) {}

  isActive(): boolean {
    return this.active;
  }

  /** Launch the game. No-op if already running. */
  launch(options: { mute?: boolean } = {}): void {
    if (this.active) return;
    this.active = true;
    this.state = 'playing';
    this.bestScore = loadHighScore();

    // Move focus off the terminal input and disable it: the terminal refocuses
    // the prompt shortly after a command runs, and a disabled input can neither
    // be refocused nor accumulate stray keystrokes behind the overlay.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.terminalInput = document.getElementById('terminal-input') as HTMLInputElement | null;
    if (this.terminalInput) this.terminalInput.disabled = true;
    document.body.classList.add('pt-active');

    this.sound = new SoundFX(options.mute);
    this.sound.resume(); // launch is a user gesture - safe to start audio

    const overlay = this.buildOverlay();
    this.overlay = overlay;
    document.body.appendChild(overlay);

    const canvas = overlay.querySelector<HTMLCanvasElement>('.pt-canvas');
    if (!canvas) return;

    this.game = new PolarTetrisGame(canvas, {
      colors: this.currentColors(),
      sound: this.sound,
      onStatsChange: (stats) => this.onStatsChange(stats),
      onGameOver: (stats) => this.onGameOver(stats),
    });

    document.addEventListener('keydown', this.onKeyDown, true);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.game.start();
    overlay.focus();
  }

  // ---------------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------------

  private currentColors(): PolarTetrisColors {
    const c = this.themeManager.getCurrentColors();
    return {
      bg: c['--terminal-bg'],
      grid: c['--terminal-dim'],
      text: c['--terminal-fg'],
    };
  }

  // ---------------------------------------------------------------------------
  // DOM construction
  // ---------------------------------------------------------------------------

  private buildOverlay(): HTMLElement {
    const c = this.themeManager.getCurrentColors();
    const overlay = document.createElement('div');
    overlay.className = 'pt-overlay';
    overlay.tabIndex = -1;
    overlay.setAttribute('role', 'application');
    overlay.setAttribute('aria-label', 'Polar Tetris game');
    overlay.style.setProperty('--pt-bg', c['--terminal-bg']);
    overlay.style.setProperty('--pt-bg2', c['--terminal-bg-secondary']);
    overlay.style.setProperty('--pt-fg', c['--terminal-fg']);
    overlay.style.setProperty('--pt-accent', c['--terminal-accent']);
    overlay.style.setProperty('--pt-dim', c['--terminal-dim']);

    // Top bar: title + live score + best.
    const topbar = document.createElement('div');
    topbar.className = 'pt-topbar';
    const title = document.createElement('span');
    title.className = 'pt-title';
    title.textContent = 'POLAR TETRIS';
    this.scoreEl = document.createElement('span');
    this.scoreEl.className = 'pt-score';
    this.scoreEl.textContent = 'SCORE 0';
    this.bestEl = document.createElement('span');
    this.bestEl.className = 'pt-best';
    this.bestEl.textContent = `BEST ${this.bestScore}`;
    topbar.append(title, this.scoreEl, this.bestEl);

    const canvas = document.createElement('canvas');
    canvas.className = 'pt-canvas';

    const hint = document.createElement('div');
    hint.className = 'pt-hint';
    hint.textContent = '← → move · ↑ / A rotate · Space drop · O invert · Esc menu';

    overlay.append(
      topbar,
      canvas,
      hint,
      this.buildTouchControls(),
      this.buildMenu(),
      this.buildGameOver()
    );
    return overlay;
  }

  private buildTouchControls(): HTMLElement {
    const controls: TouchControl[] = [
      { label: '↺', ariaLabel: 'Rotate', action: () => this.game?.rotateCW() },
      { label: '◀', ariaLabel: 'Move left', action: () => this.game?.moveLeft() },
      { label: '▼', ariaLabel: 'Soft drop', action: () => this.game?.softDrop() },
      { label: '▶', ariaLabel: 'Move right', action: () => this.game?.moveRight() },
      { label: '⤓', ariaLabel: 'Hard drop', action: () => this.game?.hardDrop() },
      { label: '☰', ariaLabel: 'Menu', action: () => this.openMenu() },
    ];
    const wrap = document.createElement('div');
    wrap.className = 'pt-touch';
    for (const ctl of controls) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pt-touch-btn';
      btn.textContent = ctl.label;
      btn.setAttribute('aria-label', ctl.ariaLabel);
      // pointerdown: respond immediately and don't steal focus from the overlay.
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.state === 'playing') ctl.action();
        else if (ctl.ariaLabel === 'Menu') ctl.action();
      });
      wrap.appendChild(btn);
    }
    return wrap;
  }

  private buildMenu(): HTMLElement {
    const menu = document.createElement('div');
    menu.className = 'pt-menu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;

    const panel = document.createElement('div');
    panel.className = 'pt-panel';
    const heading = document.createElement('h2');
    heading.textContent = 'Paused';
    panel.appendChild(heading);

    const resume = this.makeMenuButton('Resume', () => this.resume());
    const restart = this.makeMenuButton('Restart', () => this.restart());
    this.soundButton = this.makeMenuButton(this.soundLabel(), () => this.toggleSound());
    const quit = this.makeMenuButton('Quit game', () => this.quit());
    quit.classList.add('pt-quit');

    this.menuButtons = [resume, restart, this.soundButton, quit];
    panel.append(resume, restart, this.soundButton, quit);
    menu.appendChild(panel);
    this.menuEl = menu;
    return menu;
  }

  private buildGameOver(): HTMLElement {
    const over = document.createElement('div');
    over.className = 'pt-gameover';
    over.hidden = true;

    const panel = document.createElement('div');
    panel.className = 'pt-panel';
    const heading = document.createElement('h2');
    heading.textContent = 'Game Over';
    this.gameOverStatsEl = document.createElement('p');
    this.gameOverStatsEl.className = 'pt-gameover-stats';

    const again = this.makeMenuButton('Play again', () => this.restart());
    const quit = this.makeMenuButton('Quit game', () => this.quit());
    quit.classList.add('pt-quit');

    panel.append(heading, this.gameOverStatsEl, again, quit);
    over.appendChild(panel);
    this.gameOverEl = over;
    return over;
  }

  private makeMenuButton(label: string, action: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pt-menu-btn';
    btn.textContent = label;
    btn.addEventListener('click', action);
    return btn;
  }

  // ---------------------------------------------------------------------------
  // Game callbacks
  // ---------------------------------------------------------------------------

  private onStatsChange(stats: GameStats): void {
    if (this.scoreEl) this.scoreEl.textContent = `SCORE ${stats.score}`;
    if (stats.score > this.bestScore) {
      this.bestScore = stats.score;
      if (this.bestEl) this.bestEl.textContent = `BEST ${this.bestScore}`;
    }
  }

  private onGameOver(stats: GameStats): void {
    this.state = 'over';
    this.bestScore = saveHighScore(stats.score);
    if (this.bestEl) this.bestEl.textContent = `BEST ${this.bestScore}`;
    if (this.gameOverStatsEl) {
      this.gameOverStatsEl.textContent = `Score ${stats.score} · Level ${stats.level} · Rows ${stats.rows} · Best ${this.bestScore}`;
    }
    if (this.gameOverEl) this.gameOverEl.hidden = false;
    this.focusFirstButton(this.gameOverEl);
  }

  // ---------------------------------------------------------------------------
  // Menu / state transitions
  // ---------------------------------------------------------------------------

  private openMenu(): void {
    if (this.state !== 'playing' || !this.game) return;
    this.state = 'menu';
    this.game.pause();
    if (this.soundButton) this.soundButton.textContent = this.soundLabel();
    if (this.menuEl) this.menuEl.hidden = false;
    this.menuIndex = 0;
    this.focusMenuButton(0);
  }

  private resume(): void {
    if (this.state !== 'menu') return;
    this.state = 'playing';
    if (this.menuEl) this.menuEl.hidden = true;
    this.game?.resume();
    this.overlay?.focus();
  }

  private restart(): void {
    if (this.menuEl) this.menuEl.hidden = true;
    if (this.gameOverEl) this.gameOverEl.hidden = true;
    this.state = 'playing';
    this.game?.restart();
    if (this.scoreEl) this.scoreEl.textContent = 'SCORE 0';
    this.overlay?.focus();
  }

  private toggleSound(): void {
    if (!this.sound) return;
    this.sound.setMuted(!this.sound.isMuted());
    if (!this.sound.isMuted()) this.sound.resume();
    if (this.soundButton) this.soundButton.textContent = this.soundLabel();
  }

  private soundLabel(): string {
    return this.sound?.isMuted() ? 'Sound: Off' : 'Sound: On';
  }

  /** Quit game: full teardown and return to the terminal shell. */
  private quit(): void {
    if (!this.active) return;
    // Persist whatever the best was this session before tearing down.
    if (this.game) this.bestScore = saveHighScore(this.game.getStats().score);

    document.removeEventListener('keydown', this.onKeyDown, true);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibility);

    this.game?.destroy();
    this.sound?.close();
    this.overlay?.remove();
    document.body.classList.remove('pt-active');
    if (this.terminalInput) this.terminalInput.disabled = false;

    this.game = null;
    this.sound = null;
    this.overlay = null;
    this.terminalInput = null;
    this.menuButtons = [];
    this.active = false;
    this.state = 'playing';

    this.refocusTerminal();
  }

  // ---------------------------------------------------------------------------
  // Input
  // ---------------------------------------------------------------------------

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (!this.active) return;

    if (this.state === 'over') {
      this.handleGameOverKey(e);
      return;
    }
    if (this.state === 'menu') {
      this.handleMenuKey(e);
      return;
    }
    this.handlePlayKey(e);
  };

  private handlePlayKey(e: KeyboardEvent): void {
    const game = this.game;
    if (!game) return;

    const key = e.key;
    let handled = true;
    switch (key) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowDown':
        game.softDrop();
        break;
      case 'ArrowUp':
        game.rotateCW();
        break;
      case ' ':
        game.hardDrop();
        break;
      case 'a':
      case 'A':
        game.rotateCCW();
        break;
      case 'o':
      case 'O':
        game.toggleInvert();
        break;
      case 'm':
      case 'M':
        this.toggleSound();
        break;
      case 'Escape':
      case 'q':
      case 'Q':
      case 'p':
      case 'P':
        this.openMenu();
        break;
      default:
        handled = false;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleMenuKey(e: KeyboardEvent): void {
    const key = e.key;
    let handled = true;
    switch (key) {
      case 'ArrowDown':
        this.focusMenuButton(this.menuIndex + 1);
        break;
      case 'ArrowUp':
        this.focusMenuButton(this.menuIndex - 1);
        break;
      case 'Enter':
      case ' ':
        this.menuButtons[this.menuIndex]?.click();
        break;
      case 'Escape':
      case 'q':
      case 'Q':
      case 'p':
      case 'P':
        this.resume();
        break;
      default:
        handled = false;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleGameOverKey(e: KeyboardEvent): void {
    const key = e.key;
    let handled = true;
    switch (key) {
      case 'Enter':
      case ' ':
        this.restart();
        break;
      case 'Escape':
      case 'q':
      case 'Q':
        this.quit();
        break;
      default:
        handled = false;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private focusMenuButton(index: number): void {
    if (this.menuButtons.length === 0) return;
    const count = this.menuButtons.length;
    this.menuIndex = ((index % count) + count) % count;
    this.menuButtons[this.menuIndex].focus();
  }

  private focusFirstButton(container: HTMLElement | null): void {
    container?.querySelector<HTMLButtonElement>('button')?.focus();
  }

  private readonly onResize = (): void => {
    this.game?.resize();
  };

  private readonly onVisibility = (): void => {
    if (document.hidden && this.state === 'playing') {
      this.openMenu();
    }
  };
}
