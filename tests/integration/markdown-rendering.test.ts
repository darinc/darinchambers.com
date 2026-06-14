import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { siteConfig } from '../../src/site.config';
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
      context.fileSystem.writeFile(`/home/${siteConfig.username}/test-post.md`, sampleBlogPost);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/test-post.md | render`
      );

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
      context.fileSystem.writeFile(`/home/${siteConfig.username}/simple.md`, simpleBlogPost);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/simple.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<h1');
      expect(output?.innerHTML).toContain('Simple Post');
    });

    it('should handle empty markdown', async () => {
      context.fileSystem.writeFile(`/home/${siteConfig.username}/empty.md`, '');

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/empty.md | render`
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should not crash, may produce empty output
    });

    it('should handle markdown with only frontmatter', async () => {
      const onlyFrontmatter = `---
title: Test
date: 2024-01-01
---`;

      context.fileSystem.writeFile(
        `/home/${siteConfig.username}/frontmatter-only.md`,
        onlyFrontmatter
      );

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/frontmatter-only.md | render`
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Frontmatter should be removed, no content left
      expect(output?.innerHTML).not.toContain('---');
    });
  });

  describe('Text Formatting', () => {
    it('should render bold text', async () => {
      const markdown = '**bold text**';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/bold.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/bold.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('bold text');
    });

    it('should render italic text', async () => {
      const markdown = '*italic text*';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/italic.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/italic.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('italic text');
    });

    it('should render combined formatting', async () => {
      const markdown = '**Bold** and *italic* and ***both***';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/combined.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/combined.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
    });

    it('should render inline code', async () => {
      const markdown = 'This is `inline code` text';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/inline-code.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/inline-code.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<code>');
      expect(output?.innerHTML).toContain('inline code');
    });

    it('should render strikethrough if supported', async () => {
      const markdown = '~~strikethrough text~~';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/strike.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/strike.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/headings.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/headings.md | render`
      );

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
      context.fileSystem.writeFile(`/home/${siteConfig.username}/heading-text.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/heading-text.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<h1[^>]*>My Heading<\/h1>/);
    });

    it('should handle headings with formatting', async () => {
      const markdown = '# Heading with **bold** and *italic*';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/formatted-heading.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/formatted-heading.md | render`
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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/ul.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/ul.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/ol.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/ol.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/nested.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/nested.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/formatted-list.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/formatted-list.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('<code>');
    });
  });

  describe('Code Blocks', () => {
    it('should render code blocks', async () => {
      const markdown = '```\nconst x = 1;\n```';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/code.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/code.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('const x = 1');
    });

    it('should render code blocks with language', async () => {
      const markdown = '```javascript\nconst x = 1;\n```';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/js-code.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/js-code.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/multiline-code.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/multiline-code.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/indented-code.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/indented-code.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<pre><code/);
      expect(output?.innerHTML).toContain('indented code');
    });
  });

  describe('Links', () => {
    it('should render inline links', async () => {
      const markdown = '[Link Text](https://example.com)';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/link.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/link.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<a[^>]*href=["']https:\/\/example\.com["']/);
      expect(output?.innerHTML).toContain('Link Text');
    });

    it('should render links with title', async () => {
      const markdown = '[Link](https://example.com "Title")';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/link-title.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/link-title.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/<a[^>]*href=/);
      expect(output?.innerHTML).toContain('Link');
    });

    it('should render multiple links', async () => {
      const markdown = '[Link 1](https://one.com) and [Link 2](https://two.com)';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/multi-link.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/multi-link.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toMatch(/href=["']https:\/\/one\.com["']/);
      expect(output?.innerHTML).toMatch(/href=["']https:\/\/two\.com["']/);
    });

    it('should render links correctly', async () => {
      const markdown = '[External](https://example.com)';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/external.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/external.md | render`
      );

      const output = getLastOutputLine();
      // Should render link with href
      expect(output?.innerHTML).toContain('<a href="https://example.com">External</a>');
    });
  });

  describe('Paragraphs and Line Breaks', () => {
    it('should render paragraphs', async () => {
      const markdown = `Paragraph one.

Paragraph two.

Paragraph three.`;

      context.fileSystem.writeFile(`/home/${siteConfig.username}/paragraphs.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/paragraphs.md | render`
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      expect(output?.innerHTML).toContain('Paragraph one');
      expect(output?.innerHTML).toContain('Paragraph two');
      expect(output?.innerHTML).toContain('Paragraph three');
    });

    it('should handle single line breaks', async () => {
      const markdown = 'Line one\nLine two';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/breaks.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/breaks.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('Line one');
      expect(output?.innerHTML).toContain('Line two');
    });
  });

  describe('XSS Protection', () => {
    it('should sanitize script tags', async () => {
      context.fileSystem.writeFile(`/home/${siteConfig.username}/malicious.md`, maliciousBlogPost);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/malicious.md | render`
      );

      const output = getLastOutputLine();
      // Script tags should be removed or escaped
      expect(output?.innerHTML).not.toMatch(/<script[^>]*>/);
      expect(output?.innerHTML).not.toContain("alert('XSS')");
    });

    it('should sanitize event handlers', async () => {
      const markdown = '<img src="x" onerror="alert(\'XSS\')">';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/event.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/event.md | render`
      );

      const output = getLastOutputLine();
      // Event handlers should be removed
      expect(output?.innerHTML).not.toContain('onerror');
      expect(output?.innerHTML).not.toContain("alert('XSS')");
    });

    it('should allow safe HTML tags', async () => {
      const markdown = '<strong>Bold</strong> and <em>Italic</em>';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/safe-html.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/safe-html.md | render`
      );

      const output = getLastOutputLine();
      // Safe tags should be preserved
      expect(output?.innerHTML).toContain('<strong>');
      expect(output?.innerHTML).toContain('<em>');
      expect(output?.innerHTML).toContain('Bold');
      expect(output?.innerHTML).toContain('Italic');
    });

    it('should sanitize javascript: links', async () => {
      const markdown = '[Click](javascript:alert("XSS"))';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/js-link.md`, markdown);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/js-link.md | render`
      );

      const output = getLastOutputLine();
      // javascript: URLs should be removed or neutralized
      expect(output?.innerHTML).not.toContain('javascript:');
      expect(output?.innerHTML).not.toContain('alert');
    });
  });

  describe('Frontmatter Parsing', () => {
    it('should parse YAML frontmatter', async () => {
      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/test-post.md | render`
      );

      context.fileSystem.writeFile(`/home/${siteConfig.username}/test-post.md`, sampleBlogPost);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/test-post.md | render`
      );

      const output = getLastOutputLine();
      // Frontmatter should not appear in output
      expect(output?.innerHTML).not.toContain('---');
      expect(output?.innerHTML).not.toContain('title:');
      expect(output?.innerHTML).not.toContain('date:');
      expect(output?.innerHTML).not.toContain('tags:');
    });

    it('should handle markdown without frontmatter', async () => {
      const noFrontmatter = '# Just Content\n\nNo frontmatter here.';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/no-fm.md`, noFrontmatter);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/no-fm.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('Just Content');
      expect(output?.innerHTML).toContain('No frontmatter here');
    });

    it('should handle invalid frontmatter gracefully', async () => {
      const invalidFrontmatter = `---
invalid yaml: [
---

# Content`;

      context.fileSystem.writeFile(
        `/home/${siteConfig.username}/invalid-fm.md`,
        invalidFrontmatter
      );

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/invalid-fm.md | render`
      );

      const output = getLastOutputLine();
      // Should either skip frontmatter or render content
      expect(output).toBeTruthy();
    });
  });

  describe('Blog Post Rendering', () => {
    it('should render complete blog post from blog command', async () => {
      context.fileSystem.writeFile(
        `/home/${siteConfig.username}/blog/test-blog.md`,
        sampleBlogPost
      );

      await executeCommandAndWait(context.terminal, 'blog');

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Should show blog listing
    });

    it('should render blog post via cat | render', async () => {
      context.fileSystem.writeFile(`/home/${siteConfig.username}/blog/post.md`, sampleBlogPost);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/blog/post.md | render`
      );

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

      context.fileSystem.writeFile(`/home/${siteConfig.username}/complex.md`, complex);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/complex.md | render`
      );

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
      context.fileSystem.writeFile(`/home/${siteConfig.username}/long.md`, longDoc);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/long.md | render`,
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
      context.fileSystem.writeFile(`/home/${siteConfig.username}/malformed.md`, malformed);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/malformed.md | render`
      );

      const output = getLastOutputLine();
      // Should not crash, may handle gracefully
      expect(output).toBeTruthy();
    });

    it('should handle special characters', async () => {
      const special = '# Title with & < > " \' characters';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/special.md`, special);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/special.md | render`
      );

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
      // Special chars should be properly encoded
    });

    it('should handle unicode characters', async () => {
      const unicode = '# 你好 🚀 émojis and 日本語';
      context.fileSystem.writeFile(`/home/${siteConfig.username}/unicode.md`, unicode);

      await executeCommandAndWait(
        context.terminal,
        `cat /home/${siteConfig.username}/unicode.md | render`
      );

      const output = getLastOutputLine();
      expect(output?.innerHTML).toContain('你好');
      expect(output?.innerHTML).toContain('🚀');
      expect(output?.innerHTML).toContain('émojis');
    });
  });
});
