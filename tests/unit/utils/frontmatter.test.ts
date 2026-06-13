import { describe, it, expect } from 'vitest';
import {
  splitFrontmatter,
  stripQuotes,
  parseFrontmatterValue,
  parseFrontmatterFields,
  idFromDatedFilename,
} from '../../../src/utils/frontmatter';

describe('frontmatter helpers', () => {
  describe('splitFrontmatter', () => {
    it('splits frontmatter lines from the trimmed body', () => {
      const { frontmatterLines, markdown } = splitFrontmatter(
        '---\ntitle: Hi\ndate: 2024-01-01\n---\n\n# Body\n\ntext\n'
      );
      expect(frontmatterLines).toEqual(['title: Hi', 'date: 2024-01-01']);
      expect(markdown).toBe('# Body\n\ntext');
    });

    it('throws when the opening delimiter is missing', () => {
      expect(() => splitFrontmatter('no frontmatter here')).toThrow('must start with ---');
    });

    it('throws when the closing delimiter is missing', () => {
      expect(() => splitFrontmatter('---\ntitle: Hi\nnever closes')).toThrow('no closing ---');
    });
  });

  describe('stripQuotes', () => {
    it('removes matching single or double quotes', () => {
      expect(stripQuotes('"hello"')).toBe('hello');
      expect(stripQuotes("'hello'")).toBe('hello');
    });

    it('leaves unquoted values untouched', () => {
      expect(stripQuotes('hello')).toBe('hello');
    });
  });

  describe('parseFrontmatterValue', () => {
    it('parses an inline array, stripping quotes and blanks', () => {
      expect(parseFrontmatterValue('[a, "b", \'c\', ]')).toEqual(['a', 'b', 'c']);
    });

    it('parses a quoted scalar', () => {
      expect(parseFrontmatterValue('"a value"')).toBe('a value');
    });
  });

  describe('parseFrontmatterFields', () => {
    it('builds a record of scalars and arrays and ignores lines without a colon', () => {
      const fields = parseFrontmatterFields(['title: Hello', 'tags: [x, y]', 'noColonLine']);
      expect(fields).toEqual({ title: 'Hello', tags: ['x', 'y'] });
    });
  });

  describe('idFromDatedFilename', () => {
    it('strips the date prefix and extension', () => {
      expect(idFromDatedFilename('2024-01-15-my-post.md')).toBe('my-post');
    });

    it('strips an optional two-digit sequence number', () => {
      expect(idFromDatedFilename('2025-09-20-01-graph-library.md')).toBe('graph-library');
    });

    it('leaves a non-sequence segment intact', () => {
      expect(idFromDatedFilename('2024-09-15-ai-lessons.md')).toBe('ai-lessons');
    });

    it('handles a filename with no date prefix', () => {
      expect(idFromDatedFilename('plain-slug.md')).toBe('plain-slug');
    });
  });
});
