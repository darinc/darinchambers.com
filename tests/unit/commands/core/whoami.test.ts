import { describe, it, expect, vi } from 'vitest';
import { createWhoamiCommand } from '../../../../src/commands/core/whoami';
import type { Terminal } from '../../../../src/components/Terminal';

describe('whoami command', () => {
  it('should return username from terminal', () => {
    const mockTerminal = {
      getUsername: vi.fn().mockReturnValue('testuser')
    } as unknown as Terminal;

    const command = createWhoamiCommand(mockTerminal);
    const result = command.execute([]);

    expect(result.output).toBe('testuser');
    expect(mockTerminal.getUsername).toHaveBeenCalled();
  });

  it('should have correct name and description', () => {
    const mockTerminal = {
      getUsername: vi.fn().mockReturnValue('user')
    } as unknown as Terminal;

    const command = createWhoamiCommand(mockTerminal);

    expect(command.name).toBe('whoami');
    expect(command.description).toBe('Display current username');
  });

  it('should ignore arguments', () => {
    const mockTerminal = {
      getUsername: vi.fn().mockReturnValue('darin')
    } as unknown as Terminal;

    const command = createWhoamiCommand(mockTerminal);
    const result = command.execute(['arg1', 'arg2']);

    expect(result.output).toBe('darin');
  });

  it('should ignore stdin', () => {
    const mockTerminal = {
      getUsername: vi.fn().mockReturnValue('alice')
    } as unknown as Terminal;

    const command = createWhoamiCommand(mockTerminal);
    const result = command.execute([], 'piped input');

    expect(result.output).toBe('alice');
    expect(result.output).not.toBe('piped input');
  });

  it('should work with different usernames', () => {
    const mockTerminal = {
      getUsername: vi.fn().mockReturnValue('root')
    } as unknown as Terminal;

    const command = createWhoamiCommand(mockTerminal);
    const result = command.execute([]);

    expect(result.output).toBe('root');
  });
});
