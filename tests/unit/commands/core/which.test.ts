import { describe, it, expect, vi } from 'vitest';
import { createWhichCommand } from '../../../../src/commands/core/which';
import type { CommandResult } from '../../../../src/commands/Command';
import type { AliasManager } from '../../../../src/utils/AliasManager';
import type { CommandDispatcher } from '../../../../src/utils/CommandDispatcher';

describe('which command', () => {
  const createMockDispatcher = (commands: string[]): CommandDispatcher => {
    return {
      getCommandNames: vi.fn().mockReturnValue(commands),
    } as unknown as CommandDispatcher;
  };

  const createMockAliasManager = (aliases: Map<string, string> = new Map()): AliasManager => {
    return {
      getAlias: vi.fn((name: string) => aliases.get(name)),
      getAllAliases: vi.fn().mockReturnValue(aliases),
    } as unknown as AliasManager;
  };

  describe('Help', () => {
    it('should display help text when --help flag is provided', () => {
      const mockDispatcher = createMockDispatcher([]);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: which');
      expect(result.output).toContain('-a');
      expect(result.output).toContain('Locate a command');
      expect(result.error).toBeUndefined();
    });
  });

  describe('Missing Arguments', () => {
    it('should return error when no command argument provided', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'cd']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute([]) as CommandResult;

      expect(result.output).toContain('missing command argument');
      expect(result.error).toBe(true);
    });
  });

  describe('Core Commands', () => {
    it('should return /usr/bin path for core commands', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'cd', 'cat', 'echo']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['ls']) as CommandResult;

      expect(result.output).toBe('/usr/bin/ls');
      expect(result.error).toBeUndefined();
    });

    it('should return /usr/bin path for other core commands', () => {
      const mockDispatcher = createMockDispatcher(['echo', 'date', 'clear']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['echo']) as CommandResult;

      expect(result.output).toBe('/usr/bin/echo');
    });
  });

  describe('Custom Commands', () => {
    it('should return /usr/local/bin path for about command', () => {
      const mockDispatcher = createMockDispatcher(['about', 'portfolio']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['about']) as CommandResult;

      expect(result.output).toBe('/usr/local/bin/about');
      expect(result.error).toBeUndefined();
    });

    it('should return /usr/local/bin path for portfolio command', () => {
      const mockDispatcher = createMockDispatcher(['about', 'portfolio']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['portfolio']) as CommandResult;

      expect(result.output).toBe('/usr/local/bin/portfolio');
    });

    it('should return /usr/local/bin path for blog command', () => {
      const mockDispatcher = createMockDispatcher(['blog']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['blog']) as CommandResult;

      expect(result.output).toBe('/usr/local/bin/blog');
    });

    it('should return /usr/local/bin path for contact command', () => {
      const mockDispatcher = createMockDispatcher(['contact']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['contact']) as CommandResult;

      expect(result.output).toBe('/usr/local/bin/contact');
    });

    it('should return /usr/local/bin path for settings command', () => {
      const mockDispatcher = createMockDispatcher(['settings']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['settings']) as CommandResult;

      expect(result.output).toBe('/usr/local/bin/settings');
    });
  });

  describe('Alias Resolution', () => {
    it('should show alias definition for aliased commands', () => {
      const aliases = new Map([['ll', 'ls -alh']]);
      const mockDispatcher = createMockDispatcher(['ls']);
      const mockAliasManager = createMockAliasManager(aliases);
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['ll']) as CommandResult;

      expect(result.output).toBe('ll: aliased to ls -alh');
      expect(result.error).toBeUndefined();
    });

    it('should show alias with -a flag showing all matches', () => {
      const aliases = new Map([['ll', 'ls -alh']]);
      const mockDispatcher = createMockDispatcher(['ls', 'll']);
      const mockAliasManager = createMockAliasManager(aliases);
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['-a', 'll']) as CommandResult;

      expect(result.output).toContain('ll: aliased to ls -alh');
      expect(result.output).toContain('/usr/bin/ll');
    });
  });

  describe('Unknown Commands', () => {
    it('should return error for unknown command', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'cd']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['nonexistent']) as CommandResult;

      expect(result.output).toBe('which: nonexistent: command not found');
      expect(result.error).toBe(true);
    });
  });

  describe('Multiple Commands', () => {
    it('should handle multiple command arguments', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'cat', 'about']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['ls', 'cat']) as CommandResult;

      expect(result.output).toContain('/usr/bin/ls');
      expect(result.output).toContain('/usr/bin/cat');
    });

    it('should show error for each unknown command in multiple args', () => {
      const mockDispatcher = createMockDispatcher(['ls']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['ls', 'unknown']) as CommandResult;

      expect(result.output).toContain('/usr/bin/ls');
      expect(result.output).toContain('which: unknown: command not found');
      expect(result.error).toBe(true);
    });

    it('should handle mix of core and custom commands', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'about', 'cat']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['ls', 'about']) as CommandResult;

      expect(result.output).toContain('/usr/bin/ls');
      expect(result.output).toContain('/usr/local/bin/about');
    });
  });

  describe('Case Sensitivity', () => {
    it('should be case-insensitive for command lookup', () => {
      const mockDispatcher = createMockDispatcher(['ls', 'cd']);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      const result = command.execute(['LS']) as CommandResult;

      // Commands are stored lowercase in dispatcher, so LS should still match
      expect(result.output).toBe('/usr/bin/LS');
    });
  });

  describe('Command Properties', () => {
    it('should have correct name property', () => {
      const mockDispatcher = createMockDispatcher([]);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      expect(command.name).toBe('which');
    });

    it('should have correct description property', () => {
      const mockDispatcher = createMockDispatcher([]);
      const mockAliasManager = createMockAliasManager();
      const command = createWhichCommand(mockDispatcher, mockAliasManager);

      expect(command.description).toBe('Locate a command and display its path');
    });
  });
});
