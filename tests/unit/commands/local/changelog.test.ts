/**
 * Unit tests for Changelog Command
 *
 * Tests version listing, specific version lookup, and help output.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createChangelogCommand } from '../../../../src/commands/local/changelog';
import type { Command, CommandResult } from '../../../../src/commands/Command';

const SAMPLE_CHANGELOG = `# Changelog

All notable changes to this project will be documented in this file.

## [0.22.1] - 2026-01-21

### Fixed
- Consistent font weight between command history and live input
- Input focus maintained after piped commands complete

## [0.22.0] - 2026-01-21

### Added
- rm command for removing files and directories
- Melt screen effect easter egg

### Fixed
- Command history prompt alignment

## [0.21.0] - 2026-01-20

### Added
- boot, shutdown, and reboot commands
`;

describe('Changelog Command', () => {
  let changelogCommand: Command;

  beforeEach(() => {
    changelogCommand = createChangelogCommand(SAMPLE_CHANGELOG);
  });

  describe('basic functionality', () => {
    it('should show all versions when called without arguments', () => {
      const result = changelogCommand.execute([]) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('Changelog');
      expect(result.output).toContain('0.22.1');
      expect(result.output).toContain('0.22.0');
      expect(result.output).toContain('0.21.0');
    });

    it('should set scrollBehavior to top', () => {
      const result = changelogCommand.execute([]) as CommandResult;

      expect(result.scrollBehavior).toBe('top');
    });
  });

  describe('--help flag', () => {
    it('should show help when --help flag is provided', () => {
      const result = changelogCommand.execute(['--help']) as CommandResult;

      expect(result.output).toContain('Usage: changelog');
      expect(result.output).toContain('Examples:');
      expect(result.output).toContain('changelog latest');
    });
  });

  describe('latest version', () => {
    it('should show latest version when "latest" is provided', () => {
      const result = changelogCommand.execute(['latest']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.22.1');
      // Should not contain other versions in single entry view
      expect(result.output).not.toContain('0.21.0');
    });

    it('should handle "LATEST" case-insensitively', () => {
      const result = changelogCommand.execute(['LATEST']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.22.1');
    });
  });

  describe('numeric index', () => {
    it('should show version at index 1 (latest)', () => {
      const result = changelogCommand.execute(['1']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.22.1');
    });

    it('should show version at index 2', () => {
      const result = changelogCommand.execute(['2']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.22.0');
    });

    it('should show version at index 3', () => {
      const result = changelogCommand.execute(['3']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.21.0');
    });

    it('should return error for out of bounds index', () => {
      const result = changelogCommand.execute(['100']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('not found');
      expect(result.output).toContain('3 versions available');
    });
  });

  describe('version string lookup', () => {
    it('should show specific version by version string', () => {
      const result = changelogCommand.execute(['0.22.0']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toContain('0.22.0');
      expect(result.output).toContain('rm command');
    });

    it('should return error for non-existent version', () => {
      const result = changelogCommand.execute(['999.0.0']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain("Version '999.0.0' not found");
      expect(result.output).toContain('Recent versions:');
    });
  });

  describe('empty changelog', () => {
    it('should return error for empty changelog content', () => {
      const emptyCommand = createChangelogCommand('');
      const result = emptyCommand.execute([]) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('No changelog entries found');
    });

    it('should return error for changelog without version entries', () => {
      const noVersionsCommand = createChangelogCommand('# Changelog\n\nJust some text.');
      const result = noVersionsCommand.execute([]) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('No changelog entries found');
    });
  });

  describe('content rendering', () => {
    it('should include section headers in output', () => {
      const result = changelogCommand.execute(['0.22.0']) as CommandResult;

      expect(result.output).toContain('Added');
      expect(result.output).toContain('Fixed');
    });

    it('should include bullet points in output', () => {
      const result = changelogCommand.execute(['0.22.1']) as CommandResult;

      expect(result.output).toContain('Consistent font weight');
      expect(result.output).toContain('Input focus maintained');
    });
  });
});
