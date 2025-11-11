import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  sampleBlogPost,
  simpleBlogPost,
  maliciousBlogPost,
  expectedOutputPatterns,
} from '../fixtures/integration-data';
import {
  setupCompleteTerminal,
  teardownIntegrationTest,
  executeCommandAndWait,
  getLastOutputLine,
  setupMockLocalStorage,
  type IntegrationTestContext,
} from '../helpers/integration-helpers';

describe('Markdown Rendering Integration', () => {
  let context: IntegrationTestContext;

  beforeEach(() => {
    setupMockLocalStorage();
    context = setupCompleteTerminal();
  });

  afterEach(() => {
    teardownIntegrationTest();
    vi.clearAllMocks();
  });

  describe('Complete Markdown Pipeline', () => {
    it('should render complete blog post with frontmatter', async () => {
      context.fileSystem.writeFile('/home/darin/test-post.md', sampleBlogPost);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/test-post.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();

      // Frontmatter should be parsed and removed
      expect(output?.innerHTML).not.toContain('---');
      expect(output?.innerHTML).not.toContain('title:');
      expect(output?.innerHTML).not.toContain('date:');

      // Content should be rendered
      expect(output?.innerHTML).toMatch(expectedOutputPatterns.blogPost.heading);
    });

    it('should render markdown without frontmatter', async () => {
      context.fileSystem.writeFile('/home/darin/simple.md', simpleBlogPost);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/simple.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('Simple Post');
    });

    it('should handle empty markdown', async () => {
      context.fileSystem.writeFile('/home/darin/empty.md', '');

      await executeCommandAndWait(context.terminal, 'cat /home/darin/empty.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should not crash, may produce empty output
    });

    it('should handle markdown with only frontmatter', async () => {
      const onlyFrontmatter = `---
title: Test
date: 2024-01-01
---`;

      context.fileSystem.writeFile('/home/darin/frontmatter-only.md', onlyFrontmatter);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/frontmatter-only.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Frontmatter should be removed, no content left
      expect(output?.innerHTML).not.toContain('---');
    });
  });

  describe('Text Formatting', () => {
    it('should render bold text', async () => {
      const markdown = '**bold text**';
      context.fileSystem.writeFile('/home/darin/bold.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/bold.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('bold text');
    });

    it('should render italic text', async () => {
      const markdown = '*italic text*';
      context.fileSystem.writeFile('/home/darin/italic.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/italic.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('italic text');
    });

    it('should render combined formatting', async () => {
      const markdown = '**Bold** and *italic* and ***both***';
      context.fileSystem.writeFile('/home/darin/combined.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/combined.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
    });

    it('should render inline code', async () => {
      const markdown = 'This is `inline code` text';
      context.fileSystem.writeFile('/home/darin/inline-code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/inline-code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<code>');
      expect(output?.innerHTML).toContain('inline code');
    });

    it('should render strikethrough if supported', async () => {
      const markdown = '~~strikethrough text~~';
      context.fileSystem.writeFile('/home/darin/strike.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/strike.md | render');

      const output = getLastOutputLine();
      // May contain <del> or <s> tag if strikethrough is supported
      expect(output).toBeTruthy();
    });
  });

  describe('Headings', () => {
    it('should render all heading levels', async () => {
      const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;

      context.fileSystem.writeFile('/home/darin/headings.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/headings.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('<h2');
      expect(output?.innerHTML).toContain('<h3');
      expect(output?.innerHTML).toContain('<h4');
      expect(output?.innerHTML).toContain('<h5');
      expect(output?.innerHTML).toContain('<h6');
    });

    it('should preserve heading text', async () => {
      const markdown = '# My Heading';
      context.fileSystem.writeFile('/home/darin/heading-text.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/heading-text.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<h1[^>]*>My Heading<\/h1>/);
    });

    it('should handle headings with formatting', async () => {
      const markdown = '# Heading with **bold** and *italic*';
      context.fileSystem.writeFile('/home/darin/formatted-heading.md', markdown);

      await executeCommandAndWait(
        context.terminal,
        'cat /home/darin/formatted-heading.md | render'
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
    });
  });

  describe('Lists', () => {
    it('should render unordered lists', async () => {
      const markdown = `- Item 1
- Item 2
- Item 3`;

      context.fileSystem.writeFile('/home/darin/ul.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/ul.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<ul');
      expect(output?.innerHTML).toContain('<li');
      expect(output?.innerHTML).toContain('Item 1');
      expect(output?.innerHTML).toContain('Item 2');
      expect(output?.innerHTML).toContain('Item 3');
    });

    it('should render ordered lists', async () => {
      const markdown = `1. First
2. Second
3. Third`;

      context.fileSystem.writeFile('/home/darin/ol.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/ol.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<ol');
      expect(output?.innerHTML).toContain('<li');
      expect(output?.innerHTML).toContain('First');
      expect(output?.innerHTML).toContain('Second');
      expect(output?.innerHTML).toContain('Third');
    });

    it('should render nested lists', async () => {
      const markdown = `- Parent 1
  - Child 1
  - Child 2
- Parent 2`;

      context.fileSystem.writeFile('/home/darin/nested.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/nested.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<ul');
      expect(output?.innerHTML).toContain('<li');
      expect(output?.innerHTML).toContain('Parent 1');
      expect(output?.innerHTML).toContain('Child 1');
    });

    it('should render lists with formatting', async () => {
      const markdown = `- **Bold item**
- *Italic item*
- \`Code item\``;

      context.fileSystem.writeFile('/home/darin/formatted-list.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/formatted-list.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('<code>');
    });
  });

  describe('Code Blocks', () => {
    it('should render code blocks', async () => {
      const markdown = '```\nconst x = 1;\n```';
      context.fileSystem.writeFile('/home/darin/code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('const x = 1');
    });

    it('should render code blocks with language', async () => {
      const markdown = '```javascript\nconst x = 1;\n```';
      context.fileSystem.writeFile('/home/darin/js-code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/js-code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('const x = 1');
      // May have language class
      expect(output?.innerHTML).toMatch(/language-javascript|lang-javascript/i);
    });

    it('should render multiline code blocks', async () => {
      const markdown = `\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\``;

      context.fileSystem.writeFile('/home/darin/multiline-code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/multiline-code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('function greet');
      expect(output?.innerHTML).toContain('return');
    });

    it('should preserve code formatting', async () => {
      const markdown = `\`\`\`
  indented code
    more indent
  less indent
\`\`\``;

      context.fileSystem.writeFile('/home/darin/indented-code.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/indented-code.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('indented code');
    });
  });

  describe('Links', () => {
    it('should render inline links', async () => {
      const markdown = '[Link Text](https://example.com)';
      context.fileSystem.writeFile('/home/darin/link.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/link.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<a[^>]*href=["']https:\/\/example\.com["']/);
      expect(output?.innerHTML).toContain('Link Text');
    });

    it('should render links with title', async () => {
      const markdown = '[Link](https://example.com "Title")';
      context.fileSystem.writeFile('/home/darin/link-title.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/link-title.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<a[^>]*href=/);
      expect(output?.innerHTML).toContain('Link');
    });

    it('should render multiple links', async () => {
      const markdown = '[Link 1](https://one.com) and [Link 2](https://two.com)';
      context.fileSystem.writeFile('/home/darin/multi-link.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/multi-link.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/href=["']https:\/\/one\.com["']/);
      expect(output?.innerHTML).toMatch(/href=["']https:\/\/two\.com["']/);
    });

    it('should open links in new tab', async () => {
      const markdown = '[External](https://example.com)';
      context.fileSystem.writeFile('/home/darin/external.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/external.md | render');

      const output = getLastOutputLine();
      // Should have target="_blank"
      expect(output?.innerHTML).toMatch(/target=["']_blank["']/);
    });
  });

  describe('Paragraphs and Line Breaks', () => {
    it('should render paragraphs', async () => {
      const markdown = `Paragraph one.

Paragraph two.

Paragraph three.`;

      context.fileSystem.writeFile('/home/darin/paragraphs.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/paragraphs.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.innerHTML).toContain('Paragraph one');
      expect(output?.innerHTML).toContain('Paragraph two');
      expect(output?.innerHTML).toContain('Paragraph three');
    });

    it('should handle single line breaks', async () => {
      const markdown = 'Line one\nLine two';
      context.fileSystem.writeFile('/home/darin/breaks.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/breaks.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('Line one');
      expect(output?.innerHTML).toContain('Line two');
    });
  });

  describe('XSS Protection', () => {
    it('should sanitize script tags', async () => {
      context.fileSystem.writeFile('/home/darin/malicious.md', maliciousBlogPost);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/malicious.md | render');

      const output = getLastOutputLine();
      // Script tags should be removed or escaped
      expect(output?.innerHTML).not.toMatch(/<script[^>]*>/);
      expect(output?.innerHTML).not.toContain("alert('XSS')");
    });

    it('should sanitize event handlers', async () => {
      const markdown = '<img src="x" onerror="alert(\'XSS\')">';
      context.fileSystem.writeFile('/home/darin/event.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/event.md | render');

      const output = getLastOutputLine();
      // Event handlers should be removed
      expect(output?.innerHTML).not.toContain('onerror');
      expect(output?.innerHTML).not.toContain("alert('XSS')");
    });

    it('should allow safe HTML tags', async () => {
      const markdown = '<strong>Bold</strong> and <em>Italic</em>';
      context.fileSystem.writeFile('/home/darin/safe-html.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/safe-html.md | render');

      const output = getLastOutputLine();
      // Safe tags should be preserved
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('Bold');
      expect(output?.innerHTML).toContain('Italic');
    });

    it('should sanitize javascript: links', async () => {
      const markdown = '[Click](javascript:alert("XSS"))';
      context.fileSystem.writeFile('/home/darin/js-link.md', markdown);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/js-link.md | render');

      const output = getLastOutputLine();
      // javascript: URLs should be removed or neutralized
      expect(output?.innerHTML).not.toContain('javascript:');
      expect(output?.innerHTML).not.toContain('alert');
    });
  });

  describe('Frontmatter Parsing', () => {
    it('should parse YAML frontmatter', async () => {
      await executeCommandAndWait(context.terminal, 'cat /home/darin/test-post.md | render');

      context.fileSystem.writeFile('/home/darin/test-post.md', sampleBlogPost);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/test-post.md | render');

      const output = getLastOutputLine();
      // Frontmatter should not appear in output
      expect(output?.innerHTML).not.toContain('---');
      expect(output?.innerHTML).not.toContain('title:');
      expect(output?.innerHTML).not.toContain('date:');
      expect(output?.innerHTML).not.toContain('tags:');
    });

    it('should handle markdown without frontmatter', async () => {
      const noFrontmatter = '# Just Content\n\nNo frontmatter here.';
      context.fileSystem.writeFile('/home/darin/no-fm.md', noFrontmatter);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/no-fm.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('Just Content');
      expect(output?.innerHTML).toContain('No frontmatter here');
    });

    it('should handle invalid frontmatter gracefully', async () => {
      const invalidFrontmatter = `---
invalid yaml: [
---

# Content`;

      context.fileSystem.writeFile('/home/darin/invalid-fm.md', invalidFrontmatter);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/invalid-fm.md | render');

      const output = getLastOutputLine();
      // Should either skip frontmatter or render content
      expect(output).toBeTruthy();
    });
  });

  describe('Blog Post Rendering', () => {
    it('should render complete blog post from blog command', async () => {
      context.fileSystem.writeFile('/home/darin/blog/test-blog.md', sampleBlogPost);

      await executeCommandAndWait(context.terminal, 'blog');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show blog listing
    });

    it('should render blog post via cat | render', async () => {
      context.fileSystem.writeFile('/home/darin/blog/post.md', sampleBlogPost);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/blog/post.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<h1[^>]*>/);
      expect(output?.innerHTML).toContain('Integration Test Blog Post');
    });
  });

  describe('Complex Markdown Documents', () => {
    it('should render document with mixed content types', async () => {
      const complex = `---
title: Complex Document
---

# Main Title

This is a paragraph with **bold** and *italic* text.

## Section with List

- Item one
- Item two with \`code\`
- Item three

### Code Example

\`\`\`javascript
const test = true;
\`\`\`

## Links Section

Check out [this link](https://example.com) for more info.

### Final Thoughts

Another paragraph here.`;

      context.fileSystem.writeFile('/home/darin/complex.md', complex);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/complex.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();

      // Check all elements are present
      expect(output?.innerHTML).toMatch(/<h1[^>]*>Main Title<\/h1>/);
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('<ul');
      expect(output?.innerHTML).toContain('<li');
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toMatch(/<a[^>]*href=/);

      // Frontmatter should be removed
      expect(output?.innerHTML).not.toContain('---');
      expect(output?.innerHTML).not.toContain('title:');
    });

    it('should handle very long markdown documents', async () => {
      const longDoc = `# Long Document\n\n${'Paragraph. '.repeat(100)}`;
      context.fileSystem.writeFile('/home/darin/long.md', longDoc);

      await executeCommandAndWait(
        context.terminal,
        'cat /home/darin/long.md | render',
        200 // Longer timeout for large document
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.innerHTML).toContain('Long Document');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed markdown gracefully', async () => {
      const malformed = '# Heading\n**Unclosed bold\n## Another';
      context.fileSystem.writeFile('/home/darin/malformed.md', malformed);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/malformed.md | render');

      const output = getLastOutputLine();
      // Should not crash, may handle gracefully
      expect(output).toBeTruthy();
    });

    it('should handle special characters', async () => {
      const special = '# Title with & < > " \' characters';
      context.fileSystem.writeFile('/home/darin/special.md', special);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/special.md | render');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Special chars should be properly encoded
    });

    it('should handle unicode characters', async () => {
      const unicode = '# 你好 🚀 émojis and 日本語';
      context.fileSystem.writeFile('/home/darin/unicode.md', unicode);

      await executeCommandAndWait(context.terminal, 'cat /home/darin/unicode.md | render');

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('你好');
      expect(output?.innerHTML).toContain('🚀');
      expect(output?.innerHTML).toContain('émojis');
    });
  });
});
