import { describe, it, expect, vi } from 'vitest';
import { createCatCommand } from '../../../../src/commands/fs/cat';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('cat command', () => {
  it('should display file contents', () => {
    const mockFs = {
      readFile: vi.fn().mockReturnValue('File contents here'),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['test.txt']);

    expect(mockFs.readFile).toHaveBeenCalledWith('test.txt');
    expect(result.output).toBe('File contents here');
  });

  it('should handle multiline files', () => {
    const mockFs = {
      readFile: vi.fn().mockReturnValue('Line 1\nLine 2\nLine 3'),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['multiline.txt']);

    expect(result.output).toBe('Line 1\nLine 2\nLine 3');
  });

  it('should error when no file operand', () => {
    const mockFs = {
      readFile: vi.fn(),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute([]);

    expect(result.output).toBe('cat: missing file operand');
    expect(result.error).toBe(true);
    expect(mockFs.readFile).not.toHaveBeenCalled();
  });

  it('should handle file read errors', () => {
    const mockFs = {
      readFile: vi.fn().mockImplementation(() => {
        throw new Error('cat: test.txt: No such file or directory');
      }),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['test.txt']);

    expect(result.output).toBe('cat: test.txt: No such file or directory');
    expect(result.error).toBe(true);
  });

  it('should handle directory errors', () => {
    const mockFs = {
      readFile: vi.fn().mockImplementation(() => {
        throw new Error('cat: mydir: Is a directory');
      }),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['mydir']);

    expect(result.output).toBe('cat: mydir: Is a directory');
    expect(result.error).toBe(true);
  });

  it('should have correct name and description', () => {
    const mockFs = {
      readFile: vi.fn(),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);

    expect(command.name).toBe('cat');
    expect(command.description).toBe('Display file contents');
  });

  it('should handle empty files', () => {
    const mockFs = {
      readFile: vi.fn().mockReturnValue(''),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['empty.txt']);

    expect(result.output).toBe('');
  });

  it('should handle files with special characters', () => {
    const mockFs = {
      readFile: vi.fn().mockReturnValue('Special chars: <>&"\'\n\t'),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['special.txt']);

    expect(result.output).toBe('Special chars: <>&"\'\n\t');
  });

  it('should handle very large files', () => {
    const largeContent = 'a'.repeat(100000);
    const mockFs = {
      readFile: vi.fn().mockReturnValue(largeContent),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['large.txt']);

    expect(result.output.length).toBe(100000);
  });

  it('should only read first argument', () => {
    const mockFs = {
      readFile: vi.fn().mockReturnValue('Content'),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    command.execute(['file1.txt', 'file2.txt', 'file3.txt']);

    expect(mockFs.readFile).toHaveBeenCalledWith('file1.txt');
    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error exceptions', () => {
    const mockFs = {
      readFile: vi.fn().mockImplementation(() => {
        throw new Error('string error');
      }),
    } as unknown as IFileSystem;

    const command = createCatCommand(mockFs);
    const result = command.execute(['test.txt']);

    expect(result.output).toBe('string error');
    expect(result.error).toBe(true);
  });
});
