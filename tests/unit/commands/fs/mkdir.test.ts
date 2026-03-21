import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMkdirCommand } from '../../../../src/commands/fs/mkdir';
import type { CommandResult } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('mkdir command', () => {
  let mockFs: IFileSystem;

  beforeEach(() => {
    mockFs = {
      exists: vi.fn().mockReturnValue(false),
      isDirectory: vi.fn().mockReturnValue(false),
      createDirectory: vi.fn(),
      getCurrentPath: vi.fn().mockReturnValue('/home/user'),
    } as unknown as IFileSystem;
  });

  describe('basic directory creation', () => {
    it('should create a directory successfully', () => {
      const command = createMkdirCommand(mockFs);
      const result = command.execute(['mydir']) as CommandResult;

      expect(mockFs.createDirectory).toHaveBeenCalledWith('mydir');
      expect(result.output).toBe('');
      expect(result.error).toBeFalsy();
    });

    it('should create multiple directories', () => {
      const command = createMkdirCommand(mockFs);
      const result = command.execute(['dir1', 'dir2', 'dir3']) as CommandResult;

      expect(mockFs.createDirectory).toHaveBeenCalledTimes(3);
      expect(mockFs.createDirectory).toHaveBeenCalledWith('dir1');
      expect(mockFs.createDirectory).toHaveBeenCalledWith('dir2');
      expect(mockFs.createDirectory).toHaveBeenCalledWith('dir3');
      expect(result.error).toBeFalsy();
    });
  });

  describe('error cases', () => {
    it('should error with no arguments', () => {
      const command = createMkdirCommand(mockFs);
      const result = command.execute([]) as CommandResult;

      expect(result.output).toContain('missing operand');
      expect(result.error).toBe(true);
    });

    it('should error if path already exists', () => {
      vi.mocked(mockFs.exists).mockReturnValue(true);
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createMkdirCommand(mockFs);
      const result = command.execute(['existing']) as CommandResult;

      expect(result.output).toContain('File exists');
      expect(result.error).toBe(true);
      expect(mockFs.createDirectory).not.toHaveBeenCalled();
    });

    it('should error without -p if parent does not exist', () => {
      vi.mocked(mockFs.exists).mockReturnValue(false);

      const command = createMkdirCommand(mockFs);
      const result = command.execute(['a/b/c']) as CommandResult;

      expect(result.output).toContain('No such file or directory');
      expect(result.error).toBe(true);
      expect(mockFs.createDirectory).not.toHaveBeenCalled();
    });
  });

  describe('-p flag', () => {
    it('should create parent directories with -p', () => {
      const command = createMkdirCommand(mockFs);
      const result = command.execute(['-p', 'a/b/c']) as CommandResult;

      expect(mockFs.createDirectory).toHaveBeenCalledWith('a/b/c');
      expect(result.error).toBeFalsy();
    });

    it('should silently succeed if directory already exists with -p', () => {
      vi.mocked(mockFs.exists).mockReturnValue(true);
      vi.mocked(mockFs.isDirectory).mockReturnValue(true);

      const command = createMkdirCommand(mockFs);
      const result = command.execute(['-p', 'existing']) as CommandResult;

      expect(result.output).toBe('');
      expect(result.error).toBeFalsy();
      expect(mockFs.createDirectory).not.toHaveBeenCalled();
    });
  });

  describe('help output', () => {
    it('should show help with --help flag', () => {
      const command = createMkdirCommand(mockFs);
      const result = command.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: mkdir');
      expect(result.output).toContain('-p');
      expect(result.error).toBeFalsy();
    });
  });

  describe('command metadata', () => {
    it('should have correct name and description', () => {
      const command = createMkdirCommand(mockFs);

      expect(command.name).toBe('mkdir');
      expect(command.description).toBe('Create directories');
    });
  });
});
