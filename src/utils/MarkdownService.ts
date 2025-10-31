import { config } from '../config';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MarkedAdapter } from './MarkedAdapter';

/**
 * Unified markdown rendering service with feature flag support
 *
 * This service provides a single entry point for markdown rendering while supporting
 * multiple backend implementations. The active renderer is determined by the
 * config.features.useMarkedRenderer flag.
 *
 * Usage:
 * ```typescript
 * import { MarkdownService } from './utils/MarkdownService';
 *
 * const html = MarkdownService.render(markdown, true);
 * ```
 *
 * To switch renderers, toggle the flag in src/config.ts:
 * - config.features.useMarkedRenderer = false → Custom MarkdownRenderer (default)
 * - config.features.useMarkedRenderer = true → Marked library via MarkedAdapter
 */
export class MarkdownService {
  /**
   * Render markdown to HTML using the configured renderer
   *
   * @param markdown - The markdown content to render
   * @param renderFrontmatter - Whether to parse and render YAML frontmatter (default: false)
   * @returns HTML string wrapped in markdown-output div
   */
  static render(markdown: string, renderFrontmatter: boolean = false): string {
    if (config.features.useMarkedRenderer) {
      // Use marked library for rendering
      return MarkedAdapter.render(markdown, renderFrontmatter);
    }

    // Use custom markdown renderer (default)
    return MarkdownRenderer.render(markdown, renderFrontmatter);
  }
}
