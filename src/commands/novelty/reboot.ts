import { CommandArgs } from '../../utils/CommandArgs';
import { generateShutdownHtml } from './shutdown';
import type { Command } from '../Command';

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

    // Generate shutdown sequence without the overlay (we don't need the "Screen off" overlay)
    const shutdownLines = generateShutdownHtml(false);
    const shutdownWithoutOverlay = shutdownLines
      .split('\n')
      .filter((line) => !line.includes('data-boot-overlay'))
      .join('\n');

    // Calculate when shutdown finishes to schedule the boot
    const shutdownLineCount = 20; // lines in shutdown sequence + "Power off."
    const shutdownDelay = 150; // ms per line
    const shutdownDuration = shutdownLineCount * shutdownDelay;
    const rebootingLineDelay = shutdownDuration; // "Rebooting..." appears after shutdown
    const bootDelay = rebootingLineDelay + 4000; // 4 second pause after "Rebooting..."

    const html = `<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${shutdownWithoutOverlay}
<div class="boot-line boot-line-info" style="animation-delay: ${rebootingLineDelay}ms;">Rebooting...</div>
</div>`;

    return {
      output: html,
      html: true,
      clearBefore: true,
      fullscreen: true,
      scrollBehavior: 'top',
      scheduledCommand: {
        command: fast ? 'boot --fast' : 'boot',
        delayMs: bootDelay,
        clearBefore: true,
      },
    };
  },
};
