import { CommandArgs } from '../../utils/CommandArgs';
import { escapeHtml } from '../../utils/markdown/htmlEscape';
import type { Command } from '../Command';

/**
 * Rainbow colors for the lolcat effect - spectrum cycling through warm to cool
 */
const RAINBOW_COLORS = [
  '#ff6b35', // orange-red
  '#ff8c42', // orange
  '#ffaa4f', // orange-yellow
  '#ffc85c', // yellow
  '#e6e669', // yellow-green
  '#c4e676', // lime
  '#9fe683', // green
  '#7ae690', // green-cyan
  '#5ad69d', // cyan
  '#3ac6aa', // cyan-blue
  '#1bb6b7', // teal
  '#00a6c4', // blue-cyan
  '#0096d1', // blue
  '#0086de', // deep blue
];

/**
 * Get a rainbow color based on character and line position
 */
function getRainbowColor(
  charIndex: number,
  lineIndex: number,
  spread: number,
  freq: number
): string {
  const position = charIndex / spread + lineIndex * freq;
  return RAINBOW_COLORS[Math.floor(Math.abs(position)) % RAINBOW_COLORS.length];
}

/**
 * Check if input appears to be safe HTML from our commands
 * Only match structural tags like div, span, pre that our commands use
 * NOT script, iframe, or other potentially dangerous tags
 */
function isSafeHtmlInput(text: string): boolean {
  // Check for safe HTML patterns from our terminal commands
  // Must contain div or span with class or style attributes (typical of our output)
  return /<(div|span|pre)\s+(class|style)=/i.test(text);
}

/**
 * Colorize text with rainbow colors (plain text version)
 */
function colorizePlainText(text: string, spread: number, freq: number): string {
  return text
    .split('\n')
    .map((line, lineIdx) => {
      let charIdx = 0;
      return [...line]
        .map((char) => {
          // Preserve whitespace without coloring
          if (char === ' ' || char === '\t') {
            return char;
          }
          const color = getRainbowColor(charIdx++, lineIdx, spread, freq);
          return `<span style="color: ${color}">${escapeHtml(char)}</span>`;
        })
        .join('');
    })
    .join('\n');
}

/**
 * Colorize HTML content - apply colors to text while preserving HTML structure
 */
function colorizeHtml(html: string, spread: number, freq: number): string {
  let lineIdx = 0;
  let charIdx = 0;

  // Process HTML by finding text content and applying colors
  // We iterate character by character, tracking whether we're inside a tag
  let result = '';
  let inTag = false;
  let inEntity = false;
  let entityBuffer = '';

  for (const char of html) {
    if (char === '<') {
      inTag = true;
      result += char;
    } else if (char === '>') {
      inTag = false;
      result += char;
    } else if (inTag) {
      // Inside HTML tag - pass through unchanged
      result += char;
    } else if (char === '&') {
      // Start of HTML entity
      inEntity = true;
      entityBuffer = char;
    } else if (inEntity) {
      entityBuffer += char;
      if (char === ';') {
        // End of entity - colorize as single character
        inEntity = false;
        const color = getRainbowColor(charIdx++, lineIdx, spread, freq);
        result += `<span style="color: ${color}">${entityBuffer}</span>`;
        entityBuffer = '';
      }
    } else if (char === '\n') {
      result += char;
      lineIdx++;
      charIdx = 0;
    } else if (char === ' ' || char === '\t') {
      result += char;
    } else {
      // Regular text character - colorize it
      const color = getRainbowColor(charIdx++, lineIdx, spread, freq);
      result += `<span style="color: ${color}">${char}</span>`;
    }
  }

  return result;
}

/**
 * lolcat command - Rainbow-colorize text output
 *
 * Like the classic Unix lolcat utility, this command applies rainbow coloring
 * to any text input. Perfect for adding flair to ASCII art or terminal output.
 */
export const lolcatCommand: Command = {
  name: 'lolcat',
  description: 'Rainbow-colorize text output',
  execute: (args: string[], stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: lolcat [options] [text...]

Rainbow-colorize text output with cycling spectrum colors.

Options:
  --spread <1-10>     Color spread (lower = faster cycling). Default: 3
  --freq <0.1-2.0>    Vertical frequency between lines. Default: 0.3
  --help              Display this help message

Examples:
  lolcat "Hello World"           Colorize text argument
  echo "Rainbow" | lolcat        Colorize piped input
  figlet "Hi" | lolcat           Colorize ASCII art
  lolcat --spread 1 "Fast!"      Faster color cycling
  lolcat --freq 1.0 "Lines"      More variation between lines`,
      };
    }

    // Parse --spread flag (default: 3, range: 1-10)
    const spreadFlag = cmdArgs.getFlag('spread');
    let spread = 3;
    if (typeof spreadFlag === 'string') {
      const parsedSpread = parseFloat(spreadFlag);
      if (isNaN(parsedSpread) || parsedSpread < 1 || parsedSpread > 10) {
        return {
          output: `lolcat: invalid spread '${spreadFlag}'\nSpread must be between 1 and 10.`,
          error: true,
        };
      }
      spread = parsedSpread;
    }

    // Parse --freq flag (default: 0.3, range: 0.1-2.0)
    const freqFlag = cmdArgs.getFlag('freq');
    let freq = 0.3;
    if (typeof freqFlag === 'string') {
      const parsedFreq = parseFloat(freqFlag);
      if (isNaN(parsedFreq) || parsedFreq < 0.1 || parsedFreq > 2.0) {
        return {
          output: `lolcat: invalid freq '${freqFlag}'\nFrequency must be between 0.1 and 2.0.`,
          error: true,
        };
      }
      freq = parsedFreq;
    }

    // Get text from stdin (piped input) or args
    let text: string;
    if (stdin) {
      text = stdin;
    } else if (cmdArgs.positionalCount > 0) {
      text = cmdArgs.getAllPositionals().join(' ');
    } else {
      return {
        output: `lolcat: missing text input\nTry 'lolcat --help' for more information.`,
        error: true,
      };
    }

    // Detect if input is safe HTML and colorize appropriately
    if (isSafeHtmlInput(text)) {
      // HTML input - colorize text content while preserving structure
      const colorized = colorizeHtml(text, spread, freq);
      return {
        output: colorized,
        html: true,
      };
    } else {
      // Plain text input - wrap in pre tag
      const colorized = colorizePlainText(text, spread, freq);
      return {
        output: `<pre class="lolcat-output">${colorized}</pre>`,
        html: true,
      };
    }
  },
};
