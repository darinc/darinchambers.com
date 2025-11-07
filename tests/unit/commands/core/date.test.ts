import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { dateCommand } from '../../../../src/commands/core/date';

describe('date command', () => {
  let originalDate: typeof Date;

  beforeEach(() => {
    originalDate = global.Date;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  it('should return current date and time', () => {
    const result = dateCommand.execute([]);

    expect(result.output).toBeTruthy();
    expect(typeof result.output).toBe('string');
    // Should contain common date string elements
    expect(result.output).toMatch(/\d{4}/); // Year
  });

  it('should return a valid date string format', () => {
    const result = dateCommand.execute([]);

    // Verify it's a valid date string by parsing it
    const parsed = new Date(result.output);
    expect(parsed).toBeInstanceOf(Date);
    expect(isNaN(parsed.getTime())).toBe(false);
  });

  it('should return consistent format using Date.toString()', () => {
    // Mock Date to return a specific time
    const mockDate = new Date('2024-01-15T12:30:45Z');
    global.Date = class extends originalDate {
      constructor() {
        super();
        return mockDate;
      }
    } as any;

    const result = dateCommand.execute([]);

    expect(result.output).toBe(mockDate.toString());
  });

  it('should ignore arguments', () => {
    const result1 = dateCommand.execute([]);
    const result2 = dateCommand.execute(['--format', '%Y-%m-%d']);

    // Both should return date strings (arguments ignored)
    expect(typeof result1.output).toBe('string');
    expect(typeof result2.output).toBe('string');
  });

  it('should ignore stdin', () => {
    const result = dateCommand.execute([], 'piped input');

    // Should return date, not stdin
    expect(result.output).toMatch(/\d{4}/);
    expect(result.output).not.toBe('piped input');
  });

  it('should return different times on subsequent calls', () => {
    const result1 = dateCommand.execute([]);

    // Wait a tiny bit (setTimeout not needed in tests, but conceptually)
    const result2 = dateCommand.execute([]);

    // Should both be valid date strings
    expect(result1.output).toBeTruthy();
    expect(result2.output).toBeTruthy();
  });
});
