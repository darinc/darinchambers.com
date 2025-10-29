/**
 * Custom error classes for standardized error handling throughout the application.
 */

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class FileSystemError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'FileSystemError';
  }
}

export class CommandNotFoundError extends AppError {
  constructor(command: string) {
    super(`Command not found: ${command}`);
    this.name = 'CommandNotFoundError';
  }
}
