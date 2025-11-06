import type { Project } from '../types/portfolio';
import type { BlogPost } from '../types/blog';

/**
 * ContentFormatter - Utility for generating markdown from structured data
 * Used by commands to create consistent, formatted markdown output
 */

export class ContentFormatter {
  /**
   * Format a portfolio list as markdown
   */
  static formatPortfolioList(projects: Project[]): string {
    const items = projects.map((project, index) => {
      const tech = project.technologies.join(', ');
      const impact = project.impact ? `\n   **Impact:** ${project.impact}` : '';

      return `### ${index + 1}. ${project.title} (${project.year})

${project.description}

**Technologies:** ${tech}${impact}

[View Details →](#) Type: \`portfolio ${project.id}\``;
    }).join('\n\n---\n\n');

    return `# Portfolio

${items}`;
  }

  /**
   * Format a single portfolio project as markdown
   */
  static formatPortfolioDetail(project: Project): string {
    const tech = project.technologies.join(', ');
    const impact = project.impact ? `\n\n## Impact\n\n${project.impact}` : '';

    return `# ${project.title}

**Year:** ${project.year}

## Overview

${project.description}

## Technologies

${tech}${impact}

---

[← Back to Portfolio](#) Type: \`portfolio\``;
  }

  /**
   * Format blog posts list as markdown
   */
  static formatBlogList(posts: BlogPost[], filterTag?: string): string {
    const header = filterTag ? `# Blog Posts - Tag: ${filterTag}` : '# Blog Posts';

    const items = posts.map((post, index) => {
      const tags = post.tags.map((t: string) => `\`${t}\``).join(' ');

      return `### ${index + 1}. ${post.title}

**Date:** ${post.date}

${post.summary}

**Tags:** ${tags}

[Read Post →](#) Type: \`blog ${post.id}\``;
    }).join('\n\n---\n\n');

    const footer = filterTag
      ? '\n\n---\n\n[← Back to All Posts](#) Type: `blog`'
      : '\n\n---\n\n**Filter by tag:** Type `blog --tag <tag>`';

    return `${header}

${items}${footer}`;
  }

  /**
   * Format a single blog post as markdown
   */
  static formatBlogPost(post: BlogPost): string {
    const tags = post.tags.map((t) => `\`${t}\``).join(' ');

    return `# ${post.title}

**Date:** ${post.date}

---

${post.content}

---

**Tags:** ${tags}

[← Back to Blog](#) Type: \`blog\``;
  }
}
