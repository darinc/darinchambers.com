/**
 * SoundFX - tiny WebAudio sound engine for Polar Tetris.
 *
 * Generates short oscillator blips entirely in code (no audio assets), so it adds
 * nothing to the bundle and needs no CSP changes. The AudioContext is created
 * lazily on the first gesture (call `resume()` when the game launches) and every
 * method is a safe no-op when muted or when WebAudio is unavailable (e.g. tests).
 */
import type { GameSound } from './PolarTetrisGame';

const MUTE_KEY = 'polartetris.muted';

function loadMutePref(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

function saveMutePref(muted: boolean): void {
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
  } catch {
    /* localStorage unavailable - mute preference simply won't persist */
  }
}

export class SoundFX implements GameSound {
  private ctx: AudioContext | null = null;
  private muted: boolean;

  constructor(muted?: boolean) {
    this.muted = muted ?? loadMutePref();
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    saveMutePref(muted);
  }

  /** Flip mute state, persist it, and return the new value. */
  toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /** Create/unsuspend the AudioContext. Call from a user gesture (game launch). */
  resume(): void {
    const ctx = this.ensureContext();
    if (ctx?.state === 'suspended') {
      void ctx.resume();
    }
  }

  /** Release audio resources. */
  close(): void {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }

  move(): void {
    this.tone(220, 0.04, 0, 'square', 0.035);
  }

  rotate(): void {
    this.tone(330, 0.05, 0, 'square', 0.035);
  }

  lock(): void {
    this.tone(160, 0.07, 0, 'triangle', 0.045);
  }

  clear(lines: number): void {
    const notes = Math.max(1, Math.min(lines, 4));
    for (let i = 0; i < notes; i++) {
      this.tone(440 + i * 150, 0.12, i * 0.07, 'sine', 0.05);
    }
  }

  levelUp(): void {
    [523, 659, 784].forEach((freq, i) => this.tone(freq, 0.12, i * 0.08, 'sine', 0.05));
  }

  gameOver(): void {
    [330, 247, 165].forEach((freq, i) => this.tone(freq, 0.18, i * 0.14, 'sawtooth', 0.05));
  }

  private ensureContext(): AudioContext | null {
    if (this.muted) return null;
    if (this.ctx) return this.ctx;
    if (typeof AudioContext === 'undefined') return null;
    try {
      this.ctx = new AudioContext();
    } catch {
      this.ctx = null;
    }
    return this.ctx;
  }

  private tone(
    frequency: number,
    duration: number,
    when: number,
    type: OscillatorType,
    gain: number
  ): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const startAt = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    amp.gain.setValueAtTime(gain, startAt);
    amp.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start(startAt);
    osc.stop(startAt + duration);
  }
}
