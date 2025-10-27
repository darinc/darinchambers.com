export class PipelineParser {
  /**
   * Parse a command string into pipeline segments
   * Splits on | characters while respecting quotes
   * Example: "cat file.md | render" → ["cat file.md", "render"]
   */
  static parse(input: string): string[] {
    const segments: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const prevChar = i > 0 ? input[i - 1] : '';

      // Handle quotes
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
          quoteChar = '';
        }
        current += char;
      }
      // Handle pipe separator
      else if (char === '|' && !inQuotes) {
        const trimmed = current.trim();
        if (trimmed) {
          segments.push(trimmed);
        }
        current = '';
      }
      // Regular character
      else {
        current += char;
      }
    }

    // Add final segment
    const trimmed = current.trim();
    if (trimmed) {
      segments.push(trimmed);
    }

    return segments;
  }

  /**
   * Check if input contains pipe operators (outside quotes)
   */
  static hasPipe(input: string): boolean {
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const prevChar = i > 0 ? input[i - 1] : '';

      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
          quoteChar = '';
        }
      } else if (char === '|' && !inQuotes) {
        return true;
      }
    }

    return false;
  }
}
