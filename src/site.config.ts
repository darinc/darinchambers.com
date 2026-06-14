/**
 * Single source of truth for all personalized site identity values.
 *
 * To make this site your own, edit `src/site.config.json` — see TEMPLATE.md for the
 * full guide and the short list of values that necessarily live outside this file
 * (npm/DNS metadata, image bytes, the bespoke ASCII banner art, and authored content).
 *
 * The values live in a sibling JSON file so non-TypeScript consumers — notably the
 * ESM build script `scripts/prerender.js` — can read the same source via
 * `readFileSync` + `JSON.parse`, with no transpile or generate step and no drift.
 */
import rawConfig from './site.config.json';
import type { ThemePresetName } from './types/settings';

export interface SiteConfig {
  /** Terminal/Unix username — drives `/home/<username>`, the prompt, and `$USER`/`$HOME`. */
  username: string;
  /** Human-readable display name (page titles, meta tags, JSON-LD). */
  name: string;
  /** One-line tagline shown under the header and in meta descriptions. */
  tagline: string;
  /** Bare domain without a scheme — used for the prompt host and `public/CNAME`. */
  domain: string;
  /** Canonical site URL including scheme, e.g. `https://example.com`. */
  siteUrl: string;
  /** Public contact email. */
  email: string;
  /** Full social profile URLs (not bare handles). */
  social: {
    github: string;
    linkedin: string;
  };
  /** Theme preset applied on first load. */
  defaultTheme: ThemePresetName;
}

const config = rawConfig as SiteConfig;

/**
 * Fail fast on a malformed fork config. The JSON crosses into typed code via the
 * cast above, so an empty value or wrong shape would otherwise surface as a
 * confusing runtime break far from its cause. This is the one seam to guard.
 */
function assertNonEmptyString(value: unknown, field: string): void {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`site.config.json: "${field}" must be a non-empty string`);
  }
}

assertNonEmptyString(config.username, 'username');
assertNonEmptyString(config.name, 'name');
assertNonEmptyString(config.tagline, 'tagline');
assertNonEmptyString(config.domain, 'domain');
assertNonEmptyString(config.siteUrl, 'siteUrl');
assertNonEmptyString(config.email, 'email');
assertNonEmptyString(config.social.github, 'social.github');
assertNonEmptyString(config.social.linkedin, 'social.linkedin');
assertNonEmptyString(config.defaultTheme, 'defaultTheme');

export const siteConfig: SiteConfig = config;

/** Virtual filesystem home directory derived from the username, e.g. `/home/darin`. */
export const homeDir = `/home/${siteConfig.username}`;
