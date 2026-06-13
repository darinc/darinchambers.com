/**
 * Blog Command
 *
 * Lists and displays blog posts with support for filtering by tags. Shows post summaries
 * with dates and tags when listing, or renders full post content with markdown formatting
 * when a specific post is requested. Supports --tags flag for filtering posts by category.
 *
 * The list/filter/open flow is shared with `notes` via createContentCommand.
 */
import { MESSAGES, PATHS } from '../../constants';
import { BlogParser } from '../../utils/BlogParser';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { createContentCommand } from './createContentCommand';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createBlogCommand(fs: IFileSystem): Command {
  return createContentCommand(fs, {
    name: 'blog',
    description: 'List and read blog posts',
    help: `Usage: blog [options] [post-id|number]

Description:
  List and read blog posts

Options:
  --tags               List all available tags
  --tags <tag>         Filter posts by tag

Examples:
  blog                          # List all posts
  blog 1                        # Read post #1
  blog --tags                   # List all tags
  blog --tags AI                # Filter by single-word tag
  blog --tags Web-Development   # Filter by hyphenated tag
  blog --tags "Web Development" # Filter by quoted multi-word tag
  blog post-id                  # Read specific post by ID`,
    dir: PATHS.CONTENT_BLOG,
    emptyMessage: MESSAGES.EMPTY_BLOG,
    heading: 'Blog',
    tagsHeading: 'Blog Tags',
    countNoun: 'post',
    pluralNoun: 'posts',
    notFoundLabel: 'Blog post',
    filterMissLabel: 'blog posts',
    parse: (filename, content) => BlogParser.parseBlogPost(filename, content),
    formatList: (items, filterTag) => ContentFormatter.formatBlogList(items, filterTag),
    formatDetail: (item) => ContentFormatter.formatBlogPost(item),
  });
}
