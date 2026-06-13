/**
 * Shared frontmatter parsing primitives.
 *
 * BlogParser, PortfolioParser, and PostParser all parse the same lightweight
 * `---` delimited frontmatter; these helpers hold the one copy of that logic so
 * the typed parsers only own their own validation and field mapping.
 */

export interface SplitFrontmatter {
  /** The raw lines between the opening and closing `---` delimiters. */
  frontmatterLines: string[];
  /** The document body after the frontmatter block, trimmed. */
  markdown: string;
}

/**
 * Split a markdown document into its frontmatter lines and body.
 * Throws if the `---` block is missing or unterminated.
 */
export function splitFrontmatter(content: string): SplitFrontmatter {
  const lines = content.split('\n');

  if (lines[0]?.trim() !== '---') {
    throw new Error('Invalid frontmatter: must start with ---');
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    throw new Error('Invalid frontmatter: no closing ---');
  }

  return {
    frontmatterLines: lines.slice(1, endIndex),
    markdown: lines
      .slice(endIndex + 1)
      .join('\n')
      .trim(),
  };
}

/** Strip a single pair of surrounding single or double quotes. */
export function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, '');
}

/**
 * Parse a single frontmatter value: an inline array (`[a, b]`) becomes a string
 * array, anything else becomes a quote-stripped string.
 */
export function parseFrontmatterValue(value: string): string | string[] {
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .substring(1, value.length - 1)
      .split(',')
      .map((item) => stripQuotes(item.trim()))
      .filter((item) => item.length > 0);
  }
  return stripQuotes(value);
}

/**
 * Parse simple `key: value` frontmatter lines into a record. Inline arrays are
 * supported; multi-line / nested structures are not (parsers that need those
 * handle them before/after calling this).
 */
export function parseFrontmatterFields(lines: string[]): Record<string, string | string[]> {
  const fields: Record<string, string | string[]> = {};
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.substring(0, colonIndex).trim();
    fields[key] = parseFrontmatterValue(line.substring(colonIndex + 1).trim());
  }
  return fields;
}

/**
 * Derive a content id from a dated filename by stripping the
 * `YYYY-MM-DD-` date prefix, an optional two-digit `NN-` sequence number, and
 * the `.md` extension. e.g. `2025-09-20-01-graph-library.md` -> `graph-library`.
 */
export function idFromDatedFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-(\d{2}-)?/, '').replace(/\.md$/, '');
}
