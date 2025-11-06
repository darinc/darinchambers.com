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
 * - Allows safe attributes (class, id, href, etc.)
 * - Blocks script tags, event handlers, and javascript: URLs
 * - Sanitizes SVG to prevent XSS vectors
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML safe for innerHTML usage
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    // Allow common HTML tags used in markdown rendering
    ALLOWED_TAGS: [
      'p', 'div', 'span', 'br',
      'strong', 'b', 'em', 'i', 'u', 's',
      'a', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img',
    ],
    // Allow safe attributes
    ALLOWED_ATTR: [
      'class', 'id',
      'href', 'target', 'rel',
      'src', 'alt', 'title',
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
  config: DOMPurify.Config
): string {
  return DOMPurify.sanitize(html, config);
}
