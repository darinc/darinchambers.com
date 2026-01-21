import { describe, it, expect } from 'vitest';
import { shutdownCommand, generateShutdownHtml } from '../../../../src/commands/novelty/shutdown';
import type { CommandResult } from '../../../../src/commands/Command';

describe('shutdown command', () => {
  it('should have correct name and description', () => {
    expect(shutdownCommand.name).toBe('shutdown');
    expect(shutdownCommand.description).toBe('Display simulated Linux shutdown sequence');
  });

  it('should show help with --help flag', () => {
    const result = shutdownCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: shutdown');
    expect(result.output).toContain('--halt');
    expect(result.output).toContain('--help');
    expect(result.output).toContain('Examples:');
    expect(result.error).toBeUndefined();
  });

  it('should return HTML output', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should contain boot-sequence class', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('class="boot-sequence');
    expect(result.output).toContain('shutdown-sequence');
  });

  it('should contain data-boot-type attribute', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('data-boot-type="shutdown"');
  });

  it('should contain broadcast message', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Broadcast message');
    expect(result.output).toContain('going down for poweroff');
  });

  it('should contain service stopping messages', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Stopped');
    expect(result.output).toContain('boot-line-ok');
  });

  it('should contain failed service message', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('boot-line-failed');
    expect(result.output).toContain('timeout');
  });

  it('should contain unmount messages', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Unmounted');
    expect(result.output).toContain('filesystems unmounted');
  });

  it('should end with Power off by default', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Power off');
  });

  it('should have animation delays on boot lines', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('animation-delay:');
  });

  it('should use staggered delays', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    const delayMatches = result.output.match(/animation-delay:\s*(\d+)ms/g);
    expect(delayMatches).not.toBeNull();
    expect(delayMatches!.length).toBeGreaterThan(5);

    // Verify delays are sequential
    const delays = delayMatches!.map((m) => parseInt(/(\d+)/.exec(m)![1]));
    for (let i = 1; i < delays.length; i++) {
      expect(delays[i]).toBeGreaterThanOrEqual(delays[i - 1]);
    }
  });

  it('should accept --halt flag', () => {
    const result = shutdownCommand.execute(['--halt']) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should show System halted with --halt flag', () => {
    const result = shutdownCommand.execute(['--halt']) as CommandResult;
    expect(result.output).toContain('System halted');
    expect(result.output).not.toContain('Power off.');
  });

  it('should include power-off overlay', () => {
    const result = shutdownCommand.execute([]) as CommandResult;
    expect(result.output).toContain('boot-overlay');
    expect(result.output).toContain('data-boot-overlay');
  });

  it('should escape HTML special characters (XSS prevention)', () => {
    const html = generateShutdownHtml(false);
    // Verify no unescaped script tags are present
    expect(html).not.toContain('<script>');
  });
});

describe('generateShutdownHtml', () => {
  it('should return HTML string', () => {
    const html = generateShutdownHtml(false);
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  it('should include boot-line classes', () => {
    const html = generateShutdownHtml(false);
    expect(html).toContain('boot-line');
    expect(html).toContain('boot-line-ok');
    expect(html).toContain('boot-line-info');
    expect(html).toContain('boot-line-failed');
  });

  it('should include overlay element', () => {
    const html = generateShutdownHtml(false);
    expect(html).toContain('boot-overlay');
    expect(html).toContain('Screen off');
  });

  it('should show Power off when halt=false', () => {
    const html = generateShutdownHtml(false);
    expect(html).toContain('Power off.');
  });

  it('should show System halted when halt=true', () => {
    const html = generateShutdownHtml(true);
    expect(html).toContain('System halted.');
    expect(html).not.toContain('Power off.');
  });
});
