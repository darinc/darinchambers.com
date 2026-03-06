/**
 * Posts Command
 *
 * Lists and displays short-form posts with support for filtering by tags.
 * Posts are short-form content (LinkedIn/X style) shown with full content
 * inline in list view. Supports --tags flag for filtering by category.
 */
import { MESSAGES, PATHS } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownService } from '../../utils/MarkdownService';
import { PostParser } from '../../utils/PostParser';
import type { Post } from '../../types/post';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createPostsCommand(fs: IFileSystem): Command {
  return {
    name: 'posts',
    description: 'List and read short-form posts',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: posts [options] [post-id|number]

Description:
  List and read short-form posts

Options:
  --tags               List all available tags
  --tags <tag>         Filter posts by tag

Examples:
  posts                         # List all posts
  posts 1                       # Read post #1
  posts --tags                  # List all tags
  posts --tags AI               # Filter by single-word tag
  posts --tags Web-Development  # Filter by hyphenated tag
  posts post-id                 # Read specific post by ID`,
        };
      }

      const postsDir = PATHS.CONTENT_POSTS;

      try {
        const files = fs.list(postsDir);
        const postFiles = files
          .filter((f) => f.endsWith('.md'))
          .sort()
          .reverse();

        const tagsValue = cmdArgs.getFlag('tags');
        const hasTags = cmdArgs.hasFlag('tags');
        const postId = cmdArgs.getPositional(0);

        const posts: Post[] = [];
        for (const filename of postFiles) {
          const content = fs.readFile(`${postsDir}/${filename}`);
          const post = PostParser.parsePost(filename, content);
          posts.push(post);
        }

        if (posts.length === 0 && !hasTags && !postId) {
          const markdown = `# Posts

${MESSAGES.EMPTY_POSTS}`;
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        if (hasTags) {
          if (typeof tagsValue === 'boolean' || !tagsValue) {
            const allTags = new Set<string>();
            const tagCounts = new Map<string, number>();

            posts.forEach((post) => {
              post.tags?.forEach((tag) => {
                allTags.add(tag);
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
              });
            });

            const sortedTags = Array.from(allTags).sort();

            if (sortedTags.length === 0) {
              const markdown = `# Post Tags

${MESSAGES.NO_TAGS_AVAILABLE}`;
              const html = MarkdownService.render(markdown);
              return { output: html, html: true, scrollBehavior: 'top' };
            }

            const tagList = sortedTags
              .map((tag) => {
                const count = tagCounts.get(tag) ?? 0;
                return `- <button data-command="posts --tags ${tag}" class="tag-link">${tag}</button> (${count} post${count !== 1 ? 's' : ''})`;
              })
              .join('\n');

            const markdown = `# Post Tags

${tagList}

---

**Usage:** Type \`posts --tags <tag>\` to filter posts`;

            const html = MarkdownService.render(markdown);
            return { output: html, html: true, scrollBehavior: 'top' };
          }
        }

        if (postId) {
          let post: Post | undefined;

          const postNumber = parseInt(postId, 10);
          if (!isNaN(postNumber) && postNumber > 0 && postNumber <= posts.length) {
            const arrayIndex = posts.length - postNumber;
            post = posts[arrayIndex];
          } else {
            post = posts.find((p) => p.id === postId);
          }

          if (!post) {
            return {
              output: `Post '${postId}' not found.\nUse 'posts' to list all posts.\nTry 'posts --help' for more information`,
              error: true,
            };
          }

          const markdown = ContentFormatter.formatPostDetail(post);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        let filteredPosts = posts;
        const filterTag = typeof tagsValue === 'string' ? tagsValue : undefined;
        if (filterTag) {
          filteredPosts = posts.filter((p) =>
            p.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
          );

          if (filteredPosts.length === 0) {
            const tagCounts = new Map<string, number>();
            posts.forEach((post) => {
              post.tags?.forEach((tag) => {
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
              });
            });
            const topTags = Array.from(tagCounts.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([tag]) => tag);

            const suggestion =
              topTags.length > 0 ? `\nTry one of these tags: ${topTags.join(', ')}` : '';

            return {
              output: `No posts found with tag '${filterTag}'.${suggestion}\nUse 'posts' to see all posts.`,
              error: false,
            };
          }
        }

        const markdown = ContentFormatter.formatPostList(filteredPosts, filterTag);
        const html = MarkdownService.render(markdown);
        return { output: html, html: true, scrollBehavior: 'top' };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
