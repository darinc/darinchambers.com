import { splitFrontmatter, parseFrontmatterFields } from './frontmatter';
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
    const { frontmatterLines, markdown } = splitFrontmatter(content);

    // Coerce 'order' to a number (year stays a string — it can be a range like "2018-2022").
    const frontmatter: Record<string, string | string[] | number> =
      parseFrontmatterFields(frontmatterLines);
    if (typeof frontmatter.order === 'string') {
      const numValue = Number(frontmatter.order);
      if (!isNaN(numValue)) {
        frontmatter.order = numValue;
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

    return { frontmatter, markdown };
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
