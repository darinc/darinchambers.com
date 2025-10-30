import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Load a markdown fixture file from tests/fixtures/markdown
 * @param name - The filename (e.g., 'basic-elements.md')
 * @returns The file content as a string
 */
export function loadMarkdownFixture(name: string): string {
  const path = join(__dirname, '../fixtures/markdown', name);
  return readFileSync(path, 'utf-8');
}

/**
 * Load an expected HTML fixture file from tests/fixtures/expected-output
 * @param name - The filename (e.g., 'basic-elements.html')
 * @returns The file content as a string
 */
export function loadExpectedHtml(name: string): string {
  const path = join(__dirname, '../fixtures/expected-output', name);
  return readFileSync(path, 'utf-8');
}
