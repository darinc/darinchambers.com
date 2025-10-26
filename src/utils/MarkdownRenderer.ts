export class MarkdownRenderer {
  /**
   * Convert markdown text to HTML with CSS classes
   * Optionally renders YAML frontmatter as formatted metadata
   */
  static render(markdown: string, renderFrontmatter: boolean = false): string {
    let content = markdown;
    let frontmatterHtml = '';

    // Check for YAML frontmatter
    if (renderFrontmatter && markdown.trim().startsWith('---')) {
      const lines = markdown.split('\n');
      let endIndex = -1;

      // Find closing ---
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          endIndex = i;
          break;
        }
      }

      if (endIndex > 0) {
        // Extract and parse frontmatter
        const frontmatterLines = lines.slice(1, endIndex);
        const frontmatter: any = {};

        for (const line of frontmatterLines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Handle arrays
            if (value.startsWith('[') && value.endsWith(']')) {
              const arrayContent = value.substring(1, value.length - 1);
              frontmatter[key] = arrayContent
                .split(',')
                .map(item => item.trim().replace(/^["']|["']$/g, ''))
                .filter(item => item.length > 0);
            } else {
              frontmatter[key] = value.replace(/^["']|["']$/g, '');
            }
          }
        }

        // Generate frontmatter HTML
        frontmatterHtml = this.renderFrontmatter(frontmatter);

        // Remove frontmatter from content
        content = lines.slice(endIndex + 1).join('\n');
      }
    }

    const lines = content.split('\n');
    const html: string[] = [];

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Handle code blocks
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          html.push(`<pre><code>${this.escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // Start code block
          // Close any open list first
          if (inList) {
            html.push(this.closeList(listType!, listItems));
            listItems = [];
            inList = false;
            listType = null;
          }
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headers
      if (trimmed.startsWith('#')) {
        // Close any open list first
        if (inList) {
          html.push(this.closeList(listType!, listItems));
          listItems = [];
          inList = false;
          listType = null;
        }

        const match = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const content = this.renderInline(match[2]);
          html.push(`<h${level}>${content}</h${level}>`);
          continue;
        }
      }

      // Handle unordered lists
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const match = trimmed.match(/^[-*]\s+(.+)$/);
        if (match) {
          const content = this.renderInline(match[1]);

          if (!inList || listType !== 'ul') {
            // Close ordered list if switching types
            if (inList && listType === 'ol') {
              html.push(this.closeList('ol', listItems));
              listItems = [];
            }
            inList = true;
            listType = 'ul';
          }

          listItems.push(`<li>${content}</li>`);
          continue;
        }
      }

      // Handle ordered lists
      if (trimmed.match(/^\d+\.\s+/)) {
        const match = trimmed.match(/^\d+\.\s+(.+)$/);
        if (match) {
          const content = this.renderInline(match[1]);

          if (!inList || listType !== 'ol') {
            // Close unordered list if switching types
            if (inList && listType === 'ul') {
              html.push(this.closeList('ul', listItems));
              listItems = [];
            }
            inList = true;
            listType = 'ol';
          }

          listItems.push(`<li>${content}</li>`);
          continue;
        }
      }

      // If we were in a list and this line doesn't continue it, close the list
      if (inList && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.match(/^\d+\.\s+/)) {
        html.push(this.closeList(listType!, listItems));
        listItems = [];
        inList = false;
        listType = null;
      }

      // Handle empty lines
      if (trimmed === '') {
        if (!inList) {
          html.push('<br>');
        }
        continue;
      }

      // Handle regular paragraphs
      if (!inList) {
        const content = this.renderInline(line);
        html.push(`<p>${content}</p>`);
      }
    }

    // Close any remaining open list
    if (inList && listType) {
      html.push(this.closeList(listType, listItems));
    }

    // Close any remaining code block
    if (inCodeBlock && codeBlockContent.length > 0) {
      html.push(`<pre><code>${this.escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
    }

    return `<div class="markdown-output">${frontmatterHtml}${html.join('\n')}</div>`;
  }

  /**
   * Render YAML frontmatter as formatted HTML
   */
  private static renderFrontmatter(frontmatter: any): string {
    const parts: string[] = [];

    if (frontmatter.title) {
      parts.push(`<h1 class="fm-title">${this.escapeHtml(frontmatter.title)}</h1>`);
    }

    const meta: string[] = [];
    if (frontmatter.date) {
      meta.push(`<span class="fm-date">${this.escapeHtml(frontmatter.date)}</span>`);
    }
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tags = frontmatter.tags.map((tag: string) =>
        `<span class="fm-tag">${this.escapeHtml(tag)}</span>`
      ).join(' ');
      meta.push(`<span class="fm-tags">${tags}</span>`);
    }

    if (meta.length > 0) {
      parts.push(`<div class="fm-meta">${meta.join(' • ')}</div>`);
    }

    if (frontmatter.summary) {
      parts.push(`<p class="fm-summary">${this.escapeHtml(frontmatter.summary)}</p>`);
    }

    if (parts.length > 0) {
      parts.push('<hr class="fm-divider">');
    }

    return parts.join('\n');
  }

  /**
   * Close a list with its items
   */
  private static closeList(type: 'ul' | 'ol', items: string[]): string {
    return `<${type}>\n${items.join('\n')}\n</${type}>`;
  }

  /**
   * Render inline markdown (bold, italic, code, links)
   */
  private static renderInline(text: string): string {
    // Escape HTML first
    let result = this.escapeHtml(text);

    // Links: [text](url)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Inline code: `code`
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold: **text** or __text__
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_ (must be after bold to avoid conflicts)
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    result = result.replace(/_([^_]+)_/g, '<em>$1</em>');

    return result;
  }

  /**
   * Escape HTML entities
   */
  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
