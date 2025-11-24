import { describe, it, expect, vi } from 'vitest';
import { createEnvCommand } from '../../../../src/commands/core/env';
import type { CommandResult } from '../../../../src/commands/Command';
import type { EnvVarManager } from '../../../../src/utils/EnvVarManager';

describe('env command', () => {
  it('should display all environment variables', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(
        new Map([
          ['PATH', '/usr/bin'],
          ['HOME', '/home/user'],
          ['USER', 'testuser'],
        ])
      ),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([]) as CommandResult;

    expect(result.output).toContain('PATH=/usr/bin');
    expect(result.output).toContain('HOME=/home/user');
    expect(result.output).toContain('USER=testuser');
  });

  it('should sort variables alphabetically', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(
        new Map([
          ['ZEBRA', 'last'],
          ['ALPHA', 'first'],
          ['MIDDLE', 'mid'],
        ])
      ),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([]) as CommandResult;

    const lines = result.output.split('\n');
    expect(lines[0]).toBe('ALPHA=first');
    expect(lines[1]).toBe('MIDDLE=mid');
    expect(lines[2]).toBe('ZEBRA=last');
  });

  it('should return empty string when no variables', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(new Map()),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([]) as CommandResult;

    expect(result.output).toBe('');
  });

  it('should have correct name and description', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(new Map()),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);

    expect(command.name).toBe('env');
    expect(command.description).toBe('Display all environment variables');
  });

  it('should ignore arguments', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(new Map([['TEST', 'value']])),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute(['arg1', 'arg2']) as CommandResult;

    expect(result.output).toBe('TEST=value');
  });

  it('should ignore stdin', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockReturnValue(new Map([['VAR', 'value']])),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([], 'stdin input') as CommandResult;

    expect(result.output).toBe('VAR=value');
  });

  it('should handle error from manager', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockImplementation(() => {
        throw new Error('Manager error');
      }),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([]) as CommandResult;

    expect(result.output).toBe('Manager error');
    expect(result.error).toBe(true);
  });

  it('should handle non-Error exceptions', () => {
    const mockManager = {
      getAllVariables: vi.fn().mockImplementation(() => {
        throw new Error('string error');
      }),
    } as unknown as EnvVarManager;

    const command = createEnvCommand(mockManager);
    const result = command.execute([]) as CommandResult;

    expect(result.output).toBe('string error');
    expect(result.error).toBe(true);
  });
});
