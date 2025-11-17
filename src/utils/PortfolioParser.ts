import type { Project } from '../types/portfolio';

export interface PortfolioFrontmatter {
  id: string;
  title: string;
  summary: string;
  technologies: string[];
  impact?: string;
  year: string;
  order: number;
  tags?: string[];
}

/**
 * Type guard to validate frontmatter structure
 */
function isPortfolioFrontmatter(data: unknown): data is PortfolioFrontmatter {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.summary === 'string' &&
    typeof obj.year === 'string' &&
    typeof obj.order === 'number' &&
    Array.isArray(obj.technologies) &&
    obj.technologies.every((tech) => typeof tech === 'string') &&
    (obj.impact === undefined || typeof obj.impact === 'string') &&
    (obj.tags === undefined ||
      (Array.isArray(obj.tags) && obj.tags.every((tag) => typeof tag === 'string')))
  );
}

export class PortfolioParser {
  /**
   * Parse YAML frontmatter from markdown content
   * Expected format:
   * ---
   * key: value
   * technologies: ["tech1", "tech2"]
   * ---
   * Content here...
   */
  static parseFrontmatter(content: string): {
    frontmatter: PortfolioFrontmatter;
    markdown: string;
  } {
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
    const frontmatter: Record<string, string | string[] | number> = {};
    for (const line of frontmatterLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      // Handle array values like technologies: ["tech1", "tech2"]
      if (value.startsWith('[') && value.endsWith(']')) {
        // Remove brackets and split by comma
        const arrayContent = value.substring(1, value.length - 1);
        frontmatter[key] = arrayContent
          .split(',')
          .map((item) => item.trim().replace(/^["']|["']$/g, ''))
          .filter((item) => item.length > 0);
      } else {
        // Remove quotes if present
        const stringValue = value.replace(/^["']|["']$/g, '');
        // Try to parse as number only for 'order' field
        // (year should stay as string since it can be ranges like "2018-2022")
        if (key === 'order') {
          const numValue = Number(stringValue);
          frontmatter[key] = !isNaN(numValue) ? numValue : stringValue;
        } else {
          frontmatter[key] = stringValue;
        }
      }
    }

    // Validate frontmatter structure
    if (!isPortfolioFrontmatter(frontmatter)) {
      const missing: string[] = [];
      if (!frontmatter.id) missing.push('id');
      if (!frontmatter.title) missing.push('title');
      if (!frontmatter.summary) missing.push('summary');
      if (!frontmatter.year) missing.push('year');
      if (typeof frontmatter.order !== 'number') missing.push('order');
      if (!Array.isArray(frontmatter.technologies)) missing.push('technologies');

      throw new Error(
        `Invalid portfolio frontmatter: missing or invalid fields: ${missing.join(', ')}`
      );
    }

    return {
      frontmatter,
      markdown: markdownLines.join('\n').trim(),
    };
  }

  /**
   * Parse a portfolio project from markdown content with frontmatter
   * Returns a Project object
   */
  static parseProject(filename: string, content: string): Project {
    const { frontmatter, markdown } = this.parseFrontmatter(content);

    // Extract ID from filename (remove .md extension)
    // e.g., "ai-ml-systems.md" -> "ai-ml-systems"
    const id = frontmatter.id || filename.replace(/\.md$/, '');

    return {
      id,
      title: frontmatter.title,
      summary: frontmatter.summary,
      description: markdown,
      technologies: frontmatter.technologies,
      impact: frontmatter.impact,
      year: frontmatter.year,
      order: frontmatter.order,
      tags: frontmatter.tags,
    };
  }

  /**
   * Get project ID from filename
   */
  static getIdFromFilename(filename: string): string {
    return filename.replace(/\.md$/, '');
  }
}
