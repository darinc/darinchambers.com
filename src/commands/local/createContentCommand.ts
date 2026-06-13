/**
 * Content collection command factory.
 *
 * `blog` and `notes` are the same command with different labels, parsers, and
 * formatters: list newest-first, list/filter by tag, and open one item by id or
 * number. This factory holds that one flow; each command supplies a small config.
 *
 * `portfolio` intentionally does NOT use this factory — it sorts by an `order`
 * field, numbers ascending, supports comma-separated multi-tag filtering, and
 * tolerates per-file parse errors, so a shared abstraction would be leakier than
 * the duplication it removes.
 */
import { MESSAGES } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

/** Minimum shape the factory needs from a parsed content item. */
export interface ContentItem {
  id: string;
  tags: string[];
}

export interface ContentCommandConfig<T extends ContentItem> {
  /** Command name, also used as the tag-button command prefix (e.g. "blog"). */
  name: string;
  description: string;
  /** Full body for the `--help` flag. */
  help: string;
  /** Filesystem directory holding the `.md` files. */
  dir: string;
  /** Message shown when the collection is empty (e.g. MESSAGES.EMPTY_BLOG). */
  emptyMessage: string;
  /** H1 heading for the empty + listing views (e.g. "Blog"). */
  heading: string;
  /** H1 heading for the tag list (e.g. "Blog Tags" / "Note Tags"). */
  tagsHeading: string;
  /** Singular noun for tag counts, e.g. "post" -> "(3 posts)". */
  countNoun: string;
  /** Plural noun for "list all <x>" / "see all <x>", e.g. "posts" / "notes". */
  pluralNoun: string;
  /** Label in the not-found message, e.g. "Blog post" / "Note". */
  notFoundLabel: string;
  /** Plural collection label for the no-results message, e.g. "blog posts" / "notes". */
  filterMissLabel: string;
  parse: (filename: string, content: string) => T;
  formatList: (items: T[], filterTag?: string) => string;
  formatDetail: (item: T) => string;
}

function htmlResult(markdown: string) {
  return {
    output: MarkdownService.render(markdown),
    html: true,
    scrollBehavior: 'top' as const,
  };
}

export function createContentCommand<T extends ContentItem>(
  fs: IFileSystem,
  config: ContentCommandConfig<T>
): Command {
  const { name, pluralNoun } = config;

  return {
    name,
    description: config.description,
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return { output: config.help };
      }

      try {
        const files = fs
          .list(config.dir)
          .filter((f) => f.endsWith('.md'))
          .sort()
          .reverse(); // Newest first

        const tagsValue = cmdArgs.getFlag('tags');
        const hasTags = cmdArgs.hasFlag('tags');
        const itemId = cmdArgs.getPositional(0);

        const items = files.map((filename) =>
          config.parse(filename, fs.readFile(`${config.dir}/${filename}`))
        );

        // Empty collection
        if (items.length === 0 && !hasTags && !itemId) {
          return htmlResult(`# ${config.heading}\n\n${config.emptyMessage}`);
        }

        // `--tags` with no value: list all tags with counts
        if (hasTags && (typeof tagsValue === 'boolean' || !tagsValue)) {
          const tagCounts = new Map<string, number>();
          items.forEach((item) =>
            item.tags?.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1))
          );

          const sortedTags = Array.from(tagCounts.keys()).sort();
          if (sortedTags.length === 0) {
            return htmlResult(`# ${config.tagsHeading}\n\n${MESSAGES.NO_TAGS_AVAILABLE}`);
          }

          const tagList = sortedTags
            .map((tag) => {
              const count = tagCounts.get(tag) ?? 0;
              return `- <button data-command="${name} --tags ${tag}" class="tag-link">${tag}</button> (${count} ${config.countNoun}${count !== 1 ? 's' : ''})`;
            })
            .join('\n');

          return htmlResult(
            `# ${config.tagsHeading}\n\n${tagList}\n\n---\n\n**Usage:** Type \`${name} --tags <tag>\` to filter ${pluralNoun}`
          );
        }

        // Open a specific item by number or id
        if (itemId) {
          const num = parseInt(itemId, 10);
          const item =
            !isNaN(num) && num > 0 && num <= items.length
              ? items[items.length - num] // newest = highest number = index 0
              : items.find((i) => i.id === itemId);

          if (!item) {
            return {
              output: `${config.notFoundLabel} '${itemId}' not found.\nUse '${name}' to list all ${pluralNoun}.\nTry '${name} --help' for more information`,
              error: true,
            };
          }

          return htmlResult(config.formatDetail(item));
        }

        // Filter by a single tag
        let filtered = items;
        const filterTag = typeof tagsValue === 'string' ? tagsValue : undefined;
        if (filterTag) {
          filtered = items.filter((i) =>
            i.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
          );

          if (filtered.length === 0) {
            const topTags = Array.from(
              items
                .flatMap((i) => i.tags ?? [])
                .reduce((m, tag) => m.set(tag, (m.get(tag) ?? 0) + 1), new Map<string, number>())
                .entries()
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([tag]) => tag);

            const suggestion =
              topTags.length > 0 ? `\nTry one of these tags: ${topTags.join(', ')}` : '';

            return {
              output: `No ${config.filterMissLabel} found with tag '${filterTag}'.${suggestion}\nUse '${name}' to see all ${pluralNoun}.`,
              error: false,
            };
          }
        }

        return htmlResult(config.formatList(filtered, filterTag));
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
