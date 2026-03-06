import type { BlogPost } from '../types/blog';
import type { Project } from '../types/portfolio';
import type { Post } from '../types/post';

/**
 * ContentFormatter - Utility for generating markdown from structured data
 * Used by commands to create consistent, formatted markdown output
 */

export class ContentFormatter {
  /**
   * Post-process rendered HTML to make inline `<code>commandName</code>` clickable
   * when the command name matches a known command.
   * Safe for fenced code blocks since `<pre><code>` content won't match single command names.
   */
  static makeCommandsClickable(html: string, commandNames: string[]): string {
    const commandSet = new Set(commandNames);
    return html.replace(/<code>([^<]+)<\/code>/g, (match, name: string) => {
      const trimmed = name.trim();
      if (commandSet.has(trimmed)) {
        return `<a data-command="${trimmed}" class="command-link"><code>${trimmed}</code></a>`;
      }
      return match;
    });
  }

  /**
   * Format a tag as a clickable button
   */
  private static formatClickableTag(tag: string, command: 'portfolio' | 'blog' | 'posts'): string {
    const cmd = `${command} --tags ${tag}`;
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
      : '\n\n---\n\n**Filter by tag:** Type `blog --tags <tag>` or `blog --tags` to list all tags';

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

  /**
   * Format posted links as platform badges and links
   */
  private static formatPostedLinks(posted?: Post['posted']): {
    badges: string;
    links: string;
  } {
    if (!posted || posted.length === 0) {
      return { badges: '', links: '' };
    }

    const badges = posted.map((p) => p.platform).join(' · ');
    const links = posted
      .map(
        (p) => `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.platform} →</a>`
      )
      .join(' · ');

    return {
      badges: ` · ${badges}`,
      links: `\n\n**Posted on:** ${links}`,
    };
  }

  /**
   * Format posts list as markdown (short-form, full content inline)
   */
  static formatPostList(posts: Post[], filterTag?: string): string {
    const header = filterTag ? `# Posts - Tag: ${filterTag}` : '# Posts';

    const items = posts
      .map((post, index) => {
        const tags = post.tags.map((t: string) => this.formatClickableTag(t, 'posts')).join(' ');
        const postNumber = posts.length - index;
        const { badges, links } = this.formatPostedLinks(post.posted);

        return `### <a href="/posts/${post.id}" data-command="posts ${post.id}">${postNumber}. ${post.title}</a>

**${post.date}**${badges}

${post.content}${links}

**Tags:** ${tags}
`;
      })
      .join('\n\n---\n\n');

    const footer = filterTag
      ? '\n\n---\n\n<a href="/posts" data-command="posts">← Back to All Posts</a>'
      : '\n\n---\n\n**Filter by tag:** Type `posts --tags <tag>` or `posts --tags` to list all tags';

    return `${header}

${items}${footer}`;
  }

  /**
   * Format a single post as markdown
   */
  static formatPostDetail(post: Post): string {
    const tags = post.tags.map((t) => this.formatClickableTag(t, 'posts')).join(' ');
    const { badges, links } = this.formatPostedLinks(post.posted);

    return `# ${post.title}

**${post.date}**${badges}

---

${post.content}${links}

---

**Tags:** ${tags}

<a href="/posts" data-command="posts">← Back to Posts</a>`;
  }
}
