/**
 * Changelog Command
 *
 * Displays the project's version history from CHANGELOG.md. Shows all versions by default,
 * or allows viewing a specific version by number or version string. Supports "latest"
 * keyword to show the most recent version.
 */
import { ChangelogParser } from '../../utils/ChangelogParser';
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { Command } from '../Command';

export function createChangelogCommand(changelogContent: string): Command {
  return {
    name: 'changelog',
    description: 'View project version history',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: changelog [options] [version|number]

Description:
  View the project's version history and release notes

Arguments:
  <version>            Show a specific version (e.g., 0.22.0)
  <number>             Show Nth most recent version (e.g., 1 = latest)
  latest               Alias for 1 (show most recent)

Options:
  --help               Show this help message

Examples:
  changelog                  # Show all versions
  changelog latest           # Show latest version
  changelog 1                # Show latest version
  changelog 3                # Show 3rd most recent version
  changelog 0.22.0           # Show specific version`,
        };
      }

      try {
        const entries = ChangelogParser.parse(changelogContent);

        if (entries.length === 0) {
          return {
            output: 'No changelog entries found.',
            error: true,
          };
        }

        const versionArg = cmdArgs.getPositional(0);

        // Show specific version
        if (versionArg) {
          // Handle "latest" keyword
          if (versionArg.toLowerCase() === 'latest') {
            const entry = entries[0];
            const markdown = ChangelogParser.formatEntry(entry);
            const html = MarkdownService.render(markdown);
            return { output: html, html: true, scrollBehavior: 'top' };
          }

          // Handle numeric index (1-based) - only if it's purely numeric
          const isNumericOnly = /^\d+$/.test(versionArg);
          if (isNumericOnly) {
            const index = parseInt(versionArg, 10);
            if (index > 0) {
              const entry = ChangelogParser.getByIndex(entries, index);
              if (!entry) {
                return {
                  output: `Version at position ${index} not found. There are ${entries.length} versions available.\nTry 'changelog --help' for more information.`,
                  error: true,
                };
              }
              const markdown = ChangelogParser.formatEntry(entry);
              const html = MarkdownService.render(markdown);
              return { output: html, html: true, scrollBehavior: 'top' };
            }
          }

          // Handle version string (e.g., "0.22.0")
          const entry = ChangelogParser.getVersion(entries, versionArg);
          if (!entry) {
            // List some available versions in the error message
            const availableVersions = entries
              .slice(0, 5)
              .map((e) => e.version)
              .join(', ');
            return {
              output: `Version '${versionArg}' not found.\nRecent versions: ${availableVersions}\nTry 'changelog --help' for more information.`,
              error: true,
            };
          }
          const markdown = ChangelogParser.formatEntry(entry);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        // Show all versions
        const markdown = ChangelogParser.formatEntries(entries);
        const html = MarkdownService.render(markdown);
        return { output: html, html: true, scrollBehavior: 'top' };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
