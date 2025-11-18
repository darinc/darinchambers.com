import DOMPurify from 'dompurify';

/**
 * Sanitize HTML using DOMPurify to prevent XSS attacks
 *
 * This provides defense-in-depth protection for innerHTML usage.
 * All user-generated content and markdown-rendered HTML should be
 * sanitized through this function before being inserted into the DOM.
 *
 * Security configuration:
 * - Allows safe HTML tags (p, div, span, code, pre, etc.)
 * - Allows interactive form elements (button, input, select) for settings UI
 * - Allows semantic elements (aside, section, details, summary)
 * - Allows safe attributes (class, id, href, data-*, aria-*, etc.)
 * - Allows inline styles (DOMPurify sanitizes style attribute values)
 * - Blocks script tags, event handlers, and javascript: URLs
 * - Sanitizes SVG to prevent XSS vectors
 *
 * Note: Event handlers are implemented via event delegation (not inline),
 * so allowing data-* attributes is safe for CSP compliance.
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML safe for innerHTML usage
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    // Allow common HTML tags used in markdown rendering and interactive UI
    ALLOWED_TAGS: [
      'p',
      'div',
      'span',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'a',
      'code',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'img',
      // Interactive elements for settings UI
      'button',
      'input',
      'select',
      'option',
      'label',
      // Semantic HTML for settings UI
      'aside',
      'section',
      'details',
      'summary',
    ],
    // Allow safe attributes
    ALLOWED_ATTR: [
      'class',
      'id',
      'href',
      'target',
      'rel',
      'src',
      'alt',
      'title',
      // Form control attributes
      'type',
      'value',
      'checked',
      'selected',
      'disabled',
      'min',
      'max',
      'step',
      'placeholder',
      // Data attributes for event delegation
      'data-command',
      'data-command-template',
      'data-setting-type',
      'data-color-var',
      'data-theme',
      'data-settings-panel',
      // Graph visualization attributes
      'data-graph',
      'data-graph-src',
      'data-graph-theme',
      'data-graph-initialized',
      'data-graph-error',
      // Inline styles (limited to safe properties)
      'style',
      // Details element
      'open',
      // ARIA attributes for accessibility
      'role',
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'aria-valuemin',
      'aria-valuemax',
      'aria-valuenow',
      'aria-valuetext',
      'aria-live',
      'aria-atomic',
      'aria-current',
    ],
    // Return sanitized HTML as string
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}

/**
 * Sanitize HTML with custom configuration
 *
 * Use this when you need more specific control over sanitization,
 * such as allowing additional tags or attributes.
 *
 * @param html - The HTML string to sanitize
 * @param config - DOMPurify configuration object
 * @returns Sanitized HTML
 */
export function sanitizeHtmlCustom(
  html: string,
  config: Parameters<typeof DOMPurify.sanitize>[1]
): string {
  return DOMPurify.sanitize(html, config);
}
