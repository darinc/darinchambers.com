import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSudoCommand } from '../../../../src/commands/core/sudo';
import type { Terminal } from '../../../../src/components/Terminal';
import type { CommandExecutor } from '../../../../src/utils/CommandExecutor';

function createMocks() {
  const mockTerminal = {
    getUsername: vi.fn().mockReturnValue('darin'),
    setUsername: vi.fn(),
    setInputInterceptor: vi.fn(),
    writeError: vi.fn(),
    executeCommand: vi.fn().mockResolvedValue(undefined),
    setCurrentPath: vi.fn(),
    getInput: vi.fn().mockReturnValue({
      setInputType: vi.fn(),
      setPrompt: vi.fn(),
    }),
  } as unknown as Terminal;

  const mockExecutor = {
    execute: vi.fn().mockResolvedValue({ output: 'command output' }),
  } as unknown as CommandExecutor;

  return { mockTerminal, mockExecutor };
}

describe('sudo command', () => {
  let mockTerminal: Terminal;
  let mockExecutor: CommandExecutor;

  beforeEach(() => {
    const mocks = createMocks();
    mockTerminal = mocks.mockTerminal;
    mockExecutor = mocks.mockExecutor;
  });

  it('should have correct name and description', () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    expect(command.name).toBe('sudo');
    expect(command.description).toBe('Execute a command as superuser');
  });

  it('should return usage error with no args', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const result = await command.execute([]);
    expect(result.output).toBe('usage: sudo <command>');
    expect(result.error).toBe(true);
  });

  it('should return help text with --help flag', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const result = await command.execute(['--help']);
    expect(result.output).toContain('Usage: sudo');
    expect(result.output).toContain('sudo su');
  });

  it('should return "Okay." for make me a sandwich', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const result = await command.execute(['make', 'me', 'a', 'sandwich']);
    expect(result.output).toBe('Okay.');
  });

  it('should prompt for password when unauthenticated', () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    // execute returns a pending Promise (don't await — it blocks until password)
    const resultPromise = command.execute(['ls']);

    expect(mockTerminal.getInput().setInputType).toHaveBeenCalledWith('password');
    expect(mockTerminal.getInput().setPrompt).toHaveBeenCalledWith('[sudo] password for darin: ');
    expect(mockTerminal.setInputInterceptor).toHaveBeenCalled();

    // Resolve the promise so the test doesn't leak
    const interceptor = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;
    interceptor('hunter2');
    return resultPromise;
  });

  it('should execute command after correct password and resolve with result', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const resultPromise = command.execute(['ls']);

    // Get the interceptor callback
    const interceptor = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;

    // Provide correct password
    interceptor('hunter2');

    const result = await resultPromise;
    expect(mockExecutor.execute).toHaveBeenCalledWith('ls');
    expect(result.output).toBe('command output');
  });

  it('should resolve with error after 3 wrong password attempts', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const resultPromise = command.execute(['ls']);

    // First attempt - wrong password
    const interceptor1 = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;
    interceptor1('wrong1');

    expect(mockTerminal.writeError).toHaveBeenCalledWith('Sorry, try again.');

    // Second attempt - wrong password
    const interceptor2 = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[1][0] as (
      value: string
    ) => void;
    interceptor2('wrong2');

    // Third attempt - wrong password
    const interceptor3 = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[2][0] as (
      value: string
    ) => void;
    interceptor3('wrong3');

    const result = await resultPromise;
    expect(result.output).toBe('sudo: 3 incorrect password attempts');
    expect(result.error).toBe(true);
  });

  it('should return sub-command result when already authenticated', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);

    // First: authenticate
    const authPromise = command.execute(['ls']);
    const interceptor = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;
    interceptor('hunter2');
    await authPromise;

    // Second: should return sub-command result directly (no interceptor)
    vi.mocked(mockTerminal.setInputInterceptor).mockClear();
    vi.mocked(mockExecutor.execute).mockResolvedValue({ output: 'pwd output' });
    const result = await command.execute(['pwd']);

    expect(mockTerminal.setInputInterceptor).not.toHaveBeenCalled();
    expect(result.output).toBe('pwd output');
  });

  it('should switch to root on sudo su', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const resultPromise = command.execute(['su']);

    const interceptor = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;
    interceptor('hunter2');

    const result = await resultPromise;
    expect(mockTerminal.setUsername).toHaveBeenCalledWith('root');
    expect(result.output).toBe('');
  });

  it('should switch to root on sudo su -', async () => {
    const command = createSudoCommand(mockTerminal, mockExecutor);
    const resultPromise = command.execute(['su', '-']);

    const interceptor = vi.mocked(mockTerminal.setInputInterceptor).mock.calls[0][0] as (
      value: string
    ) => void;
    interceptor('hunter2');

    const result = await resultPromise;
    expect(mockTerminal.setUsername).toHaveBeenCalledWith('root');
    expect(result.output).toBe('');
  });
});
