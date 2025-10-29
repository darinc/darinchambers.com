import { describe, it, expect } from 'vitest';
import { AppError, FileSystemError, CommandNotFoundError } from '../../../src/utils/errors';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create an AppError with message', () => {
      const error = new AppError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('AppError');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });
  });

  describe('FileSystemError', () => {
    it('should create a FileSystemError with message', () => {
      const error = new FileSystemError('File not found');
      expect(error.message).toBe('File not found');
      expect(error.name).toBe('FileSystemError');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(FileSystemError);
    });
  });

  describe('CommandNotFoundError', () => {
    it('should create a CommandNotFoundError with formatted message', () => {
      const error = new CommandNotFoundError('badcommand');
      expect(error.message).toBe('Command not found: badcommand');
      expect(error.name).toBe('CommandNotFoundError');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(CommandNotFoundError);
    });
  });
});
