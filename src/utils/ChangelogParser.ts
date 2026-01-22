/**
 * Changelog Parser
 *
 * Parses CHANGELOG.md files following the Keep a Changelog format.
 * Extracts version entries with their dates, categories (Added, Changed, Fixed, etc.),
 * and bullet points for each category.
 */

export interface ChangelogEntry {
  /** Semantic version number (e.g., "0.22.1") */
  version: string;
  /** Release date in YYYY-MM-DD format (e.g., "2026-01-21") */
  date: string;
  /** Categories and their bullet points (e.g., { "Added": ["Feature 1", "Feature 2"] }) */
  sections: Record<string, string[]>;
  /** Original markdown content for this version entry */
  rawContent: string;
}

export class ChangelogParser {
  /**
   * Parse a CHANGELOG.md file content into structured entries
   * @param content - Raw markdown content of the changelog
   * @returns Array of changelog entries, newest first
   */
  static parse(content: string): ChangelogEntry[] {
    const entries: ChangelogEntry[] = [];
    const lines = content.split('\n');

    let currentEntry: ChangelogEntry | null = null;
    let currentCategory: string | null = null;
    let rawContentLines: string[] = [];

    const versionRegex = /^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/;
    const categoryRegex = /^### (\w+)/;
    const bulletRegex = /^- (.+)/;

    for (const line of lines) {
      // Match version header: ## [0.22.1] - 2026-01-21
      const versionMatch = versionRegex.exec(line);
      if (versionMatch) {
        // Save previous entry
        if (currentEntry) {
          currentEntry.rawContent = rawContentLines.join('\n').trim();
          entries.push(currentEntry);
        }

        // Start new entry
        currentEntry = {
          version: versionMatch[1],
          date: versionMatch[2],
          sections: {},
          rawContent: '',
        };
        currentCategory = null;
        rawContentLines = [line];
        continue;
      }

      // If we're inside an entry, collect raw content
      if (currentEntry) {
        rawContentLines.push(line);
      }

      // Match category header: ### Added, ### Fixed, etc.
      const categoryMatch = categoryRegex.exec(line);
      if (categoryMatch && currentEntry) {
        currentCategory = categoryMatch[1];
        currentEntry.sections[currentCategory] = [];
        continue;
      }

      // Match bullet point: - Item description
      const bulletMatch = bulletRegex.exec(line);
      if (bulletMatch && currentEntry && currentCategory) {
        currentEntry.sections[currentCategory].push(bulletMatch[1]);
      }
    }

    // Don't forget the last entry
    if (currentEntry) {
      currentEntry.rawContent = rawContentLines.join('\n').trim();
      entries.push(currentEntry);
    }

    return entries;
  }

  /**
   * Get a specific version entry
   * @param entries - Parsed changelog entries
   * @param version - Version string to find (e.g., "0.22.1")
   * @returns The matching entry or undefined
   */
  static getVersion(entries: ChangelogEntry[], version: string): ChangelogEntry | undefined {
    return entries.find((e) => e.version === version);
  }

  /**
   * Get an entry by index (1-based, newest first)
   * @param entries - Parsed changelog entries
   * @param index - 1-based index (1 = latest)
   * @returns The matching entry or undefined
   */
  static getByIndex(entries: ChangelogEntry[], index: number): ChangelogEntry | undefined {
    if (index < 1 || index > entries.length) {
      return undefined;
    }
    return entries[index - 1];
  }

  /**
   * Format a single changelog entry as markdown
   * @param entry - The entry to format
   * @returns Formatted markdown string
   */
  static formatEntry(entry: ChangelogEntry): string {
    const lines: string[] = [];
    lines.push(`## Version ${entry.version}`);
    lines.push(`*Released: ${entry.date}*`);
    lines.push('');

    for (const [category, items] of Object.entries(entry.sections)) {
      lines.push(`### ${category}`);
      for (const item of items) {
        lines.push(`- ${item}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Format multiple changelog entries as markdown
   * @param entries - The entries to format
   * @returns Formatted markdown string
   */
  static formatEntries(entries: ChangelogEntry[]): string {
    const header = `# Changelog

All notable changes to this project are documented here.

---

`;
    const formatted = entries.map((e) => this.formatEntry(e)).join('\n---\n\n');
    return header + formatted;
  }
}
