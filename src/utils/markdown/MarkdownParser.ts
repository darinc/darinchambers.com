import { CodeBlockHandler } from './handlers/CodeBlockHandler';
import { EmptyLineHandler } from './handlers/EmptyLineHandler';
import { HeaderHandler } from './handlers/HeaderHandler';
import { ListHandler } from './handlers/ListHandler';
import { ParagraphHandler } from './handlers/ParagraphHandler';
import { ParseContext } from './ParseContext';
import type { LineHandler } from './LineHandler';

export class MarkdownParser {
  private handlers: LineHandler[];

  constructor() {
    // Order matters! Earlier handlers have priority
    this.handlers = [
      new CodeBlockHandler(),
      new HeaderHandler(),
      new ListHandler(),
      new EmptyLineHandler(),
      new ParagraphHandler(), // Fallback handler
    ];
  }

  parse(content: string): string {
    const lines = content.split('\n');
    const context = new ParseContext();

    for (const line of lines) {
      this.processLine(line, context);
    }

    // Flush any remaining state
    this.flushRemainingState(context);

    return context.getHtml();
  }

  private processLine(line: string, context: ParseContext): void {
    for (const handler of this.handlers) {
      if (handler.canHandle(line, context)) {
        const handled = handler.handle(line, context);
        if (handled) {
          break; // Line was handled, move to next line
        }
        // If handler returned false, try next handler
      }
    }
  }

  private flushRemainingState(context: ParseContext): void {
    // Close any remaining open list
    context.flushList();

    // Close any remaining code block
    context.flushCodeBlock();
  }
}
