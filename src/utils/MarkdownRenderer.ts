import { MarkdownParser } from './markdown/MarkdownParser';
import { FrontmatterParser } from './markdown/FrontmatterParser';

export class MarkdownRenderer {
  /**
   * Convert markdown text to HTML with CSS classes
   * Optionally renders YAML frontmatter as formatted metadata
   */
  static render(markdown: string, renderFrontmatter: boolean = false): string {
    let content = markdown;
    let frontmatterHtml = '';

    // Extract and render frontmatter if requested
    if (renderFrontmatter) {
      const parsed = FrontmatterParser.parse(markdown);
      content = parsed.content;

      if (parsed.frontmatter) {
        frontmatterHtml = FrontmatterParser.renderFrontmatter(parsed.frontmatter);
      }
    }

    // Parse markdown content
    const parser = new MarkdownParser();
    const contentHtml = parser.parse(content);

    return `<div class="markdown-output">${frontmatterHtml}${contentHtml}</div>`;
  }
}
