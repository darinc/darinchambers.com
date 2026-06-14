import { describe, it, expect } from 'vitest';
import { siteConfig, homeDir } from '../../src/site.config';

describe('siteConfig', () => {
  it('exposes required identity fields as non-empty strings', () => {
    for (const field of [
      siteConfig.username,
      siteConfig.name,
      siteConfig.tagline,
      siteConfig.domain,
      siteConfig.siteUrl,
      siteConfig.email,
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.defaultTheme,
    ]) {
      expect(typeof field).toBe('string');
      expect(field.trim().length).toBeGreaterThan(0);
    }
  });

  it('uses a path-safe, whitespace-free username', () => {
    // The username becomes a filesystem path segment (/home/<username>) and a
    // prompt token, so it must be a single path-safe word.
    expect(siteConfig.username).toMatch(/^[a-zA-Z0-9_-]+$/);
  });

  it('uses a well-formed domain and email', () => {
    expect(siteConfig.domain).toMatch(/^[a-z0-9.-]+\.[a-z]{2,}$/i);
    expect(siteConfig.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it('derives homeDir as /home/<username>', () => {
    // Structural checks (not just equality with the source expression) so this
    // fails if the derivation shape ever changes.
    expect(homeDir).toMatch(/^\/home\/[^/]+$/);
    expect(homeDir.endsWith(siteConfig.username)).toBe(true);
    expect(homeDir).toBe(`/home/${siteConfig.username}`);
  });

  it('uses a scheme-qualified siteUrl that matches the domain', () => {
    expect(siteConfig.siteUrl).toContain(siteConfig.domain);
    expect(siteConfig.siteUrl).toMatch(/^https?:\/\//);
  });

  it('stores social links as full URLs, not bare handles', () => {
    expect(siteConfig.social.github).toMatch(/^https?:\/\//);
    expect(siteConfig.social.linkedin).toMatch(/^https?:\/\//);
  });
});
