import { describe, it, expect, beforeEach } from 'vitest';
import { CommandDispatcher } from '../../../src/utils/CommandDispatcher';
import type { Command, CommandResult } from '../../../src/commands/Command';

// Mock Command Implementations for Testing
class MockEchoCommand implements Command {
  name = 'echo';
  description = 'Echo input or stdin';
  aliases = ['e'];

  execute(args: string[], stdin?: string): CommandResult {
    const output = stdin !== undefined ? stdin : args.join(' ');
    return { output };
  }
}

class MockUppercaseCommand implements Command {
  name = 'uppercase';
  description = 'Convert stdin to uppercase';
  aliases = ['upper', 'uc'];

  execute(args: string[], stdin?: string): CommandResult {
    const output = stdin ? stdin.toUpperCase() : '';
    return { output };
  }
}

class MockCountCommand implements Command {
  name = 'count';
  description = 'Count characters in stdin';

  execute(args: string[], stdin?: string): CommandResult {
    const output = stdin ? String(stdin.length) : '0';
    return { output };
  }
}

class MockErrorCommand implements Command {
  name = 'error';
  description = 'Always throws an error';

  execute(args: string[], stdin?: string): CommandResult {
    throw new Error('Intentional test error');
  }
}

class MockStringErrorCommand implements Command {
  name = 'stringerror';
  description = 'Throws a string error';

  execute(args: string[], stdin?: string): CommandResult {
    throw 'String error message';
  }
}

class MockEmptyCommand implements Command {
  name = 'empty';
  description = 'Returns empty output';

  execute(args: string[], stdin?: string): CommandResult {
    return { output: '' };
  }
}

class MockErrorResultCommand implements Command {
  name = 'errresult';
  description = 'Returns error result';

  execute(args: string[], stdin?: string): CommandResult {
    return { output: 'Error occurred', error: true };
  }
}

class MockArgsCommand implements Command {
  name = 'args';
  description = 'Returns args as JSON';

  execute(args: string[], stdin?: string): CommandResult {
    return { output: JSON.stringify({ args, hasStdin: stdin !== undefined }) };
  }
}

describe('CommandDispatcher', () => {
  let dispatcher: CommandDispatcher;

  beforeEach(() => {
    dispatcher = new CommandDispatcher();
  });

  describe('Command Registration & Lookup', () => {
    it('should register single command and make it retrievable', () => {
      const echoCmd = new MockEchoCommand();
      dispatcher.registerCommand(echoCmd);

      const commands = dispatcher.getCommands();
      expect(commands).toHaveLength(1);
      expect(commands[0].name).toBe('echo');
    });

    it('should register command with aliases and verify alias lookup', () => {
      const upperCmd = new MockUppercaseCommand();
      dispatcher.registerCommand(upperCmd);

      const commandNames = dispatcher.getCommandNames();
      expect(commandNames).toContain('uppercase');
      expect(commandNames).toContain('upper');
      expect(commandNames).toContain('uc');
    });

    it('should register multiple commands', () => {
      dispatcher.registerCommand(new MockEchoCommand());
      dispatcher.registerCommand(new MockUppercaseCommand());
      dispatcher.registerCommand(new MockCountCommand());

      const commands = dispatcher.getCommands();
      expect(commands).toHaveLength(3);
    });

    it('should return unique commands without alias duplicates', () => {
      const upperCmd = new MockUppercaseCommand(); // has 2 aliases
      dispatcher.registerCommand(upperCmd);

      const commands = dispatcher.getCommands();
      expect(commands).toHaveLength(1);
      expect(commands[0].name).toBe('uppercase');
    });

    it('should include both commands and aliases in getCommandNames', () => {
      dispatcher.registerCommand(new MockEchoCommand()); // has alias 'e'
      dispatcher.registerCommand(new MockCountCommand()); // no aliases

      const names = dispatcher.getCommandNames();
      expect(names).toContain('echo');
      expect(names).toContain('e');
      expect(names).toContain('count');
    });

    it('should handle case-insensitive command registration', async () => {
      const echoCmd = new MockEchoCommand();
      dispatcher.registerCommand(echoCmd);

      const result = await dispatcher.dispatch('ECHO test');
      expect(result.output).toBe('test');
    });

    it('should register command without aliases', () => {
      const countCmd = new MockCountCommand();
      dispatcher.registerCommand(countCmd);

      const commands = dispatcher.getCommands();
      expect(commands).toHaveLength(1);
      expect(commands[0].name).toBe('count');
    });

    it('should handle registering command with empty aliases array', () => {
      class MockNoAliasCommand implements Command {
        name = 'noalias';
        description = 'No aliases';
        aliases = [];
        execute(): CommandResult {
          return { output: 'ok' };
        }
      }

      dispatcher.registerCommand(new MockNoAliasCommand());
      const names = dispatcher.getCommandNames();
      expect(names).toContain('noalias');
      expect(names).toHaveLength(1);
    });
  });

  describe('Basic Command Dispatch', () => {
    beforeEach(() => {
      dispatcher.registerCommand(new MockEchoCommand());
      dispatcher.registerCommand(new MockUppercaseCommand());
      dispatcher.registerCommand(new MockErrorCommand());
    });

    it('should dispatch simple command successfully', async () => {
      const result = await dispatcher.dispatch('echo hello');
      expect(result.output).toBe('hello');
      expect(result.error).toBeUndefined();
    });

    it('should dispatch command with multiple arguments', async () => {
      const result = await dispatcher.dispatch('echo hello world test');
      expect(result.output).toBe('hello world test');
    });

    it('should dispatch command via alias', async () => {
      const result = await dispatcher.dispatch('e test');
      expect(result.output).toBe('test');
    });

    it('should handle empty input', async () => {
      const result = await dispatcher.dispatch('');
      expect(result.output).toBe('');
      expect(result.error).toBeUndefined();
    });

    it('should handle unknown command with error message', async () => {
      const result = await dispatcher.dispatch('unknowncommand arg1');
      expect(result.output).toContain('Command not found: unknowncommand');
      expect(result.output).toContain('help');
      expect(result.error).toBe(true);
    });

    it('should be case-insensitive during dispatch', async () => {
      const result1 = await dispatcher.dispatch('ECHO test');
      const result2 = await dispatcher.dispatch('Echo test');
      const result3 = await dispatcher.dispatch('echo test');

      expect(result1.output).toBe('test');
      expect(result2.output).toBe('test');
      expect(result3.output).toBe('test');
    });
  });

  describe('Pipeline Execution with stdin/stdout', () => {
    beforeEach(() => {
      dispatcher.registerCommand(new MockEchoCommand());
      dispatcher.registerCommand(new MockUppercaseCommand());
      dispatcher.registerCommand(new MockCountCommand());
      dispatcher.registerCommand(new MockEmptyCommand());
      dispatcher.registerCommand(new MockArgsCommand());
    });

    it('should execute single command pipeline without pipes', async () => {
      const result = await dispatcher.dispatchPipeline('echo hello');
      expect(result.output).toBe('hello');
    });

    it('should execute two-command pipeline with data flow', async () => {
      const result = await dispatcher.dispatchPipeline('echo hello | uppercase');
      expect(result.output).toBe('HELLO');
    });

    it('should execute three-command pipeline with data flow', async () => {
      const result = await dispatcher.dispatchPipeline('echo test | uppercase | count');
      expect(result.output).toBe('4'); // "TEST" has 4 characters
    });

    it('should pass undefined stdin to first command in pipeline', async () => {
      const result = await dispatcher.dispatchPipeline('args foo bar | echo');
      const parsed = JSON.parse(result.output);
      expect(parsed.hasStdin).toBe(false);
    });

    it('should pass previous command output as stdin to subsequent commands', async () => {
      const result = await dispatcher.dispatchPipeline('echo data | args test');
      const firstOutput = result.output;
      const parsed = JSON.parse(firstOutput);
      expect(parsed.hasStdin).toBe(true);
    });

    it('should handle pipeline with empty result from first command', async () => {
      const result = await dispatcher.dispatchPipeline('empty | count');
      expect(result.output).toBe('0');
    });

    it('should handle pipeline where middle command produces no output', async () => {
      const result = await dispatcher.dispatchPipeline('echo test | empty | count');
      expect(result.output).toBe('0');
    });

    it('should pass correct parsed arguments to each command in pipeline', async () => {
      const result = await dispatcher.dispatchPipeline('echo start | args foo "bar baz" test | echo');
      const parsed = JSON.parse(result.output);
      expect(parsed.args).toEqual(['foo', 'bar baz', 'test']);
    });

    it('should handle complex pipeline with quoted arguments', async () => {
      const result = await dispatcher.dispatchPipeline('echo "hello world" | uppercase | count');
      expect(result.output).toBe('11'); // "HELLO WORLD" has 11 characters
    });

    it('should verify output flows correctly through entire chain', async () => {
      // echo outputs "test" -> uppercase outputs "TEST" -> count outputs "4"
      const result = await dispatcher.dispatchPipeline('echo test | uppercase | count');
      expect(result.output).toBe('4');

      // Verify intermediate step
      const partialResult = await dispatcher.dispatchPipeline('echo test | uppercase');
      expect(partialResult.output).toBe('TEST');
    });
  });

  describe('Error Handling & Propagation', () => {
    beforeEach(() => {
      dispatcher.registerCommand(new MockEchoCommand());
      dispatcher.registerCommand(new MockErrorCommand());
      dispatcher.registerCommand(new MockStringErrorCommand());
      dispatcher.registerCommand(new MockUppercaseCommand());
      dispatcher.registerCommand(new MockErrorResultCommand());
      dispatcher.registerCommand(new MockCountCommand());
    });

    it('should handle command execution throwing Error object', async () => {
      const result = await dispatcher.dispatch('error');
      expect(result.output).toContain('Error executing command');
      expect(result.output).toContain('Intentional test error');
      expect(result.error).toBe(true);
    });

    it('should handle command execution throwing string error', async () => {
      const result = await dispatcher.dispatch('stringerror');
      expect(result.output).toContain('Error executing command');
      expect(result.output).toContain('String error message');
      expect(result.error).toBe(true);
    });

    it('should include error details in error message format', async () => {
      const result = await dispatcher.dispatch('error');
      expect(result.output).toMatch(/Error executing command:/);
    });

    it('should stop pipeline on first error', async () => {
      const result = await dispatcher.dispatchPipeline('error | uppercase');
      expect(result.error).toBe(true);
      expect(result.output).toContain('Intentional test error');
    });

    it('should stop pipeline on error in middle command', async () => {
      const result = await dispatcher.dispatchPipeline('echo test | error | uppercase');
      expect(result.error).toBe(true);
      expect(result.output).toContain('Intentional test error');
    });

    it('should not execute commands after error occurs', async () => {
      // If count executed, we'd get a number. Since error stops pipeline, we get error message.
      const result = await dispatcher.dispatchPipeline('echo test | error | count');
      expect(result.error).toBe(true);
      expect(result.output).not.toMatch(/^\d+$/); // Should not be a number
    });

    it('should include error flag in result', async () => {
      const result = await dispatcher.dispatch('error');
      expect(result.error).toBe(true);
    });

    it('should handle unknown command in pipeline with error', async () => {
      const result = await dispatcher.dispatchPipeline('echo test | unknowncmd | uppercase');
      expect(result.error).toBe(true);
      expect(result.output).toContain('Command not found: unknowncmd');
    });

    it('should stop pipeline when command returns error result', async () => {
      const result = await dispatcher.dispatchPipeline('echo test | errresult | uppercase');
      expect(result.error).toBe(true);
      expect(result.output).toBe('Error occurred');
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      dispatcher.registerCommand(new MockEchoCommand());
      dispatcher.registerCommand(new MockUppercaseCommand());
    });

    it('should handle whitespace-only input', async () => {
      const result = await dispatcher.dispatch('   ');
      expect(result.output).toBe('');
    });

    it('should handle pipeline with empty command segments', async () => {
      const result = await dispatcher.dispatchPipeline('');
      expect(result.output).toBe('');
    });

    it('should handle command that returns error flag in result', async () => {
      dispatcher.registerCommand(new MockErrorResultCommand());
      const result = await dispatcher.dispatch('errresult');
      expect(result.error).toBe(true);
      expect(result.output).toBe('Error occurred');
    });

    it('should handle pipeline with only one command like dispatch', async () => {
      const dispatchResult = await dispatcher.dispatch('echo test');
      const pipelineResult = await dispatcher.dispatchPipeline('echo test');
      expect(pipelineResult.output).toBe(dispatchResult.output);
    });

    it('should handle whitespace-only pipeline input', async () => {
      const result = await dispatcher.dispatchPipeline('   ');
      expect(result.output).toBe('');
    });
  });
});
