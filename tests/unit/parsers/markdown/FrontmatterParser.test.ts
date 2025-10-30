import { describe, it, expect } from 'vitest';
import { FrontmatterParser, FrontmatterData } from '../../../../src/utils/markdown/FrontmatterParser';

describe('FrontmatterParser', () => {
  describe('parse() - Valid Frontmatter', () => {
    it('should extract simple key-value pairs', () => {
      const markdown = `---
title: "Test Title"
date: "2024-01-15"
---

Content here`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).not.toBeNull();
      expect(result.frontmatter?.title).toBe('Test Title');
      expect(result.frontmatter?.date).toBe('2024-01-15');
      expect(result.content).toBe('\nContent here');
    });

    it('should extract array values with square brackets', () => {
      const markdown = `---
tags: ["TypeScript", "Testing", "Markdown"]
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).not.toBeNull();
      expect(Array.isArray(result.frontmatter?.tags)).toBe(true);
      expect(result.frontmatter?.tags).toEqual(['TypeScript', 'Testing', 'Markdown']);
    });

    it('should handle single quotes in values', () => {
      const markdown = `---
title: 'Single Quote Title'
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Single Quote Title');
    });

    it('should handle double quotes in values', () => {
      const markdown = `---
title: "Double Quote Title"
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Double Quote Title');
    });

    it('should trim whitespace from values', () => {
      const markdown = `---
title:   "Lots of Spaces"
date:  "2024-01-15"
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Lots of Spaces');
      expect(result.frontmatter?.date).toBe('2024-01-15');
    });

    it('should separate content from frontmatter', () => {
      const markdown = `---
title: "Test"
---

# Heading

Paragraph content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.content).toBe('\n# Heading\n\nParagraph content');
      expect(result.content).not.toContain('---');
      expect(result.content).not.toContain('title:');
    });

    it('should handle all field types together', () => {
      const markdown = `---
title: "Complete Example"
date: "2024-01-15"
tags: ["tag1", "tag2", "tag3"]
summary: "This is a summary"
author: "John Doe"
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Complete Example');
      expect(result.frontmatter?.date).toBe('2024-01-15');
      expect(result.frontmatter?.tags).toEqual(['tag1', 'tag2', 'tag3']);
      expect(result.frontmatter?.summary).toBe('This is a summary');
      expect(result.frontmatter?.author).toBe('John Doe');
    });
  });

  describe('parse() - No Frontmatter', () => {
    it('should return null frontmatter for content without dashes', () => {
      const markdown = 'Just plain content';

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).toBeNull();
      expect(result.content).toBe('Just plain content');
    });

    it('should return full content unchanged when no frontmatter', () => {
      const markdown = '# Heading\n\nContent\n\nMore content';

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).toBeNull();
      expect(result.content).toBe(markdown);
    });

    it('should handle content starting with non-frontmatter', () => {
      const markdown = 'Text\n---\ntitle: "Wrong"\n---';

      const result = FrontmatterParser.parse(markdown);

      // Doesn't start with ---, so no frontmatter
      expect(result.frontmatter).toBeNull();
      expect(result.content).toBe(markdown);
    });

    it('should handle whitespace before non-frontmatter', () => {
      const markdown = '   \n# Heading';

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).toBeNull();
    });
  });

  describe('parse() - Malformed Frontmatter', () => {
    it('should handle missing closing delimiter', () => {
      const markdown = `---
title: "Test"

Content without closing delimiter`;

      const result = FrontmatterParser.parse(markdown);

      // No closing ---, so should return null frontmatter
      expect(result.frontmatter).toBeNull();
      expect(result.content).toBe(markdown);
    });

    it('should skip lines without colons', () => {
      const markdown = `---
title: "Test"
invalid line without colon
date: "2024-01-15"
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Test');
      expect(result.frontmatter?.date).toBe('2024-01-15');
      // Invalid line should be ignored
      expect(Object.keys(result.frontmatter || {}).length).toBe(2);
    });

    it('should handle empty frontmatter section', () => {
      const markdown = `---
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('\nContent');
    });

    it('should handle malformed arrays', () => {
      const markdown = `---
tags: [unclosed array
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      // Won't match array pattern, so treated as string value
      expect(result.frontmatter?.tags).toBe('[unclosed array');
    });

    it('should handle arrays with empty items', () => {
      const markdown = `---
tags: ["valid", "", "another"]
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      // Empty strings are filtered out by the .filter() in parsing
      expect(Array.isArray(result.frontmatter?.tags)).toBe(true);
      const tags = result.frontmatter?.tags as string[];
      expect(tags.length).toBe(2);
      expect(tags).toEqual(['valid', 'another']);
    });
  });

  describe('parse() - Edge Cases', () => {
    it('should handle empty string', () => {
      const result = FrontmatterParser.parse('');

      expect(result.frontmatter).toBeNull();
      expect(result.content).toBe('');
    });

    it('should handle only frontmatter (no content)', () => {
      const markdown = `---
title: "Only Frontmatter"
---`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Only Frontmatter');
      expect(result.content).toBe('');
    });

    it('should handle dashes in content after frontmatter', () => {
      const markdown = `---
title: "Test"
---

Content with --- dashes --- in it`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('Test');
      expect(result.content).toContain('--- dashes ---');
    });

    it('should handle values without quotes', () => {
      const markdown = `---
title: No Quotes Here
number: 42
---

Content`;

      const result = FrontmatterParser.parse(markdown);

      expect(result.frontmatter?.title).toBe('No Quotes Here');
      expect(result.frontmatter?.number).toBe('42');
    });
  });

  describe('renderFrontmatter() - Title', () => {
    it('should render title as h1 with class', () => {
      const frontmatter: FrontmatterData = { title: 'Test Title' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<h1 class="fm-title">Test Title</h1>');
    });

    it('should escape HTML in title', () => {
      const frontmatter: FrontmatterData = { title: '<script>alert("xss")</script>' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('&lt;script&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should skip title if not present', () => {
      const frontmatter: FrontmatterData = { date: '2024-01-15' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('<h1');
      expect(result).not.toContain('fm-title');
    });

    it('should skip title if not a string', () => {
      const frontmatter: FrontmatterData = { title: ['array', 'value'] };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('<h1');
    });
  });

  describe('renderFrontmatter() - Date', () => {
    it('should render date in fm-meta div', () => {
      const frontmatter: FrontmatterData = { date: '2024-01-15' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<div class="fm-meta">');
      expect(result).toContain('<span class="fm-date">2024-01-15</span>');
    });

    it('should escape HTML in date', () => {
      const frontmatter: FrontmatterData = { date: '<b>2024</b>' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('&lt;b&gt;2024&lt;/b&gt;');
    });

    it('should skip date if not present', () => {
      const frontmatter: FrontmatterData = { title: 'Test' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('fm-date');
    });
  });

  describe('renderFrontmatter() - Tags', () => {
    it('should render tags as individual spans', () => {
      const frontmatter: FrontmatterData = { tags: ['tag1', 'tag2', 'tag3'] };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<span class="fm-tag">tag1</span>');
      expect(result).toContain('<span class="fm-tag">tag2</span>');
      expect(result).toContain('<span class="fm-tag">tag3</span>');
    });

    it('should join tags with bullet separator', () => {
      const frontmatter: FrontmatterData = { tags: ['one', 'two'] };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<span class="fm-tag">one</span> <span class="fm-tag">two</span>');
    });

    it('should escape HTML in tags', () => {
      const frontmatter: FrontmatterData = { tags: ['<script>', 'safe'] };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('&lt;script&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should handle empty tag array', () => {
      const frontmatter: FrontmatterData = { tags: [] };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      // Note: Current implementation creates empty fm-tags span even for empty array
      expect(result).toContain('fm-tags');
      expect(result).toContain('<span class="fm-tags"></span>');
    });

    it('should skip tags if not present', () => {
      const frontmatter: FrontmatterData = { title: 'Test' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('fm-tag');
    });

    it('should skip tags if not an array', () => {
      const frontmatter: FrontmatterData = { tags: 'not-an-array' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('fm-tag');
    });
  });

  describe('renderFrontmatter() - Summary', () => {
    it('should render summary as paragraph with class', () => {
      const frontmatter: FrontmatterData = { summary: 'This is a summary' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<p class="fm-summary">This is a summary</p>');
    });

    it('should escape HTML in summary', () => {
      const frontmatter: FrontmatterData = { summary: 'Summary with <b>HTML</b>' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('&lt;b&gt;HTML&lt;/b&gt;');
      expect(result).not.toContain('<b>');
    });

    it('should skip summary if not present', () => {
      const frontmatter: FrontmatterData = { title: 'Test' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).not.toContain('fm-summary');
    });
  });

  describe('renderFrontmatter() - Layout', () => {
    it('should add hr divider if content is rendered', () => {
      const frontmatter: FrontmatterData = { title: 'Test' };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<hr class="fm-divider">');
    });

    it('should join sections with newlines', () => {
      const frontmatter: FrontmatterData = {
        title: 'Title',
        date: '2024-01-15',
        summary: 'Summary'
      };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      const lines = result.split('\n');
      expect(lines.length).toBeGreaterThan(1);
      expect(lines[0]).toContain('fm-title');
      expect(lines[1]).toContain('fm-meta');
      expect(lines[2]).toContain('fm-summary');
      expect(lines[3]).toContain('fm-divider');
    });

    it('should return empty string for empty frontmatter', () => {
      const frontmatter: FrontmatterData = {};

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toBe('');
    });

    it('should combine date and tags in fm-meta with bullet separator', () => {
      const frontmatter: FrontmatterData = {
        date: '2024-01-15',
        tags: ['tag1', 'tag2']
      };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('fm-date');
      expect(result).toContain('fm-tags');
      expect(result).toContain(' • ');
    });

    it('should render all fields together correctly', () => {
      const frontmatter: FrontmatterData = {
        title: 'Full Example',
        date: '2024-01-15',
        tags: ['TypeScript', 'Testing'],
        summary: 'A complete frontmatter example'
      };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('<h1 class="fm-title">Full Example</h1>');
      expect(result).toContain('<span class="fm-date">2024-01-15</span>');
      expect(result).toContain('<span class="fm-tag">TypeScript</span>');
      expect(result).toContain('<span class="fm-tag">Testing</span>');
      expect(result).toContain('<p class="fm-summary">A complete frontmatter example</p>');
      expect(result).toContain('<hr class="fm-divider">');
    });
  });

  describe('renderFrontmatter() - HTML Escaping', () => {
    it('should escape all special characters', () => {
      const frontmatter: FrontmatterData = {
        title: '& < > " \'',
        summary: '& < > " \''
      };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      expect(result).toContain('&amp; &lt; &gt; &quot; &#039;');
      expect(result).not.toContain('& < > " \'');
    });

    it('should escape across all fields', () => {
      const frontmatter: FrontmatterData = {
        title: '<h1>Title</h1>',
        date: '<script>alert()</script>',
        tags: ['<tag1>', '<tag2>'],
        summary: '<p>Summary</p>'
      };

      const result = FrontmatterParser.renderFrontmatter(frontmatter);

      // No unescaped HTML tags should exist
      expect(result).not.toContain('<h1>Title</h1>');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('<tag1>');
      expect(result).not.toContain('<p>Summary</p>');

      // Should contain escaped versions
      expect(result).toContain('&lt;h1&gt;');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&lt;tag1&gt;');
      expect(result).toContain('&lt;p&gt;');
    });
  });
});
