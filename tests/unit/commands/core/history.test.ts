import { describe, it, expect, vi } from 'vitest';
import { createHistoryCommand } from '../../../../src/commands/core/history';
import type { TerminalInput } from '../../../../src/components/TerminalInput';

describe('history command', () => {
  it('should display command history with line numbers', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(['ls', 'cd /home', 'pwd'])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    expect(result.output).toBe('    1  ls\n    2  cd /home\n    3  pwd');
    expect(mockInput.getHistory).toHaveBeenCalled();
  });

  it('should handle empty history', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue([])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    expect(result.output).toBe('No commands in history.');
  });

  it('should pad line numbers correctly', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(['cmd1'])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    // Line number should be padded to 5 characters
    expect(result.output).toMatch(/^\s{4}1  cmd1$/);
  });

  it('should handle many commands', () => {
    const commands = Array.from({ length: 100 }, (_, i) => `command${i + 1}`);
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(commands)
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    const lines = result.output.split('\n');
    expect(lines.length).toBe(100);
    expect(lines[0]).toBe('    1  command1');
    expect(lines[99]).toBe('  100  command100');
  });

  it('should have correct name and description', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue([])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);

    expect(command.name).toBe('history');
    expect(command.description).toBe('Display command history');
  });

  it('should ignore arguments', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(['test'])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute(['arg1', 'arg2']);

    expect(result.output).toBe('    1  test');
  });

  it('should ignore stdin', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(['cmd'])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([], 'piped input');

    expect(result.output).toBe('    1  cmd');
  });

  it('should handle commands with special characters', () => {
    const mockInput = {
      getHistory: vi.fn().mockReturnValue(['echo "hello world"', 'ls -la | grep test'])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    expect(result.output).toContain('echo "hello world"');
    expect(result.output).toContain('ls -la | grep test');
  });

  it('should handle very long commands', () => {
    const longCommand = 'echo ' + 'a'.repeat(1000);
    const mockInput = {
      getHistory: vi.fn().mockReturnValue([longCommand])
    } as unknown as TerminalInput;

    const command = createHistoryCommand(mockInput);
    const result = command.execute([]);

    expect(result.output).toContain(longCommand);
  });
});
