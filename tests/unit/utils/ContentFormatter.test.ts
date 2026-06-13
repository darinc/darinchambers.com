import { describe, it, expect } from 'vitest';
import { ContentFormatter } from '../../../src/utils/ContentFormatter';
import type { BlogPost } from '../../../src/types/blog';
import type { Project } from '../../../src/types/portfolio';
import type { Post } from '../../../src/types/post';

describe('ContentFormatter.makeCommandsClickable', () => {
  const commandNames = ['help', 'about', 'ls', 'blog', 'portfolio'];

  it('should wrap matching command names in clickable links', () => {
    const html = '<p>Type <code>help</code> to get started.</p>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(
      '<p>Type <a data-command="help" class="command-link"><code>help</code></a> to get started.</p>'
    );
  });

  it('should leave non-command code tags unchanged', () => {
    const html = '<p>Use <code>someRandomThing</code> here.</p>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(html);
  });

  it('should handle multiple commands in one string', () => {
    const html = '<code>about</code> and <code>blog</code>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toContain('data-command="about"');
    expect(result).toContain('data-command="blog"');
  });

  it('should not affect code inside pre blocks (multi-line content)', () => {
    const html = '<pre><code>function help() {\n  return true;\n}</code></pre>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toBe(html);
  });

  it('should handle empty command names list', () => {
    const html = '<code>help</code>';
    const result = ContentFormatter.makeCommandsClickable(html, []);
    expect(result).toBe(html);
  });

  it('should trim whitespace in code tags before matching', () => {
    const html = '<code> about </code>';
    const result = ContentFormatter.makeCommandsClickable(html, commandNames);
    expect(result).toContain('data-command="about"');
  });
});

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  id: 'proj-1',
  title: 'Project One',
  summary: 'A summary of project one.',
  description: 'Full description of project one.',
  technologies: ['TypeScript', 'Vite'],
  year: '2024',
  order: 1,
  ...overrides,
});

const makeBlogPost = (overrides: Partial<BlogPost> = {}): BlogPost => ({
  id: '2024-01-01-hello',
  title: 'Hello World',
  date: '2024-01-01',
  summary: 'My first post.',
  content: 'Body content here.',
  tags: ['AI', 'TypeScript'],
  ...overrides,
});

const makePost = (overrides: Partial<Post> = {}): Post => ({
  id: 'note-1',
  title: 'A Note',
  date: '2024-02-02',
  content: 'Note body.',
  tags: ['thoughts'],
  ...overrides,
});

describe('ContentFormatter.formatPortfolioList', () => {
  it('should render default header and footer when no filter tag', () => {
    const result = ContentFormatter.formatPortfolioList([makeProject()]);
    expect(result).toContain('# Portfolio');
    expect(result).not.toContain('Tag:');
    expect(result).toContain('**Filter by tag:**');
    expect(result).toContain('portfolio --tags <tag>');
    expect(result).not.toContain('← Back to All Projects');
  });

  it('should render tag-specific header and back footer when filtered', () => {
    const result = ContentFormatter.formatPortfolioList([makeProject()], 'TypeScript');
    expect(result).toContain('# Portfolio - Tag: TypeScript');
    expect(result).toContain('← Back to All Projects');
    expect(result).toContain('data-command="portfolio"');
    expect(result).not.toContain('**Filter by tag:**');
  });

  it('should number projects and link each to its detail route', () => {
    const result = ContentFormatter.formatPortfolioList([
      makeProject({ id: 'a', title: 'Alpha', year: '2023' }),
      makeProject({ id: 'b', title: 'Beta', year: '2024' }),
    ]);
    expect(result).toContain('data-command="portfolio a">1. Alpha (2023)');
    expect(result).toContain('data-command="portfolio b">2. Beta (2024)');
    expect(result).toContain('href="/portfolio/a"');
    expect(result).toContain('---'); // separator between items
  });

  it('should render clickable tag buttons when project has tags', () => {
    const result = ContentFormatter.formatPortfolioList([
      makeProject({ tags: ['cloud', 'infra'] }),
    ]);
    expect(result).toContain('**Tags:**');
    expect(result).toContain(
      '<button data-command="portfolio --tags cloud" class="tag-link">cloud</button>'
    );
    expect(result).toContain(
      '<button data-command="portfolio --tags infra" class="tag-link">infra</button>'
    );
  });

  it('should omit the tags line when project has no tags', () => {
    const result = ContentFormatter.formatPortfolioList([makeProject({ tags: undefined })]);
    expect(result).not.toContain('**Tags:**');
  });

  it('should omit the tags line when project has an empty tags array', () => {
    const result = ContentFormatter.formatPortfolioList([makeProject({ tags: [] })]);
    expect(result).not.toContain('**Tags:**');
  });
});

describe('ContentFormatter.formatPortfolioDetail', () => {
  it('should render title, year, description, and joined technologies', () => {
    const result = ContentFormatter.formatPortfolioDetail(
      makeProject({ title: 'My App', year: '2022', technologies: ['Go', 'gRPC'] })
    );
    expect(result).toContain('# My App');
    expect(result).toContain('**Year:** 2022');
    expect(result).toContain('Full description of project one.');
    expect(result).toContain('**Technologies:** Go, gRPC');
    expect(result).toContain('← Back to Portfolio');
  });

  it('should include impact section when impact is present', () => {
    const result = ContentFormatter.formatPortfolioDetail(
      makeProject({ impact: 'Saved 40% costs' })
    );
    expect(result).toContain('**Impact:** Saved 40% costs');
  });

  it('should omit impact section when impact is absent', () => {
    const result = ContentFormatter.formatPortfolioDetail(makeProject({ impact: undefined }));
    expect(result).not.toContain('**Impact:**');
  });

  it('should render tags section when tags exist, omit when absent', () => {
    const withTags = ContentFormatter.formatPortfolioDetail(makeProject({ tags: ['db'] }));
    expect(withTags).toContain(
      '<button data-command="portfolio --tags db" class="tag-link">db</button>'
    );

    const withoutTags = ContentFormatter.formatPortfolioDetail(makeProject({ tags: undefined }));
    expect(withoutTags).not.toContain('class="tag-link"');
  });
});

describe('ContentFormatter.formatBlogList', () => {
  it('should render default header and filter footer when no filter tag', () => {
    const result = ContentFormatter.formatBlogList([makeBlogPost()]);
    expect(result).toContain('# Blog Posts');
    expect(result).not.toContain('Tag:');
    expect(result).toContain('blog --tags <tag>');
    expect(result).not.toContain('← Back to All Posts');
  });

  it('should render tag header and back footer when filtered', () => {
    const result = ContentFormatter.formatBlogList([makeBlogPost()], 'AI');
    expect(result).toContain('# Blog Posts - Tag: AI');
    expect(result).toContain('← Back to All Posts');
    expect(result).not.toContain('**Filter by tag:**');
  });

  it('should number posts in reverse so the newest (index 0) gets the highest number', () => {
    const result = ContentFormatter.formatBlogList([
      makeBlogPost({ id: 'newest', title: 'Newest' }),
      makeBlogPost({ id: 'oldest', title: 'Oldest' }),
    ]);
    expect(result).toContain('data-command="blog newest">2. Newest');
    expect(result).toContain('data-command="blog oldest">1. Oldest');
  });

  it('should render date, summary, and clickable tags for each post', () => {
    const result = ContentFormatter.formatBlogList([
      makeBlogPost({ date: '2025-05-05', summary: 'Cool stuff', tags: ['rust'] }),
    ]);
    expect(result).toContain('**Date:** 2025-05-05');
    expect(result).toContain('Cool stuff');
    expect(result).toContain(
      '<button data-command="blog --tags rust" class="tag-link">rust</button>'
    );
  });
});

describe('ContentFormatter.formatBlogPost', () => {
  it('should render title, date, content, and tags with back link', () => {
    const result = ContentFormatter.formatBlogPost(
      makeBlogPost({ title: 'Deep Dive', date: '2024-03-03', content: 'The body.', tags: ['go'] })
    );
    expect(result).toContain('# Deep Dive');
    expect(result).toContain('**Date:** 2024-03-03');
    expect(result).toContain('The body.');
    expect(result).toContain('<button data-command="blog --tags go" class="tag-link">go</button>');
    expect(result).toContain('← Back to Blog');
  });
});

describe('ContentFormatter.formatPostList', () => {
  it('should render default header and filter footer when no filter tag', () => {
    const result = ContentFormatter.formatPostList([makePost()]);
    expect(result).toContain('# Notes');
    expect(result).not.toContain('Tag:');
    expect(result).toContain('notes --tags <tag>');
    expect(result).not.toContain('← Back to All Notes');
  });

  it('should render tag header and back footer when filtered', () => {
    const result = ContentFormatter.formatPostList([makePost()], 'thoughts');
    expect(result).toContain('# Notes - Tag: thoughts');
    expect(result).toContain('← Back to All Notes');
    expect(result).not.toContain('**Filter by tag:**');
  });

  it('should reverse-number notes and link to detail routes', () => {
    const result = ContentFormatter.formatPostList([
      makePost({ id: 'first', title: 'First' }),
      makePost({ id: 'second', title: 'Second' }),
    ]);
    expect(result).toContain('data-command="notes first">2. First');
    expect(result).toContain('data-command="notes second">1. Second');
  });

  it('should render posted badges and links when posted links exist', () => {
    const result = ContentFormatter.formatPostList([
      makePost({
        posted: [
          { platform: 'X', url: 'https://x.com/p' },
          { platform: 'Mastodon', url: 'https://m.social/p' },
        ],
      }),
    ]);
    expect(result).toContain(' · X · Mastodon'); // badges joined
    expect(result).toContain('**Posted on:**');
    expect(result).toContain(
      '<a href="https://x.com/p" target="_blank" rel="noopener noreferrer">X →</a>'
    );
    expect(result).toContain(
      '<a href="https://m.social/p" target="_blank" rel="noopener noreferrer">Mastodon →</a>'
    );
  });

  it('should omit posted section when posted is undefined', () => {
    const result = ContentFormatter.formatPostList([makePost({ posted: undefined })]);
    expect(result).not.toContain('**Posted on:**');
  });

  it('should omit posted section when posted is an empty array', () => {
    const result = ContentFormatter.formatPostList([makePost({ posted: [] })]);
    expect(result).not.toContain('**Posted on:**');
  });
});

describe('ContentFormatter.formatPostDetail', () => {
  it('should render single note with content, date, and tags', () => {
    const result = ContentFormatter.formatPostDetail(
      makePost({
        title: 'Lone Note',
        date: '2024-04-04',
        content: 'Just thinking.',
        tags: ['idea'],
      })
    );
    expect(result).toContain('# Lone Note');
    expect(result).toContain('**2024-04-04**');
    expect(result).toContain('Just thinking.');
    expect(result).toContain(
      '<button data-command="notes --tags idea" class="tag-link">idea</button>'
    );
    expect(result).toContain('← Back to Notes');
  });

  it('should include posted badges/links in detail when present', () => {
    const result = ContentFormatter.formatPostDetail(
      makePost({ posted: [{ platform: 'LinkedIn', url: 'https://li.com/p' }] })
    );
    expect(result).toContain(' · LinkedIn');
    expect(result).toContain('**Posted on:**');
    expect(result).toContain('href="https://li.com/p"');
  });

  it('should omit posted section in detail when no posted links', () => {
    const result = ContentFormatter.formatPostDetail(makePost({ posted: undefined }));
    expect(result).not.toContain('**Posted on:**');
  });
});
