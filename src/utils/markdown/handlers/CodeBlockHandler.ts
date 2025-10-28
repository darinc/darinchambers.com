import type { LineHandler } from '../LineHandler';
import type { ParseContext } from '../ParseContext';

export class CodeBlockHandler implements LineHandler {
  canHandle(line: string, context: ParseContext): boolean {
    return line.trim().startsWith('```') || context.getState() === 'code_block';
  }

  handle(line: string, context: ParseContext): boolean {
    const trimmed = line.trim();

    if (context.getState() === 'code_block') {
      // We're inside a code block
      if (trimmed.startsWith('```')) {
        // End code block
        context.flushCodeBlock();
        context.setState('normal');
      } else {
        // Add line to code block
        context.addCodeLine(line);
      }
      return true;
    }

    // Start new code block
    if (trimmed.startsWith('```')) {
      // Close any open list first
      context.flushList();
      context.setState('code_block');
      return true;
    }

    return false;
  }
}
