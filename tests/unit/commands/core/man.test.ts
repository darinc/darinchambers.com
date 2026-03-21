import { describe, it, expect, vi } from 'vitest';
import { createManCommand } from '../../../../src/commands/core/man';
import type { Command } from '../../../../src/commands/Command';
import type { CommandDispatcher } from '../../../../src/utils/CommandDispatcher';

describe('man command', () => {
  const createMockDispatcher = (
    commands: Command[],
    helpOutput = 'Usage: test\n\nDescription:\n  Test command'
  ): CommandDispatcher => {
    return {
      getCommandNames: vi.fn().mockReturnValue(commands.map((c) => c.name)),
      getCommands: vi.fn().mockReturnValue(commands),
      dispatch: vi.fn().mockResolvedValue({ output: helpOutput }),
    } as unknown as CommandDispatcher;
  };

  const mockCommands: Command[] = [
    { name: 'ls', description: 'List directory contents', execute: vi.fn() },
    { name: 'help', description: 'Display available commands', execute: vi.fn() },
    { name: 'which', description: 'Locate a command', execute: vi.fn() },
  ];

  describe('metadata', () => {
    it('should have correct name and description', () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      expect(command.name).toBe('man');
      expect(command.description).toBe('Display manual pages for commands');
    });
  });

  describe('--help', () => {
    it('should display help text when --help flag is provided', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['--help']);

      expect(result.output).toContain('Usage: man');
      expect(result.output).toContain('man ls');
      expect(result.error).toBeUndefined();
    });
  });

  describe('no arguments', () => {
    it('should return error when no arguments provided', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute([]);

      expect(result.output).toContain('What manual page do you want?');
      expect(result.output).toContain('man help');
      expect(result.error).toBe(true);
    });
  });

  describe('unknown command', () => {
    it('should return error for unknown command', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['nonexistent']);

      expect(result.output).toBe('No manual entry for nonexistent');
      expect(result.error).toBe(true);
    });
  });

  describe('man page formatting', () => {
    it('should show NAME section with command description', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['ls']);

      expect(result.output).toContain('NAME');
      expect(result.output).toContain('ls - List directory contents');
    });

    it('should show header with command name and section', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['ls']);

      expect(result.output).toContain('ls(1)');
      expect(result.output).toContain('User Commands');
    });

    it('should show SEE ALSO section', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['ls']);

      expect(result.output).toContain('SEE ALSO');
      expect(result.output).toContain('help(1)');
      expect(result.output).toContain('which(1)');
    });

    it('should include the --help output in the man page', async () => {
      const helpText = 'Usage: ls [options]\n\nDescription:\n  List directory contents';
      const dispatcher = createMockDispatcher(mockCommands, helpText);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['ls']);

      expect(result.output).toContain(helpText);
      expect(dispatcher.dispatch).toHaveBeenCalledWith('ls --help');
    });

    it('should exclude the current command from SEE ALSO', async () => {
      const dispatcher = createMockDispatcher(mockCommands);
      const command = createManCommand(dispatcher);

      const result = await command.execute(['help']);

      expect(result.output).toContain('SEE ALSO');
      expect(result.output).toContain('which(1)');
      // help should not reference itself
      expect(result.output).not.toMatch(/SEE ALSO\n\s+.*help\(1\)/);
    });
  });
});
