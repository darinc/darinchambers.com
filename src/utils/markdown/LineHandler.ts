import type { ParseContext } from './ParseContext';

export interface LineHandler {
  /**
   * Check if this handler can process the given line
   */
  canHandle(line: string, context: ParseContext): boolean;

  /**
   * Process the line and update context
   * Returns true if line was handled, false to try next handler
   */
  handle(line: string, context: ParseContext): boolean;
}
