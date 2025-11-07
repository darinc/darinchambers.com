import figlet from 'figlet';
import bannerFont from 'figlet/importable-fonts/Banner.js';
import slantFont from 'figlet/importable-fonts/Slant.js';
import smallFont from 'figlet/importable-fonts/Small.js';
import standardFont from 'figlet/importable-fonts/Standard.js';
import { CommandArgs } from '../../utils/CommandArgs';
import type { Command } from '../Command';

// Parse and load fonts
figlet.parseFont('Standard', standardFont);
figlet.parseFont('Slant', slantFont);
figlet.parseFont('Banner', bannerFont);
figlet.parseFont('Small', smallFont);

/**
 * figlet command - Convert text to ASCII art
 *
 * FIGlet (Frank, Ian, and Glenn's Letters) generates ASCII art text banners
 * using pre-defined fonts. Perfect for creating decorative headers and banners.
 */
export const figletCommand: Command = {
  name: 'figlet',
  description: 'Convert text to ASCII art',
  execute: (args: string[], stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: figlet [options] <text>

Convert text into ASCII art banners using various fonts.

Options:
  -f <font>    Specify font (standard, slant, banner, small)
  -c           Center the output
  -l           Left-align the output (default)
  -r           Right-align the output
  --help       Display this help message

Examples:
  figlet "Hello"              Show "Hello" in ASCII art
  figlet -f banner "World"    Use banner font
  figlet -c "Centered"        Center the output
  echo "Hello" | figlet       Use piped input

Available fonts:
  standard   - Default font (recommended)
  slant      - Slanted/italicized style
  banner     - Large banner style
  small      - Compact font`,
      };
    }

    // Get text from args or stdin
    let text: string;
    if (stdin) {
      text = stdin.trim();
    } else if (cmdArgs.positionalCount > 0) {
      // Join all positional args as the text
      text = cmdArgs.getAllPositionals().join(' ');
    } else {
      return {
        output: `figlet: missing text argument\nTry 'figlet --help' for more information.`,
        error: true,
      };
    }

    // Get font (default: Standard)
    const fontFlag = cmdArgs.getFlag('f');
    const fontName = typeof fontFlag === 'string' ? fontFlag : 'Standard';

    // Normalize font name (capitalize first letter)
    const font = fontName.charAt(0).toUpperCase() + fontName.slice(1).toLowerCase();

    // Get alignment
    let horizontalLayout: figlet.KerningMethods = 'default';
    if (cmdArgs.hasFlag('c')) {
      horizontalLayout = 'full'; // Center
    } else if (cmdArgs.hasFlag('r')) {
      horizontalLayout = 'fitted'; // Right-align
    }

    try {
      // Generate ASCII art using textSync (works in browser)
      const output = figlet.textSync(text, {
        font: font as figlet.Fonts,
        horizontalLayout,
      });

      return { output };
    } catch (error) {
      // Handle font not found or other errors
      if (error instanceof Error) {
        if (
          error.message.includes('font') ||
          error.message.includes('Font') ||
          error.message.includes('FIGlet')
        ) {
          return {
            output: `figlet: font '${font}' not found or invalid\nAvailable fonts: standard, slant, banner, small`,
            error: true,
          };
        }
        return {
          output: `figlet: ${error.message}`,
          error: true,
        };
      }
      return {
        output: `figlet: unknown error occurred`,
        error: true,
      };
    }
  },
};
