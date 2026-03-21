import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRmdirCommand } from '../../../../src/commands/fs/rmdir';
import type { CommandResult } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('rmdir command', () => {
  let mockFs: IFileSystem;

  beforeEach(() => {
    mockFs = {
      exists: vi.fn().mockReturnValue(true),
      isDirectory: vi.fn().mockReturnValue(true),
      deleteDirectory: vi.fn(),
      getCurrentPath: vi.fn().mockReturnValue('/home/user'),
    } as unknown as IFileSystem;
  });

  describe('basic directory removal', () => {
    it('should remove an empty directory', () => {
      const command = createRmdirCommand(mockFs);
      const result = command.execute(['mydir']) as CommandResult;

      expect(mockFs.exists).toHaveBeenCalledWith('mydir');
      expect(mockFs.isDirectory).toHaveBeenCalledWith('mydir');
      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('mydir');
      expect(result.output).toBe('');
      expect(result.error).toBeFalsy();
    });

    it('should remove multiple empty directories', () => {
      const command = createRmdirCommand(mockFs);
      const result = command.execute(['dir1', 'dir2']) as CommandResult;

      expect(mockFs.deleteDirectory).toHaveBeenCalledTimes(2);
      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('dir1');
      expect(mockFs.deleteDirectory).toHaveBeenCalledWith('dir2');
      expect(result.error).toBeFalsy();
    });
  });

  describe('error cases', () => {
    it('should error with no arguments', () => {
      const command = createRmdirCommand(mockFs);
      const result = command.execute([]) as CommandResult;

      expect(result.output).toContain('missing operand');
      expect(result.error).toBe(true);
    });

    it('should error if path does not exist', () => {
      vi.mocked(mockFs.exists).mockReturnValue(false);

      const command = createRmdirCommand(mockFs);
      const result = command.execute(['missing']) as CommandResult;

      expect(result.output).toContain('No such file or directory');
      expect(result.error).toBe(true);
      expect(mockFs.deleteDirectory).not.toHaveBeenCalled();
    });

    it('should error if path is not a directory', () => {
      vi.mocked(mockFs.isDirectory).mockReturnValue(false);

      const command = createRmdirCommand(mockFs);
      const result = command.execute(['file.txt']) as CommandResult;

      expect(result.output).toContain('Not a directory');
      expect(result.error).toBe(true);
      expect(mockFs.deleteDirectory).not.toHaveBeenCalled();
    });

    it('should error if directory is not empty', () => {
      vi.mocked(mockFs.deleteDirectory).mockImplementation(() => {
        throw new Error("rm: cannot remove 'notempty': Directory not empty");
      });

      const command = createRmdirCommand(mockFs);
      const result = command.execute(['notempty']) as CommandResult;

      expect(result.output).toContain('Directory not empty');
      expect(result.error).toBe(true);
    });
  });

  describe('help output', () => {
    it('should show help with --help flag', () => {
      const command = createRmdirCommand(mockFs);
      const result = command.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: rmdir');
      expect(result.error).toBeFalsy();
    });
  });

  describe('command metadata', () => {
    it('should have correct name and description', () => {
      const command = createRmdirCommand(mockFs);

      expect(command.name).toBe('rmdir');
      expect(command.description).toBe('Remove empty directories');
    });
  });
});
