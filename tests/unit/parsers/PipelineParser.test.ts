import { describe, it, expect } from 'vitest';
import { PipelineParser } from '../../../src/utils/PipelineParser';

describe('PipelineParser', () => {
  describe('parse', () => {
    it('should parse single command without pipe', () => {
      const result = PipelineParser.parse('ls -la');

      expect(result).toEqual(['ls -la']);
    });

    it('should parse simple pipe', () => {
      const result = PipelineParser.parse('cat file.md | render');

      expect(result).toEqual(['cat file.md', 'render']);
    });

    it('should parse multiple pipes', () => {
      const result = PipelineParser.parse('cmd1 | cmd2 | cmd3');

      expect(result).toEqual(['cmd1', 'cmd2', 'cmd3']);
    });

    it('should trim whitespace from segments', () => {
      const result = PipelineParser.parse('cmd1  |  cmd2  |  cmd3');

      expect(result).toEqual(['cmd1', 'cmd2', 'cmd3']);
    });

    it('should handle commands with arguments', () => {
      const result = PipelineParser.parse('cat /home/file.txt | render | echo "done"');

      expect(result).toEqual(['cat /home/file.txt', 'render', 'echo "done"']);
    });
  });

  describe('quoted strings', () => {
    it('should ignore pipe inside double quotes', () => {
      const result = PipelineParser.parse('echo "hello | world"');

      expect(result).toEqual(['echo "hello | world"']);
    });

    it('should ignore pipe inside single quotes', () => {
      const result = PipelineParser.parse("echo 'hello | world'");

      expect(result).toEqual(["echo 'hello | world'"]);
    });

    it('should handle quoted string with pipe before and after', () => {
      const result = PipelineParser.parse('cmd1 | echo "has | pipe" | cmd2');

      expect(result).toEqual(['cmd1', 'echo "has | pipe"', 'cmd2']);
    });

    it('should handle mixed quotes', () => {
      const result = PipelineParser.parse('echo "first | test" | echo \'second | test\'');

      expect(result).toEqual(['echo "first | test"', "echo 'second | test'"]);
    });

    it('should preserve quotes in output', () => {
      const result = PipelineParser.parse('cat "file.txt" | render');

      expect(result).toEqual(['cat "file.txt"', 'render']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = PipelineParser.parse('');

      expect(result).toEqual([]);
    });

    it('should handle whitespace only', () => {
      const result = PipelineParser.parse('   ');

      expect(result).toEqual([]);
    });

    it('should handle leading pipe', () => {
      const result = PipelineParser.parse('| cmd1');

      expect(result).toEqual(['cmd1']);
    });

    it('should handle trailing pipe', () => {
      const result = PipelineParser.parse('cmd1 |');

      expect(result).toEqual(['cmd1']);
    });

    it('should handle consecutive pipes', () => {
      const result = PipelineParser.parse('cmd1 || cmd2');

      expect(result).toEqual(['cmd1', 'cmd2']);
    });

    it('should handle unclosed double quotes', () => {
      const result = PipelineParser.parse('echo "unclosed | test');

      expect(result).toEqual(['echo "unclosed | test']);
    });

    it('should handle unclosed single quotes', () => {
      const result = PipelineParser.parse("echo 'unclosed | test");

      expect(result).toEqual(["echo 'unclosed | test"]);
    });

    it('should handle escaped quotes', () => {
      const result = PipelineParser.parse('echo \\"test | pipe\\" | cmd2');

      // Escaped quotes don't prevent splitting on pipes
      expect(result).toEqual(['echo \\"test', 'pipe\\"', 'cmd2']);
    });
  });

  describe('hasPipe', () => {
    it('should return true for simple pipe', () => {
      expect(PipelineParser.hasPipe('cmd1 | cmd2')).toBe(true);
    });

    it('should return false for no pipe', () => {
      expect(PipelineParser.hasPipe('cmd1')).toBe(false);
    });

    it('should return false for pipe in double quotes', () => {
      expect(PipelineParser.hasPipe('echo "hello | world"')).toBe(false);
    });

    it('should return false for pipe in single quotes', () => {
      expect(PipelineParser.hasPipe("echo 'hello | world'")).toBe(false);
    });

    it('should return true for pipe outside quotes', () => {
      expect(PipelineParser.hasPipe('echo "test" | cmd2')).toBe(true);
    });

    it('should return true for multiple pipes', () => {
      expect(PipelineParser.hasPipe('cmd1 | cmd2 | cmd3')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(PipelineParser.hasPipe('')).toBe(false);
    });

    it('should return false for escaped pipe in quotes', () => {
      expect(PipelineParser.hasPipe('echo \\"test | pipe\\"')).toBe(true);
    });
  });
});
