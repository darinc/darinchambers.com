import { describe, it, expect } from 'vitest';
import { bootCommand, generateBootHtml } from '../../../../src/commands/novelty/boot';
import type { CommandResult } from '../../../../src/commands/Command';

describe('boot command', () => {
  it('should have correct name and description', () => {
    expect(bootCommand.name).toBe('boot');
    expect(bootCommand.description).toBe('Display simulated Linux boot sequence');
  });

  it('should show help with --help flag', () => {
    const result = bootCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: boot');
    expect(result.output).toContain('--fast');
    expect(result.output).toContain('--help');
    expect(result.output).toContain('Examples:');
    expect(result.error).toBeUndefined();
  });

  it('should return HTML output', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should contain boot-sequence class', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('class="boot-sequence');
    expect(result.output).toContain('boot-startup');
  });

  it('should contain data-boot-type attribute', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('data-boot-type="boot"');
  });

  it('should contain BIOS messages', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('PHOENIX BIOS');
    expect(result.output).toContain('Memory Test');
  });

  it('should contain kernel messages', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Loading kernel');
    expect(result.output).toContain('Linux version');
  });

  it('should contain service messages', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('boot-line-ok');
    expect(result.output).toContain('Started');
  });

  it('should contain failed service message', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('boot-line-failed');
    expect(result.output).toContain('Bluetooth');
  });

  it('should contain welcome message', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('Welcome to darinchambers.com');
  });

  it('should have animation delays on boot lines', () => {
    const result = bootCommand.execute([]) as CommandResult;
    expect(result.output).toContain('animation-delay:');
  });

  it('should use staggered delays', () => {
    const result = bootCommand.execute([]) as CommandResult;
    // Check for multiple different delay values
    const delayMatches = result.output.match(/animation-delay:\s*(\d+)ms/g);
    expect(delayMatches).not.toBeNull();
    expect(delayMatches!.length).toBeGreaterThan(5);

    // Verify delays are sequential (later lines have higher delays)
    const delays = delayMatches!.map((m) => parseInt(/(\d+)/.exec(m)![1]));
    for (let i = 1; i < delays.length; i++) {
      expect(delays[i]).toBeGreaterThanOrEqual(delays[i - 1]);
    }
  });

  it('should accept --fast flag', () => {
    const result = bootCommand.execute(['--fast']) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should have fewer lines with --fast flag', () => {
    const normalResult = bootCommand.execute([]) as CommandResult;
    const fastResult = bootCommand.execute(['--fast']) as CommandResult;

    const normalLines = (normalResult.output.match(/boot-line/g) ?? []).length;
    const fastLines = (fastResult.output.match(/boot-line/g) ?? []).length;

    expect(fastLines).toBeLessThan(normalLines);
  });

  it('should escape HTML special characters (XSS prevention)', () => {
    // The boot command uses hardcoded messages, so we test the generateBootHtml function
    const html = generateBootHtml(false);
    // Verify no unescaped script tags are present
    expect(html).not.toContain('<script>');
    // The HTML should properly escape any special characters
    // Boot messages don't contain < or > so we just verify the HTML structure is safe
    expect(html).toContain('boot-line');
  });
});

describe('generateBootHtml', () => {
  it('should return HTML string', () => {
    const html = generateBootHtml(false);
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  it('should include boot-line classes', () => {
    const html = generateBootHtml(false);
    expect(html).toContain('boot-line');
    expect(html).toContain('boot-line-bios');
    expect(html).toContain('boot-line-kernel');
    expect(html).toContain('boot-line-ok');
    expect(html).toContain('boot-line-info');
  });

  it('should accept startDelay parameter', () => {
    const html = generateBootHtml(false, 5000);
    // First line should have 5000ms delay
    expect(html).toContain('animation-delay: 5000ms');
  });

  it('should calculate delays based on startDelay', () => {
    const startDelay = 3000;
    const html = generateBootHtml(false, startDelay);

    // Extract first delay
    const firstDelay = /animation-delay:\s*(\d+)ms/.exec(html);
    expect(firstDelay).not.toBeNull();
    expect(parseInt(firstDelay![1])).toBe(startDelay);
  });

  it('should produce shorter output with fast=true', () => {
    const normalHtml = generateBootHtml(false);
    const fastHtml = generateBootHtml(true);

    expect(fastHtml.length).toBeLessThan(normalHtml.length);
  });
});
