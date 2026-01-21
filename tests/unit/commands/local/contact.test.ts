/**
 * Unit tests for Contact Command
 *
 * Tests help flag, successful execution, and error handling scenarios.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createContactCommand } from '../../../../src/commands/local/contact';
import { PATHS } from '../../../../src/constants';
import type { Command, CommandResult } from '../../../../src/commands/Command';
import type { IFileSystem } from '../../../../src/utils/fs/IFileSystem';

// Mock filesystem for testing
function createMockFs(options?: {
  shouldThrow?: boolean;
  errorMessage?: string;
  fileContent?: string;
}): IFileSystem {
  const defaultContent = `# Contact Information

## Get in Touch

- Email: hello@example.com
- GitHub: [github.com/user](https://github.com/user)
- LinkedIn: [linkedin.com/in/user](https://linkedin.com/in/user)

Location: United States / Eastern Time
`;

  return {
    readFile: (path: string) => {
      if (options?.shouldThrow) {
        throw new Error(options.errorMessage ?? 'File not found');
      }
      if (path === PATHS.CONTENT_CONTACT) {
        return options?.fileContent ?? defaultContent;
      }
      throw new Error(`File not found: ${path}`);
    },
    list: () => [],
    exists: () => true,
    isDirectory: () => false,
    isFile: () => true,
    getCurrentPath: () => '/home/darin',
    getShortPath: () => '~',
    setCurrentUsername: () => {},
    changeDirectory: () => {},
    writeFile: () => {},
    createDirectory: () => {},
    getTree: () => [],
    getNode: () => null,
    deleteFile: () => {},
    deleteDirectory: () => {},
  };
}

describe('Contact Command', () => {
  let contactCommand: Command;

  describe('help flag', () => {
    beforeEach(() => {
      const mockFs = createMockFs();
      contactCommand = createContactCommand(mockFs);
    });

    it('should display help text when --help flag is provided', () => {
      const result = contactCommand.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: contact');
      expect(result.output).toContain('Display contact information');
      expect(result.output).toContain('Examples:');
      expect(result.output).toContain('contact');
      expect(result.html).toBeUndefined();
      expect(result.error).toBeUndefined();
    });
  });

  describe('successful execution', () => {
    beforeEach(() => {
      const mockFs = createMockFs();
      contactCommand = createContactCommand(mockFs);
    });

    it('should display contact information from markdown file', () => {
      const result = contactCommand.execute([]) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('<div class="markdown-output">');
      expect(result.output).toContain('Contact Information');
      expect(result.error).toBeUndefined();
    });

    it('should render markdown with all contact details', () => {
      const fullContent = `# Contact Information

## Get in Touch

- Email: <a href="#" class="email-protected">hello@darinchambers.com</a>
- LinkedIn: [linkedin.com/in/darinchambers](https://www.linkedin.com/in/darinchambers)
- GitHub: [github.com/darinc](https://github.com/darinc)

Location: United States / Eastern Time

## Availability

I love working with people on bold projects and quirky ideas.
`;

      const mockFs = createMockFs({ fileContent: fullContent });
      contactCommand = createContactCommand(mockFs);

      const result = contactCommand.execute([]) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('Contact Information');
      expect(result.output).toContain('Get in Touch');
      expect(result.output).toContain('darinchambers');
      expect(result.output).toContain('linkedin.com');
      expect(result.output).toContain('github.com');
      expect(result.output).toContain('Availability');
      // Check for HTML elements
      expect(result.output).toContain('<h1>');
      expect(result.output).toContain('<h2>');
      expect(result.output).toContain('<ul>');
      expect(result.output).toContain('<li>');
    });

    it('should ignore extra arguments', () => {
      const result = contactCommand.execute(['extra', 'args', 'ignored']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('Contact Information');
      expect(result.error).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should return error message when file not found', () => {
      const mockFs = createMockFs({
        shouldThrow: true,
        errorMessage: 'File not found: /home/darin/content/contact.md',
      });
      contactCommand = createContactCommand(mockFs);

      const result = contactCommand.execute([]) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('File not found');
      expect(result.html).toBeUndefined();
    });

    it('should handle generic errors gracefully', () => {
      const mockFs = createMockFs({
        shouldThrow: true,
        errorMessage: 'Unexpected error occurred',
      });
      contactCommand = createContactCommand(mockFs);

      const result = contactCommand.execute([]) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toBe('Unexpected error occurred');
      expect(result.html).toBeUndefined();
    });

    it('should handle non-Error exceptions', () => {
      const mockFs: IFileSystem = {
        readFile: () => {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw 'String error';
        },
        list: () => [],
        exists: () => true,
        isDirectory: () => false,
        isFile: () => true,
        getCurrentPath: () => '/home/darin',
        getShortPath: () => '~',
        setCurrentUsername: () => {},
        changeDirectory: () => {},
        writeFile: () => {},
        createDirectory: () => {},
        getTree: () => [],
        getNode: () => null,
        deleteFile: () => {},
        deleteDirectory: () => {},
      };
      contactCommand = createContactCommand(mockFs);

      const result = contactCommand.execute([]) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toBe('String error');
    });
  });
});
