import { splitFrontmatter, parseFrontmatterValue, idFromDatedFilename } from './frontmatter';
import type { Post, PostedLink } from '../types/post';

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  posted?: PostedLink[];
}

/**
 * Type guard to validate frontmatter structure
 */
function isPostFrontmatter(data: unknown): data is PostFrontmatter {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.title === 'string' &&
    typeof obj.date === 'string' &&
    Array.isArray(obj.tags) &&
    obj.tags.every((tag) => typeof tag === 'string')
  );
}

/**
 * Parse a multi-line YAML list of objects from frontmatter lines.
 * Handles the format:
 *   - platform: LinkedIn
 *     url: https://...
 *   - platform: X
 *     url: https://...
 */
function parsePostedBlock(lines: string[]): PostedLink[] {
  const results: PostedLink[] = [];
  let current: Partial<PostedLink> | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // New list item: "- platform: value"
    if (trimmed.startsWith('- ')) {
      // Save previous item
      if (current?.platform && current?.url) {
        results.push({ platform: current.platform, url: current.url });
      }
      current = {};

      // Parse the key: value on the same line as the dash
      const afterDash = trimmed.substring(2).trim();
      const colonIdx = afterDash.indexOf(':');
      if (colonIdx !== -1) {
        const key = afterDash.substring(0, colonIdx).trim();
        const value = afterDash
          .substring(colonIdx + 1)
          .trim()
          .replace(/^["']|["']$/g, '');
        if (key === 'platform') current.platform = value;
        if (key === 'url') current.url = value;
      }
    } else if (current) {
      // Continuation line: "url: value" or "platform: value"
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx !== -1) {
        const key = trimmed.substring(0, colonIdx).trim();
        const value = trimmed
          .substring(colonIdx + 1)
          .trim()
          .replace(/^["']|["']$/g, '');
        if (key === 'platform') current.platform = value;
        if (key === 'url') current.url = value;
      }
    }
  }

  // Don't forget the last item
  if (current?.platform && current?.url) {
    results.push({ platform: current.platform, url: current.url });
  }

  return results;
}

export class PostParser {
  /**
   * Parse YAML frontmatter from markdown content
   */
  static parseFrontmatter(content: string): { frontmatter: PostFrontmatter; markdown: string } {
    const { frontmatterLines, markdown } = splitFrontmatter(content);

    const frontmatter: Record<string, string | string[] | PostedLink[]> = {};
    let i = 0;
    while (i < frontmatterLines.length) {
      const line = frontmatterLines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        i++;
        continue;
      }

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      // Check if this is a multi-line block (value is empty, next lines are indented)
      if (key === 'posted' && value === '') {
        // Collect indented lines
        const blockLines: string[] = [];
        i++;
        while (i < frontmatterLines.length) {
          const nextLine = frontmatterLines[i];
          // Indented or starts with whitespace+dash = part of the block
          if (/^\s+(- |[\w])/.exec(nextLine)) {
            blockLines.push(nextLine);
            i++;
          } else {
            break;
          }
        }
        frontmatter[key] = parsePostedBlock(blockLines);
        continue;
      }

      // Inline scalar or array value (e.g. tags: [tag1, tag2])
      frontmatter[key] = parseFrontmatterValue(value);

      i++;
    }

    if (!isPostFrontmatter(frontmatter)) {
      const missing: string[] = [];
      if (!frontmatter.title) missing.push('title');
      if (!frontmatter.date) missing.push('date');
      if (!Array.isArray(frontmatter.tags)) missing.push('tags');

      throw new Error(`Invalid post frontmatter: missing or invalid fields: ${missing.join(', ')}`);
    }

    return { frontmatter, markdown };
  }

  /**
   * Parse a post from markdown content with frontmatter
   */
  static parsePost(filename: string, content: string): Post {
    const { frontmatter, markdown } = this.parseFrontmatter(content);

    const id = this.getIdFromFilename(filename);

    return {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      content: markdown,
      tags: frontmatter.tags,
      ...(frontmatter.posted && frontmatter.posted.length > 0 && { posted: frontmatter.posted }),
    };
  }

  /**
   * Get post ID from filename (strip date prefix and .md extension)
   */
  static getIdFromFilename(filename: string): string {
    return idFromDatedFilename(filename);
  }
}
