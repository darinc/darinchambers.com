import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { config } from '../../../src/config';
import { MarkdownService } from '../../../src/utils/MarkdownService';

describe('MarkdownService', () => {
  // Store original config value
  let originalFlagValue: boolean;

  beforeEach(() => {
    // Save original flag state
    originalFlagValue = config.features.useMarkedRenderer;
  });

  afterEach(() => {
    // Restore original flag state
    (config.features as any).useMarkedRenderer = originalFlagValue;
  });

  describe('Feature Flag Behavior', () => {
    it('should use MarkdownRenderer when flag is false', () => {
      // Ensure flag is false
      (config.features as any).useMarkedRenderer = false;

      const markdown = '# Test Header';
      const result = MarkdownService.render(markdown);

      // Should contain markdown-output wrapper (both renderers use this)
      expect(result).toContain('markdown-output');
      expect(result).toContain('<h1>Test Header</h1>');
    });

    it('should use MarkedAdapter when flag is true', () => {
      // Set flag to true
      (config.features as any).useMarkedRenderer = true;

      const markdown = '# Test Header';
      const result = MarkdownService.render(markdown);

      // Should contain markdown-output wrapper
      expect(result).toContain('markdown-output');
      expect(result).toContain('<h1>Test Header</h1>');
    });
  });

  describe('API Compatibility', () => {
    it('should accept markdown and renderFrontmatter parameters', () => {
      const markdown = `---
title: "Test"
---

# Content`;

      // Should not throw errors with both parameters
      expect(() => MarkdownService.render(markdown, true)).not.toThrow();
      expect(() => MarkdownService.render(markdown, false)).not.toThrow();
      expect(() => MarkdownService.render(markdown)).not.toThrow();
    });

    it('should return string output', () => {
      const markdown = '# Test';
      const result = MarkdownService.render(markdown);

      expect(typeof result).toBe('string');
    });

    it('should handle empty input', () => {
      const result = MarkdownService.render('');

      expect(typeof result).toBe('string');
      expect(result).toContain('markdown-output');
    });
  });

  describe('Frontmatter Handling', () => {
    const frontmatterMarkdown = `---
title: "Test Post"
date: "2024-01-15"
---

# Content Here`;

    it('should pass frontmatter flag to underlying renderer (flag OFF)', () => {
      (config.features as any).useMarkedRenderer = false;

      const withFrontmatter = MarkdownService.render(frontmatterMarkdown, true);
      const withoutFrontmatter = MarkdownService.render(frontmatterMarkdown, false);

      // With frontmatter should contain fm-title
      expect(withFrontmatter).toContain('fm-title');

      // Without frontmatter should not (or treats --- as content)
      expect(withoutFrontmatter).not.toContain('fm-title');
    });

    it('should pass frontmatter flag to underlying renderer (flag ON)', () => {
      (config.features as any).useMarkedRenderer = true;

      const withFrontmatter = MarkdownService.render(frontmatterMarkdown, true);
      const withoutFrontmatter = MarkdownService.render(frontmatterMarkdown, false);

      // With frontmatter should contain fm-title
      expect(withFrontmatter).toContain('fm-title');

      // Without frontmatter should not (or treats --- as content)
      expect(withoutFrontmatter).not.toContain('fm-title');
    });
  });

  describe('Consistency Between Renderers', () => {
    it('should produce similar output for basic markdown (both renderers)', () => {
      const markdown = '# Header\n\nParagraph text.\n\n- List item';

      // Render with custom renderer
      (config.features as any).useMarkedRenderer = false;
      const customResult = MarkdownService.render(markdown);

      // Render with marked
      (config.features as any).useMarkedRenderer = true;
      const markedResult = MarkdownService.render(markdown);

      // Both should contain key elements (though exact HTML may differ)
      expect(customResult).toContain('<h1>');
      expect(markedResult).toContain('<h1>');

      expect(customResult).toContain('Header');
      expect(markedResult).toContain('Header');

      expect(customResult).toContain('<p>');
      expect(markedResult).toContain('<p>');

      expect(customResult).toContain('<li>');
      expect(markedResult).toContain('<li>');
    });
  });
});
