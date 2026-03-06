import { describe, it, expect } from 'vitest';
import { rebootCommand } from '../../../../src/commands/novelty/reboot';
import type { CommandResult } from '../../../../src/commands/Command';

describe('reboot command', () => {
  it('should have correct name and description', () => {
    expect(rebootCommand.name).toBe('reboot');
    expect(rebootCommand.description).toBe('Display simulated system reboot sequence');
  });

  it('should show help with --help flag', () => {
    const result = rebootCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: reboot');
    expect(result.output).toContain('--fast');
    expect(result.output).toContain('--help');
    expect(result.output).toContain('Examples:');
    expect(result.error).toBeUndefined();
  });

  it('should return HTML output', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should enable fullscreen mode to hide header/nav', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.fullscreen).toBe(true);
  });

  it('should contain boot-sequence class', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('class="boot-sequence');
    expect(result.output).toContain('reboot-sequence');
  });

  it('should contain data-boot-type attribute', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('data-boot-type="reboot"');
  });

  it('should contain shutdown messages', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Broadcast message');
    expect(result.output).toContain('going down for poweroff');
    expect(result.output).toContain('Stopped');
    expect(result.output).toContain('Unmounted');
  });

  it('should contain Rebooting message', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Rebooting...');
  });

  it('should schedule boot command after delay', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.scheduledCommand).toBeDefined();
    expect(result.scheduledCommand!.command).toBe('boot');
    expect(result.scheduledCommand!.clearBefore).toBe(true);
    expect(result.scheduledCommand!.delayMs).toBeGreaterThan(2000);
  });

  it('should not contain boot-overlay (no "Screen off" overlay)', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).not.toContain('data-boot-overlay');
  });

  it('should have animation delays on lines', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('animation-delay:');
  });

  it('should accept --fast flag', () => {
    const result = rebootCommand.execute(['--fast']) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should schedule boot --fast when reboot uses --fast', () => {
    const result = rebootCommand.execute(['--fast']) as CommandResult;
    expect(result.scheduledCommand!.command).toBe('boot --fast');
  });

  it('should escape HTML special characters (XSS prevention)', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    // Verify no unescaped script tags are present
    expect(result.output).not.toContain('<script>');
  });
});
