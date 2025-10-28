export interface FrontmatterData {
  [key: string]: string | string[];
}

export interface ParsedMarkdown {
  frontmatter: FrontmatterData | null;
  content: string;
}

export class FrontmatterParser {
  /**
   * Extract YAML frontmatter from markdown
   */
  static parse(markdown: string): ParsedMarkdown {
    if (!markdown.trim().startsWith('---')) {
      return { frontmatter: null, content: markdown };
    }

    const lines = markdown.split('\n');
    const endIndex = this.findFrontmatterEnd(lines);

    if (endIndex === -1) {
      return { frontmatter: null, content: markdown };
    }

    const frontmatterLines = lines.slice(1, endIndex);
    const contentLines = lines.slice(endIndex + 1);

    return {
      frontmatter: this.parseFrontmatterLines(frontmatterLines),
      content: contentLines.join('\n')
    };
  }

  private static findFrontmatterEnd(lines: string[]): number {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        return i;
      }
    }
    return -1;
  }

  private static parseFrontmatterLines(lines: string[]): FrontmatterData {
    const frontmatter: FrontmatterData = {};

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Handle arrays: [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.substring(1, value.length - 1);
        frontmatter[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0);
      } else {
        // Remove quotes
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    }

    return frontmatter;
  }

  /**
   * Render frontmatter as HTML
   */
  static renderFrontmatter(frontmatter: FrontmatterData): string {
    const parts: string[] = [];

    if (frontmatter.title && typeof frontmatter.title === 'string') {
      parts.push(`<h1 class="fm-title">${this.escapeHtml(frontmatter.title)}</h1>`);
    }

    const meta: string[] = [];
    if (frontmatter.date && typeof frontmatter.date === 'string') {
      meta.push(`<span class="fm-date">${this.escapeHtml(frontmatter.date)}</span>`);
    }
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tags = frontmatter.tags
        .map((tag: string) => `<span class="fm-tag">${this.escapeHtml(tag)}</span>`)
        .join(' ');
      meta.push(`<span class="fm-tags">${tags}</span>`);
    }

    if (meta.length > 0) {
      parts.push(`<div class="fm-meta">${meta.join(' • ')}</div>`);
    }

    if (frontmatter.summary && typeof frontmatter.summary === 'string') {
      parts.push(`<p class="fm-summary">${this.escapeHtml(frontmatter.summary)}</p>`);
    }

    if (parts.length > 0) {
      parts.push('<hr class="fm-divider">');
    }

    return parts.join('\n');
  }

  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
