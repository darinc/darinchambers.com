import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';
import { InlineRenderer } from '../InlineRenderer';

export class ListHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Don't handle lists inside code blocks
    if (context.getState() === 'code_block') return false;

    const trimmed = line.trim();

    // Check for unordered list markers
    if (trimmed.match(/^[-*]\s+/)) return true;

    // Check for ordered list markers
    if (trimmed.match(/^\d+\.\s+/)) return true;

    // If we're in a list state, check if line continues it
    if (context.getState() === 'list') {
      return trimmed.length > 0 && this.isListItem(trimmed);
    }

    return false;
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();

    // Empty line or non-list-item ends the list
    if (context.getState() === 'list' && (!trimmed || !this.isListItem(trimmed))) {
      context.flushList();
      context.setState('normal');
      return false; // Let another handler process this line
    }

    // Unordered list item
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      return this.handleListItem(context, 'ul', ulMatch[1]);
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      return this.handleListItem(context, 'ol', olMatch[1]);
    }

    return false;
  }

  private handleListItem(
    context: ParseContext,
    type: 'ul' | 'ol',
    content: string
  ): boolean {
    const currentListType = context.getListType();

    // If switching list types, flush the current list
    if (currentListType && currentListType !== type) {
      context.flushList();
    }

    // Start or continue list
    if (!currentListType || currentListType !== type) {
      context.setState('list');
      context.setListType(type);
    }

    const renderedContent = InlineRenderer.render(content);
    context.addListItem(`<li>${renderedContent}</li>`);

    return true;
  }

  private isListItem(line: string): boolean {
    return !!(
      line.match(/^[-*]\s+/) ||
      line.match(/^\d+\.\s+/)
    );
  }
}
