import { describe, it, expect, beforeEach } from 'vitest';
import { siteConfig } from '../../../src/site.config';
import { PromptFormatter, type PromptContext } from '../../../src/utils/PromptFormatter';
import type { EnvVarManager } from '../../../src/utils/EnvVarManager';

const baseContext = (overrides: Partial<PromptContext> = {}): PromptContext => ({
  user: siteConfig.username,
  hostname: siteConfig.domain,
  pwd: `/home/${siteConfig.username}/blog/posts`,
  shortPwd: '~/blog/posts',
  lastDir: 'posts',
  isRoot: false,
  ...overrides,
});

describe('PromptFormatter.format - bash escapes', () => {
  let formatter: PromptFormatter;

  beforeEach(() => {
    formatter = new PromptFormatter();
  });

  it('should expand user, hostname (short), and full hostname', () => {
    const result = formatter.format('\\u@\\h (\\H)', baseContext());
    expect(result).toBe(
      `${siteConfig.username}@${siteConfig.domain.split('.')[0]} (${siteConfig.domain})`
    );
  });

  it('should leave short hostname unchanged when there is no dot', () => {
    const result = formatter.format('\\h', baseContext({ hostname: 'localhost' }));
    expect(result).toBe('localhost');
  });

  it('should expand \\w to short pwd and \\W to last dir', () => {
    const result = formatter.format('\\w | \\W', baseContext());
    expect(result).toBe('~/blog/posts | posts');
  });

  it('should render $ for a non-root prompt', () => {
    const result = formatter.format('\\$', baseContext({ isRoot: false }));
    expect(result).toBe('$');
  });

  it('should render # for a root prompt', () => {
    const result = formatter.format('\\$', baseContext({ isRoot: true }));
    expect(result).toBe('#');
  });

  it('should expand history number when provided', () => {
    const result = formatter.format('[\\!]', baseContext({ historyNumber: 42 }));
    expect(result).toBe('[42]');
  });

  it('should leave history escape literal when historyNumber is undefined', () => {
    const result = formatter.format('[\\!]', baseContext({ historyNumber: undefined }));
    expect(result).toContain('\\!');
    expect(result).not.toContain('[42]');
  });

  it('should expand command number when provided', () => {
    const result = formatter.format('<\\#>', baseContext({ commandNumber: 7 }));
    expect(result).toBe('<7>');
  });

  it('should leave command escape literal when commandNumber is undefined', () => {
    const result = formatter.format('<\\#>', baseContext({ commandNumber: undefined }));
    expect(result).toContain('\\#');
    expect(result).not.toContain('<7>');
  });

  it('should expand both history and command numbers together', () => {
    const result = formatter.format(
      '\\!:\\#',
      baseContext({ historyNumber: 100, commandNumber: 5 })
    );
    expect(result).toBe('100:5');
  });

  it('should expand literal backslash and newline escapes', () => {
    const result = formatter.format('a\\\\b\\nc', baseContext());
    expect(result).toBe('a\\b\nc');
  });

  it('should expand date and time escapes into the documented formats', () => {
    const date = formatter.format('\\d', baseContext());
    expect(date).toMatch(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) [A-Z][a-z]{2} \d{2}$/);

    const time24 = formatter.format('\\t', baseContext());
    expect(time24).toMatch(/^\d{2}:\d{2}:\d{2}$/);

    const timeShort = formatter.format('\\A', baseContext());
    expect(timeShort).toMatch(/^\d{2}:\d{2}$/);

    const time12 = formatter.format('\\T', baseContext());
    expect(time12).toMatch(/^\d{2}:\d{2}:\d{2} (AM|PM)$/);

    const timeAmPm = formatter.format('\\@', baseContext());
    expect(timeAmPm).toMatch(/^\d{2}:\d{2} (AM|PM)$/);
  });
});

describe('PromptFormatter.format - custom tokens', () => {
  const formatter = new PromptFormatter();

  it('should expand all custom tokens', () => {
    const result = formatter.format('{user}@{hostname}:{path} ({lastdir}) [{pwd}]', baseContext());
    expect(result).toBe(
      `${siteConfig.username}@${siteConfig.domain}:~/blog/posts (posts) [/home/${siteConfig.username}/blog/posts]`
    );
  });
});

describe('PromptFormatter.format - env var expansion', () => {
  it('should expand environment variables before escapes when manager is provided', () => {
    // Minimal stub: PromptFormatter only calls expandVariables on the manager.
    const env = {
      expandVariables: (text: string) => text.replace(/\$GREETING/g, 'hi'),
    } as unknown as EnvVarManager;
    const formatter = new PromptFormatter(env);
    const result = formatter.format('$GREETING \\u', baseContext());
    expect(result).toBe(`hi ${siteConfig.username}`);
  });

  it('should skip env expansion when no manager is provided', () => {
    const formatter = new PromptFormatter();
    const result = formatter.format('$GREETING', baseContext());
    // Without a manager the variable is left as-is
    expect(result).toBe('$GREETING');
  });
});

describe('PromptFormatter.getLastDir', () => {
  it('should return / for the root path', () => {
    expect(PromptFormatter.getLastDir('/')).toBe('/');
  });

  it('should return ~ for the home shorthand and empty string', () => {
    expect(PromptFormatter.getLastDir('~')).toBe('~');
    expect(PromptFormatter.getLastDir('')).toBe('~');
  });

  it('should return the last segment of a short path', () => {
    expect(PromptFormatter.getLastDir('~/blog/posts')).toBe('posts');
  });

  it('should return the last segment of an absolute path', () => {
    expect(PromptFormatter.getLastDir(`/home/${siteConfig.username}/projects`)).toBe('projects');
  });

  it('should return ~ when the path only contains the home tilde segment', () => {
    expect(PromptFormatter.getLastDir('~/')).toBe('~');
  });
});
