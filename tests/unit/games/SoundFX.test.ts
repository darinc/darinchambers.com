/**
 * Tests for SoundFX - the WebAudio sound engine.
 *
 * jsdom has no WebAudio, so a fake AudioContext is installed to exercise the
 * oscillator paths, and the absent-AudioContext path is covered by removing it.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SoundFX } from '../../../src/games/polarTetris/SoundFX';

class FakeOscillator {
  type = '';
  frequency = { value: 0 };
  connect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}

class FakeGain {
  gain = { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() };
  connect = vi.fn();
}

class FakeAudioContext {
  static instances = 0;
  state = 'suspended';
  currentTime = 0;
  destination = {};
  oscillators = 0;
  resume = vi.fn(() => {
    this.state = 'running';
    return Promise.resolve();
  });
  close = vi.fn(() => Promise.resolve());
  createOscillator = vi.fn(() => {
    this.oscillators++;
    return new FakeOscillator() as unknown as OscillatorNode;
  });
  createGain = vi.fn(() => new FakeGain() as unknown as GainNode);
  constructor() {
    FakeAudioContext.instances++;
  }
}

function installAudio(): void {
  FakeAudioContext.instances = 0;
  vi.stubGlobal('AudioContext', FakeAudioContext);
}

describe('SoundFX', () => {
  beforeEach(() => {
    localStorage.clear();
    installAudio();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('is unmuted by default and plays a tone', () => {
    const fx = new SoundFX();
    expect(fx.isMuted()).toBe(false);
    fx.move();
    // A context was lazily created and an oscillator scheduled.
    expect(FakeAudioContext.instances).toBe(1);
  });

  it('reuses a single AudioContext across tones', () => {
    const fx = new SoundFX();
    fx.move();
    fx.rotate();
    fx.lock();
    expect(FakeAudioContext.instances).toBe(1);
  });

  it('clear() scales the number of notes and is capped at 4', () => {
    const fx = new SoundFX();
    fx.clear(0); // floored to 1 note
    fx.clear(10); // capped to 4 notes
    fx.levelUp();
    fx.gameOver();
    expect(FakeAudioContext.instances).toBe(1);
  });

  it('resume() unsuspends the context', () => {
    const fx = new SoundFX();
    fx.resume();
    expect(FakeAudioContext.instances).toBe(1);
  });

  it('plays nothing while muted', () => {
    const fx = new SoundFX(true);
    expect(fx.isMuted()).toBe(true);
    fx.move();
    fx.clear(3);
    expect(FakeAudioContext.instances).toBe(0);
  });

  it('toggleMute flips and persists the preference', () => {
    const fx = new SoundFX();
    expect(fx.toggleMute()).toBe(true);
    expect(localStorage.getItem('polartetris.muted')).toBe('1');
    // A fresh instance reads the persisted preference.
    expect(new SoundFX().isMuted()).toBe(true);
    expect(fx.toggleMute()).toBe(false);
    expect(localStorage.getItem('polartetris.muted')).toBe('0');
  });

  it('close() releases the context', () => {
    const fx = new SoundFX();
    fx.move();
    expect(() => fx.close()).not.toThrow();
    // After close, the next tone creates a new context.
    fx.rotate();
    expect(FakeAudioContext.instances).toBe(2);
  });

  it('is a safe no-op when WebAudio is unavailable', () => {
    vi.stubGlobal('AudioContext', undefined);
    const fx = new SoundFX();
    expect(() => {
      fx.move();
      fx.resume();
      fx.close();
    }).not.toThrow();
  });

  it('tolerates a localStorage that throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => new SoundFX().setMuted(true)).not.toThrow();
  });
});
