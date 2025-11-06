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
    obj.tags.every(tag => typeof tag === 'string')
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
    const lines = content.split('\n');

    // Check if content starts with frontmatter delimiter
    if (lines[0]?.trim() !== '---') {
      throw new Error('Invalid frontmatter: must start with ---');
    }

    // Find closing delimiter
    let endIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        endIndex = i;
        break;
      }
    }

    if (endIndex === -1) {
      throw new Error('Invalid frontmatter: no closing ---');
    }

    // Extract frontmatter lines
    const frontmatterLines = lines.slice(1, endIndex);
    const markdownLines = lines.slice(endIndex + 1);

    // Parse frontmatter
    const frontmatter: Record<string, string | string[]> = {};
    for (const line of frontmatterLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Handle array values like tags: [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        // Remove brackets and split by comma
        const arrayContent = value.substring(1, value.length - 1);
        frontmatter[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0);
      } else {
        // Remove quotes if present
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    }

    // Validate frontmatter structure
    if (!isBlogFrontmatter(frontmatter)) {
      const missing: string[] = [];
      if (!frontmatter.title) missing.push('title');
      if (!frontmatter.date) missing.push('date');
      if (!frontmatter.summary) missing.push('summary');
      if (!Array.isArray(frontmatter.tags)) missing.push('tags');

      throw new Error(
        `Invalid blog frontmatter: missing or invalid fields: ${missing.join(', ')}`
      );
    }

    return {
      frontmatter,
      markdown: markdownLines.join('\n').trim()
    };
  }

  /**
   * Parse a blog post from markdown content with frontmatter
   * Returns a BlogPost object
   */
  static parseBlogPost(filename: string, content: string): BlogPost {
    const { frontmatter, markdown } = this.parseFrontmatter(content);

    // Extract ID from filename (remove date prefix and .md extension)
    // e.g., "2024-09-15-ai-production-lessons.md" -> "ai-production-lessons"
    const id = filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, '')
      .replace(/\.md$/, '');

    return {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary,
      content: markdown,
      tags: frontmatter.tags
    };
  }

  /**
   * Get blog post ID from filename
   */
  static getIdFromFilename(filename: string): string {
    return filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, '')
      .replace(/\.md$/, '');
  }
}
