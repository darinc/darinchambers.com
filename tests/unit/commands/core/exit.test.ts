import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExitCommand } from '../../../../src/commands/core/exit';
import type { CommandResult } from '../../../../src/commands/Command';
import type { Terminal } from '../../../../src/components/Terminal';
import type { EnvVarManager } from '../../../../src/utils/EnvVarManager';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

function createMocks() {
  const mockTerminal = {
    getUsername: vi.fn().mockReturnValue('darin'),
    setUsername: vi.fn(),
  } as unknown as Terminal;

  const mockEnvVarManager = {
    setVariable: vi.fn(),
  } as unknown as EnvVarManager;

  const mockFileSystem = {
    changeDirectory: vi.fn(),
    getShortPath: vi.fn().mockReturnValue('~'),
  } as unknown as IFileSystem;

  const onPathChange = vi.fn() as unknown as (path: string) => void;

  return { mockTerminal, mockEnvVarManager, mockFileSystem, onPathChange };
}

describe('exit command', () => {
  let mockTerminal: Terminal;
  let mockEnvVarManager: EnvVarManager;
  let mockFileSystem: IFileSystem;
  let onPathChange: (path: string) => void;

  beforeEach(() => {
    const mocks = createMocks();
    mockTerminal = mocks.mockTerminal;
    mockEnvVarManager = mocks.mockEnvVarManager;
    mockFileSystem = mocks.mockFileSystem;
    onPathChange = mocks.onPathChange;
  });

  it('should have correct name and description', () => {
    const command = createExitCommand(
      mockTerminal,
      mockEnvVarManager,
      mockFileSystem,
      onPathChange
    );
    expect(command.name).toBe('exit');
    expect(command.description).toBe('Exit the current session');
    expect(command.aliases).toContain('logout');
  });

  it('should return help text with --help flag', () => {
    const command = createExitCommand(
      mockTerminal,
      mockEnvVarManager,
      mockFileSystem,
      onPathChange
    );
    const result = command.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: exit');
    expect(result.output).toContain('logout');
  });

  it('should switch back to darin when root', () => {
    vi.mocked(mockTerminal.getUsername).mockReturnValue('root');
    const command = createExitCommand(
      mockTerminal,
      mockEnvVarManager,
      mockFileSystem,
      onPathChange
    );
    const result = command.execute([]) as CommandResult;

    expect(result.output).toBe('');
    expect(mockTerminal.setUsername).toHaveBeenCalledWith('darin');
    expect(mockEnvVarManager.setVariable).toHaveBeenCalledWith('HOME', '/home/darin');
    expect(mockEnvVarManager.setVariable).toHaveBeenCalledWith('USER', 'darin');
    expect(mockEnvVarManager.setVariable).toHaveBeenCalledWith('PWD', '/home/darin');
    expect(mockFileSystem.changeDirectory).toHaveBeenCalledWith('/home/darin');
    expect(onPathChange).toHaveBeenCalled();
  });

  it('should return a funny response when not root', () => {
    const command = createExitCommand(
      mockTerminal,
      mockEnvVarManager,
      mockFileSystem,
      onPathChange
    );
    const result = command.execute([]) as CommandResult;

    expect(result.output).toBeTruthy();
    expect(typeof result.output).toBe('string');
    // Should not have switched user
    expect(mockTerminal.setUsername).not.toHaveBeenCalled();
  });
});
