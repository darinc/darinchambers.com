/**
 * Escapes HTML special characters to prevent XSS and ensure proper rendering
 * @param text - The text to escape
 * @returns The escaped text with HTML entities
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
