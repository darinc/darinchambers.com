import { splitFrontmatter, parseFrontmatterFields, idFromDatedFilename } from './frontmatter';
import type { BlogPost } from '../types/blog';

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

/**
 * Type guard to validate frontmatter structure
 */
function isBlogFrontmatter(data: unknown): data is BlogFrontmatter {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.title === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.summary === 'string' &&
    Array.isArray(obj.tags) &&
    obj.tags.every((tag) => typeof tag === 'string')
  );
}

export class BlogParser {
  /**
   * Parse YAML frontmatter from markdown content
   * Expected format:
   * ---
   * key: value
   * tags: [tag1, tag2]
   * ---
   * Content here...
   */
  static parseFrontmatter(content: string): { frontmatter: BlogFrontmatter; markdown: string } {
    const { frontmatterLines, markdown } = splitFrontmatter(content);
    const frontmatter = parseFrontmatterFields(frontmatterLines);

    // Validate frontmatter structure
    if (!isBlogFrontmatter(frontmatter)) {
      const missing: string[] = [];
      if (!frontmatter.title) missing.push('title');
      if (!frontmatter.date) missing.push('date');
      if (!frontmatter.summary) missing.push('summary');
      if (!Array.isArray(frontmatter.tags)) missing.push('tags');

      throw new Error(`Invalid blog frontmatter: missing or invalid fields: ${missing.join(', ')}`);
    }

    return { frontmatter, markdown };
  }

  /**
   * Parse a blog post from markdown content with frontmatter
   * Returns a BlogPost object
   */
  static parseBlogPost(filename: string, content: string): BlogPost {
    const { frontmatter, markdown } = this.parseFrontmatter(content);

    // e.g. "2024-09-15-ai-production-lessons.md" -> "ai-production-lessons"
    const id = idFromDatedFilename(filename);

    return {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary,
      content: markdown,
      tags: frontmatter.tags,
    };
  }

  /**
   * Get blog post ID from filename
   */
  static getIdFromFilename(filename: string): string {
    return idFromDatedFilename(filename);
  }
}
