import { describe, it, expect } from 'vitest';
import { echoCommand } from '../../../../src/commands/core/echo';
import type { CommandResult } from '../../../../src/commands/Command';

describe('echo command', () => {
  describe('Basic Output', () => {
    it('should output text arguments', () => {
      const result = echoCommand.execute(['hello', 'world']) as CommandResult;

      expect(result.output).toBe('hello world');
    });

    it('should output single argument', () => {
      const result = echoCommand.execute(['hello']) as CommandResult;

      expect(result.output).toBe('hello');
    });

    it('should output empty string with no arguments', () => {
      const result = echoCommand.execute([]) as CommandResult;

      expect(result.output).toBe('');
    });

    it('should join multiple arguments with spaces', () => {
      const result = echoCommand.execute(['one', 'two', 'three', 'four']) as CommandResult;

      expect(result.output).toBe('one two three four');
    });

    it('should preserve multiple spaces in arguments', () => {
      const result = echoCommand.execute(['text', 'with', 'spaces']) as CommandResult;

      expect(result.output).toBe('text with spaces');
    });
  });

  describe('Escape Sequences (-e flag)', () => {
    it('should interpret newline escape sequence', () => {
      const result = echoCommand.execute(['-e', 'line1\\nline2']) as CommandResult;

      expect(result.output).toBe('line1\nline2');
    });

    it('should interpret tab escape sequence', () => {
      const result = echoCommand.execute(['-e', 'col1\\tcol2']) as CommandResult;

      expect(result.output).toBe('col1\tcol2');
    });

    it('should interpret carriage return escape sequence', () => {
      const result = echoCommand.execute(['-e', 'text\\rwith\\rreturns']) as CommandResult;

      expect(result.output).toBe('text\rwith\rreturns');
    });

    it('should interpret backspace escape sequence', () => {
      const result = echoCommand.execute(['-e', 'text\\bspace']) as CommandResult;

      expect(result.output).toBe('text\bspace');
    });

    it('should interpret form feed escape sequence', () => {
      const result = echoCommand.execute(['-e', 'page1\\fpage2']) as CommandResult;

      expect(result.output).toBe('page1\fpage2');
    });

    it('should interpret vertical tab escape sequence', () => {
      const result = echoCommand.execute(['-e', 'line1\\vline2']) as CommandResult;

      expect(result.output).toBe('line1\vline2');
    });

    it('should interpret backslash escape sequence', () => {
      const result = echoCommand.execute(['-e', 'backslash: \\\\']) as CommandResult;

      expect(result.output).toBe('backslash: \\');
    });

    it('should interpret multiple escape sequences', () => {
      const result = echoCommand.execute(['-e', 'line1\\nline2\\ttab']) as CommandResult;

      expect(result.output).toBe('line1\nline2\ttab');
    });

    it('should not interpret escapes without -e flag', () => {
      const result = echoCommand.execute(['text\\nwith\\tescapes']) as CommandResult;

      expect(result.output).toBe('text\\nwith\\tescapes');
    });

    it('should handle -e flag with multiple arguments', () => {
      const result = echoCommand.execute(['-e', 'hello\\n', 'world']) as CommandResult;

      expect(result.output).toBe('hello\n world');
    });
  });

  describe('Stdin Passthrough (Pipes)', () => {
    it('should output stdin when no arguments provided', () => {
      const result = echoCommand.execute([], 'piped input') as CommandResult;

      expect(result.output).toBe('piped input');
    });

    it('should remove trailing newline from stdin', () => {
      const result = echoCommand.execute([], 'piped input\n') as CommandResult;

      expect(result.output).toBe('piped input');
    });

    it('should prefer arguments over stdin when both provided', () => {
      const result = echoCommand.execute(['explicit text'], 'stdin text') as CommandResult;

      expect(result.output).toBe('explicit text');
    });

    it('should use stdin with -e flag only', () => {
      const result = echoCommand.execute(['-e'], 'stdin\\ntext') as CommandResult;

      expect(result.output).toBe('stdin\ntext');
    });

    it('should handle multiline stdin', () => {
      const result = echoCommand.execute([], 'line1\nline2\nline3\n') as CommandResult;

      expect(result.output).toBe('line1\nline2\nline3');
    });

    it('should handle empty stdin', () => {
      const result = echoCommand.execute([], '') as CommandResult;

      expect(result.output).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters', () => {
      const result = echoCommand.execute(['<>&"\'']) as CommandResult;

      expect(result.output).toBe('<>&"\'');
    });

    it('should handle unicode characters', () => {
      const result = echoCommand.execute(['Hello', '世界', '🌍']) as CommandResult;

      expect(result.output).toBe('Hello 世界 🌍');
    });

    it('should handle very long strings', () => {
      const longText = 'a'.repeat(10000);
      const result = echoCommand.execute([longText]) as CommandResult;

      expect(result.output).toBe(longText);
    });

    it('should handle -e flag in different positions', () => {
      // -e should work regardless of position, but typically comes first
      const result = echoCommand.execute(['-e', 'before\\n', '-e', 'after']) as CommandResult;

      expect(result.output).toBe('before\n after');
    });

    it('should handle only -e flag', () => {
      const result = echoCommand.execute(['-e']) as CommandResult;

      expect(result.output).toBe('');
    });

    it('should handle multiple -e flags', () => {
      const result = echoCommand.execute(['-e', '-e', 'text\\n']) as CommandResult;

      expect(result.output).toBe('text\n');
    });

    it('should not have raw flag set', () => {
      const result = echoCommand.execute(['test']) as CommandResult;

      expect(result.raw).toBeUndefined();
    });
  });
});
