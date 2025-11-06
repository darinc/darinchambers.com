import type { Project } from '../types/portfolio';

export interface PortfolioFrontmatter {
  id: string;
  title: string;
  technologies: string[];
  impact?: string;
  year: string;
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
  static parseFrontmatter(content: string): { frontmatter: PortfolioFrontmatter; markdown: string } {
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

      // Handle array values like technologies: ["tech1", "tech2"]
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
      frontmatter: frontmatter as PortfolioFrontmatter,
      markdown: markdownLines.join('\n').trim()
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
      description: markdown,
      technologies: frontmatter.technologies,
      impact: frontmatter.impact,
      year: frontmatter.year
    };
  }

  /**
   * Get project ID from filename
   */
  static getIdFromFilename(filename: string): string {
    return filename.replace(/\.md$/, '');
  }
}
