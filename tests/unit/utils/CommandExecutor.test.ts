import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CommandExecutor } from '../../../src/utils/CommandExecutor';
import type { CommandDispatcher } from '../../../src/utils/CommandDispatcher';
import type { AliasManager } from '../../../src/utils/AliasManager';
import type { CommandResult } from '../../../src/commands/Command';

// Mock implementations for dependencies
class MockCommandDispatcher {
  dispatch = vi.fn<[string], Promise<CommandResult>>();
  dispatchPipeline = vi.fn<[string], Promise<CommandResult>>();
}

class MockAliasManager {
  resolve = vi.fn<[string], string>();
}

describe('CommandExecutor', () => {
  let executor: CommandExecutor;
  let mockDispatcher: MockCommandDispatcher;
  let mockAliasManager: MockAliasManager;

  beforeEach(() => {
    mockDispatcher = new MockCommandDispatcher();
    mockAliasManager = new MockAliasManager();

    // Default: aliases resolve to themselves (no alias)
    mockAliasManager.resolve.mockImplementation((cmd: string) => cmd);

    executor = new CommandExecutor(
      mockDispatcher as unknown as CommandDispatcher,
      mockAliasManager as unknown as AliasManager
    );
  });

  describe('Empty Command Handling', () => {
    it('should return empty result for empty string', async () => {
      const result = await executor.execute('');
      expect(result.output).toBe('');
      expect(mockDispatcher.dispatch).not.toHaveBeenCalled();
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
    });

    it('should return empty result for whitespace-only string', async () => {
      const result = await executor.execute('   ');
      expect(result.output).toBe('');
      expect(mockDispatcher.dispatch).not.toHaveBeenCalled();
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
    });

    it('should return empty result for tabs and newlines', async () => {
      const result = await executor.execute('\t\n  \t');
      expect(result.output).toBe('');
      expect(mockDispatcher.dispatch).not.toHaveBeenCalled();
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
    });
  });

  describe('Alias Resolution', () => {
    it('should resolve aliases before execution', async () => {
      mockAliasManager.resolve.mockReturnValue('list /home/darin');
      mockDispatcher.dispatch.mockResolvedValue({ output: 'file1 file2' });

      await executor.execute('ll');

      expect(mockAliasManager.resolve).toHaveBeenCalledWith('ll');
      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('list /home/darin');
    });

    it('should handle commands with no aliases', async () => {
      mockAliasManager.resolve.mockReturnValue('help');
      mockDispatcher.dispatch.mockResolvedValue({ output: 'Help text' });

      await executor.execute('help');

      expect(mockAliasManager.resolve).toHaveBeenCalledWith('help');
      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('help');
    });

    it('should trim command before resolving aliases', async () => {
      mockAliasManager.resolve.mockReturnValue('ls');
      mockDispatcher.dispatch.mockResolvedValue({ output: 'files' });

      await executor.execute('  ls  ');

      expect(mockAliasManager.resolve).toHaveBeenCalledWith('ls');
    });
  });

  describe('Single Command Dispatch', () => {
    it('should dispatch simple commands without pipes', async () => {
      const expectedResult: CommandResult = { output: 'Command output' };
      mockDispatcher.dispatch.mockResolvedValue(expectedResult);

      const result = await executor.execute('help');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('help');
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });

    it('should dispatch commands with arguments', async () => {
      const expectedResult: CommandResult = { output: 'File contents' };
      mockDispatcher.dispatch.mockResolvedValue(expectedResult);

      const result = await executor.execute('cat file.txt');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('cat file.txt');
      expect(result).toBe(expectedResult);
    });

    it('should pass through error results', async () => {
      const errorResult: CommandResult = { output: 'Error message', error: true };
      mockDispatcher.dispatch.mockResolvedValue(errorResult);

      const result = await executor.execute('badcommand');

      expect(result).toBe(errorResult);
      expect(result.error).toBe(true);
    });

    it('should pass through HTML results', async () => {
      const htmlResult: CommandResult = { output: '<h1>Title</h1>', html: true };
      mockDispatcher.dispatch.mockResolvedValue(htmlResult);

      const result = await executor.execute('blog');

      expect(result).toBe(htmlResult);
      expect(result.html).toBe(true);
    });

    it('should pass through raw results', async () => {
      const rawResult: CommandResult = { output: 'raw content', raw: true };
      mockDispatcher.dispatch.mockResolvedValue(rawResult);

      const result = await executor.execute('cat file.md');

      expect(result).toBe(rawResult);
      expect(result.raw).toBe(true);
    });
  });

  describe('Pipeline Detection and Dispatch', () => {
    it('should detect and dispatch piped commands', async () => {
      const expectedResult: CommandResult = { output: '<h1>Rendered</h1>', html: true };
      mockDispatcher.dispatchPipeline.mockResolvedValue(expectedResult);

      const result = await executor.execute('cat file.md | render');

      expect(mockDispatcher.dispatchPipeline).toHaveBeenCalledWith('cat file.md | render');
      expect(mockDispatcher.dispatch).not.toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });

    it('should handle multi-stage pipelines', async () => {
      const expectedResult: CommandResult = { output: 'FINAL OUTPUT' };
      mockDispatcher.dispatchPipeline.mockResolvedValue(expectedResult);

      const result = await executor.execute('echo test | uppercase | count');

      expect(mockDispatcher.dispatchPipeline).toHaveBeenCalledWith('echo test | uppercase | count');
      expect(result).toBe(expectedResult);
    });

    it('should handle pipelines with quoted strings', async () => {
      const expectedResult: CommandResult = { output: 'result' };
      mockDispatcher.dispatchPipeline.mockResolvedValue(expectedResult);

      const result = await executor.execute('echo "hello | world" | uppercase');

      expect(mockDispatcher.dispatchPipeline).toHaveBeenCalledWith('echo "hello | world" | uppercase');
      expect(result).toBe(expectedResult);
    });

    it('should not treat pipe in quoted string as pipeline operator', async () => {
      const expectedResult: CommandResult = { output: 'hello | world' };
      mockDispatcher.dispatch.mockResolvedValue(expectedResult);

      const result = await executor.execute('echo "hello | world"');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('echo "hello | world"');
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });

  describe('Alias Resolution with Pipelines', () => {
    it('should resolve aliases then detect pipelines', async () => {
      mockAliasManager.resolve.mockReturnValue('cat /home/darin/blog/post.md | render');
      mockDispatcher.dispatchPipeline.mockResolvedValue({ output: '<h1>Post</h1>', html: true });

      const result = await executor.execute('readpost');

      expect(mockAliasManager.resolve).toHaveBeenCalledWith('readpost');
      expect(mockDispatcher.dispatchPipeline).toHaveBeenCalledWith('cat /home/darin/blog/post.md | render');
      expect(result.html).toBe(true);
    });

    it('should handle alias that expands to simple command', async () => {
      mockAliasManager.resolve.mockReturnValue('ls -la /home');
      mockDispatcher.dispatch.mockResolvedValue({ output: 'files' });

      await executor.execute('ll');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('ls -la /home');
      expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
    });
  });

  describe('Result Passthrough', () => {
    it('should not modify dispatcher results', async () => {
      const originalResult: CommandResult = {
        output: 'test output',
        error: false,
        html: true,
        raw: false
      };
      mockDispatcher.dispatch.mockResolvedValue(originalResult);

      const result = await executor.execute('test');

      expect(result).toBe(originalResult);
      expect(result.output).toBe('test output');
      expect(result.error).toBe(false);
      expect(result.html).toBe(true);
      expect(result.raw).toBe(false);
    });

    it('should preserve all result properties from pipeline dispatch', async () => {
      const originalResult: CommandResult = {
        output: 'pipeline result',
        error: true,
        html: false,
        raw: true
      };
      mockDispatcher.dispatchPipeline.mockResolvedValue(originalResult);

      const result = await executor.execute('cmd1 | cmd2');

      expect(result).toBe(originalResult);
      expect(result.output).toBe('pipeline result');
      expect(result.error).toBe(true);
      expect(result.html).toBe(false);
      expect(result.raw).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle command with leading and trailing whitespace', async () => {
      mockDispatcher.dispatch.mockResolvedValue({ output: 'ok' });

      await executor.execute('  help  ');

      expect(mockAliasManager.resolve).toHaveBeenCalledWith('help');
      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('help');
    });

    it('should handle command with internal multiple spaces', async () => {
      mockDispatcher.dispatch.mockResolvedValue({ output: 'ok' });

      await executor.execute('ls    -la');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('ls    -la');
    });

    it('should handle very long commands', async () => {
      const longCommand = 'echo ' + 'a'.repeat(1000);
      mockDispatcher.dispatch.mockResolvedValue({ output: 'ok' });

      await executor.execute(longCommand);

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith(longCommand);
    });

    it('should handle commands with special characters', async () => {
      mockDispatcher.dispatch.mockResolvedValue({ output: 'ok' });

      await executor.execute('echo "!@#$%^&*()"');

      expect(mockDispatcher.dispatch).toHaveBeenCalledWith('echo "!@#$%^&*()"');
    });
  });
});
