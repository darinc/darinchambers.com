import { CommandArgs } from '../../utils/CommandArgs';
import { escapeHtml } from '../../utils/markdown/htmlEscape';
import type { Command } from '../Command';

/**
 * Predefined BSOD error codes and descriptions
 */
const ERROR_CODES = [
  {
    code: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED',
    description: 'A system thread generated an exception that was not handled.',
  },
  {
    code: 'DRIVER_IRQL_NOT_LESS_OR_EQUAL',
    description: 'A driver attempted to access a pageable memory at an inappropriate IRQL.',
  },
  {
    code: 'KERNEL_DATA_INPAGE_ERROR',
    description: 'The requested page of kernel data from the paging file could not be read.',
  },
  {
    code: 'PAGE_FAULT_IN_NONPAGED_AREA',
    description: 'Invalid system memory has been referenced.',
  },
  {
    code: 'CRITICAL_PROCESS_DIED',
    description: 'A critical system process died unexpectedly.',
  },
];

/**
 * Generate modern Windows 10/11 style BSOD HTML
 */
function generateModernBsod(errorCode: string, description: string): string {
  return `<div class="bsod-overlay bsod-modern" data-bsod="true" data-bsod-style="modern">
  <div class="bsod-content">
    <div class="bsod-emoticon">:(</div>
    <div class="bsod-message">
      Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
    </div>
    <div class="bsod-progress">
      <span class="bsod-progress-value" data-bsod-progress>0</span>% complete
    </div>
    <div class="bsod-qr-section">
      <div class="bsod-qr"></div>
      <div class="bsod-qr-info">
        <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
        <p class="bsod-technical">If you call a support person, give them this info:</p>
        <p class="bsod-stop-code">Stop code: ${escapeHtml(errorCode)}</p>
        <p class="bsod-description">${escapeHtml(description)}</p>
      </div>
    </div>
  </div>
</div>`;
}

/**
 * Generate classic Windows XP/NT style BSOD HTML
 */
function generateClassicBsod(errorCode: string, description: string): string {
  const memoryAddresses = ['0x0000007E', '0xC0000005', '0xBF8B4C62', '0x00000000', '0xBF8B4C62'];

  return `<div class="bsod-overlay bsod-classic" data-bsod="true" data-bsod-style="classic">
  <div class="bsod-classic-content">
    <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
    <br>
    <p>${escapeHtml(errorCode)}</p>
    <br>
    <p>${escapeHtml(description)}</p>
    <br>
    <p>If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
    <br>
    <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
    <br>
    <p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
    <br>
    <p>Technical information:</p>
    <br>
    <p>*** STOP: ${memoryAddresses[0]} (${memoryAddresses[1]}, ${memoryAddresses[2]}, ${memoryAddresses[3]}, ${memoryAddresses[4]})</p>
    <br>
    <br>
    <p>*** DARINCHAMBERS.SYS - Address ${memoryAddresses[2]} base at BF800000, DateStamp 4802539d</p>
    <br>
    <p>Beginning dump of physical memory</p>
    <p>Physical memory dump complete.</p>
    <p>Contact your system administrator or technical support group for further assistance.</p>
    <br>
    <p class="bsod-classic-cursor" data-bsod-cursor>_</p>
  </div>
</div>`;
}

/**
 * bsod command - Display a fake Windows Blue Screen of Death
 *
 * Shows either a modern Windows 10/11 style BSOD with progress animation
 * or a classic Windows XP/NT style with blinking cursor.
 */
export const bsodCommand: Command = {
  name: 'bsod',
  description: 'Display a fake Windows Blue Screen of Death',
  execute: (args: string[], _stdin?: string) => {
    const cmdArgs = new CommandArgs(args);

    // Check for help flag
    if (cmdArgs.hasFlag('help') || cmdArgs.hasFlag('h')) {
      return {
        output: `Usage: bsod [options]

Display a fake Windows Blue Screen of Death. Supports two styles:
- Modern (default): Windows 10/11 style with animated progress counter
- Classic: Windows XP/NT style with technical text and blinking cursor

Options:
  --classic         Use Windows XP/NT style BSOD
  --reason <text>   Custom error description
  --error <index>   Select specific error code (0-${ERROR_CODES.length - 1})
  --help, -h        Display this help message

Error codes:
${ERROR_CODES.map((e, i) => `  ${i}: ${e.code}`).join('\n')}

Examples:
  bsod                     # Modern style with random error
  bsod --classic           # Classic style with random error
  bsod --error 2           # Use specific error code
  bsod --reason "Custom"   # Custom error description

Note: Click anywhere or press any key to dismiss the BSOD.`,
      };
    }

    // Parse options
    const isClassic = cmdArgs.hasFlag('classic');
    const customReason = cmdArgs.getFlag('reason');
    const errorIndex = cmdArgs.getFlag('error');

    // Select error code
    let selectedError = ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)];

    if (errorIndex !== undefined && errorIndex !== true) {
      const index = parseInt(String(errorIndex), 10);
      if (!isNaN(index) && index >= 0 && index < ERROR_CODES.length) {
        selectedError = ERROR_CODES[index];
      }
    }

    // Use custom reason if provided
    const description = typeof customReason === 'string' ? customReason : selectedError.description;

    // Generate appropriate BSOD HTML
    const html = isClassic
      ? generateClassicBsod(selectedError.code, description)
      : generateModernBsod(selectedError.code, description);

    return {
      output: html,
      html: true,
      clearBefore: true,
      scrollBehavior: 'top',
    };
  },
};
