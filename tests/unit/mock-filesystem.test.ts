import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../src/site.config';
import { createMockFileSystem, createMinimalFileSystem } from '../helpers/mock-filesystem';

describe('mock-filesystem helpers', () => {
  it('keys the home directory by the configured username', () => {
    const fs = createMockFileSystem();
    // The tree must be keyed by siteConfig.username (not a hardcoded literal), so a
    // username change keeps fixture-backed tests green.
    expect(fs.exists(`/home/${siteConfig.username}/test.txt`)).toBe(true);
    expect(fs.getCurrentPath()).toBe(`/home/${siteConfig.username}`);
  });

  it('keys the minimal filesystem home directory by the configured username', () => {
    const fs = createMinimalFileSystem();
    expect(fs.exists(`/home/${siteConfig.username}`)).toBe(true);
  });
});
