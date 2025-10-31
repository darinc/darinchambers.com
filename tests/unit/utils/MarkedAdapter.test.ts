import { describe, it, expect } from 'vitest';
import { MarkedAdapter } from '../../../src/utils/MarkedAdapter';

describe('MarkedAdapter', () => {
  describe('Basic Markdown Rendering', () => {
    it('should render headers', () => {
      const markdown = '# Header 1\n## Header 2\n### Header 3';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<h1>Header 1</h1>');
      expect(result).toContain('<h2>Header 2</h2>');
      expect(result).toContain('<h3>Header 3</h3>');
    });

    it('should render paragraphs', () => {
      const markdown = 'This is a paragraph.\n\nThis is another paragraph.';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<p>This is a paragraph.</p>');
      expect(result).toContain('<p>This is another paragraph.</p>');
    });

    it('should render unordered lists', () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<ul>');
      expect(result).toContain('<li>Item 1</li>');
      expect(result).toContain('<li>Item 2</li>');
      expect(result).toContain('<li>Item 3</li>');
      expect(result).toContain('</ul>');
    });

    it('should render ordered lists', () => {
      const markdown = '1. First\n2. Second\n3. Third';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<ol>');
      expect(result).toContain('<li>First</li>');
      expect(result).toContain('<li>Second</li>');
      expect(result).toContain('<li>Third</li>');
      expect(result).toContain('</ol>');
    });

    it('should render code blocks', () => {
      const markdown = '```\nfunction hello() {\n  return "world";\n}\n```';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<pre>');
      expect(result).toContain('<code>');
      expect(result).toContain('function hello()');
      expect(result).toContain('</code>');
      expect(result).toContain('</pre>');
    });

    it('should render inline code', () => {
      const markdown = 'Use the `const` keyword';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<code>const</code>');
    });

    it('should render bold text', () => {
      const markdown = 'This is **bold** text';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<strong>bold</strong>');
    });

    it('should render italic text', () => {
      const markdown = 'This is *italic* text';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<em>italic</em>');
    });

    it('should render links', () => {
      const markdown = '[Click here](https://example.com)';
      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<a href="https://example.com">Click here</a>');
    });
  });

  describe('Wrapper Div', () => {
    it('should wrap output in markdown-output div', () => {
      const markdown = '# Test';
      const result = MarkedAdapter.render(markdown);

      expect(result).toMatch(/^<div class="markdown-output">/);
      expect(result).toMatch(/<\/div>$/);
    });
  });

  describe('Frontmatter Support', () => {
    it('should parse and render frontmatter when flag is true', () => {
      const markdown = `---
title: "Test Post"
date: "2024-01-15"
tags: ["test", "markdown"]
---

# Content

This is the content.`;

      const result = MarkedAdapter.render(markdown, true);

      // Should contain frontmatter HTML
      expect(result).toContain('fm-title');
      expect(result).toContain('Test Post');
      expect(result).toContain('2024-01-15');

      // Should contain content
      expect(result).toContain('<h1>Content</h1>');
      expect(result).toContain('<p>This is the content.</p>');
    });

    it('should not render frontmatter when flag is false', () => {
      const markdown = `---
title: "Test Post"
---

# Content`;

      const result = MarkedAdapter.render(markdown, false);

      // Should not contain frontmatter HTML
      expect(result).not.toContain('fm-title');

      // The --- might appear in output as it's treated as <hr> or text
      expect(result).toContain('<h1>Content</h1>');
    });

    it('should handle markdown without frontmatter', () => {
      const markdown = '# Just Content\n\nNo frontmatter here.';
      const result = MarkedAdapter.render(markdown, true);

      expect(result).toContain('<h1>Just Content</h1>');
      expect(result).toContain('<p>No frontmatter here.</p>');
      expect(result).not.toContain('fm-title');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      const result = MarkedAdapter.render('');

      expect(result).toBe('<div class="markdown-output"></div>');
    });

    it('should handle complex mixed content', () => {
      const markdown = `# Title

Paragraph with **bold** and *italic*.

- List item 1
- List item 2

\`\`\`
code block
\`\`\`

[Link](https://example.com)`;

      const result = MarkedAdapter.render(markdown);

      expect(result).toContain('<h1>');
      expect(result).toContain('<strong>');
      expect(result).toContain('<em>');
      expect(result).toContain('<ul>');
      expect(result).toContain('<pre>');
      expect(result).toContain('<a href');
    });
  });
});
