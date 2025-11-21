/**
 * Unit tests for Portfolio Command
 *
 * Tests empty states, tag listing, and tag filtering scenarios.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createPortfolioCommand } from '../../../../src/commands/local/portfolio';
import { MESSAGES } from '../../../../src/constants';
import type { Command } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

// Mock filesystem for testing
function createMockFs(files = new Map<string, string>()): IFileSystem {
  return {
    list: (path: string) => {
      if (path === '/home/darin/portfolio') {
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
    getCurrentDirectory: () => '/home/darin',
    setCurrentDirectory: () => {},
    resolve: (path: string) => path,
    getNode: () => null,
  };
}

// Helper to create a valid portfolio markdown file
function createPortfolioFile(
  id: string,
  title: string,
  year: string,
  tags: string[] = [],
  order = 1
): string {
  const tagsLine = tags.length > 0 ? `tags: ['${tags.join("', '")}']` : '';
  return `---
id: ${id}
title: '${title}'
year: '${year}'
technologies: ['TypeScript']
${tagsLine}
order: ${order}
summary: 'Test summary for ${title}'
---

# ${title}

Description for ${title}.
`;
}

describe('Portfolio Command', () => {
  let portfolioCommand: Command;

  describe('empty portfolio', () => {
    beforeEach(() => {
      const mockFs = createMockFs(new Map());
      portfolioCommand = createPortfolioCommand(mockFs);
    });

    it('should return friendly message when portfolio is empty', () => {
      const result = portfolioCommand.execute([]);

      expect(result.output).toContain(MESSAGES.EMPTY_PORTFOLIO);
      expect(result.html).toBe(true);
    });

    it('should return no tags available when --tags called on empty portfolio', () => {
      const result = portfolioCommand.execute(['--tags']);

      expect(result.output).toContain(MESSAGES.NO_TAGS_AVAILABLE);
      expect(result.html).toBe(true);
    });
  });

  describe('tag filtering with no results', () => {
    beforeEach(() => {
      const files = new Map([
        ['project1.md', createPortfolioFile('proj1', 'Project 1', '2024', ['web', 'react'], 1)],
        ['project2.md', createPortfolioFile('proj2', 'Project 2', '2023', ['web', 'node'], 2)],
        ['project3.md', createPortfolioFile('proj3', 'Project 3', '2022', ['mobile', 'react'], 3)],
        ['project4.md', createPortfolioFile('proj4', 'Project 4', '2021', ['api', 'node'], 4)],
        ['project5.md', createPortfolioFile('proj5', 'Project 5', '2020', ['devops'], 5)],
      ]);
      const mockFs = createMockFs(files);
      portfolioCommand = createPortfolioCommand(mockFs);
    });

    it('should show top 5 popular tags when filtering returns no results', () => {
      const result = portfolioCommand.execute(['--tags', 'nonexistent']);

      expect(result.output).toContain("No projects found with tag 'nonexistent'");
      expect(result.output).toContain('Try one of these tags:');
      // web and react appear twice, node appears twice
      expect(result.output).toMatch(/web|react|node|mobile|api|devops/);
      expect(result.error).toBe(false);
    });

    it('should show message without suggestions when no tags exist', () => {
      // Create portfolio with projects that have no tags
      const filesWithoutTags = new Map([
        ['project1.md', createPortfolioFile('proj1', 'Project 1', '2024', [], 1)],
      ]);
      const mockFs = createMockFs(filesWithoutTags);
      const cmd = createPortfolioCommand(mockFs);

      const result = cmd.execute(['--tags', 'nonexistent']);

      expect(result.output).toContain("No projects found with tag 'nonexistent'");
      expect(result.output).not.toContain('Try one of these tags:');
    });

    it('should handle multiple tag filter with no results', () => {
      const result = portfolioCommand.execute(['--tags', 'foo,bar']);

      expect(result.output).toContain("No projects found with tags 'foo', 'bar'");
      expect(result.output).toContain('Try one of these tags:');
    });
  });

  describe('--tags listing', () => {
    it('should list tags with counts when projects exist', () => {
      const files = new Map([
        ['project1.md', createPortfolioFile('proj1', 'Project 1', '2024', ['web', 'react'], 1)],
        ['project2.md', createPortfolioFile('proj2', 'Project 2', '2023', ['web'], 2)],
      ]);
      const mockFs = createMockFs(files);
      const cmd = createPortfolioCommand(mockFs);

      const result = cmd.execute(['--tags']);

      expect(result.output).toContain('web');
      expect(result.output).toContain('react');
      expect(result.html).toBe(true);
    });
  });
});
