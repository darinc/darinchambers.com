import type { BlogPost } from '../types/blog';
import type { Project } from '../types/portfolio';

/**
 * ContentFormatter - Utility for generating markdown from structured data
 * Used by commands to create consistent, formatted markdown output
 */

export class ContentFormatter {
  /**
   * Format a tag as a clickable button
   */
  private static formatClickableTag(tag: string, command: 'portfolio' | 'blog'): string {
    const cmd = command === 'portfolio' ? `portfolio --tags ${tag}` : `blog --tag ${tag}`;
    return `<button data-command="${cmd}" class="tag-link">${tag}</button>`;
  }
  /**
   * Format a portfolio list as markdown
   */
  static formatPortfolioList(projects: Project[], filterTag?: string): string {
    const header = filterTag ? `# Portfolio - Tag: ${filterTag}` : '# Portfolio';

    const items = projects
      .map((project, index) => {
        const tags =
          project.tags?.map((t: string) => this.formatClickableTag(t, 'portfolio')).join(' ') ?? '';
        const tagsLine = tags ? `\n\n**Tags:** ${tags}` : '';

        return `### <a href="/portfolio/${project.id}" data-command="portfolio ${project.id}">${index + 1}. ${project.title} (${project.year})</a>

${project.summary}${tagsLine}
`;
      })
      .join('\n\n---\n\n');

    const footer = filterTag
      ? '\n\n---\n\n<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>'
      : '\n\n---\n\n**Filter by tag:** Type `portfolio --tags <tag>` or `portfolio --tags` to list all tags';

    return `${header}

${items}${footer}`;
  }

  /**
   * Format a single portfolio project as markdown
   */
  static formatPortfolioDetail(project: Project): string {
    const tech = project.technologies.join(', ');
    const impact = project.impact ? `**Impact:** ${project.impact}\n\n` : '';
    const tags = project.tags?.map((t) => this.formatClickableTag(t, 'portfolio')).join(' ') ?? '';
    const tagsSection = tags ? `**Tags:** ${tags}\n\n` : '';

    return `# ${project.title}

**Year:** ${project.year}

${project.description}

**Technologies:** ${tech}

${impact}${tagsSection}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`;
  }

  /**
   * Format blog posts list as markdown
   */
  static formatBlogList(posts: BlogPost[], filterTag?: string): string {
    const header = filterTag ? `# Blog Posts - Tag: ${filterTag}` : '# Blog Posts';

    const items = posts
      .map((post, index) => {
        const tags = post.tags.map((t: string) => this.formatClickableTag(t, 'blog')).join(' ');
        // Reverse numbering: newest post (index 0) gets highest number
        const postNumber = posts.length - index;

        return `### <a href="/blog/${post.id}" data-command="blog ${post.id}">${postNumber}. ${post.title}</a>

**Date:** ${post.date}

${post.summary}

**Tags:** ${tags}
`;
      })
      .join('\n\n---\n\n');

    const footer = filterTag
      ? '\n\n---\n\n<a href="/blog" data-command="blog">← Back to All Posts</a>'
      : '\n\n---\n\n**Filter by tag:** Type `blog --tag <tag>`';

    return `${header}

${items}${footer}`;
  }

  /**
   * Format a single blog post as markdown
   */
  static formatBlogPost(post: BlogPost): string {
    const tags = post.tags.map((t) => this.formatClickableTag(t, 'blog')).join(' ');

    return `# ${post.title}

**Date:** ${post.date}

---

${post.content}

---

**Tags:** ${tags}

<a href="/blog" data-command="blog">← Back to Blog</a>`;
  }
}
