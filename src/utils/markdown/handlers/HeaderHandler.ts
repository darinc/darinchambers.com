import { InlineRenderer } from '../InlineRenderer';
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class HeaderHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Only handle headers when not in code block
    if (context.getState() === 'code_block') return false;
    return line.trim().startsWith('#');
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();
    const match = /^(#{1,6})\s+(.+)$/.exec(trimmed);

    if (!match) return false;

    // Close any open list first
    context.flushList();

    const level = match[1].length;
    const content = InlineRenderer.render(match[2]);
    context.addHtml(`<h${level}>${content}</h${level}>`);

    return true;
  }
}
