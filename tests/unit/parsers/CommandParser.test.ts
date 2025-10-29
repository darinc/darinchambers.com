import { describe, it, expect } from 'vitest';
import { CommandParser } from '../../../src/utils/CommandParser';

describe('CommandParser', () => {
  describe('simple commands', () => {
    it('should parse command without arguments', () => {
      const result = CommandParser.parse('help');

      expect(result.command).toBe('help');
      expect(result.args).toEqual([]);
      expect(result.raw).toBe('help');
    });

    it('should parse command with single argument', () => {
      const result = CommandParser.parse('cd /home');

      expect(result.command).toBe('cd');
      expect(result.args).toEqual(['/home']);
      expect(result.raw).toBe('cd /home');
    });

    it('should parse command with multiple arguments', () => {
      const result = CommandParser.parse('cat file1.txt file2.txt');

      expect(result.command).toBe('cat');
      expect(result.args).toEqual(['file1.txt', 'file2.txt']);
      expect(result.raw).toBe('cat file1.txt file2.txt');
    });

    it('should convert command to lowercase', () => {
      const result = CommandParser.parse('HELP');

      expect(result.command).toBe('help');
    });

    it('should handle extra spaces', () => {
      const result = CommandParser.parse('  ls   -la  ');

      expect(result.command).toBe('ls');
      expect(result.args).toEqual(['-la']);
    });
  });

  describe('quoted arguments', () => {
    it('should parse double-quoted argument', () => {
      const result = CommandParser.parse('echo "hello world"');

      expect(result.command).toBe('echo');
      expect(result.args).toEqual(['hello world']);
    });

    it('should parse single-quoted argument', () => {
      const result = CommandParser.parse("cat 'file name.txt'");

      expect(result.command).toBe('cat');
      expect(result.args).toEqual(['file name.txt']);
    });

    it('should handle mixed quoted and unquoted arguments', () => {
      const result = CommandParser.parse('cmd arg1 "arg 2" arg3');

      expect(result.command).toBe('cmd');
      expect(result.args).toEqual(['arg1', 'arg 2', 'arg3']);
    });

    it('should handle multiple quoted arguments', () => {
      const result = CommandParser.parse('cmd "first arg" "second arg"');

      expect(result.command).toBe('cmd');
      expect(result.args).toEqual(['first arg', 'second arg']);
    });

    it('should handle quotes in the middle of arguments', () => {
      const result = CommandParser.parse('echo hello"world"test');

      expect(result.command).toBe('echo');
      expect(result.args).toEqual(['helloworldtest']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      const result = CommandParser.parse('');

      expect(result.command).toBe('');
      expect(result.args).toEqual([]);
      expect(result.raw).toBe('');
    });

    it('should handle whitespace-only input', () => {
      const result = CommandParser.parse('   ');

      expect(result.command).toBe('');
      expect(result.args).toEqual([]);
    });

    it('should handle unclosed double quotes', () => {
      const result = CommandParser.parse('echo "unclosed');

      expect(result.command).toBe('echo');
      expect(result.args).toEqual(['unclosed']);
    });

    it('should handle unclosed single quotes', () => {
      const result = CommandParser.parse("echo 'unclosed");

      expect(result.command).toBe('echo');
      expect(result.args).toEqual(['unclosed']);
    });

    it('should handle special characters', () => {
      const result = CommandParser.parse('echo !@#$%');

      expect(result.command).toBe('echo');
      expect(result.args).toEqual(['!@#$%']);
    });

    it('should handle empty quotes', () => {
      const result = CommandParser.parse('echo ""');

      expect(result.command).toBe('echo');
      expect(result.args).toEqual([]);
    });

    it('should preserve raw input', () => {
      const input = '  HELP  ';
      const result = CommandParser.parse(input);

      expect(result.raw).toBe(input);
    });
  });
});
