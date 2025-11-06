import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AliasManager } from '../../../src/utils/AliasManager';
import type { IFileSystem } from '../../../src/utils/fs/IFileSystem';
import { PATHS } from '../../../src/constants';

describe('AliasManager', () => {
  let mockFileSystem: IFileSystem;
  let aliasManager: AliasManager;

  beforeEach(() => {
    // Create mock filesystem
    mockFileSystem = {
      exists: vi.fn().mockReturnValue(false),
      isFile: vi.fn().mockReturnValue(true),
      isDirectory: vi.fn().mockReturnValue(false),
      readFile: vi.fn().mockReturnValue(''),
      writeFile: vi.fn(),
      listDirectory: vi.fn().mockReturnValue([]),
      getCurrentDirectory: vi.fn().mockReturnValue('/home/darin'),
      setCurrentDirectory: vi.fn(),
      getNode: vi.fn(),
      createDirectory: vi.fn()
    };
  });

  describe('Initialization', () => {
    it('should initialize with empty aliases when file does not exist', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(false);
      aliasManager = new AliasManager(mockFileSystem);

      expect(aliasManager.getAllAliases().size).toBe(0);
    });

    it('should load aliases from filesystem on initialization', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(true);
      mockFileSystem.readFile = vi.fn().mockReturnValue(
        `alias ll='ls -lah'\nalias gs='git status'\n`
      );

      aliasManager = new AliasManager(mockFileSystem);

      expect(aliasManager.getAlias('ll')).toBe('ls -lah');
      expect(aliasManager.getAlias('gs')).toBe('git status');
    });

    it('should handle corrupted alias file gracefully', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(true);
      mockFileSystem.readFile = vi.fn().mockReturnValue(
        `invalid line\nalias ll='ls -lah'\nmore invalid`
      );

      aliasManager = new AliasManager(mockFileSystem);

      // Should only load valid alias
      expect(aliasManager.getAlias('ll')).toBe('ls -lah');
      expect(aliasManager.getAllAliases().size).toBe(1);
    });

    it('should ignore empty lines in alias file', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(true);
      mockFileSystem.readFile = vi.fn().mockReturnValue(
        `\nalias ll='ls -lah'\n\n\nalias gs='git status'\n\n`
      );

      aliasManager = new AliasManager(mockFileSystem);

      expect(aliasManager.getAllAliases().size).toBe(2);
    });

    it('should handle filesystem read errors gracefully', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(true);
      mockFileSystem.readFile = vi.fn().mockImplementation(() => {
        throw new Error('Read error');
      });

      // Should not throw
      expect(() => new AliasManager(mockFileSystem)).not.toThrow();
    });
  });

  describe('setAlias', () => {
    beforeEach(() => {
      aliasManager = new AliasManager(mockFileSystem);
    });

    it('should set a valid alias', () => {
      aliasManager.setAlias('ll', 'ls -lah');

      expect(aliasManager.getAlias('ll')).toBe('ls -lah');
      expect(mockFileSystem.writeFile).toHaveBeenCalledWith(
        PATHS.CONFIG_ALIASES,
        `alias ll='ls -lah'\n`
      );
    });

    it('should accept alias names with underscores', () => {
      aliasManager.setAlias('my_alias', 'echo test');

      expect(aliasManager.getAlias('my_alias')).toBe('echo test');
    });

    it('should accept alias names with hyphens', () => {
      aliasManager.setAlias('my-alias', 'echo test');

      expect(aliasManager.getAlias('my-alias')).toBe('echo test');
    });

    it('should accept alias names starting with underscore', () => {
      aliasManager.setAlias('_private', 'echo test');

      expect(aliasManager.getAlias('_private')).toBe('echo test');
    });

    it('should reject alias names starting with numbers', () => {
      expect(() => aliasManager.setAlias('1test', 'echo')).toThrow(
        'Invalid alias name: 1test'
      );
    });

    it('should reject alias names with spaces', () => {
      expect(() => aliasManager.setAlias('my alias', 'echo')).toThrow(
        'Invalid alias name: my alias'
      );
    });

    it('should reject alias names with special characters', () => {
      expect(() => aliasManager.setAlias('my@alias', 'echo')).toThrow(
        'Invalid alias name: my@alias'
      );
    });

    it('should overwrite existing alias', () => {
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('ll', 'ls -la');

      expect(aliasManager.getAlias('ll')).toBe('ls -la');
    });

    it('should save multiple aliases to file', () => {
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('gs', 'git status');

      const lastCall = (mockFileSystem.writeFile as any).mock.calls[1];
      expect(lastCall[1]).toContain(`alias ll='ls -lah'`);
      expect(lastCall[1]).toContain(`alias gs='git status'`);
    });

    it('should throw error if filesystem write fails', () => {
      mockFileSystem.writeFile = vi.fn().mockImplementation(() => {
        throw new Error('Write error');
      });

      expect(() => aliasManager.setAlias('test', 'echo')).toThrow(
        'Failed to save aliases'
      );
    });
  });

  describe('removeAlias', () => {
    beforeEach(() => {
      aliasManager = new AliasManager(mockFileSystem);
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('gs', 'git status');
      vi.clearAllMocks();
    });

    it('should remove existing alias', () => {
      const result = aliasManager.removeAlias('ll');

      expect(result).toBe(true);
      expect(aliasManager.getAlias('ll')).toBeUndefined();
    });

    it('should return false when removing non-existent alias', () => {
      const result = aliasManager.removeAlias('nonexistent');

      expect(result).toBe(false);
    });

    it('should not save file when removing non-existent alias', () => {
      aliasManager.removeAlias('nonexistent');

      expect(mockFileSystem.writeFile).not.toHaveBeenCalled();
    });

    it('should save file after removing alias', () => {
      aliasManager.removeAlias('ll');

      expect(mockFileSystem.writeFile).toHaveBeenCalled();
      const savedContent = (mockFileSystem.writeFile as any).mock.calls[0][1];
      expect(savedContent).not.toContain('ll');
      expect(savedContent).toContain('gs');
    });

    it('should handle removing all aliases', () => {
      aliasManager.removeAlias('ll');
      aliasManager.removeAlias('gs');

      expect(aliasManager.getAllAliases().size).toBe(0);
      const lastCall = (mockFileSystem.writeFile as any).mock.calls[1];
      expect(lastCall[1]).toBe('');
    });
  });

  describe('getAlias', () => {
    beforeEach(() => {
      aliasManager = new AliasManager(mockFileSystem);
      aliasManager.setAlias('ll', 'ls -lah');
    });

    it('should return alias value for existing alias', () => {
      expect(aliasManager.getAlias('ll')).toBe('ls -lah');
    });

    it('should return undefined for non-existent alias', () => {
      expect(aliasManager.getAlias('nonexistent')).toBeUndefined();
    });
  });

  describe('getAllAliases', () => {
    beforeEach(() => {
      aliasManager = new AliasManager(mockFileSystem);
    });

    it('should return empty map when no aliases defined', () => {
      const aliases = aliasManager.getAllAliases();

      expect(aliases.size).toBe(0);
    });

    it('should return all defined aliases', () => {
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('gs', 'git status');
      aliasManager.setAlias('gp', 'git push');

      const aliases = aliasManager.getAllAliases();

      expect(aliases.size).toBe(3);
      expect(aliases.get('ll')).toBe('ls -lah');
      expect(aliases.get('gs')).toBe('git status');
      expect(aliases.get('gp')).toBe('git push');
    });

    it('should return a copy of aliases map', () => {
      aliasManager.setAlias('ll', 'ls -lah');

      const aliases = aliasManager.getAllAliases();
      aliases.set('modified', 'test');

      // Original should not be modified
      expect(aliasManager.getAlias('modified')).toBeUndefined();
    });
  });

  describe('resolve', () => {
    beforeEach(() => {
      aliasManager = new AliasManager(mockFileSystem);
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('gs', 'git status');
    });

    it('should resolve alias to command', () => {
      expect(aliasManager.resolve('ll')).toBe('ls -lah');
    });

    it('should resolve alias and preserve arguments', () => {
      expect(aliasManager.resolve('ll /home')).toBe('ls -lah /home');
    });

    it('should return original input for non-aliased command', () => {
      expect(aliasManager.resolve('ls -l')).toBe('ls -l');
    });

    it('should handle empty input', () => {
      expect(aliasManager.resolve('')).toBe('');
    });

    it('should handle whitespace-only input', () => {
      expect(aliasManager.resolve('   ')).toBe('   ');
    });

    it('should only replace command name, not arguments', () => {
      aliasManager.setAlias('echo', 'print');

      // Should replace first 'echo' but not the second one
      expect(aliasManager.resolve('echo echo')).toBe('print echo');
    });

    it('should handle aliases with complex commands', () => {
      aliasManager.setAlias('deploy', 'git push && npm run build');

      expect(aliasManager.resolve('deploy')).toBe('git push && npm run build');
    });

    it('should preserve multiple spaces between arguments', () => {
      expect(aliasManager.resolve('ll  /home  /etc')).toBe('ls -lah  /home  /etc');
    });
  });

  describe('File Format', () => {
    it('should save aliases in correct format', () => {
      aliasManager = new AliasManager(mockFileSystem);
      aliasManager.setAlias('ll', 'ls -lah');
      aliasManager.setAlias('gs', 'git status');

      const lastCall = (mockFileSystem.writeFile as any).mock.calls[1];
      const content = lastCall[1];

      // Should have proper format
      expect(content).toMatch(/alias \w+='[^']+'/);
      // Should end with newline
      expect(content).toMatch(/\n$/);
    });

    it('should parse aliases in correct format', () => {
      mockFileSystem.exists = vi.fn().mockReturnValue(true);
      mockFileSystem.readFile = vi.fn().mockReturnValue(
        `alias ll='ls -lah'\nalias gs='git status'\n`
      );

      aliasManager = new AliasManager(mockFileSystem);

      expect(aliasManager.getAllAliases().size).toBe(2);
    });
  });
});
