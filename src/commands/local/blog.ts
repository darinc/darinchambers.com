/**
 * Blog Command
 *
 * Lists and displays blog posts with support for filtering by tags. Shows post summaries
 * with dates and tags when listing, or renders full post content with markdown formatting
 * when a specific post is requested. Supports --tags flag for filtering posts by category.
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
          output: `Usage: blog [options] [post-id|number]

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
        const tagsValue = cmdArgs.getFlag('tags');
        const hasTags = cmdArgs.hasFlag('tags');
        const postId = cmdArgs.getPositional(0);

        // Parse all blog posts
        const posts: BlogPost[] = [];
        for (const filename of blogFiles) {
          const content = fs.readFile(`${blogDir}/${filename}`);
          const post = BlogParser.parseBlogPost(filename, content);
          posts.push(post);
        }

        // Handle --tags flag
        if (hasTags) {
          // If --tags has no value, list all available tags
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

            const tagList = sortedTags
              .map((tag) => {
                const count = tagCounts.get(tag) ?? 0;
                return `- <button data-command="blog --tags ${tag}" class="tag-link">${tag}</button> (${count} post${count !== 1 ? 's' : ''})`;
              })
              .join('\n');

            const markdown = `# Blog Tags

${tagList}

---

**Usage:** Type \`blog --tags <tag>\` to filter posts`;

            const html = MarkdownService.render(markdown);
            return { output: html, html: true, scrollBehavior: 'top' };
          }
        }

        // Show specific blog post
        if (postId) {
          let post: BlogPost | undefined;

          // Check if postId is a number (e.g., "1", "2", "3")
          const postNumber = parseInt(postId, 10);
          if (!isNaN(postNumber) && postNumber > 0 && postNumber <= posts.length) {
            // Convert display number to array index (newest = highest number = index 0)
            const arrayIndex = posts.length - postNumber;
            post = posts[arrayIndex];
          } else {
            // Otherwise try to find by ID
            post = posts.find((p) => p.id === postId);
          }

          if (!post) {
            return {
              output: `Blog post '${postId}' not found.\nUse 'blog' to list all posts.\nTry 'blog --help' for more information`,
              error: true,
            };
          }

          const markdown = ContentFormatter.formatBlogPost(post);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        // Filter by tag if requested
        let filteredPosts = posts;
        const filterTag = typeof tagsValue === 'string' ? tagsValue : undefined;
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
