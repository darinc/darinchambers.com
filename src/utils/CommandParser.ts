export interface ParsedCommand {
  command: string;
  args: string[];
  raw: string;
}

export class CommandParser {
  static parse(input: string): ParsedCommand {
    const trimmed = input.trim();

    if (!trimmed) {
      return {
        command: '',
        args: [],
        raw: input
      };
    }

    // Split on spaces but respect quoted strings
    const parts = this.splitCommand(trimmed);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    return {
      command,
      args,
      raw: input
    };
  }

  private static splitCommand(input: string): string[] {
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = '';
      } else if (char === ' ' && !inQuotes) {
        if (current) {
          parts.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      parts.push(current);
    }

    return parts;
  }
}
