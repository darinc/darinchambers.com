import { CommandArgs } from '../../utils/CommandArgs';
import type { Command } from '../Command';

/**
 * Boot sequence line configuration
 */
interface BootLine {
  type: 'bios' | 'kernel' | 'ok' | 'failed' | 'info' | 'welcome';
  text: string;
}

/**
 * Generate the full boot sequence messages
 */
function getBootSequence(fast: boolean): BootLine[] {
  const fullSequence: BootLine[] = [
    // BIOS POST
    { type: 'bios', text: 'PHOENIX BIOS v4.0 Release 6.0' },
    { type: 'bios', text: 'Copyright 1985-2025 Phoenix Technologies Ltd.' },
    { type: 'bios', text: 'CPU: JavaScript V8 Engine @ ∞ GHz' },
    { type: 'bios', text: 'Memory Test: 16384 MB OK' },
    { type: 'bios', text: 'Detecting IDE drives...' },
    { type: 'bios', text: '  Primary Master: Virtual SSD 256GB' },
    // Kernel loading
    { type: 'kernel', text: 'Loading kernel...' },
    { type: 'kernel', text: '[    0.000000] Linux version 6.8.0-darin (darin@darinchambers.com)' },
    {
      type: 'kernel',
      text: '[    0.000001] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-darin root=/dev/sda1',
    },
    {
      type: 'kernel',
      text: '[    0.123456] Calibrating delay loop... 7999.99 BogoMIPS (lpj=15999984)',
    },
    { type: 'kernel', text: '[    0.234567] Memory: 16384MB available' },
    { type: 'kernel', text: '[    0.345678] CPU: JavaScript Virtual CPU' },
    { type: 'kernel', text: '[    0.456789] Mounting root filesystem...' },
    // Services starting
    { type: 'ok', text: 'Started System Logging Service' },
    { type: 'ok', text: 'Started Journal Service' },
    { type: 'ok', text: 'Started D-Bus System Message Bus' },
    { type: 'ok', text: 'Reached target Local File Systems' },
    { type: 'ok', text: 'Started Network Manager' },
    { type: 'failed', text: 'Started Bluetooth Service (no adapter found)' },
    { type: 'ok', text: 'Started Login Service' },
    { type: 'ok', text: 'Started OpenSSH Server' },
    { type: 'ok', text: 'Started Docker Container Runtime' },
    { type: 'ok', text: 'Started Code Editor Process' },
    { type: 'ok', text: 'Started Terminal Emulator' },
    { type: 'ok', text: 'Reached target Multi-User System' },
    // Login prompt
    { type: 'info', text: 'darinchambers.com login: darin' },
    { type: 'info', text: 'Password: ********' },
    { type: 'welcome', text: 'Welcome to darinchambers.com!' },
    { type: 'info', text: "Type 'help' for available commands." },
  ];

  if (fast) {
    // Return a shorter sequence for --fast mode
    return [
      { type: 'bios', text: 'PHOENIX BIOS v4.0' },
      { type: 'bios', text: 'Memory Test: 16384 MB OK' },
      { type: 'kernel', text: 'Loading kernel...' },
      { type: 'kernel', text: '[    0.000000] Linux version 6.8.0-darin' },
      { type: 'ok', text: 'Started System Logging Service' },
      { type: 'ok', text: 'Started Network Manager' },
      { type: 'ok', text: 'Started Terminal Emulator' },
      { type: 'ok', text: 'Reached target Multi-User System' },
      { type: 'welcome', text: 'Welcome to darinchambers.com!' },
    ];
  }

  return fullSequence;
}

/**
 * Generate HTML for boot sequence with staggered animation delays
 */
export function generateBootHtml(fast: boolean, startDelay = 0): string {
  const sequence = getBootSequence(fast);
  const baseDelay = fast ? 80 : 120; // ms between lines

  const lines = sequence.map((line, index) => {
    const delay = startDelay + index * baseDelay;
    const cssClass = `boot-line boot-line-${line.type}`;
    // Escape HTML entities in text
    const escapedText = line.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<div class="${cssClass}" style="animation-delay: ${delay}ms;">${escapedText}</div>`;
  });

  return lines.join('\n');
}

/**
 * boot command - Display a simulated Linux boot sequence
 *
 * Shows BIOS POST messages, kernel loading, and services starting
 * with timed animation effects.
 */
export const bootCommand: Command = {
  name: 'boot',
  description: 'Display simulated Linux boot sequence',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help')) {
      return {
        output: `Usage: boot [options]

Display a simulated Linux boot sequence with BIOS POST,
kernel loading, and service startup messages.

Options:
  --fast     Show abbreviated boot sequence
  --help     Display this help message

Examples:
  boot           # Show full boot sequence
  boot --fast    # Show quick boot sequence

Note: Messages appear with timed animation. Scroll or type to stop.`,
      };
    }

    const fast = cmdArgs.hasFlag('fast');
    const bootHtml = generateBootHtml(fast);

    const html = `<div class="boot-sequence boot-startup" data-boot-type="boot">
${bootHtml}
</div>`;

    return {
      output: html,
      html: true,
      clearBefore: true,
      scrollBehavior: 'top',
    };
  },
};
