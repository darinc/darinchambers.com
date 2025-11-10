import { escapeHtml } from './htmlEscape';

export class InlineRenderer {
  /**
   * Render inline markdown (bold, italic, code, links)
   */
  static render(text: string): string {
    // Escape HTML first
    let result = escapeHtml(text);

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
}
