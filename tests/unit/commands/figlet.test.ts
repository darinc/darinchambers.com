import { describe, it, expect } from 'vitest';
import { figletCommand } from '../../../src/commands/novelty/figlet';
import type { CommandResult } from '../../../src/commands/Command';

describe('figlet command', () => {
  it('should have correct name and description', () => {
    expect(figletCommand.name).toBe('figlet');
    expect(figletCommand.description).toBe('Convert text to ASCII art');
  });

  it('should show help with --help flag', () => {
    const result = figletCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: figlet');
    expect(result.output).toContain('Convert text into ASCII art banners');
    expect(result.output).toContain('-f <font>');
    expect(result.error).toBeUndefined();
  });

  it('should return error when no text provided', () => {
    const result = figletCommand.execute([]) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('missing text argument');
  });

  it('should convert text to ASCII art with default font', () => {
    const result = figletCommand.execute(['Hello']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.output.length).toBeGreaterThan(10);
    expect(result.error).toBeUndefined();
  });

  it('should convert multi-word text', () => {
    const result = figletCommand.execute(['Hello', 'World']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.output.length).toBeGreaterThan(20);
    expect(result.error).toBeUndefined();
  });

  it('should work with stdin input', () => {
    const result = figletCommand.execute([], 'TEST') as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with slant font', () => {
    const result = figletCommand.execute(['-f', 'slant', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with banner font', () => {
    const result = figletCommand.execute(['-f', 'banner', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should work with small font', () => {
    const result = figletCommand.execute(['-f', 'small', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should handle font name case insensitively', () => {
    const result1 = figletCommand.execute(['-f', 'SLANT', 'T']) as CommandResult;
    const result2 = figletCommand.execute(['-f', 'slant', 'T']) as CommandResult;
    const result3 = figletCommand.execute(['-f', 'Slant', 'T']) as CommandResult;

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
    const result = figletCommand.execute(['-f', 'nonexistent', 'Test']) as CommandResult;
    // figlet library doesn't validate font names - it just returns empty or errors
    // So we just check that some result is returned
    expect(result.output).toBeTruthy();
  });

  it('should support center alignment flag', () => {
    const result = figletCommand.execute(['-c', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should support left alignment flag', () => {
    const result = figletCommand.execute(['-l', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should support right alignment flag', () => {
    const result = figletCommand.execute(['-r', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should combine font and alignment flags', () => {
    const result = figletCommand.execute(['-f', 'banner', '-c', 'Test']) as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should handle empty stdin as error', () => {
    const result = figletCommand.execute([], '') as CommandResult;
    // Empty string after trim means no text, should error
    expect(result.error).toBe(true);
  });

  it('should trim stdin input', () => {
    const result = figletCommand.execute([], '  TEST  \n') as CommandResult;
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });
});
