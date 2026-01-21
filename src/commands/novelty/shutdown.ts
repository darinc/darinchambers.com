import { CommandArgs } from '../../utils/CommandArgs';
import type { Command } from '../Command';

/**
 * Shutdown sequence line configuration
 */
interface ShutdownLine {
  type: 'ok' | 'failed' | 'info';
  text: string;
}

/**
 * Generate the shutdown sequence messages
 */
function getShutdownSequence(): ShutdownLine[] {
  return [
    { type: 'info', text: 'Broadcast message from root@darinchambers.com:' },
    { type: 'info', text: 'The system is going down for poweroff NOW!' },
    { type: 'ok', text: 'Stopped Session c1 of user darin' },
    { type: 'ok', text: 'Stopped Target - Graphical Interface' },
    { type: 'ok', text: 'Stopped Code Editor Process' },
    { type: 'ok', text: 'Stopped Docker Container Runtime' },
    { type: 'ok', text: 'Stopped OpenSSH Server' },
    { type: 'failed', text: 'Stopped Bluetooth Service (timeout)' },
    { type: 'ok', text: 'Stopped Network Manager' },
    { type: 'ok', text: 'Stopped D-Bus System Message Bus' },
    { type: 'ok', text: 'Stopped Journal Service' },
    { type: 'ok', text: 'Stopped System Logging Service' },
    { type: 'info', text: 'Sending SIGTERM to remaining processes...' },
    { type: 'info', text: 'Sending SIGKILL to remaining processes...' },
    { type: 'ok', text: 'Unmounted /home' },
    { type: 'ok', text: 'Unmounted /var' },
    { type: 'ok', text: 'Unmounted /tmp' },
    { type: 'info', text: 'All filesystems unmounted.' },
    { type: 'ok', text: 'Reached target - Power-Off' },
  ];
}

/**
 * Generate HTML for shutdown sequence with staggered animation delays
 */
export function generateShutdownHtml(halt: boolean): string {
  const sequence = getShutdownSequence();
  const baseDelay = 150; // ms between lines

  const lines = sequence.map((line, index) => {
    const delay = index * baseDelay;
    const cssClass = `boot-line boot-line-${line.type}`;
    // Escape HTML entities in text
    const escapedText = line.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<div class="${cssClass}" style="animation-delay: ${delay}ms;">${escapedText}</div>`;
  });

  // Add the final message and overlay
  const totalDelay = sequence.length * baseDelay;
  const finalMessage = halt ? 'System halted.' : 'Power off.';

  lines.push(
    `<div class="boot-line boot-line-info" style="animation-delay: ${totalDelay}ms;">${finalMessage}</div>`
  );

  // Add powered off overlay that appears after all messages
  const overlayDelay = totalDelay + 500;
  lines.push(
    `<div class="boot-overlay" style="animation-delay: ${overlayDelay}ms;" data-boot-overlay="true"><span class="boot-overlay-text">Screen off</span></div>`
  );

  return lines.join('\n');
}

/**
 * shutdown command - Display a simulated Linux shutdown sequence
 *
 * Shows services stopping, filesystems unmounting, and ends with
 * a "powered off" black screen overlay.
 */
export const shutdownCommand: Command = {
  name: 'shutdown',
  description: 'Display simulated Linux shutdown sequence',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: shutdown [options]

Display a simulated Linux shutdown sequence with services stopping,
filesystems unmounting, and a power-off screen.

Options:
  --halt     Show "System halted" instead of "Power off"
  --help     Display this help message

Examples:
  shutdown          # Show shutdown with power off
  shutdown --halt   # Show shutdown with system halt

Note: The screen goes black after shutdown. Scroll or type to dismiss.`,
      };
    }

    const halt = cmdArgs.hasFlag('halt');
    const shutdownHtml = generateShutdownHtml(halt);

    const html = `<div class="boot-sequence shutdown-sequence" data-boot-type="shutdown">
${shutdownHtml}
</div>`;

    return {
      output: html,
      html: true,
      clearBefore: true,
      scrollBehavior: 'top',
    };
  },
};
