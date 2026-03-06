import { describe, it, expect } from 'vitest';
import { PostParser } from '../../../src/utils/PostParser';

describe('PostParser', () => {
  describe('parseFrontmatter', () => {
    it('should parse valid frontmatter', () => {
      const content = `---
title: Test Post
date: 2026-03-06
tags: [AI, thoughts]
---

Short content here.`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter).toEqual({
        title: 'Test Post',
        date: '2026-03-06',
        tags: ['AI', 'thoughts'],
      });
      expect(result.markdown).toBe('Short content here.');
    });

    it('should parse single posted entry', () => {
      const content = `---
title: Test Post
date: 2026-03-06
tags: [AI]
posted:
  - platform: LinkedIn
    url: https://linkedin.com/posts/123
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.posted).toEqual([
        { platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' },
      ]);
    });

    it('should parse multiple posted entries', () => {
      const content = `---
title: Test Post
date: 2026-03-06
tags: [AI]
posted:
  - platform: LinkedIn
    url: https://linkedin.com/posts/123
  - platform: X
    url: https://x.com/post/456
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.posted).toEqual([
        { platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' },
        { platform: 'X', url: 'https://x.com/post/456' },
      ]);
    });

    it('should parse three posted entries', () => {
      const content = `---
title: Test Post
date: 2026-03-06
tags: [AI]
posted:
  - platform: LinkedIn
    url: https://linkedin.com/posts/123
  - platform: X
    url: https://x.com/post/456
  - platform: Mastodon
    url: https://mastodon.social/@user/789
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.posted).toHaveLength(3);
      expect(result.frontmatter.posted![2]).toEqual({
        platform: 'Mastodon',
        url: 'https://mastodon.social/@user/789',
      });
    });

    it('should handle posted block followed by other fields', () => {
      const content = `---
title: Test Post
date: 2026-03-06
posted:
  - platform: LinkedIn
    url: https://linkedin.com/posts/123
tags: [AI]
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.posted).toEqual([
        { platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' },
      ]);
      expect(result.frontmatter.tags).toEqual(['AI']);
    });

    it('should handle no posted field', () => {
      const content = `---
title: Test
date: 2026-01-01
tags: [misc]
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.posted).toBeUndefined();
    });

    it('should handle tags with quotes', () => {
      const content = `---
title: Test
date: 2026-01-01
tags: ['AI', 'Web-Development']
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual(['AI', 'Web-Development']);
    });

    it('should handle empty tags array', () => {
      const content = `---
title: Test
date: 2026-01-01
tags: []
---

Content`;

      const result = PostParser.parseFrontmatter(content);

      expect(result.frontmatter.tags).toEqual([]);
    });

    it('should throw error if frontmatter does not start with ---', () => {
      const content = `title: Test
date: 2026-01-01
tags: []

Content`;

      expect(() => PostParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: must start with ---'
      );
    });

    it('should throw error if closing --- is missing', () => {
      const content = `---
title: Test
date: 2026-01-01
tags: []

Content`;

      expect(() => PostParser.parseFrontmatter(content)).toThrow(
        'Invalid frontmatter: no closing ---'
      );
    });

    it('should throw error if title is missing', () => {
      const content = `---
date: 2026-01-01
tags: []
---

Content`;

      expect(() => PostParser.parseFrontmatter(content)).toThrow(
        /missing or invalid fields.*title/
      );
    });

    it('should throw error if date is missing', () => {
      const content = `---
title: Test
tags: []
---

Content`;

      expect(() => PostParser.parseFrontmatter(content)).toThrow(/missing or invalid fields.*date/);
    });

    it('should throw error if tags is missing', () => {
      const content = `---
title: Test
date: 2026-01-01
---

Content`;

      expect(() => PostParser.parseFrontmatter(content)).toThrow(/missing or invalid fields.*tags/);
    });
  });

  describe('parsePost', () => {
    it('should parse a complete post', () => {
      const filename = '2026-03-06-quick-thought.md';
      const content = `---
title: Quick Thought
date: 2026-03-06
tags: [AI, thoughts]
---

A short thought about AI.`;

      const result = PostParser.parsePost(filename, content);

      expect(result).toEqual({
        id: 'quick-thought',
        title: 'Quick Thought',
        date: '2026-03-06',
        content: 'A short thought about AI.',
        tags: ['AI', 'thoughts'],
      });
    });

    it('should include posted when present', () => {
      const filename = '2026-03-06-linkedin-post.md';
      const content = `---
title: LinkedIn Post
date: 2026-03-06
tags: [career]
posted:
  - platform: LinkedIn
    url: https://linkedin.com/posts/123
  - platform: X
    url: https://x.com/post/456
---

My cross-posted thought.`;

      const result = PostParser.parsePost(filename, content);

      expect(result.posted).toEqual([
        { platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' },
        { platform: 'X', url: 'https://x.com/post/456' },
      ]);
    });

    it('should not include posted when absent', () => {
      const filename = '2026-03-06-plain-post.md';
      const content = `---
title: Plain Post
date: 2026-03-06
tags: [misc]
---

Just a post.`;

      const result = PostParser.parsePost(filename, content);

      expect(result.posted).toBeUndefined();
    });
  });

  describe('getIdFromFilename', () => {
    it('should extract ID from filename with date', () => {
      expect(PostParser.getIdFromFilename('2026-03-06-quick-thought.md')).toBe('quick-thought');
    });

    it('should extract ID from filename without date', () => {
      expect(PostParser.getIdFromFilename('quick-thought.md')).toBe('quick-thought');
    });

    it('should handle multiple hyphens in ID', () => {
      expect(PostParser.getIdFromFilename('2026-01-01-my-first-post-ever.md')).toBe(
        'my-first-post-ever'
      );
    });
  });
});
