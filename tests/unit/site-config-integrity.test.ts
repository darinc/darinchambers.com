import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../src/site.config';

/**
 * Regression guard for the config-driven identity (see docs/plans / TEMPLATE.md).
 *
 * Renaming the site identity must stay a one-file edit (`src/site.config.json`).
 * This guard fails if a hardcoded username or display name reappears anywhere in
 * `src/` or `tests/` outside the allowlist — so the guarantee is durable, not a
 * one-time snapshot.
 *
 * It reads the literals from `siteConfig` (never hardcodes them) and matches on
 * word boundaries, so the username is not flagged when it is merely a substring
 * of a larger token (e.g. `darin` inside `darinchambers.com` or `darinDir`).
 */

// Tests run with the repo root as cwd (vitest), so resolve scan paths from there.
const ROOT = process.cwd();
const SCANNED_DIRS = ['src', 'tests'];
const SCANNED_EXT = /\.(ts|tsx|js|json)$/;

// Files/dirs permitted to contain the identity literals:
// - the config itself (the single source of truth)
// - authored markdown content (the user's own words)
// - the integration fixtures (sample authored data, not assertions)
// - this guard file (it constructs realistic match inputs from the username)
const ALLOWLIST = [
  'src/site.config.json',
  'src/site.config.ts',
  'src/content/',
  'tests/fixtures/integration-data.ts',
  'tests/unit/site-config-integrity.test.ts',
];

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (SCANNED_EXT.test(entry.name)) {
      yield full;
    }
  }
}

function toPosix(p: string): string {
  return p.split('\\').join('/');
}

function isAllowlisted(rel: string): boolean {
  return ALLOWLIST.some((entry) => (entry.endsWith('/') ? rel.startsWith(entry) : rel === entry));
}

function wordBoundaryPattern(literal: string): RegExp {
  const escaped = literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`);
}

function findOffenders(literal: string): string[] {
  const pattern = wordBoundaryPattern(literal);
  const offenders: string[] = [];
  for (const dir of SCANNED_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const rel = toPosix(relative(ROOT, file));
      if (isAllowlisted(rel)) continue;
      if (pattern.test(readFileSync(file, 'utf8'))) offenders.push(rel);
    }
  }
  return offenders;
}

describe('site config integrity guard', () => {
  it('no file outside the allowlist hardcodes the username', () => {
    const offenders = findOffenders(siteConfig.username);
    expect(
      offenders,
      `Username "${siteConfig.username}" is hardcoded in: ${offenders.join(', ')}. ` +
        `Derive it from siteConfig instead (see src/site.config.ts).`
    ).toEqual([]);
  });

  it('no file outside the allowlist hardcodes the display name', () => {
    const offenders = findOffenders(siteConfig.name);
    expect(
      offenders,
      `Display name "${siteConfig.name}" is hardcoded in: ${offenders.join(', ')}. ` +
        `Derive it from siteConfig.name instead.`
    ).toEqual([]);
  });

  it('matches on word boundaries: detects reintroductions, ignores substrings', () => {
    const match = (text: string): boolean => wordBoundaryPattern(siteConfig.username).test(text);

    // Real reintroductions are caught.
    expect(match(`owner: '${siteConfig.username}'`)).toBe(true);
    expect(match(`/home/${siteConfig.username}/blog`)).toBe(true);

    // The username as a substring of a larger token is NOT a false positive.
    expect(match(`${siteConfig.username}chambers.com`)).toBe(false);
    expect(match(`${siteConfig.username}Dir`)).toBe(false);
  });
});
