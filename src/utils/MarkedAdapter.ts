import { marked } from 'marked';
import { FrontmatterParser } from './markdown/FrontmatterParser';

/**
 * Adapter for the Marked library to match MarkdownRenderer API
 *
 * This adapter wraps the marked library to provide the same interface as our custom
 * MarkdownRenderer, allowing seamless switching between implementations via feature flag.
 *
 * Key features:
 * - Synchronous rendering using marked.parse()
 * - Frontmatter support via FrontmatterParser (reused from custom implementation)
 * - Wrapped output in <div class="markdown-output"> for consistency
 * - CommonMark compliant parsing via marked library
 */
export class MarkedAdapter {
  /**
   * Render markdown to HTML using the marked library
   *
   * @param markdown - The markdown content to render
   * @param renderFrontmatter - Whether to parse and render YAML frontmatter
   * @returns HTML string wrapped in markdown-output div
   */
  static render(markdown: string, renderFrontmatter: boolean = false): string {
    let content = markdown;
    let frontmatterHtml = '';

    // Handle frontmatter using our existing parser
    if (renderFrontmatter) {
      const parsed = FrontmatterParser.parse(markdown);
      content = parsed.content;

      if (parsed.frontmatter) {
        frontmatterHtml = FrontmatterParser.renderFrontmatter(parsed.frontmatter);
      }
    }

    // Use marked's synchronous parse method
    const contentHtml = marked.parse(content) as string;

    // Wrap in div to match MarkdownRenderer behavior
    return `<div class="markdown-output">${frontmatterHtml}${contentHtml}</div>`;
  }
}
