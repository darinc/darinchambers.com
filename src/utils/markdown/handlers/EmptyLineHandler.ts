import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class EmptyLineHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    // Don't handle empty lines in code blocks
    if (context.getState() === 'code_block') return false;
    return line.trim() === '';
  }

  handle(_line: string, context: ParseContext): boolean {
    // Empty lines don't appear in lists
    if (context.getState() === 'list') {
      context.flushList();
      context.setState('normal');
    }

    // Add line break for normal state
    if (context.getState() === 'normal') {
      context.addHtml('<br>');
    }

    return true;
  }
}
