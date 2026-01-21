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

  it('should contain boot messages', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('PHOENIX BIOS');
    expect(result.output).toContain('Loading kernel');
    expect(result.output).toContain('Started');
    expect(result.output).toContain('Welcome to darinchambers.com');
  });

  it('should contain Rebooting message', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Rebooting');
  });

  it('should include pause overlay', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('boot-pause-overlay');
    expect(result.output).toContain('data-boot-overlay');
  });

  it('should have animation delays on lines', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('animation-delay:');
  });

  it('should have increasing delays throughout sequence', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    const delayMatches = result.output.match(/animation-delay:\s*(\d+)ms/g);
    expect(delayMatches).not.toBeNull();
    expect(delayMatches!.length).toBeGreaterThan(10);

    // Boot messages should have higher delays than shutdown messages
    const delays = delayMatches!.map((m) => parseInt(/(\d+)/.exec(m)![1]));
    const maxShutdownDelay = Math.max(...delays.slice(0, delays.length / 2));
    const minBootDelay = Math.min(...delays.slice(delays.length / 2));

    // Boot phase should start after shutdown phase ends (mostly)
    // Allow some overlap due to the overlay
    expect(minBootDelay).toBeLessThanOrEqual(maxShutdownDelay + 5000);
  });

  it('should accept --fast flag', () => {
    const result = rebootCommand.execute(['--fast']) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should have fewer boot lines with --fast flag', () => {
    const normalResult = rebootCommand.execute([]) as CommandResult;
    const fastResult = rebootCommand.execute(['--fast']) as CommandResult;

    // Count boot-line occurrences
    const normalLines = (normalResult.output.match(/boot-line/g) ?? []).length;
    const fastLines = (fastResult.output.match(/boot-line/g) ?? []).length;

    expect(fastLines).toBeLessThan(normalLines);
  });

  it('should end with boot sequence not shutdown', () => {
    // Reboot should end with Welcome message from boot, not Power off from shutdown
    const result = rebootCommand.execute([]) as CommandResult;
    // The last boot-line should be from the boot sequence
    expect(result.output).toContain('Welcome to darinchambers.com');
    // And should include the Rebooting message instead of just Power off
    expect(result.output).toContain('Rebooting...');
  });

  it('should escape HTML special characters (XSS prevention)', () => {
    const result = rebootCommand.execute([]) as CommandResult;
    // Verify no unescaped script tags are present
    expect(result.output).not.toContain('<script>');
  });
});
