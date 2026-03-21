/**
 * Make Command
 *
 * Easter egg inspired by the classic xkcd #149 comic.
 * "make me a sandwich" → "What? Make it yourself."
 * (Use "sudo make me a sandwich" for a different response.)
 */
import { CommandArgs } from '../../utils/CommandArgs';
import type { Terminal } from '../../components/Terminal';
import type { Command } from '../Command';

const TOTAL_ANIMATION_MS = 3600;

export function createMakeCommand(terminal: Terminal): Command {
  return {
    name: 'make',
    description: 'Build targets from a Makefile',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: make [target...]

Description:
  Build targets specified in the Makefile. If no target is specified,
  the default target is used.

Options:
  --help               Show this help message

Examples:
  make                 # Build default target
  make coffee          # Build the coffee target
  make me a sandwich   # Try it and see`,
        };
      }

      const fullArgs = args.join(' ');

      if (fullArgs === 'me a sandwich') {
        return { output: 'What? Make it yourself.' };
      }

      if (fullArgs === 'coffee') {
        const lines = [
          { text: 'Grinding beans...', delay: 0 },
          { text: 'Compiling bean.c...', delay: 400 },
          { text: 'Linking libcaffeine.so...', delay: 800 },
        ];

        // Progress bar appears after the lines, fills over 2s
        const barDelay = 1200;
        const doneDelay = barDelay + 2200;

        // Join without newlines to avoid whitespace text nodes adding blank lines
        const html =
          '<div class="make-container">' +
          lines
            .map(
              (l) => `<div class="make-line" style="animation-delay: ${l.delay}ms;">${l.text}</div>`
            )
            .join('') +
          `<div class="make-line" style="animation-delay: ${barDelay}ms;">Brewing dark roast <span class="make-progress-track"><span class="make-progress-bar" style="animation-delay: ${barDelay}ms;"></span></span> 100%</div>` +
          `<div class="make-line" style="animation-delay: ${doneDelay}ms;">make: Ready. Careful, it's hot.</div>` +
          '</div>';

        // Hide the input line during animation, restore after
        terminal.setInputLineVisible(false);
        setTimeout(() => {
          terminal.setInputLineVisible(true);
          terminal.focus(true);
        }, TOTAL_ANIMATION_MS);

        return { output: html, html: true };
      }

      if (args.length === 0) {
        return { output: 'make: *** No targets specified. Stop.', error: true };
      }

      return {
        output: `make: *** No rule to make target '${args[0]}'. Stop.`,
        error: true,
      };
    },
  };
}
