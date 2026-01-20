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
 * Colorize text with rainbow colors
 */
function colorizeText(text: string, spread: number, freq: number): string {
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

    // Colorize the text
    const colorized = colorizeText(text, spread, freq);

    return {
      output: `<pre class="lolcat-output">${colorized}</pre>`,
      html: true,
    };
  },
};
