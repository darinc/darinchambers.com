/**
 * Unit tests for ChangelogParser
 *
 * Tests parsing of Keep a Changelog format, version lookup,
 * and markdown formatting.
 */

import { describe, it, expect } from 'vitest';
import { ChangelogParser } from '../../../src/utils/ChangelogParser';

const SAMPLE_CHANGELOG = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.22.1] - 2026-01-21

### Fixed
- Consistent font weight between command history and live input
- Input focus maintained after piped commands complete

## [0.22.0] - 2026-01-21

### Added
- rm command for removing files and directories with -r and -f flags
- Melt screen effect easter egg triggered by \`rm -rf /\`

### Fixed
- Command history prompt alignment (removed extra space after prompt)

## [0.21.0] - 2026-01-20

### Added
- boot, shutdown, and reboot commands for nostalgic system simulation
- BSOD command with modern Windows 10/11 and classic XP/NT styles

### Changed
- Updated default animation speed
`;

describe('ChangelogParser', () => {
  describe('parse', () => {
    it('should parse changelog into entries', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);

      expect(entries).toHaveLength(3);
      expect(entries[0].version).toBe('0.22.1');
      expect(entries[1].version).toBe('0.22.0');
      expect(entries[2].version).toBe('0.21.0');
    });

    it('should parse version dates correctly', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);

      expect(entries[0].date).toBe('2026-01-21');
      expect(entries[1].date).toBe('2026-01-21');
      expect(entries[2].date).toBe('2026-01-20');
    });

    it('should parse sections correctly', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);

      // First entry has only Fixed
      expect(entries[0].sections).toHaveProperty('Fixed');
      expect(entries[0].sections.Fixed).toHaveLength(2);

      // Second entry has Added and Fixed
      expect(entries[1].sections).toHaveProperty('Added');
      expect(entries[1].sections).toHaveProperty('Fixed');
      expect(entries[1].sections.Added).toHaveLength(2);
      expect(entries[1].sections.Fixed).toHaveLength(1);

      // Third entry has Added and Changed
      expect(entries[2].sections).toHaveProperty('Added');
      expect(entries[2].sections).toHaveProperty('Changed');
    });

    it('should parse bullet points correctly', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);

      expect(entries[0].sections.Fixed[0]).toBe(
        'Consistent font weight between command history and live input'
      );
      expect(entries[1].sections.Added[0]).toBe(
        'rm command for removing files and directories with -r and -f flags'
      );
    });

    it('should capture raw content for each entry', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);

      expect(entries[0].rawContent).toContain('## [0.22.1]');
      expect(entries[0].rawContent).toContain('### Fixed');
    });

    it('should return empty array for empty content', () => {
      const entries = ChangelogParser.parse('');
      expect(entries).toHaveLength(0);
    });

    it('should return empty array for content without version entries', () => {
      const content = `# Changelog

Some intro text without any versions.
`;
      const entries = ChangelogParser.parse(content);
      expect(entries).toHaveLength(0);
    });

    it('should handle single entry changelog', () => {
      const content = `# Changelog

## [1.0.0] - 2025-01-01

### Added
- Initial release
`;
      const entries = ChangelogParser.parse(content);

      expect(entries).toHaveLength(1);
      expect(entries[0].version).toBe('1.0.0');
      expect(entries[0].sections.Added).toEqual(['Initial release']);
    });

    it('should handle entries without sections', () => {
      const content = `## [1.0.0] - 2025-01-01

Just some notes without category headers.
`;
      const entries = ChangelogParser.parse(content);

      expect(entries).toHaveLength(1);
      expect(entries[0].version).toBe('1.0.0');
      expect(Object.keys(entries[0].sections)).toHaveLength(0);
    });
  });

  describe('getVersion', () => {
    it('should find version by exact match', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getVersion(entries, '0.22.0');

      expect(entry).toBeDefined();
      expect(entry?.version).toBe('0.22.0');
    });

    it('should return undefined for non-existent version', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getVersion(entries, '999.0.0');

      expect(entry).toBeUndefined();
    });

    it('should return undefined for empty entries array', () => {
      const entry = ChangelogParser.getVersion([], '1.0.0');
      expect(entry).toBeUndefined();
    });
  });

  describe('getByIndex', () => {
    it('should return entry at index 1 (latest)', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, 1);

      expect(entry).toBeDefined();
      expect(entry?.version).toBe('0.22.1');
    });

    it('should return entry at index 2', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, 2);

      expect(entry).toBeDefined();
      expect(entry?.version).toBe('0.22.0');
    });

    it('should return entry at last index', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, 3);

      expect(entry).toBeDefined();
      expect(entry?.version).toBe('0.21.0');
    });

    it('should return undefined for index 0', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, 0);

      expect(entry).toBeUndefined();
    });

    it('should return undefined for negative index', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, -1);

      expect(entry).toBeUndefined();
    });

    it('should return undefined for out of bounds index', () => {
      const entries = ChangelogParser.parse(SAMPLE_CHANGELOG);
      const entry = ChangelogParser.getByIndex(entries, 100);

      expect(entry).toBeUndefined();
    });
  });

  describe('formatEntry', () => {
    it('should format a single entry as markdown', () => {
      const entry = {
        version: '1.0.0',
        date: '2025-01-01',
        sections: {
          Added: ['Feature A', 'Feature B'],
          Fixed: ['Bug fix'],
        },
        rawContent: '',
      };

      const formatted = ChangelogParser.formatEntry(entry);

      expect(formatted).toContain('## Version 1.0.0');
      expect(formatted).toContain('*Released: 2025-01-01*');
      expect(formatted).toContain('### Added');
      expect(formatted).toContain('- Feature A');
      expect(formatted).toContain('- Feature B');
      expect(formatted).toContain('### Fixed');
      expect(formatted).toContain('- Bug fix');
    });

    it('should handle entry with no sections', () => {
      const entry = {
        version: '1.0.0',
        date: '2025-01-01',
        sections: {},
        rawContent: '',
      };

      const formatted = ChangelogParser.formatEntry(entry);

      expect(formatted).toContain('## Version 1.0.0');
      expect(formatted).toContain('*Released: 2025-01-01*');
    });
  });

  describe('formatEntries', () => {
    it('should format multiple entries with header', () => {
      const entries = [
        {
          version: '2.0.0',
          date: '2025-02-01',
          sections: { Added: ['New feature'] },
          rawContent: '',
        },
        {
          version: '1.0.0',
          date: '2025-01-01',
          sections: { Added: ['Initial release'] },
          rawContent: '',
        },
      ];

      const formatted = ChangelogParser.formatEntries(entries);

      expect(formatted).toContain('# Changelog');
      expect(formatted).toContain('## Version 2.0.0');
      expect(formatted).toContain('## Version 1.0.0');
      expect(formatted).toContain('---'); // Separator between entries
    });

    it('should format empty entries array', () => {
      const formatted = ChangelogParser.formatEntries([]);

      expect(formatted).toContain('# Changelog');
    });
  });
});
