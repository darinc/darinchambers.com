import { describe, it, expect } from 'vitest';
import { siteConfig, homeDir } from '../../src/site.config';

describe('siteConfig', () => {
  it('exposes all required identity fields as non-empty values', () => {
    expect(siteConfig.username).toBeTruthy();
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.tagline).toBeTruthy();
    expect(siteConfig.domain).toBeTruthy();
    expect(siteConfig.siteUrl).toBeTruthy();
    expect(siteConfig.email).toBeTruthy();
    expect(siteConfig.social.github).toBeTruthy();
    expect(siteConfig.social.linkedin).toBeTruthy();
    expect(siteConfig.defaultTheme).toBeTruthy();
  });

  it('derives homeDir from the username', () => {
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
