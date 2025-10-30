import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { BlogParser } from '../../utils/BlogParser';
import type { BlogPost } from '../../data/blog';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';
import { PATHS } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';

export function createBlogCommand(fs: IFileSystem): Command {
  return {
    name: 'blog',
    description: 'List and read blog posts',
    execute: (args: string[], _stdin?: string) => {
      const blogDir = PATHS.CONTENT_BLOG;

      try {
        // Get all blog files from the filesystem
        const files = fs.list(blogDir);
        const blogFiles = files.filter(f => f.endsWith('.md')).sort().reverse(); // Newest first

        // Parse command arguments
        const cmdArgs = new CommandArgs(args);
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
          const post = posts.find(p => p.id === postId);

          if (!post) {
            return {
              output: `Blog post '${postId}' not found.\nUse 'blog' to list all posts.`,
              error: true
            };
          }

          const markdown = ContentFormatter.formatBlogPost(post);
          const html = MarkdownRenderer.render(markdown);
          return { output: html, html: true };
        }

        // Filter by tag if requested
        let filteredPosts = posts;
        if (filterTag) {
          filteredPosts = posts.filter(p =>
            p.tags.some(t => t.toLowerCase() === filterTag.toLowerCase())
          );

          if (filteredPosts.length === 0) {
            return {
              output: `No blog posts found with tag '${filterTag}'.\nUse 'blog' to see all posts.`,
              error: false
            };
          }
        }

        // List all blog posts (or filtered posts)
        const markdown = ContentFormatter.formatBlogList(filteredPosts, filterTag);
        const html = MarkdownRenderer.render(markdown);
        return { output: html, html: true };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
