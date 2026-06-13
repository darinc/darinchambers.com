import { describe, it, expect, afterEach, vi } from 'vitest';
import { prefersReducedMotion } from '../../../src/utils/prefersReducedMotion';

describe('prefersReducedMotion', () => {
  afterEach(() => {
    delete (window as { matchMedia?: unknown }).matchMedia;
  });

  it('returns false when matchMedia is unavailable', () => {
    delete (window as { matchMedia?: unknown }).matchMedia;

    expect(prefersReducedMotion()).toBe(false);
  });

  it('returns true and queries the reduce preference when it matches', () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    (window as { matchMedia?: unknown }).matchMedia = matchMedia;

    expect(prefersReducedMotion()).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('returns false when the reduce preference does not match', () => {
    (window as { matchMedia?: unknown }).matchMedia = vi.fn().mockReturnValue({ matches: false });

    expect(prefersReducedMotion()).toBe(false);
  });
});
