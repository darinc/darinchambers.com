/**
 * Unit tests for Blog Command
 *
 * Tests empty states, tag listing, and tag filtering scenarios.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createBlogCommand } from '../../../../src/commands/local/blog';
import { MESSAGES } from '../../../../src/constants';
import type { Command, CommandResult } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

// Mock filesystem for testing
function createMockFs(files = new Map<string, string>()): IFileSystem {
  return {
    list: (path: string) => {
      if (path === '/home/darin/blog') {
        return Array.from(files.keys());
      }
      return [];
    },
    readFile: (path: string) => {
      const filename = path.split('/').pop() ?? '';
      return files.get(filename) ?? '';
    },
    exists: () => true,
    isDirectory: () => true,
    isFile: () => false,
    getCurrentPath: () => '/home/darin',
    getShortPath: () => '~',
    setCurrentUsername: () => {},
    changeDirectory: () => {},
    writeFile: () => {},
    createDirectory: () => {},
    getTree: () => [],
    getNode: () => null,
  };
}

// Helper to create a valid blog markdown file
function createBlogFile(title: string, date: string, tags: string[]): string {
  const tagsLine = tags.length > 0 ? `tags: ['${tags.join("', '")}']` : 'tags: []';
  return `---
title: '${title}'
date: '${date}'
${tagsLine}
summary: 'Test summary for ${title}'
---

# ${title}

Content for ${title}.
`;
}

describe('Blog Command', () => {
  let blogCommand: Command;

  describe('empty blog', () => {
    beforeEach(() => {
      const mockFs = createMockFs(new Map());
      blogCommand = createBlogCommand(mockFs);
    });

    it('should return friendly message when blog is empty', () => {
      const result = blogCommand.execute([]) as CommandResult;

      expect(result.output).toContain(MESSAGES.EMPTY_BLOG);
      expect(result.html).toBe(true);
    });

    it('should return no tags available when --tags called on empty blog', () => {
      const result = blogCommand.execute(['--tags']) as CommandResult;

      expect(result.output).toContain(MESSAGES.NO_TAGS_AVAILABLE);
      expect(result.html).toBe(true);
    });
  });

  describe('tag filtering with no results', () => {
    beforeEach(() => {
      const files = new Map([
        ['2024-01-01-post1.md', createBlogFile('Post 1', '2024-01-01', ['AI', 'ML'])],
        ['2024-02-01-post2.md', createBlogFile('Post 2', '2024-02-01', ['AI', 'Web'])],
        ['2024-03-01-post3.md', createBlogFile('Post 3', '2024-03-01', ['Web', 'React'])],
        ['2024-04-01-post4.md', createBlogFile('Post 4', '2024-04-01', ['DevOps', 'Web'])],
        ['2024-05-01-post5.md', createBlogFile('Post 5', '2024-05-01', ['Mobile'])],
      ]);
      const mockFs = createMockFs(files);
      blogCommand = createBlogCommand(mockFs);
    });

    it('should show top 5 popular tags when filtering returns no results', () => {
      const result = blogCommand.execute(['--tags', 'nonexistent']) as CommandResult;

      expect(result.output).toContain("No blog posts found with tag 'nonexistent'");
      expect(result.output).toContain('Try one of these tags:');
      // Web appears 3 times, AI appears twice
      expect(result.output).toMatch(/Web|AI|ML|React|DevOps|Mobile/);
      expect(result.error).toBe(false);
    });

    it('should show message without suggestions when no tags exist', () => {
      // Create blog with posts that have no tags
      const filesWithoutTags = new Map([
        ['2024-01-01-post1.md', createBlogFile('Post 1', '2024-01-01', [])],
      ]);
      const mockFs = createMockFs(filesWithoutTags);
      const cmd = createBlogCommand(mockFs);

      const result = cmd.execute(['--tags', 'nonexistent']) as CommandResult;

      expect(result.output).toContain("No blog posts found with tag 'nonexistent'");
      expect(result.output).not.toContain('Try one of these tags:');
    });
  });

  describe('--tags listing', () => {
    it('should list tags with counts when posts exist', () => {
      const files = new Map([
        ['2024-01-01-post1.md', createBlogFile('Post 1', '2024-01-01', ['AI', 'ML'])],
        ['2024-02-01-post2.md', createBlogFile('Post 2', '2024-02-01', ['AI'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createBlogCommand(mockFs);

      const result = cmd.execute(['--tags']) as CommandResult;

      expect(result.output).toContain('AI');
      expect(result.output).toContain('ML');
      expect(result.html).toBe(true);
    });
  });
});
