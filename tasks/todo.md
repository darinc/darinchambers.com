# Plan: Add "Posts" Feature

## Overview

Add a **posts** command/section that sits alongside `blog` and `portfolio`. Posts are short-form content (think LinkedIn/X posts) — quicker reads, potentially cross-posted from social platforms.

## Key Design Decisions

- **Naming convention**: `YYYY-MM-DD-NN-slug.md` (same as blog, supports multiple posts per day via sequence number)
- **Frontmatter**: Lighter than blog — `title`, `date`, `tags`, `platform` (optional, e.g. "LinkedIn", "X"), `url` (optional, link to original)
- **No `summary` required**: Posts are short enough to show inline in list view
- **List view**: Shows full post content inline (not just title/summary like blog), since posts are short-form
- **Detail view**: Individual post view via `posts <id>` or `posts <number>`
- **Tag filtering**: Same pattern as blog/portfolio (`posts --tags`, `posts --tags <tag>`)

## Files to Create

- [x] `src/content/posts/` — directory for post markdown files
- [x] `src/types/post.ts` — `Post` interface
- [x] `src/utils/PostParser.ts` — frontmatter parser for posts
- [x] `src/commands/local/posts.ts` — posts command (factory function)
- [x] `tests/unit/commands/local/posts.test.ts` — command tests
- [x] `tests/unit/utils/PostParser.test.ts` — parser tests

## Files to Modify

- [x] `src/constants.ts` — add `PATHS.CONTENT_POSTS` and `MESSAGES.EMPTY_POSTS`
- [x] `src/utils/ContentFormatter.ts` — add `formatPostList()` and `formatPostDetail()` methods
- [x] `src/utils/fs/FileSystemInitializer.ts` — add `loadPostFiles()` method and mount at `/home/darin/posts/`
- [x] `src/utils/Router.ts` — add `/posts` and `/posts/:postId` routes
- [x] `src/main.ts` — import, create, register posts command; add to nav and router command map
- [x] `src/content/help.md` — document the `posts` command

## Implementation Details

### 1. Type Definition (`src/types/post.ts`)

```typescript
export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  platform?: string; // "LinkedIn" | "X" | "Mastodon" etc.
  url?: string; // Link to original post
}
```

### 2. Frontmatter Format

```yaml
---
title: 'Quick thought on AI tooling'
date: '2026-03-06'
tags: ['AI', 'Developer-Experience']
platform: 'LinkedIn'
url: 'https://linkedin.com/posts/...'
---
```

### 3. PostParser (`src/utils/PostParser.ts`)

Follow `BlogParser` pattern:

- `parseFrontmatter(content)` — extract YAML frontmatter
- `parsePost(filename, content)` — return `Post` object
- `getIdFromFilename(filename)` — strip date prefix and `.md`

### 4. Command Behavior

| Usage                | Behavior                                                |
| -------------------- | ------------------------------------------------------- |
| `posts`              | List all posts (newest first), show full content inline |
| `posts 1`            | Show post #1                                            |
| `posts <id>`         | Show specific post by slug                              |
| `posts --tags`       | List all tags with counts                               |
| `posts --tags <tag>` | Filter posts by tag                                     |

### 5. ContentFormatter Methods

- `formatPostList()` — render posts with full content visible (short-form), platform badge if present, link to original
- `formatPostDetail()` — single post view with navigation back to list

### 6. List View Rendering Difference from Blog

Since posts are short-form, the list view should show the **full content** of each post (not just a summary). Each post card should include:

- Title (clickable)
- Date + platform badge (if applicable)
- Full rendered content
- Tags as clickable buttons
- "View original" link if `url` is present
- Separator between posts

### 7. Router Routes

```typescript
{ pattern: /^\/posts\/([a-zA-Z0-9-]+)$/, commandBuilder: (m) => `posts ${m[1]}` }
{ pattern: /^\/posts\/?$/, commandBuilder: () => 'posts' }
```

### 8. Navigation & Constants

- Add `{ label: 'posts', command: 'posts' }` to navItems
- Add `posts: '/posts'` to commandMap
- Add `PATHS.CONTENT_POSTS = '/home/darin/posts'`
- Add `MESSAGES.EMPTY_POSTS = 'No posts yet. Check back soon!'`

## Order of Implementation

1. Types & parser (foundation)
2. Constants updates
3. FileSystemInitializer (mount posts directory)
4. ContentFormatter methods
5. Posts command
6. Router routes
7. main.ts registration + navigation
8. help.md update
9. Tests
10. Validate with `pnpm validate`

## Review

All items implemented and validated. 1758+ tests pass, type-check/lint/format clean.
Version bumped to 0.25.0. Committed 2026-03-06.
