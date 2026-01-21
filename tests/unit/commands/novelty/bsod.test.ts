import { describe, it, expect } from 'vitest';
import { bsodCommand } from '../../../../src/commands/novelty/bsod';
import type { CommandResult } from '../../../../src/commands/Command';

describe('bsod command', () => {
  it('should have correct name and description', () => {
    expect(bsodCommand.name).toBe('bsod');
    expect(bsodCommand.description).toBe('Display a fake Windows Blue Screen of Death');
  });

  it('should show help with --help flag', () => {
    const result = bsodCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: bsod');
    expect(result.output).toContain('--classic');
    expect(result.output).toContain('--reason');
    expect(result.output).toContain('--error');
    expect(result.output).toContain('Examples:');
    expect(result.error).toBeUndefined();
  });

  it('should show help with -h flag', () => {
    const result = bsodCommand.execute(['-h']) as CommandResult;
    expect(result.output).toContain('Usage: bsod');
    expect(result.error).toBeUndefined();
  });

  it('should return HTML output', () => {
    const result = bsodCommand.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  describe('modern style (default)', () => {
    it('should contain bsod-overlay class', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('class="bsod-overlay');
      expect(result.output).toContain('bsod-modern');
    });

    it('should contain data-bsod attribute', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('data-bsod="true"');
      expect(result.output).toContain('data-bsod-style="modern"');
    });

    it('should contain sad face emoticon', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain(':(');
    });

    it('should contain error message', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('Your PC ran into a problem');
      expect(result.output).toContain('restart');
    });

    it('should contain progress counter element', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('data-bsod-progress');
      expect(result.output).toContain('% complete');
    });

    it('should contain QR code section', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('bsod-qr');
      expect(result.output).toContain('windows.com/stopcode');
    });

    it('should contain stop code', () => {
      const result = bsodCommand.execute([]) as CommandResult;
      expect(result.output).toContain('Stop code:');
    });
  });

  describe('classic style', () => {
    it('should contain bsod-classic class with --classic flag', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toContain('bsod-classic');
      expect(result.output).toContain('data-bsod-style="classic"');
    });

    it('should not contain modern elements', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).not.toContain('bsod-emoticon');
      expect(result.output).not.toContain('bsod-qr');
    });

    it('should contain classic Windows error text', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toContain('A problem has been detected');
      expect(result.output).toContain('Windows has been shut down');
    });

    it('should contain technical information', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toContain('Technical information:');
      expect(result.output).toContain('*** STOP:');
      expect(result.output).toContain('DARINCHAMBERS.SYS');
    });

    it('should contain troubleshooting text', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toContain('If this is the first time');
      expect(result.output).toContain('restart your computer');
      expect(result.output).toContain('Safe Mode');
    });

    it('should contain blinking cursor element', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toContain('data-bsod-cursor');
    });

    it('should contain memory addresses', () => {
      const result = bsodCommand.execute(['--classic']) as CommandResult;
      expect(result.output).toMatch(/0x[0-9A-F]+/);
    });
  });

  describe('--reason flag', () => {
    it('should use custom reason text', () => {
      const result = bsodCommand.execute(['--reason', 'Custom error message']) as CommandResult;
      expect(result.output).toContain('Custom error message');
    });

    it('should escape HTML in custom reason (XSS prevention)', () => {
      const result = bsodCommand.execute([
        '--reason',
        '<script>alert("xss")</script>',
      ]) as CommandResult;
      expect(result.output).not.toContain('<script>');
      expect(result.output).toContain('&lt;script&gt;');
    });

    it('should work with classic style', () => {
      const result = bsodCommand.execute(['--classic', '--reason', 'Test error']) as CommandResult;
      expect(result.output).toContain('Test error');
      expect(result.output).toContain('bsod-classic');
    });
  });

  describe('--error flag', () => {
    it('should accept error index 0', () => {
      const result = bsodCommand.execute(['--error', '0']) as CommandResult;
      expect(result.output).toContain('SYSTEM_THREAD_EXCEPTION_NOT_HANDLED');
    });

    it('should accept error index 1', () => {
      const result = bsodCommand.execute(['--error', '1']) as CommandResult;
      expect(result.output).toContain('DRIVER_IRQL_NOT_LESS_OR_EQUAL');
    });

    it('should accept error index 2', () => {
      const result = bsodCommand.execute(['--error', '2']) as CommandResult;
      expect(result.output).toContain('KERNEL_DATA_INPAGE_ERROR');
    });

    it('should accept error index 3', () => {
      const result = bsodCommand.execute(['--error', '3']) as CommandResult;
      expect(result.output).toContain('PAGE_FAULT_IN_NONPAGED_AREA');
    });

    it('should accept error index 4', () => {
      const result = bsodCommand.execute(['--error', '4']) as CommandResult;
      expect(result.output).toContain('CRITICAL_PROCESS_DIED');
    });

    it('should use random error for invalid index', () => {
      const result = bsodCommand.execute(['--error', '999']) as CommandResult;
      // Should still return valid HTML
      expect(result.html).toBe(true);
      expect(result.output).toContain('data-bsod="true"');
    });

    it('should use random error for negative index', () => {
      const result = bsodCommand.execute(['--error', '-1']) as CommandResult;
      expect(result.html).toBe(true);
      expect(result.output).toContain('data-bsod="true"');
    });
  });

  describe('combined flags', () => {
    it('should combine --classic and --error', () => {
      const result = bsodCommand.execute(['--classic', '--error', '2']) as CommandResult;
      expect(result.output).toContain('bsod-classic');
      expect(result.output).toContain('KERNEL_DATA_INPAGE_ERROR');
    });

    it('should override error description with --reason', () => {
      const result = bsodCommand.execute([
        '--error',
        '0',
        '--reason',
        'Override reason',
      ]) as CommandResult;
      expect(result.output).toContain('SYSTEM_THREAD_EXCEPTION_NOT_HANDLED');
      expect(result.output).toContain('Override reason');
    });

    it('should combine all flags', () => {
      const result = bsodCommand.execute([
        '--classic',
        '--error',
        '1',
        '--reason',
        'All flags test',
      ]) as CommandResult;
      expect(result.output).toContain('bsod-classic');
      expect(result.output).toContain('DRIVER_IRQL_NOT_LESS_OR_EQUAL');
      expect(result.output).toContain('All flags test');
    });
  });

  describe('error codes listing', () => {
    it('should list all error codes in help', () => {
      const result = bsodCommand.execute(['--help']) as CommandResult;
      expect(result.output).toContain('0: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED');
      expect(result.output).toContain('1: DRIVER_IRQL_NOT_LESS_OR_EQUAL');
      expect(result.output).toContain('2: KERNEL_DATA_INPAGE_ERROR');
      expect(result.output).toContain('3: PAGE_FAULT_IN_NONPAGED_AREA');
      expect(result.output).toContain('4: CRITICAL_PROCESS_DIED');
    });
  });
});
