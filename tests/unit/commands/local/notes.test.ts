/**
 * Unit tests for Notes Command
 *
 * Tests empty states, tag listing, tag filtering, note detail, and posted links.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createNotesCommand } from '../../../../src/commands/local/notes';
import { MESSAGES } from '../../../../src/constants';
import type { Command, CommandResult } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

function createMockFs(files = new Map<string, string>()): IFileSystem {
  return {
    list: (path: string) => {
      if (path === '/home/darin/posts') {
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
    deleteFile: () => {},
    deleteDirectory: () => {},
  };
}

function createPostFile(
  title: string,
  date: string,
  tags: string[],
  posted?: { platform: string; url: string }[]
): string {
  const tagsLine = tags.length > 0 ? `tags: ['${tags.join("', '")}']` : 'tags: []';
  let postedBlock = '';
  if (posted && posted.length > 0) {
    postedBlock =
      '\nposted:\n' +
      posted.map((p) => `  - platform: ${p.platform}\n    url: ${p.url}`).join('\n');
  }
  return `---
title: '${title}'
date: '${date}'
${tagsLine}${postedBlock}
---

Short thought about ${title}.
`;
}

describe('Notes Command', () => {
  let notesCommand: Command;

  describe('empty notes', () => {
    beforeEach(() => {
      const mockFs = createMockFs(new Map());
      notesCommand = createNotesCommand(mockFs);
    });

    it('should return friendly message when notes are empty', () => {
      const result = notesCommand.execute([]) as CommandResult;

      expect(result.output).toContain(MESSAGES.EMPTY_POSTS);
      expect(result.html).toBe(true);
    });

    it('should return no tags available when --tags called on empty notes', () => {
      const result = notesCommand.execute(['--tags']) as CommandResult;

      expect(result.output).toContain(MESSAGES.NO_TAGS_AVAILABLE);
      expect(result.html).toBe(true);
    });
  });

  describe('tag filtering with no results', () => {
    beforeEach(() => {
      const files = new Map([
        ['2026-01-01-post1.md', createPostFile('Post 1', '2026-01-01', ['AI', 'ML'])],
        ['2026-02-01-post2.md', createPostFile('Post 2', '2026-02-01', ['AI', 'Web'])],
        ['2026-03-01-post3.md', createPostFile('Post 3', '2026-03-01', ['Web', 'React'])],
      ]);
      const mockFs = createMockFs(files);
      notesCommand = createNotesCommand(mockFs);
    });

    it('should show top tags when filtering returns no results', () => {
      const result = notesCommand.execute(['--tags', 'nonexistent']) as CommandResult;

      expect(result.output).toContain("No notes found with tag 'nonexistent'");
      expect(result.output).toContain('Try one of these tags:');
      expect(result.error).toBe(false);
    });
  });

  describe('--tags listing', () => {
    it('should list tags with counts when notes exist', () => {
      const files = new Map([
        ['2026-01-01-post1.md', createPostFile('Post 1', '2026-01-01', ['AI', 'ML'])],
        ['2026-02-01-post2.md', createPostFile('Post 2', '2026-02-01', ['AI'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute(['--tags']) as CommandResult;

      expect(result.output).toContain('AI');
      expect(result.output).toContain('ML');
      expect(result.html).toBe(true);
    });
  });

  describe('post detail', () => {
    it('should show specific post by number', () => {
      const files = new Map([
        ['2026-01-01-first.md', createPostFile('First Post', '2026-01-01', ['AI'])],
        ['2026-02-01-second.md', createPostFile('Second Post', '2026-02-01', ['Web'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute(['2']) as CommandResult;

      expect(result.output).toContain('Second Post');
      expect(result.html).toBe(true);
    });

    it('should show specific post by id', () => {
      const files = new Map([
        ['2026-01-01-my-thought.md', createPostFile('My Thought', '2026-01-01', ['AI'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute(['my-thought']) as CommandResult;

      expect(result.output).toContain('My Thought');
      expect(result.html).toBe(true);
    });

    it('should return error for non-existent note', () => {
      const files = new Map([
        ['2026-01-01-post1.md', createPostFile('Post 1', '2026-01-01', ['AI'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute(['nonexistent']) as CommandResult;

      expect(result.output).toContain("Note 'nonexistent' not found");
      expect(result.error).toBe(true);
    });
  });

  describe('posted links', () => {
    it('should show single platform badge and link', () => {
      const files = new Map([
        [
          '2026-01-01-linkedin-post.md',
          createPostFile(
            'LinkedIn Post',
            '2026-01-01',
            ['career'],
            [{ platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' }]
          ),
        ],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute([]) as CommandResult;

      expect(result.output).toContain('LinkedIn');
      expect(result.output).toContain('Posted on');
      expect(result.html).toBe(true);
    });

    it('should show multiple platform badges and links', () => {
      const files = new Map([
        [
          '2026-01-01-cross-post.md',
          createPostFile(
            'Cross Post',
            '2026-01-01',
            ['AI'],
            [
              { platform: 'LinkedIn', url: 'https://linkedin.com/posts/123' },
              { platform: 'X', url: 'https://x.com/post/456' },
            ]
          ),
        ],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute([]) as CommandResult;

      expect(result.output).toContain('LinkedIn');
      expect(result.output).toContain('X');
      expect(result.output).toContain('Posted on');
      expect(result.html).toBe(true);
    });

    it('should not show posted section when no platforms', () => {
      const files = new Map([
        ['2026-01-01-plain.md', createPostFile('Plain Post', '2026-01-01', ['misc'])],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute([]) as CommandResult;

      expect(result.output).not.toContain('Posted on');
      expect(result.html).toBe(true);
    });
  });

  describe('help', () => {
    it('should show help text', () => {
      const mockFs = createMockFs(new Map());
      const cmd = createNotesCommand(mockFs);

      const result = cmd.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: notes');
      expect(result.output).toContain('--tags');
    });
  });
});
