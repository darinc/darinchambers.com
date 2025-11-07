/**
 * Blog Command
 *
 * Lists and displays blog posts with support for filtering by tags. Shows post summaries
 * with dates and tags when listing, or renders full post content with markdown formatting
 * when a specific post is requested. Supports --tag flag for filtering posts by category.
 */
import { PATHS } from '../../constants';
import { BlogParser } from '../../utils/BlogParser';
import { CommandArgs } from '../../utils/CommandArgs';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownService } from '../../utils/MarkdownService';
import type { BlogPost } from '../../types/blog';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createBlogCommand(fs: IFileSystem): Command {
  return {
    name: 'blog',
    description: 'List and read blog posts',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: blog [options] [post-id]

Description:
  List and read blog posts

Options:
  --tag <tag>          Filter posts by tag

Examples:
  blog                 # List all posts
  blog --tag ai        # Filter by tag
  blog post-id         # Read specific post`,
        };
      }

      const blogDir = PATHS.CONTENT_BLOG;

      try {
        // Get all blog files from the filesystem
        const files = fs.list(blogDir);
        const blogFiles = files
          .filter((f) => f.endsWith('.md'))
          .sort()
          .reverse(); // Newest first

        // Parse command arguments
        const filterTag = cmdArgs.getFlag('tag') as string | undefined;
        const postId = cmdArgs.getPositional(0);

        // Parse all blog posts
        const posts: BlogPost[] = [];
        for (const filename of blogFiles) {
          const content = fs.readFile(`${blogDir}/${filename}`);
          const post = BlogParser.parseBlogPost(filename, content);
          posts.push(post);
        }

        // Show specific blog post
        if (postId) {
          const post = posts.find((p) => p.id === postId);

          if (!post) {
            return {
              output: `Blog post '${postId}' not found.\nUse 'blog' to list all posts.\nTry 'blog --help' for more information`,
              error: true,
            };
          }

          const markdown = ContentFormatter.formatBlogPost(post);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true };
        }

        // Filter by tag if requested
        let filteredPosts = posts;
        if (filterTag) {
          filteredPosts = posts.filter((p) =>
            p.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
          );

          if (filteredPosts.length === 0) {
            return {
              output: `No blog posts found with tag '${filterTag}'.\nUse 'blog' to see all posts.`,
              error: false,
            };
          }
        }

        // List all blog posts (or filtered posts)
        const markdown = ContentFormatter.formatBlogList(filteredPosts, filterTag);
        const html = MarkdownService.render(markdown);
        return { output: html, html: true };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
