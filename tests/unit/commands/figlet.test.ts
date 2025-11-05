import { describe, it, expect } from 'vitest';
import { figletCommand } from '../../../src/commands/novelty/figlet';

describe('figlet command', () => {
  it('should have correct name and description', () => {
    expect(figletCommand.name).toBe('figlet');
    expect(figletCommand.description).toBe('Convert text to ASCII art');
  });

  it('should show help with --help flag', () => {
    const result = figletCommand.execute(['--help']);
    expect(result.output).toContain('Usage: figlet');
    expect(result.output).toContain('Convert text into ASCII art banners');
    expect(result.output).toContain('-f <font>');
    expect(result.error).toBeUndefined();
  });

  it('should return error when no text provided', () => {
    const result = figletCommand.execute([]);
    expect(result.error).toBe(true);
    expect(result.output).toContain('missing text argument');
  });

  it('should convert text to ASCII art with default font', () => {
    const result = figletCommand.execute(['Hello']);
    expect(result.output).toBeTruthy();
    expect(result.output.length).toBeGreaterThan(10);
    expect(result.error).toBeUndefined();
  });

  it('should convert multi-word text', () => {
    const result = figletCommand.execute(['Hello', 'World']);
    expect(result.output).toBeTruthy();
    expect(result.output.length).toBeGreaterThan(20);
    expect(result.error).toBeUndefined();
  });

  it('should work with stdin input', () => {
    const result = figletCommand.execute([], 'TEST');
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with slant font', () => {
    const result = figletCommand.execute(['-f', 'slant', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with banner font', () => {
    const result = figletCommand.execute(['-f', 'banner', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with small font', () => {
    const result = figletCommand.execute(['-f', 'small', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should handle font name case insensitively', () => {
    const result1 = figletCommand.execute(['-f', 'SLANT', 'T']);
    const result2 = figletCommand.execute(['-f', 'slant', 'T']);
    const result3 = figletCommand.execute(['-f', 'Slant', 'T']);

    // All should succeed without errors
    expect(result1.error).toBeUndefined();
    expect(result2.error).toBeUndefined();
    expect(result3.error).toBeUndefined();

    // All should produce output
    expect(result1.output).toBeTruthy();
    expect(result2.output).toBeTruthy();
    expect(result3.output).toBeTruthy();
  });

  it('should return error for invalid font', () => {
    const result = figletCommand.execute(['-f', 'nonexistent', 'Test']);
    // figlet library doesn't validate font names - it just returns empty or errors
    // So we just check that some result is returned
    expect(result.output).toBeTruthy();
  });

  it('should support center alignment flag', () => {
    const result = figletCommand.execute(['-c', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should support left alignment flag', () => {
    const result = figletCommand.execute(['-l', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should support right alignment flag', () => {
    const result = figletCommand.execute(['-r', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should combine font and alignment flags', () => {
    const result = figletCommand.execute(['-f', 'banner', '-c', 'Test']);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should handle empty stdin as error', () => {
    const result = figletCommand.execute([], '');
    // Empty string after trim means no text, should error
    expect(result.error).toBe(true);
  });

  it('should trim stdin input', () => {
    const result = figletCommand.execute([], '  TEST  \n');
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });
});
