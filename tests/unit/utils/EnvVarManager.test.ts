/**
 * Unit tests for EnvVarManager
 *
 * Tests platform variables, user variables, persistence, validation,
 * and variable expansion functionality.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PATHS, STORAGE_KEYS } from '../../../src/constants';
import { EnvVarManager } from '../../../src/utils/EnvVarManager';
import type { IFileSystem } from '../../../src/utils/fs/IFileSystem';

// Create mock filesystem
function createMockFileSystem(): IFileSystem {
  const files = new Map<string, string>();

  return {
    writeFile: vi.fn((path: string, content: string) => {
      files.set(path, content);
    }),
    readFile: vi.fn((path: string) => {
      return files.get(path) ?? '';
    }),
    list: vi.fn(() => []),
    exists: vi.fn(() => true),
    isDirectory: vi.fn(() => false),
    isFile: vi.fn(() => true),
    getCurrentPath: vi.fn(() => '/home/darin'),
    getShortPath: vi.fn(() => '~'),
    setCurrentUsername: vi.fn(),
    changeDirectory: vi.fn(),
    createDirectory: vi.fn(),
    getTree: vi.fn(() => []),
    getNode: vi.fn(() => null),
  };
}

// Setup mock localStorage
function setupMockLocalStorage() {
  const store = new Map<string, string>();

  global.localStorage = {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => {
      store.clear();
    }),
    key: vi.fn(() => null),
    length: store.size,
  };
}

describe('EnvVarManager', () => {
  let envManager: EnvVarManager;
  let mockFs: IFileSystem;

  beforeEach(() => {
    setupMockLocalStorage();
    mockFs = createMockFileSystem();
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('initialization', () => {
    it('should initialize with platform variables', () => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');

      expect(envManager.getVariable('HOME')).toBe('/home/testuser');
      expect(envManager.getVariable('USER')).toBe('testuser');
      expect(envManager.getVariable('LOGNAME')).toBe('testuser');
      expect(envManager.getVariable('HOSTNAME')).toBe('testhost');
      expect(envManager.getVariable('PWD')).toBe('/home/testuser');
      expect(envManager.getVariable('OLDPWD')).toBe('');
      expect(envManager.getVariable('SHELL')).toBe('/bin/bash');
      expect(envManager.getVariable('PATH')).toBe('/usr/local/bin:/usr/bin:/bin');
      expect(envManager.getVariable('TERM')).toBe('xterm-256color');
    });

    it('should load user variables from localStorage', () => {
      localStorage.setItem(
        STORAGE_KEYS.ENVIRONMENT,
        JSON.stringify({ CUSTOM_VAR: 'custom_value', API_KEY: 'secret123' })
      );

      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');

      expect(envManager.getVariable('CUSTOM_VAR')).toBe('custom_value');
      expect(envManager.getVariable('API_KEY')).toBe('secret123');
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem(STORAGE_KEYS.ENVIRONMENT, 'invalid json{');
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');

      expect(consoleSpy).toHaveBeenCalled();
      expect(envManager.getVariable('USER')).toBe('testuser'); // Platform vars still work
    });

    it('should sync to filesystem on initialization', () => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');

      expect(mockFs.writeFile).toHaveBeenCalledWith(PATHS.CONFIG_ENV, expect.any(String));
    });
  });

  describe('getting variables', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
    });

    it('should return platform variable', () => {
      expect(envManager.getVariable('HOME')).toBe('/home/testuser');
    });

    it('should return user variable', () => {
      envManager.setVariable('MYVAR', 'myvalue');
      expect(envManager.getVariable('MYVAR')).toBe('myvalue');
    });

    it('should prioritize user variable over platform variable', () => {
      envManager.setVariable('HOME', '/custom/home');
      expect(envManager.getVariable('HOME')).toBe('/custom/home');
    });

    it('should return undefined for non-existent variable', () => {
      expect(envManager.getVariable('NONEXISTENT')).toBeUndefined();
    });
  });

  describe('setting variables', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
    });

    it('should set user variable', () => {
      envManager.setVariable('MYVAR', 'value');
      expect(envManager.getVariable('MYVAR')).toBe('value');
    });

    it('should persist user variable to localStorage', () => {
      envManager.setVariable('MYVAR', 'value');

      const stored = localStorage.getItem(STORAGE_KEYS.ENVIRONMENT);
      expect(stored).toBeTruthy();

      const vars = JSON.parse(stored!);
      expect(vars.MYVAR).toBe('value');
    });

    it('should sync to filesystem when setting variable', () => {
      const writeCallsBefore = (mockFs.writeFile as any).mock.calls.length;

      envManager.setVariable('MYVAR', 'value');

      expect((mockFs.writeFile as any).mock.calls.length).toBeGreaterThan(writeCallsBefore);
    });

    it('should accept uppercase variable names', () => {
      envManager.setVariable('UPPERCASE_VAR', 'value');
      expect(envManager.getVariable('UPPERCASE_VAR')).toBe('value');
    });

    it('should accept lowercase variable names', () => {
      envManager.setVariable('lowercase_var', 'value');
      expect(envManager.getVariable('lowercase_var')).toBe('value');
    });

    it('should accept variable names starting with underscore', () => {
      envManager.setVariable('_PRIVATE_VAR', 'value');
      expect(envManager.getVariable('_PRIVATE_VAR')).toBe('value');
    });

    it('should reject invalid variable names', () => {
      expect(() => envManager.setVariable('123INVALID', 'value')).toThrow('Invalid variable name');
      expect(() => envManager.setVariable('INVALID-VAR', 'value')).toThrow('Invalid variable name');
      expect(() => envManager.setVariable('INVALID VAR', 'value')).toThrow('Invalid variable name');
      expect(() => envManager.setVariable('', 'value')).toThrow('Invalid variable name');
    });
  });

  describe('unsetting variables', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
    });

    it('should remove user variable', () => {
      envManager.setVariable('MYVAR', 'value');
      expect(envManager.getVariable('MYVAR')).toBe('value');

      envManager.unsetVariable('MYVAR');
      expect(envManager.getVariable('MYVAR')).toBeUndefined();
    });

    it('should persist removal to localStorage', () => {
      envManager.setVariable('MYVAR', 'value');
      envManager.unsetVariable('MYVAR');

      const stored = localStorage.getItem(STORAGE_KEYS.ENVIRONMENT);
      const vars = JSON.parse(stored!);
      expect(vars.MYVAR).toBeUndefined();
    });

    it('should not remove platform variables', () => {
      envManager.unsetVariable('HOME');
      // Platform variables are never in userVars, so this is a no-op
      expect(envManager.getVariable('HOME')).toBe('/home/testuser');
    });

    it('should handle unsetting non-existent variable', () => {
      // Should not throw
      expect(() => envManager.unsetVariable('NONEXISTENT')).not.toThrow();
    });
  });

  describe('updating platform variables', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
    });

    it('should update PWD platform variable', () => {
      envManager.updatePlatformVariable('PWD', '/home/testuser/projects');
      expect(envManager.getVariable('PWD')).toBe('/home/testuser/projects');
    });

    it('should update OLDPWD platform variable', () => {
      envManager.updatePlatformVariable('OLDPWD', '/home/testuser');
      expect(envManager.getVariable('OLDPWD')).toBe('/home/testuser');
    });

    it('should not persist platform variable updates', () => {
      const writeCallsBefore = (mockFs.writeFile as any).mock.calls.length;

      envManager.updatePlatformVariable('PWD', '/new/path');

      // Should not trigger additional write (only initial sync)
      expect((mockFs.writeFile as any).mock.calls.length).toBe(writeCallsBefore);
    });

    it('should ignore updates to non-existent platform variables', () => {
      // This is allowed but does nothing
      envManager.updatePlatformVariable('NONEXISTENT', 'value');
      expect(envManager.getVariable('NONEXISTENT')).toBeUndefined();
    });
  });

  describe('variable expansion', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
      envManager.setVariable('MYVAR', 'myvalue');
      envManager.setVariable('API_URL', 'https://api.example.com');
    });

    it('should expand $VAR syntax', () => {
      const result = envManager.expandVariables('Home is $HOME');
      expect(result).toBe('Home is /home/testuser');
    });

    it('should expand ${VAR} syntax', () => {
      const result = envManager.expandVariables('Home is ${HOME}');
      expect(result).toBe('Home is /home/testuser');
    });

    it('should expand multiple variables', () => {
      const result = envManager.expandVariables('$USER lives in $HOME');
      expect(result).toBe('testuser lives in /home/testuser');
    });

    it('should expand user variables', () => {
      const result = envManager.expandVariables('Value is $MYVAR');
      expect(result).toBe('Value is myvalue');
    });

    it('should handle missing variables by leaving them unchanged', () => {
      const result = envManager.expandVariables('Missing $NONEXISTENT var');
      expect(result).toBe('Missing $NONEXISTENT var');
    });

    it('should handle escaped variables', () => {
      const result = envManager.expandVariables('Literal \\$HOME');
      expect(result).toBe('Literal $HOME');
    });

    it('should expand variables in URLs', () => {
      const result = envManager.expandVariables('API: $API_URL/users');
      expect(result).toBe('API: https://api.example.com/users');
    });

    it('should handle empty string', () => {
      const result = envManager.expandVariables('');
      expect(result).toBe('');
    });

    it('should handle text with no variables', () => {
      const result = envManager.expandVariables('No variables here');
      expect(result).toBe('No variables here');
    });
  });

  describe('getting all variables', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
      envManager.setVariable('CUSTOM1', 'value1');
      envManager.setVariable('CUSTOM2', 'value2');
    });

    it('should return all platform variables', () => {
      const platformVars = envManager.getPlatformVariables();

      expect(platformVars.get('HOME')).toBe('/home/testuser');
      expect(platformVars.get('USER')).toBe('testuser');
      expect(platformVars.size).toBeGreaterThan(5);
    });

    it('should return all user variables', () => {
      const userVars = envManager.getUserVariables();

      expect(userVars.get('CUSTOM1')).toBe('value1');
      expect(userVars.get('CUSTOM2')).toBe('value2');
      expect(userVars.size).toBe(2);
    });

    it('should return combined variables', () => {
      const allVars = envManager.getAllVariables();

      expect(allVars.get('HOME')).toBe('/home/testuser');
      expect(allVars.get('CUSTOM1')).toBe('value1');
      expect(allVars.size).toBeGreaterThan(10);
    });

    it('should prioritize user variables in combined list', () => {
      envManager.setVariable('HOME', '/custom/home');
      const allVars = envManager.getAllVariables();

      expect(allVars.get('HOME')).toBe('/custom/home');
    });
  });

  describe('export format', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
      envManager.setVariable('ZZVAR', 'last'); // Starts with ZZ to test sorting
      envManager.setVariable('AAVAR', 'first'); // Starts with AA to test sorting
    });

    it('should format variables as KEY=VALUE', () => {
      const lines = envManager.exportFormat();

      expect(lines.some((line) => line === 'HOME=/home/testuser')).toBe(true);
      expect(lines.some((line) => line === 'USER=testuser')).toBe(true);
    });

    it('should include user variables', () => {
      const lines = envManager.exportFormat();

      expect(lines.some((line) => line === 'ZZVAR=last')).toBe(true);
      expect(lines.some((line) => line === 'AAVAR=first')).toBe(true);
    });

    it('should sort variables alphabetically', () => {
      const lines = envManager.exportFormat();

      const aaIndex = lines.findIndex((line) => line.startsWith('AAVAR='));
      const zzIndex = lines.findIndex((line) => line.startsWith('ZZVAR='));

      expect(aaIndex).toBeLessThan(zzIndex);
    });
  });

  describe('filesystem sync', () => {
    beforeEach(() => {
      envManager = new EnvVarManager(mockFs, 'testuser', 'testhost');
    });

    it('should write to correct path', () => {
      envManager.setVariable('MYVAR', 'value');

      expect(mockFs.writeFile).toHaveBeenCalledWith(PATHS.CONFIG_ENV, expect.any(String));
    });

    it('should include header in synced file', () => {
      envManager.setVariable('MYVAR', 'value');

      const writeCall = (mockFs.writeFile as any).mock.calls.find(
        (call: any[]) => call[0] === PATHS.CONFIG_ENV
      );
      const content = writeCall[1];

      expect(content).toContain('# Environment Variables');
      expect(content).toContain('# Platform variables (read-only):');
    });

    it('should include platform variables in synced file', () => {
      const writeCall = (mockFs.writeFile as any).mock.calls.find(
        (call: any[]) => call[0] === PATHS.CONFIG_ENV
      );
      const content = writeCall[1];

      expect(content).toContain('HOME=/home/testuser');
      expect(content).toContain('USER=testuser');
    });

    it('should include user variables with export in synced file', () => {
      envManager.setVariable('MYVAR', 'value');

      // Get the LAST write call (after setVariable)
      const writeCalls = (mockFs.writeFile as any).mock.calls.filter(
        (call: any[]) => call[0] === PATHS.CONFIG_ENV
      );
      const lastCall = writeCalls[writeCalls.length - 1];
      const content = lastCall[1];

      expect(content).toContain('# User variables:');
      expect(content).toContain('export MYVAR=value');
    });

    it('should handle filesystem write errors gracefully', () => {
      const errorFs = createMockFileSystem();
      (errorFs.writeFile as any).mockImplementation(() => {
        throw new Error('Write failed');
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      envManager = new EnvVarManager(errorFs, 'testuser', 'testhost');
      envManager.setVariable('MYVAR', 'value');

      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
