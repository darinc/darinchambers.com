import { describe, it, expect } from 'vitest';
import { BlogParser } from '../../../src/utils/BlogParser';

describe('BlogParser', () => {
  describe('parseFrontmatter', () => {
    it('should parse valid frontmatter', () => {
      const content = `---
title: Test Post
date: 2024-01-01
summary: A test post
tags: [typescript, testing]
---

# Content

This is the post content.`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter).toEqual({
        title: 'Test Post',
        date: '2024-01-01',
        summary: 'A test post',
        tags: ['typescript', 'testing'],
      });
      expect(result.markdown).toBe('# Content\n\nThis is the post content.');
    });

    it('should handle tags with quotes', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: ["typescript", "testing"]
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual(['typescript', 'testing']);
    });

    it('should handle tags with single quotes', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: ['typescript', 'testing']
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual(['typescript', 'testing']);
    });

    it('should handle tags with spaces', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: [ typescript , testing , react ]
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual(['typescript', 'testing', 'react']);
    });

    it('should handle empty tags array', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: []
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual([]);
    });

    it('should remove quotes from string values', () => {
      const content = `---
title: "Test Post"
date: '2024-01-01'
summary: "A test post"
tags: [typescript]
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.title).toBe('Test Post');
      expect(result.frontmatter.date).toBe('2024-01-01');
      expect(result.frontmatter.summary).toBe('A test post');
    });

    it('should throw error if frontmatter does not start with ---', () => {
      const content = `title: Test
date: 2024-01-01
summary: Test
tags: []

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: must start with ---'
      );
    });

    it('should throw error if closing --- is missing', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: []

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: no closing ---'
      );
    });

    it('should throw error if title is missing', () => {
      const content = `---
date: 2024-01-01
summary: Test
tags: []
---

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*title/
      );
    });

    it('should throw error if date is missing', () => {
      const content = `---
title: Test
summary: Test
tags: []
---

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(/missing or invalid fields.*date/);
    });

    it('should throw error if summary is missing', () => {
      const content = `---
title: Test
date: 2024-01-01
tags: []
---

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*summary/
      );
    });

    it('should throw error if tags is missing', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
---

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(/missing or invalid fields.*tags/);
    });

    it('should throw error for multiple missing fields', () => {
      const content = `---
title: Test
---

Content`;

      expect(() => BlogParser.parseFrontmatter(content)).toThrow(/missing or invalid fields/);
    });

    it('should handle multiline content after frontmatter', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: [test]
---

# Heading

Paragraph 1

Paragraph 2`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.markdown).toBe('# Heading\n\nParagraph 1\n\nParagraph 2');
    });

    it('should trim whitespace from markdown content', () => {
      const content = `---
title: Test
date: 2024-01-01
summary: Test
tags: [test]
---


Content here


`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.markdown).toBe('Content here');
    });

    it('should handle lines without colons in frontmatter', () => {
      const content = `---
title: Test
invalid line without colon
date: 2024-01-01
summary: Test
tags: [test]
---

Content`;

      const result = BlogParser.parseFrontmatter(content);

      expect(result.frontmatter.title).toBe('Test');
      expect(result.frontmatter.date).toBe('2024-01-01');
    });
  });

  describe('parseBlogPost', () => {
    it('should parse a complete blog post', () => {
      const filename = '2024-01-15-test-post.md';
      const content = `---
title: Test Post
date: 2024-01-15
summary: A test blog post
tags: [typescript, testing]
---

# Test Post

This is the content.`;

      const result = BlogParser.parseBlogPost(filename, content);

      expect(result).toEqual({
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-15',
        summary: 'A test blog post',
        content: '# Test Post\n\nThis is the content.',
        tags: ['typescript', 'testing'],
      });
    });

    it('should extract ID from filename with date prefix', () => {
      const filename = '2024-09-15-ai-production-lessons.md';
      const content = `---
title: AI Production Lessons
date: 2024-09-15
summary: Lessons learned
tags: [ai]
---

Content`;

      const result = BlogParser.parseBlogPost(filename, content);

      expect(result.id).toBe('ai-production-lessons');
    });

    it('should handle ID with multiple hyphens', () => {
      const filename = '2024-01-01-my-first-blog-post.md';
      const content = `---
title: My First Post
date: 2024-01-01
summary: First post
tags: [blog]
---

Content`;

      const result = BlogParser.parseBlogPost(filename, content);

      expect(result.id).toBe('my-first-blog-post');
    });

    it('should handle filename without date prefix', () => {
      const filename = 'test-post.md';
      const content = `---
title: Test Post
date: 2024-01-01
summary: Test
tags: [test]
---

Content`;

      const result = BlogParser.parseBlogPost(filename, content);

      expect(result.id).toBe('test-post');
    });
  });

  describe('getIdFromFilename', () => {
    it('should extract ID from filename with date', () => {
      expect(BlogParser.getIdFromFilename('2024-01-15-test-post.md')).toBe('test-post');
    });

    it('should extract ID from filename without date', () => {
      expect(BlogParser.getIdFromFilename('test-post.md')).toBe('test-post');
    });

    it('should handle multiple hyphens in ID', () => {
      expect(BlogParser.getIdFromFilename('2024-01-01-my-first-blog-post.md')).toBe(
        'my-first-blog-post'
      );
    });

    it('should remove .md extension', () => {
      expect(BlogParser.getIdFromFilename('test.md')).toBe('test');
    });

    it('should handle filename without extension', () => {
      expect(BlogParser.getIdFromFilename('2024-01-01-test')).toBe('test');
    });
  });
});
