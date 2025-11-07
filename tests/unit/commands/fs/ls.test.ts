import { describe, it, expect, vi } from 'vitest';
import { createLsCommand } from '../../../../src/commands/fs/ls';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';
import type { FileSystemNode } from '../../../../src/utils/fs/types';

// Mock the ls-formatters module
vi.mock('../../../../src/utils/ls-formatters', () => ({
  formatLongListing: vi.fn((node: FileSystemNode) => {
    return `-rw-r--r-- 1 user user 1024 Jan 1 12:00 ${node.name}`;
  }),
  calculateTotalBlocks: vi.fn(() => 8),
}));

describe('ls command', () => {
  describe('Basic Listing', () => {
    it('should list directory contents', () => {
      const mockNode: FileSystemNode = {
        name: 'testdir',
        type: 'directory',
        children: new Map([
          ['file1.txt', { name: 'file1.txt', type: 'file' }],
          ['file2.txt', { name: 'file2.txt', type: 'file' }],
        ]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toContain('file1.txt');
      expect(result.output).toContain('file2.txt');
    });

    it('should list current directory when no path specified', () => {
      const mockNode: FileSystemNode = {
        name: '.',
        type: 'directory',
        children: new Map([['test.txt', { name: 'test.txt', type: 'file' }]]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      command.execute([]);

      expect(mockFs.getNode).toHaveBeenCalledWith('.');
    });

    it('should list specific directory', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map(),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      command.execute(['/home/user/documents']);

      expect(mockFs.getNode).toHaveBeenCalledWith('/home/user/documents');
    });

    it('should show single file when path is a file', () => {
      const mockNode: FileSystemNode = {
        name: 'file.txt',
        type: 'file',
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['file.txt']);

      expect(result.output).toBe('file.txt');
    });

    it('should sort files alphabetically', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([
          ['zebra.txt', { name: 'zebra.txt', type: 'file' }],
          ['alpha.txt', { name: 'alpha.txt', type: 'file' }],
          ['middle.txt', { name: 'middle.txt', type: 'file' }],
        ]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      const files = result.output.split('  ');
      expect(files[0]).toBe('alpha.txt');
      expect(files[1]).toBe('middle.txt');
      expect(files[2]).toBe('zebra.txt');
    });

    it('should return empty for empty directory', () => {
      const mockNode: FileSystemNode = {
        name: 'emptydir',
        type: 'directory',
        children: new Map(),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('');
    });

    it('should error on non-existent path', () => {
      const mockFs = {
        getNode: vi.fn().mockReturnValue(null),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['/nonexistent']);

      expect(result.output).toContain('No such file or directory');
      expect(result.error).toBe(true);
    });
  });

  describe('Hidden Files (-a flag)', () => {
    it('should hide hidden files by default', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([
          ['visible.txt', { name: 'visible.txt', type: 'file', isHidden: false }],
          ['.hidden', { name: '.hidden', type: 'file', isHidden: true }],
        ]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toContain('visible.txt');
      expect(result.output).not.toContain('.hidden');
    });

    it('should show hidden files with -a flag', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([
          ['visible.txt', { name: 'visible.txt', type: 'file', isHidden: false }],
          ['.hidden', { name: '.hidden', type: 'file', isHidden: true }],
        ]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['-a']);

      expect(result.output).toContain('visible.txt');
      expect(result.output).toContain('.hidden');
    });
  });

  describe('Long Format (-l flag)', () => {
    it('should show long format with -l flag', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([['file.txt', { name: 'file.txt', type: 'file' }]]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['-l']);

      expect(result.output).toContain('total');
      expect(result.output).toContain('file.txt');
    });

    it('should show long format for single file with -l', () => {
      const mockNode: FileSystemNode = {
        name: 'file.txt',
        type: 'file',
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['-l', 'file.txt']);

      expect(result.output).toContain('file.txt');
      expect(result.output).not.toContain('total'); // No total for single file
    });
  });

  describe('Combined Flags', () => {
    it('should handle -la flags together', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([
          ['visible.txt', { name: 'visible.txt', type: 'file', isHidden: false }],
          ['.hidden', { name: '.hidden', type: 'file', isHidden: true }],
        ]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['-la']);

      expect(result.output).toContain('total');
      expect(result.output).toContain('visible.txt');
      expect(result.output).toContain('.hidden');
    });

    it('should handle -lah flags (with human-readable)', () => {
      const mockNode: FileSystemNode = {
        name: 'dir',
        type: 'directory',
        children: new Map([['file.txt', { name: 'file.txt', type: 'file' }]]),
      };

      const mockFs = {
        getNode: vi.fn().mockReturnValue(mockNode),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute(['-lah']);

      expect(result.output).toContain('total');
      expect(result.output).toContain('file.txt');
    });
  });

  describe('Error Handling', () => {
    it('should handle exceptions', () => {
      const mockFs = {
        getNode: vi.fn().mockImplementation(() => {
          throw new Error('Filesystem error');
        }),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('Filesystem error');
      expect(result.error).toBe(true);
    });

    it('should handle non-Error exceptions', () => {
      const mockFs = {
        getNode: vi.fn().mockImplementation(() => {
          throw new Error('string error');
        }),
      } as unknown as IFileSystem;

      const command = createLsCommand(mockFs);
      const result = command.execute([]);

      expect(result.output).toBe('string error');
      expect(result.error).toBe(true);
    });
  });

  describe('Command Properties', () => {
    it('should have correct name and description', () => {
      const mockFs = {} as unknown as IFileSystem;
      const command = createLsCommand(mockFs);

      expect(command.name).toBe('ls');
      expect(command.description).toBe('List directory contents');
    });
  });
});
