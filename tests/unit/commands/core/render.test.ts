import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRenderCommand } from '../../../../src/commands/core/render';
import * as MarkdownServiceModule from '../../../../src/utils/MarkdownService';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

// Mock MarkdownService
vi.mock('../../../../src/utils/MarkdownService', () => ({
  MarkdownService: {
    render: vi.fn((content: string, _hasFrontmatter: boolean) => {
      return `<p>${content}</p>`;
    }),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('render command', () => {
  describe('File Input', () => {
    it('should render markdown from file', async () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(true),
        isFile: vi.fn().mockReturnValue(true),
        readFile: vi.fn().mockReturnValue('# Test\n\nContent'),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute(['test.md']);

      expect(mockFs.readFile).toHaveBeenCalledWith('test.md');
      expect(result.output).toContain('<p>');
      expect(result.html).toBe(true);
    });

    it('should detect frontmatter', () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(true),
        isFile: vi.fn().mockReturnValue(true),
        readFile: vi.fn().mockReturnValue('---\ntitle: Test\n---\n\nContent'),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      command.execute(['test.md']);

      expect(MarkdownServiceModule.MarkdownService.render).toHaveBeenCalledWith(
        expect.any(String),
        true
      );
    });

    it('should handle file without frontmatter', () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(true),
        isFile: vi.fn().mockReturnValue(true),
        readFile: vi.fn().mockReturnValue('# Just content'),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      command.execute(['test.md']);

      expect(MarkdownServiceModule.MarkdownService.render).toHaveBeenCalledWith(
        expect.any(String),
        false
      );
    });

    it('should error on non-existent file', () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(false),
        isFile: vi.fn(),
        readFile: vi.fn(),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute(['missing.md']);

      expect(result.output).toContain('No such file or directory');
      expect(result.error).toBe(true);
    });

    it('should error on directory', () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(true),
        isFile: vi.fn().mockReturnValue(false),
        readFile: vi.fn(),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute(['somedir']);

      expect(result.output).toContain('Is a directory');
      expect(result.error).toBe(true);
    });

    it('should handle read error', () => {
      const mockFs = {
        exists: vi.fn().mockReturnValue(true),
        isFile: vi.fn().mockReturnValue(true),
        readFile: vi.fn().mockImplementation(() => {
          throw new Error('Read error');
        }),
      } as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute(['test.md']);

      expect(result.output).toBe('Read error');
      expect(result.error).toBe(true);
    });
  });

  describe('Stdin Input', () => {
    it('should render from stdin', () => {
      const mockFs = {} as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute([], '# Test\n\nFrom stdin');

      expect(result.output).toContain('<p>');
      expect(result.html).toBe(true);
    });

    it('should prefer stdin over missing arguments', () => {
      const mockFs = {} as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute([], '# Stdin content');

      expect(result.output).toContain('<p>');
      expect(result.html).toBe(true);
    });

    it('should detect frontmatter in stdin', () => {
      const mockFs = {} as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      command.execute([], '---\ntitle: Test\n---\n\nContent');

      expect(MarkdownServiceModule.MarkdownService.render).toHaveBeenCalledWith(
        expect.any(String),
        true
      );
    });
  });

  describe('No Input', () => {
    it('should show usage when no input', () => {
      const mockFs = {} as unknown as IFileSystem;

      const command = createRenderCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toContain('Usage: render');
      expect(result.output).toContain('Example:');
      expect(result.error).toBe(true);
    });
  });
});
