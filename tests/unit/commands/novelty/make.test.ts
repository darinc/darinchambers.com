import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMakeCommand } from '../../../../src/commands/novelty/make';
import type { CommandResult } from '../../../../src/commands/Command';
import type { Terminal } from '../../../../src/components/Terminal';

describe('make command', () => {
  let mockTerminal: Terminal;

  beforeEach(() => {
    mockTerminal = {
      setInputLineVisible: vi.fn(),
      focus: vi.fn(),
    } as unknown as Terminal;
  });

  it('should have correct name and description', () => {
    const command = createMakeCommand(mockTerminal);
    expect(command.name).toBe('make');
    expect(command.description).toBe('Build targets from a Makefile');
  });

  it('should return "What? Make it yourself." for make me a sandwich', () => {
    const command = createMakeCommand(mockTerminal);
    const result = command.execute(['me', 'a', 'sandwich']) as CommandResult;
    expect(result.output).toBe('What? Make it yourself.');
    expect(result.error).toBeUndefined();
  });

  it('should return no targets error with no args', () => {
    const command = createMakeCommand(mockTerminal);
    const result = command.execute([]) as CommandResult;
    expect(result.output).toBe('make: *** No targets specified. Stop.');
    expect(result.error).toBe(true);
  });

  it('should return no rule error for unknown targets', () => {
    const command = createMakeCommand(mockTerminal);
    const result = command.execute(['foo']) as CommandResult;
    expect(result.output).toBe("make: *** No rule to make target 'foo'. Stop.");
    expect(result.error).toBe(true);
  });

  it('should brew coffee for make coffee', () => {
    const command = createMakeCommand(mockTerminal);
    const result = command.execute(['coffee']) as CommandResult;
    expect(result.output).toContain('Grinding beans');
    expect(result.output).toContain('Brewing dark roast');
    expect(result.output).toContain('Ready');
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should hide input line during coffee animation', () => {
    const command = createMakeCommand(mockTerminal);
    command.execute(['coffee']);
    expect(mockTerminal.setInputLineVisible).toHaveBeenCalledWith(false);
  });

  it('should return help text with --help flag', () => {
    const command = createMakeCommand(mockTerminal);
    const result = command.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: make');
    expect(result.output).toContain('make coffee');
    expect(result.output).toContain('make me a sandwich');
  });
});
