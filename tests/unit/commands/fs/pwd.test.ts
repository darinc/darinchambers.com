import { describe, it, expect, vi } from 'vitest';
import { createPwdCommand } from '../../../../src/commands/fs/pwd';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

describe('pwd command', () => {
  it('should return current working directory', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/home/user')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);
    const result = command.execute([]);

    expect(result.output).toBe('/home/user');
    expect(mockFs.getCurrentPath).toHaveBeenCalled();
  });

  it('should have correct name and description', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);

    expect(command.name).toBe('pwd');
    expect(command.description).toBe('Print working directory');
  });

  it('should ignore arguments', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/home/user/documents')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);
    const result = command.execute(['arg1', 'arg2']);

    expect(result.output).toBe('/home/user/documents');
  });

  it('should ignore stdin', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/etc')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);
    const result = command.execute([], 'stdin input');

    expect(result.output).toBe('/etc');
  });

  it('should work with root directory', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);
    const result = command.execute([]);

    expect(result.output).toBe('/');
  });

  it('should work with deep nested paths', () => {
    const mockFs = {
      getCurrentPath: vi.fn().mockReturnValue('/home/user/documents/projects/my-app/src')
    } as unknown as IFileSystem;

    const command = createPwdCommand(mockFs);
    const result = command.execute([]);

    expect(result.output).toBe('/home/user/documents/projects/my-app/src');
  });
});
