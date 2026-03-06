import { describe, it, expect } from 'vitest';
import { ContentFormatter } from '../../../src/utils/ContentFormatter';

describe('ContentFormatter.makeCommandsClickable', () => {
  const commandNames = ['help', 'about', 'ls', 'blog', 'portfolio'];

  it('should wrap matching command names in clickable links', () => {
    const html = '<p>Type <code>help</code> to get started.</p>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(
      '<p>Type <a data-command="help" class="command-link"><code>help</code></a> to get started.</p>'
    );
  });

  it('should leave non-command code tags unchanged', () => {
    const html = '<p>Use <code>someRandomThing</code> here.</p>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(html);
  });

  it('should handle multiple commands in one string', () => {
    const html = '<code>about</code> and <code>blog</code>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toContain('data-command="about"');
    expect(result).toContain('data-command="blog"');
  });

  it('should not affect code inside pre blocks (multi-line content)', () => {
    const html = '<pre><code>function help() {\n  return true;\n}</code></pre>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(html);
  });

  it('should handle empty command names list', () => {
    const html = '<code>help</code>';
    const result = ContentFormatter.makeCommandsClickable(html, []);
    expect(result).toBe(html);
  });

  it('should trim whitespace in code tags before matching', () => {
    const html = '<code> about </code>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toContain('data-command="about"');
  });
});
