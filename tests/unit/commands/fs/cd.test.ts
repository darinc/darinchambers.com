import { describe, it, expect, vi } from 'vitest';
import { createCdCommand } from '../../../../src/commands/fs/cd';
import type { CommandResult } from '../../../../src/commands/Command';
import type { EnvVarManager } from '../../../../src/utils/EnvVarManager';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('cd command', () => {
  describe('Basic Navigation', () => {
    it('should change to specified directory', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/home/user'),
        getShortPath: vi.fn().mockReturnValue('~'),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      const result = command.execute(['/home/user/documents']) as CommandResult;

      expect(mockFs.changeDirectory).toHaveBeenCalledWith('/home/user/documents');
      expect(onPathChange).toHaveBeenCalledWith('~');
      expect(result.output).toBe('');
    });

    it('should change to home directory when no arguments', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/home/user'),
        getShortPath: vi.fn().mockReturnValue('~'),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      const result = command.execute([]) as CommandResult;

      expect(mockFs.changeDirectory).toHaveBeenCalledWith('~');
      expect(result.output).toBe('');
    });

    it('should handle error when directory does not exist', () => {
      const mockFs = {
        changeDirectory: vi.fn().mockImplementation(() => {
          throw new Error('cd: /nonexistent: No such file or directory');
        }),
        getCurrentPath: vi.fn(),
        getShortPath: vi.fn(),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      const result = command.execute(['/nonexistent']) as CommandResult;

      expect(result.output).toBe('cd: /nonexistent: No such file or directory');
      expect(result.error).toBe(true);
    });

    it('should have correct name and description', () => {
      const mockFs = {} as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);

      expect(command.name).toBe('cd');
      expect(command.description).toContain('Change directory');
    });
  });

  describe('Environment Variable Integration', () => {
    it('should update PWD environment variable', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/home/user/documents'),
        getShortPath: vi.fn().mockReturnValue('~/documents'),
      } as unknown as IFileSystem;
      const mockEnvManager = {
        getVariable: vi.fn().mockReturnValue('/home/user'),
        setVariable: vi.fn(),
      } as unknown as EnvVarManager;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange, mockEnvManager);
      command.execute(['/home/user/documents']);

      expect(mockEnvManager.setVariable).toHaveBeenCalledWith('PWD', '/home/user/documents');
    });

    it('should set OLDPWD before changing directory', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/new/path'),
        getShortPath: vi.fn().mockReturnValue('~/new/path'),
      } as unknown as IFileSystem;
      const mockEnvManager = {
        getVariable: vi.fn().mockReturnValue('/old/path'),
        setVariable: vi.fn(),
      } as unknown as EnvVarManager;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange, mockEnvManager);
      command.execute(['/new/path']);

      expect(mockEnvManager.setVariable).toHaveBeenCalledWith('OLDPWD', '/old/path');
    });

    it('should handle cd - to go to previous directory', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/previous/dir'),
        getShortPath: vi.fn().mockReturnValue('~/previous/dir'),
      } as unknown as IFileSystem;
      const mockEnvManager = {
        getVariable: vi.fn((name) => {
          if (name === 'OLDPWD') return '/previous/dir';
          if (name === 'PWD') return '/current/dir';
          return undefined;
        }),
        setVariable: vi.fn(),
      } as unknown as EnvVarManager;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange, mockEnvManager);
      const result = command.execute(['-']) as CommandResult;

      expect(mockFs.changeDirectory).toHaveBeenCalledWith('/previous/dir');
      expect(result.output).toBe('');
    });

    it('should error when cd - but OLDPWD not set', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn(),
        getShortPath: vi.fn(),
      } as unknown as IFileSystem;
      const mockEnvManager = {
        getVariable: vi.fn().mockReturnValue(undefined),
        setVariable: vi.fn(),
      } as unknown as EnvVarManager;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange, mockEnvManager);
      const result = command.execute(['-']) as CommandResult;

      expect(result.output).toBe('cd: OLDPWD not set');
      expect(result.error).toBe(true);
    });

    it('should work without envVarManager', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/home/user'),
        getShortPath: vi.fn().mockReturnValue('~'),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      const result = command.execute(['/home/user/documents']) as CommandResult;

      expect(mockFs.changeDirectory).toHaveBeenCalledWith('/home/user/documents');
      expect(result.output).toBe('');
    });
  });

  describe('Path Updates', () => {
    it('should call onPathChange with short path', () => {
      const mockFs = {
        changeDirectory: vi.fn(),
        getCurrentPath: vi.fn().mockReturnValue('/home/user/documents'),
        getShortPath: vi.fn().mockReturnValue('~/documents'),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      command.execute(['/home/user/documents']);

      expect(onPathChange).toHaveBeenCalledWith('~/documents');
    });

    it('should handle non-Error exceptions', () => {
      const mockFs = {
        changeDirectory: vi.fn().mockImplementation(() => {
          throw new Error('string error');
        }),
        getCurrentPath: vi.fn(),
        getShortPath: vi.fn(),
      } as unknown as IFileSystem;
      const onPathChange = vi.fn();

      const command = createCdCommand(mockFs, onPathChange);
      const result = command.execute(['/test']) as CommandResult;

      expect(result.output).toBe('string error');
      expect(result.error).toBe(true);
    });
  });
});
