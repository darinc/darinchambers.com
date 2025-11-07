import { InlineRenderer } from '../InlineRenderer';
import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class ParagraphHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Paragraph handler is the fallback - handles anything not handled by others
    return context.getState() === 'normal' && line.trim().length > 0;
  }

  handle(line: string, context: ParseContext): boolean {
    const content = InlineRenderer.render(line);
    context.addHtml(`<p>${content}</p>`);
    return true;
  }
}
