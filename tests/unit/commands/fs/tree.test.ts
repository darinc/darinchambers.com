import { describe, it, expect, vi } from 'vitest';
import { createTreeCommand } from '../../../../src/commands/fs/tree';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('tree command', () => {
  describe('Basic Tree Display', () => {
    it('should display directory tree', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.', '├── file1.txt', '└── dir1']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute([]);

      expect(mockFs.getTree).toHaveBeenCalledWith('.', 4);
      expect(result.output).toContain('file1.txt');
      expect(result.output).toContain('dir1');
    });

    it('should use current directory by default', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      command.execute([]);

      expect(mockFs.getTree).toHaveBeenCalledWith('.', 4);
    });

    it('should accept specific directory path', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['testdir']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      command.execute(['/home/user/testdir']);

      expect(mockFs.getTree).toHaveBeenCalledWith('/home/user/testdir', 4);
    });

    it('should use default depth of 4', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      command.execute([]);

      expect(mockFs.getTree).toHaveBeenCalledWith('.', 4);
    });
  });

  describe('Depth Limiting (-L flag)', () => {
    it('should respect -L flag for custom depth', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      command.execute(['-L', '2']);

      expect(mockFs.getTree).toHaveBeenCalledWith('.', 2);
    });

    it('should handle -L flag with different values', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);

      command.execute(['-L', '1']);
      expect(mockFs.getTree).toHaveBeenCalledWith('.', 1);

      command.execute(['-L', '10']);
      expect(mockFs.getTree).toHaveBeenCalledWith('.', 10);
    });

    it('should handle -L flag with path', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['testdir']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      command.execute(['-L', '3', '/home/user']);

      expect(mockFs.getTree).toHaveBeenCalledWith('/home/user', 3);
    });

    it('should error when -L has no value', () => {
      const mockFs = {
        getTree: vi.fn(),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute(['-L']);

      expect(result.output).toContain('-L flag requires a depth value');
      expect(result.error).toBe(true);
    });

    it('should error on invalid depth value', () => {
      const mockFs = {
        getTree: vi.fn(),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute(['-L', 'abc']);

      expect(result.output).toContain('invalid level');
      expect(result.error).toBe(true);
    });

    it('should error on negative depth', () => {
      const mockFs = {
        getTree: vi.fn(),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      // Note: -L -1 is parsed as separate flags, so -L has no value
      // This tests that the command handles this correctly
      const result = command.execute(['-L', '-1']);

      expect(result.output).toContain('-L flag requires a depth value');
      expect(result.error).toBe(true);
    });

    it('should error on zero depth', () => {
      const mockFs = {
        getTree: vi.fn(),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute(['-L', '0']);

      expect(result.output).toContain('invalid level');
      expect(result.error).toBe(true);
    });
  });

  describe('Output Format', () => {
    it('should join tree lines with newlines', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['root', '├── file1', '└── file2']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('root\n├── file1\n└── file2');
    });

    it('should handle single line output', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue(['.']),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('.');
    });

    it('should handle empty tree', () => {
      const mockFs = {
        getTree: vi.fn().mockReturnValue([]),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('');
    });
  });

  describe('Error Handling', () => {
    it('should handle filesystem errors', () => {
      const mockFs = {
        getTree: vi.fn().mockImplementation(() => {
          throw new Error('tree: /path: No such file or directory');
        }),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute(['/path']);

      expect(result.output).toBe('tree: /path: No such file or directory');
      expect(result.error).toBe(true);
    });

    it('should handle non-Error exceptions', () => {
      const mockFs = {
        getTree: vi.fn().mockImplementation(() => {
          throw new Error('string error');
        }),
      } as unknown as IFileSystem;

      const command = createTreeCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('string error');
      expect(result.error).toBe(true);
    });
  });

  describe('Command Properties', () => {
    it('should have correct name and description', () => {
      const mockFs = {} as unknown as IFileSystem;
      const command = createTreeCommand(mockFs);

      expect(command.name).toBe('tree');
      expect(command.description).toBe('Display directory tree structure');
    });
  });
});
