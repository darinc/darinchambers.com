import { describe, it, expect, vi } from 'vitest';
import { createUnaliasCommand } from '../../../../src/commands/core/unalias';
import type { AliasManager } from '../../../../src/utils/AliasManager';

describe('unalias command', () => {
  it('should remove existing alias', () => {
    const mockManager = {
      removeAlias: vi.fn().mockReturnValue(true),
    } as unknown as AliasManager;

    const command = createUnaliasCommand(mockManager);
    const result = command.execute(['ll']);

    expect(mockManager.removeAlias).toHaveBeenCalledWith('ll');
    expect(result.output).toBe('Alias removed: ll');
    expect(result.error).toBeUndefined();
  });

  it('should show error for non-existent alias', () => {
    const mockManager = {
      removeAlias: vi.fn().mockReturnValue(false),
    } as unknown as AliasManager;

    const command = createUnaliasCommand(mockManager);
    const result = command.execute(['nonexistent']);

    expect(result.output).toBe('unalias: nonexistent: not found');
    expect(result.error).toBe(true);
  });

  it('should show usage when no arguments', () => {
    const mockManager = {
      removeAlias: vi.fn(),
    } as unknown as AliasManager;

    const command = createUnaliasCommand(mockManager);
    const result = command.execute([]);

    expect(result.output).toBe("Usage: unalias name\nTry 'unalias --help' for more information.");
    expect(result.error).toBe(true);
  });

  it('should only use first argument', () => {
    const mockManager = {
      removeAlias: vi.fn().mockReturnValue(true),
    } as unknown as AliasManager;

    const command = createUnaliasCommand(mockManager);
    command.execute(['ll', 'gs', 'extra']);

    expect(mockManager.removeAlias).toHaveBeenCalledWith('ll');
    expect(mockManager.removeAlias).toHaveBeenCalledTimes(1);
  });

  it('should have correct name and description', () => {
    const mockManager = {
      removeAlias: vi.fn(),
    } as unknown as AliasManager;

    const command = createUnaliasCommand(mockManager);

    expect(command.name).toBe('unalias');
    expect(command.description).toBe('Remove command aliases');
  });
});
