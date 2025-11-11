import { describe, it, expect, vi } from 'vitest';
import { createAliasCommand } from '../../../../src/commands/core/alias';
import type { AliasManager } from '../../../../src/utils/AliasManager';

describe('alias command', () => {
  describe('Display Aliases', () => {
    it('should display all aliases when no arguments', () => {
      const mockManager = {
        getAllAliases: vi.fn().mockReturnValue(
          new Map([
            ['ll', 'ls -lah'],
            ['gs', 'git status'],
          ])
        ),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute([]);

      expect(result.output).toContain(`alias ll='ls -lah'`);
      expect(result.output).toContain(`alias gs='git status'`);
    });

    it('should show message when no aliases defined', () => {
      const mockManager = {
        getAllAliases: vi.fn().mockReturnValue(new Map()),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute([]);

      expect(result.output).toBe('No aliases defined.');
    });

    it('should sort aliases alphabetically', () => {
      const mockManager = {
        getAllAliases: vi.fn().mockReturnValue(
          new Map([
            ['zz', 'last'],
            ['aa', 'first'],
            ['mm', 'middle'],
          ])
        ),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute([]);

      const lines = result.output.split('\n');
      expect(lines[0]).toContain('aa=');
      expect(lines[1]).toContain('mm=');
      expect(lines[2]).toContain('zz=');
    });
  });

  describe('Create Alias', () => {
    it('should create alias with valid syntax', () => {
      const mockManager = {
        getAllAliases: vi.fn(),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute(['ll=ls', '-lah']);

      expect(mockManager.setAlias).toHaveBeenCalledWith('ll', 'ls -lah');
      expect(result.output).toBe(`Alias created: ll='ls -lah'`);
    });

    it('should handle alias with complex command', () => {
      const mockManager = {
        getAllAliases: vi.fn(),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute(['deploy=git', 'push', '&&', 'npm', 'run', 'build']);

      expect(mockManager.setAlias).toHaveBeenCalledWith('deploy', 'git push && npm run build');
      expect(result.output).toContain('Alias created');
    });

    it('should show usage on invalid syntax', () => {
      const mockManager = {
        getAllAliases: vi.fn(),
        setAlias: vi.fn(),
        removeAlias: vi.fn(),
        isDefaultAlias: vi.fn().mockReturnValue(false),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute(['invalid']);

      expect(result.output).toContain('Usage: alias name=');
      expect(result.error).toBe(true);
    });

    it('should handle error from setAlias', () => {
      const mockManager = {
        getAllAliases: vi.fn(),
        setAlias: vi.fn().mockImplementation(() => {
          throw new Error('Invalid alias name');
        }),
        removeAlias: vi.fn(),
      } as unknown as AliasManager;

      const command = createAliasCommand(mockManager);
      const result = command.execute(['bad-name=cmd']);

      expect(result.output).toBe('Invalid alias name');
      expect(result.error).toBe(true);
    });
  });
});
