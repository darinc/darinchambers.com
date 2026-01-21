import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRmCommand } from '../../../../src/commands/fs/rm';
import type { CommandResult } from '../../../../src/commands/Command';
import type { CommandDispatcher } from '../../../../src/utils/CommandDispatcher';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('rm command', () => {
  let mockFs: IFileSystem;
  let mockDispatcher: CommandDispatcher;

  beforeEach(() => {
    mockFs = {
      exists: vi.fn().mockReturnValue(true),
      isDirectory: vi.fn().mockReturnValue(false),
      isFile: vi.fn().mockReturnValue(true),
      deleteFile: vi.fn(),
      deleteDirectory: vi.fn(),
      getCurrentPath: vi.fn().mockReturnValue('/home/user'),
    } as unknown as IFileSystem;

    mockDispatcher = {
      unregisterCommand: vi.fn().mockReturnValue(true),
    } as unknown as CommandDispatcher;
  });

  describe('basic file removal', () => {
    it('should remove a file', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['test.txt']) as CommandResult;

      expect(mockFs.exists).toHaveBeenCalledWith('test.txt');
      expect(mockFs.isDirectory).toHaveBeenCalledWith('test.txt');
      expect(mockFs.deleteFile).toHaveBeenCalledWith('test.txt');
      expect(result.error).toBeFalsy();
    });

    it('should error when file not found', () => {
      vi.mocked(mockFs.exists).mockReturnValue(false);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['missing.txt']) as CommandResult;

      expect(result.output).toContain('No such file or directory');
      expect(result.error).toBe(true);
    });

    it('should error when target is a directory without -r', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['mydir']) as CommandResult;

      expect(result.output).toContain('Is a directory');
      expect(result.error).toBe(true);
      expect(mockFs.deleteFile).not.toHaveBeenCalled();
      expect(mockFs.deleteDirectory).not.toHaveBeenCalled();
    });
  });

  describe('recursive flag', () => {
    it('should remove directory with -r flag', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-r', 'mydir']) as CommandResult;

      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('mydir', true);
      expect(result.error).toBeFalsy();
    });

    it('should remove directory with -R flag', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-R', 'mydir']) as CommandResult;

      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('mydir', true);
      expect(result.error).toBeFalsy();
    });

    it('should remove directory with --recursive flag', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['--recursive', 'mydir']) as CommandResult;

      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('mydir', true);
      expect(result.error).toBeFalsy();
    });
  });

  describe('force flag', () => {
    it('should suppress error for non-existent file with -f', () => {
      vi.mocked(mockFs.exists).mockReturnValue(false);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-f', 'missing.txt']) as CommandResult;

      expect(result.error).toBeFalsy();
      expect(result.output).toBe('');
    });

    it('should suppress error for non-existent file with --force', () => {
      vi.mocked(mockFs.exists).mockReturnValue(false);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['--force', 'missing.txt']) as CommandResult;

      expect(result.error).toBeFalsy();
    });

    it('should suppress deletion errors with -f', () => {
      vi.mocked(mockFs.deleteFile).mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-f', 'test.txt']) as CommandResult;

      expect(result.error).toBeFalsy();
    });
  });

  describe('command unregistration', () => {
    it('should unregister command when deleting from /usr/bin', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      command.execute(['/usr/bin/echo']) as CommandResult;

      expect(mockDispatcher.unregisterCommand).toHaveBeenCalledWith('echo');
    });

    it('should unregister command when deleting from /usr/local/bin', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      command.execute(['/usr/local/bin/about']) as CommandResult;

      expect(mockDispatcher.unregisterCommand).toHaveBeenCalledWith('about');
    });

    it('should not unregister for files outside bin directories', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      command.execute(['/home/user/echo']) as CommandResult;

      expect(mockDispatcher.unregisterCommand).not.toHaveBeenCalled();
    });
  });

  describe('easter egg', () => {
    it('should trigger melt effect for rm -rf /', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-rf', '/']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('data-melt');
      expect(mockFs.deleteFile).not.toHaveBeenCalled();
      expect(mockFs.deleteDirectory).not.toHaveBeenCalled();
    });

    it('should trigger melt effect for rm -r -f /', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-r', '-f', '/']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('data-melt');
    });

    it('should trigger melt effect for rm --recursive --force /', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['--recursive', '--force', '/']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('data-melt');
    });

    it('should not trigger melt effect without force flag', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-r', '/']) as CommandResult;

      // Should attempt to delete (and fail with permission denied)
      expect(result.html).toBeFalsy();
    });

    it('should not trigger melt effect without recursive flag', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['-f', '/']) as CommandResult;

      // Should fail because / is a directory
      expect(result.html).toBeFalsy();
    });
  });

  describe('help output', () => {
    it('should show help with --help flag', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: rm');
      expect(result.output).toContain('--recursive');
      expect(result.output).toContain('--force');
      expect(result.error).toBeFalsy();
    });
  });

  describe('missing operand', () => {
    it('should error when no file specified', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute([]) as CommandResult;

      expect(result.output).toContain('missing operand');
      expect(result.error).toBe(true);
    });
  });

  describe('command metadata', () => {
    it('should have correct name and description', () => {
      const command = createRmCommand(mockFs, mockDispatcher);

      expect(command.name).toBe('rm');
      expect(command.description).toBe('Remove files or directories');
    });
  });

  describe('multiple files', () => {
    it('should remove multiple files', () => {
      const command = createRmCommand(mockFs, mockDispatcher);
      command.execute(['file1.txt', 'file2.txt', 'file3.txt']);

      expect(mockFs.deleteFile).toHaveBeenCalledTimes(3);
      expect(mockFs.deleteFile).toHaveBeenCalledWith('file1.txt');
      expect(mockFs.deleteFile).toHaveBeenCalledWith('file2.txt');
      expect(mockFs.deleteFile).toHaveBeenCalledWith('file3.txt');
    });

    it('should continue after errors without -f', () => {
      vi.mocked(mockFs.exists).mockImplementation((path) => path !== 'missing.txt');

      const command = createRmCommand(mockFs, mockDispatcher);
      const result = command.execute(['file1.txt', 'missing.txt', 'file2.txt']) as CommandResult;

      expect(result.error).toBe(true);
      expect(mockFs.deleteFile).toHaveBeenCalledWith('file1.txt');
      expect(mockFs.deleteFile).toHaveBeenCalledWith('file2.txt');
    });
  });
});
