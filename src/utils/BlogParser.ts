import type { BlogPost } from '../data/blog';

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
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
    const frontmatter: any = {};
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

    return {
      frontmatter: frontmatter as BlogFrontmatter,
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
