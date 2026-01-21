import { CommandArgs } from '../../utils/CommandArgs';
import { generateBootHtml } from './boot';
import { generateShutdownHtml } from './shutdown';
import type { Command } from '../Command';

/**
 * Generate HTML for the full reboot sequence (shutdown + pause + boot)
 */
function generateRebootHtml(fast: boolean): string {
  // Generate shutdown sequence
  const shutdownLines = generateShutdownHtml(false);

  // Remove the overlay from shutdown (we'll add our own at the end of the pause)
  const shutdownWithoutOverlay = shutdownLines
    .split('\n')
    .filter((line) => !line.includes('data-boot-overlay'))
    .join('\n');

  // Calculate timing
  // Shutdown: ~24 lines * 150ms = 3600ms + 500ms pause = ~4100ms
  const shutdownLineCount = 25; // approximate
  const shutdownDelay = 150;
  const shutdownDuration = shutdownLineCount * shutdownDelay;

  // Pause with black screen
  const pauseDuration = 2000; // 2 second pause
  const pauseStart = shutdownDuration + 500;

  // Boot starts after pause
  const bootStart = pauseStart + pauseDuration;

  // Generate boot sequence with offset delay
  const bootHtml = generateBootHtml(fast, bootStart);

  // Build the combined HTML
  // Add a pause overlay that appears during the "black screen" phase
  const overlayAppearDelay = pauseStart;
  const overlayFadeDelay = bootStart - 300; // Start fading before boot begins

  const pauseOverlay = `<div class="boot-overlay boot-pause-overlay" style="animation-delay: ${overlayAppearDelay}ms;" data-boot-overlay="true" data-fade-delay="${overlayFadeDelay}"><span class="boot-overlay-text">Rebooting...</span></div>`;

  return `${shutdownWithoutOverlay}
<div class="boot-line boot-line-info" style="animation-delay: ${shutdownDuration}ms;">Rebooting...</div>
${pauseOverlay}
${bootHtml}`;
}

/**
 * reboot command - Display a full reboot sequence (shutdown → boot)
 *
 * Chains the shutdown and boot sequences together with a brief
 * pause in between, simulating a complete system restart.
 */
export const rebootCommand: Command = {
  name: 'reboot',
  description: 'Display simulated system reboot sequence',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: reboot [options]

Display a simulated system reboot sequence combining
shutdown and boot animations.

Options:
  --fast     Show abbreviated sequences
  --help     Display this help message

Examples:
  reboot          # Show full reboot sequence
  reboot --fast   # Show quick reboot sequence

Note: The full sequence takes about 10 seconds. Scroll or type to stop.`,
      };
    }

    const fast = cmdArgs.hasFlag('fast');
    const rebootHtml = generateRebootHtml(fast);

    const html = `<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${rebootHtml}
</div>`;

    return {
      output: html,
      html: true,
      clearBefore: true,
      scrollBehavior: 'top',
    };
  },
};
