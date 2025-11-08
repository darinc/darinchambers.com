import { CommandArgs } from '../../utils/CommandArgs';
import type { ThemeManager } from '../../utils/ThemeManager';
import type { Command } from '../Command';

/**
 * matrix command - Display Matrix-style digital rain animation
 *
 * Renders the iconic "digital rain" effect from The Matrix in the terminal.
 * The animation auto-detects terminal dimensions and uses the current theme colors.
 * Characters continuously fall and animate using CSS until the user scrolls or clears.
 */

// Matrix character set: mix of ASCII, numbers, and Japanese Katakana
const MATRIX_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

/**
 * Get terminal dimensions by measuring the terminal output container
 */
function getTerminalDimensions(): { cols: number; rows: number } {
  const container = document.getElementById('terminal-output');
  if (!container) {
    // Fallback dimensions
    return { cols: 80, rows: 24 };
  }

  const rect = container.getBoundingClientRect();

  // Get font size from CSS variable
  const fontSize = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--terminal-font-size') || '16'
  );

  // Approximate character dimensions for monospace font
  const charWidth = fontSize * 0.6; // Approximate width
  const lineHeight = fontSize * 1.5; // Line height with spacing

  const cols = Math.floor(rect.width / charWidth);
  const rows = Math.floor(rect.height / lineHeight);

  return {
    cols: Math.max(cols, 20),
    rows: Math.max(rows, 10),
  };
}

/**
 * Generate a random matrix character
 */
function getRandomChar(): string {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

/**
 * Create the Matrix digital rain command
 */
export function createMatrixCommand(themeManager: ThemeManager): Command {
  return {
    name: 'matrix',
    description: 'Display Matrix digital rain animation',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      // Check for help flag
      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: matrix [options]

Display the iconic Matrix-style "digital rain" animation in your terminal.
The animation auto-detects terminal dimensions and matches your current theme.

Options:
  --speed <number>    Animation speed multiplier (0.1-5.0, default: 1.0)
                      Lower is slower, higher is faster
  --theme <name>      Override current theme (green, yellow, white,
                      light-blue, paper, dc, custom)
  --help              Display this help message

Examples:
  matrix                    # Run with current theme at default speed
  matrix --speed 2.0        # Run at 2x speed
  matrix --theme green      # Force classic green theme
  matrix --speed 0.5        # Run at half speed for a slower effect

Note: Animation continues until you scroll, type, or run 'clear'`,
        };
      }

      // Parse speed flag
      let speed = 1.0;
      const speedFlag = cmdArgs.getFlag('speed');
      if (speedFlag !== undefined) {
        const parsedSpeed = parseFloat(String(speedFlag));
        if (isNaN(parsedSpeed) || parsedSpeed < 0.1 || parsedSpeed > 5.0) {
          return {
            output: `matrix: invalid speed value '${speedFlag}'\nSpeed must be between 0.1 and 5.0`,
            error: true,
          };
        }
        speed = parsedSpeed;
      }

      // Parse theme flag
      const themeFlag = cmdArgs.getFlag('theme');
      let colors = themeManager.getCurrentColors();

      if (themeFlag !== undefined) {
        const themeName = String(themeFlag);
        const validThemes = ['green', 'yellow', 'white', 'light-blue', 'paper', 'dc', 'custom'];

        if (!validThemes.includes(themeName)) {
          return {
            output: `matrix: invalid theme '${themeName}'\nValid themes: ${validThemes.join(', ')}`,
            error: true,
          };
        }

        // Get colors from specified theme preset
        if (themeName !== 'custom') {
          const preset = themeManager.getPreset(
            themeName as 'green' | 'yellow' | 'white' | 'light-blue' | 'paper' | 'dc'
          );
          if (preset) {
            colors = preset.colors;
          }
        }
      }

      // Get terminal dimensions
      const { cols, rows } = getTerminalDimensions();

      // Calculate column width and number of columns
      // We need to cover the full width - calculate based on spacing
      const columnSpacing = 1.2; // Spacing between columns (in em units)
      // cols represents character columns, we need to fill the width completely
      const numColumns = Math.floor(cols / columnSpacing) + 5; // Add extra to ensure full coverage
      const trailLength = Math.min(rows, 20); // Limit trail length for performance

      // Generate HTML with CSS animation
      const accentColor = colors['--terminal-accent'];
      const dimColor = colors['--terminal-dim'];
      const bgColor = colors['--terminal-bg'];

      // Calculate animation distances - keep within visible terminal height
      const visibleHeight = rows * 1.5; // Match line height
      const startY = -trailLength * 1.5;
      const endY = visibleHeight;

      // Generate columns
      const columnsHtml = [];
      for (let i = 0; i < numColumns; i++) {
        const delay = -Math.random() * 5; // Negative delay to start mid-animation
        const duration = (5 + Math.random() * 5) / speed; // Duration 5-10s divided by speed
        const leftPos = i * columnSpacing;

        // Generate characters for this column
        const chars: string[] = [];
        for (let j = 0; j < trailLength; j++) {
          const position = j / trailLength;
          const opacity = Math.pow(position, 2); // Exponential fade
          const isBright = j === trailLength - 1; // Last char is brightest

          const char = getRandomChar();
          chars.push(
            `<span class="matrix-char${isBright ? ' matrix-char-bright' : ''}" style="color: ${isBright ? accentColor : dimColor}; opacity: ${opacity};">${char}</span>`
          );
        }

        columnsHtml.push(`
  <div class="matrix-column" style="
    left: ${leftPos}em;
    animation: matrix-fall ${duration}s linear ${delay}s infinite;
    --matrix-start: ${startY}em;
    --matrix-end: ${endY}em;
  ">${chars.join('')}</div>`);
      }

      const html = `
<div class="matrix-rain" style="height: ${visibleHeight}em; background-color: ${bgColor};">
${columnsHtml.join('')}
</div>
`;

      return {
        output: html,
        html: true,
      };
    },
  };
}
