import { describe, it, expect } from 'vitest';
import { lolcatCommand } from '../../../../src/commands/novelty/lolcat';
import type { CommandResult } from '../../../../src/commands/Command';

describe('lolcat command', () => {
  it('should have correct name and description', () => {
    expect(lolcatCommand.name).toBe('lolcat');
    expect(lolcatCommand.description).toBe('Rainbow-colorize text output');
  });

  it('should show help with --help flag', () => {
    const result = lolcatCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: lolcat');
    expect(result.output).toContain('Rainbow-colorize text output');
    expect(result.output).toContain('--spread');
    expect(result.output).toContain('--freq');
    expect(result.output).toContain('Examples:');
    expect(result.error).toBeUndefined();
  });

  it('should colorize text from arguments', () => {
    const result = lolcatCommand.execute(['Hello', 'World']) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.output).toContain('<pre class="lolcat-output">');
    expect(result.output).toContain('</pre>');
    expect(result.output).toContain('<span style="color:');
    expect(result.output).toContain('H'); // Should contain the text
    expect(result.error).toBeUndefined();
  });

  it('should colorize text from stdin (piping)', () => {
    const result = lolcatCommand.execute([], 'Rainbow text') as CommandResult;
    expect(result.html).toBe(true);
    expect(result.output).toContain('<pre class="lolcat-output">');
    expect(result.output).toContain('<span style="color:');
    expect(result.error).toBeUndefined();
  });

  it('should prefer stdin over args when both provided', () => {
    const result = lolcatCommand.execute(['ignored'], 'stdin text') as CommandResult;
    expect(result.html).toBe(true);
    // Characters are wrapped in individual spans, so check for the character 's' from 'stdin'
    // and verify 'ignored' text is not present
    expect(result.output).toContain('>s</span>');
    expect(result.output).toContain('>t</span>');
    expect(result.output).not.toContain('>i</span><span style="color: #ff6b35">g</span>'); // 'ig' from ignored
    expect(result.error).toBeUndefined();
  });

  it('should return error when no input provided', () => {
    const result = lolcatCommand.execute([]) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('missing text input');
    expect(result.output).toContain('lolcat --help');
  });

  it('should validate spread flag - below minimum', () => {
    const result = lolcatCommand.execute(['--spread', '0', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid spread '0'");
    expect(result.output).toContain('Spread must be between 1 and 10');
  });

  it('should validate spread flag - above maximum', () => {
    const result = lolcatCommand.execute(['--spread', '11', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid spread '11'");
    expect(result.output).toContain('Spread must be between 1 and 10');
  });

  it('should validate spread flag - non-numeric', () => {
    const result = lolcatCommand.execute(['--spread', 'fast', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid spread 'fast'");
  });

  it('should accept valid spread values', () => {
    const result = lolcatCommand.execute(['--spread', '5', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
  });

  it('should accept minimum spread value', () => {
    const result = lolcatCommand.execute(['--spread', '1', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
  });

  it('should accept maximum spread value', () => {
    const result = lolcatCommand.execute(['--spread', '10', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
  });

  it('should validate freq flag - below minimum', () => {
    const result = lolcatCommand.execute(['--freq', '0.05', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid freq '0.05'");
    expect(result.output).toContain('Frequency must be between 0.1 and 2.0');
  });

  it('should validate freq flag - above maximum', () => {
    const result = lolcatCommand.execute(['--freq', '2.5', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid freq '2.5'");
    expect(result.output).toContain('Frequency must be between 0.1 and 2.0');
  });

  it('should validate freq flag - non-numeric', () => {
    const result = lolcatCommand.execute(['--freq', 'slow', 'text']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid freq 'slow'");
  });

  it('should accept valid freq values', () => {
    const result = lolcatCommand.execute(['--freq', '1.0', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
  });

  it('should accept minimum freq value', () => {
    const result = lolcatCommand.execute(['--freq', '0.1', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
  });

  it('should accept maximum freq value', () => {
    const result = lolcatCommand.execute(['--freq', '2.0', 'test']) as CommandResult;
    expect(result.error).toBeUndefined();
  });

  it('should wrap output in pre tag', () => {
    const result = lolcatCommand.execute(['test']) as CommandResult;
    expect(result.output).toMatch(/^<pre class="lolcat-output">.*<\/pre>$/s);
  });

  it('should escape HTML special characters (XSS prevention)', () => {
    const result = lolcatCommand.execute(['<script>alert("xss")</script>']) as CommandResult;
    // Verify dangerous script tags are escaped (not present as actual HTML)
    expect(result.output).not.toContain('<script>');
    expect(result.output).not.toContain('</script>');
    // Verify HTML entities are present (each character is in its own span)
    expect(result.output).toContain('&lt;');
    expect(result.output).toContain('&gt;');
    expect(result.output).toContain('&quot;');
    expect(result.error).toBeUndefined();
  });

  it('should preserve whitespace - spaces not colored', () => {
    const result = lolcatCommand.execute(['a b']) as CommandResult;
    // Spaces should not have color spans
    expect(result.output).toContain('a</span> <span');
    expect(result.error).toBeUndefined();
  });

  it('should handle multiline text', () => {
    const result = lolcatCommand.execute([], 'line1\nline2\nline3') as CommandResult;
    expect(result.output).toContain('\n');
    expect(result.html).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should apply different colors to characters', () => {
    const result = lolcatCommand.execute(['ABCDEFGHIJ']) as CommandResult;
    // Extract all colors from the output
    const colorMatches = result.output.match(/color: (#[a-f0-9]+)/gi);
    expect(colorMatches).not.toBeNull();
    // Should have multiple different colors
    const uniqueColors = new Set(colorMatches);
    expect(uniqueColors.size).toBeGreaterThan(1);
  });

  it('should combine spread and freq flags', () => {
    const result = lolcatCommand.execute([
      '--spread',
      '2',
      '--freq',
      '1.5',
      'test',
    ]) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
    expect(result.output).toContain('<span style="color:');
  });

  it('should handle empty stdin as error', () => {
    // Empty string is falsy, so it falls through to check positional args
    // With no args, it should return an error
    const result = lolcatCommand.execute([], '') as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('missing text input');
  });

  it('should handle tabs as whitespace', () => {
    const result = lolcatCommand.execute(['a\tb']) as CommandResult;
    // Tabs should be preserved without color spans
    expect(result.output).toContain('\t');
    expect(result.error).toBeUndefined();
  });

  it('should produce consistent output for same input', () => {
    const result1 = lolcatCommand.execute(['test']) as CommandResult;
    const result2 = lolcatCommand.execute(['test']) as CommandResult;
    expect(result1.output).toBe(result2.output);
  });
});
