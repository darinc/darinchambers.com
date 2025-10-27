import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';
import { BlogParser } from '../../utils/BlogParser';
import type { BlogPost } from '../../data/blog';

export function createBlogCommand(fs: FileSystem): Command {
  return {
    name: 'blog',
    description: 'List and read blog posts',
    execute: (args: string[], stdin?: string) => {
      const blogDir = '/home/darin/blog';

      try {
        // Get all blog files from the filesystem
        const files = fs.list(blogDir);
        const blogFiles = files.filter(f => f.endsWith('.md')).sort().reverse(); // Newest first

        // Check for tag filtering
        let filterTag: string | null = null;
        let postId: string | null = null;

        if (args.length > 0) {
          if (args[0] === '--tag' && args.length > 1) {
            filterTag = args[1];
          } else {
            postId = args[0];
          }
        }

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

          const output = `
${post.title}
${post.date}
${'='.repeat(60)}

${post.content}

${'='.repeat(60)}
Tags: ${post.tags.join(', ')}

Use 'blog' to see all posts.
`;
          return { output: output.trim() };
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
        const header = filterTag
          ? `BLOG POSTS - Tag: ${filterTag}`
          : 'BLOG POSTS';

        const output = `
${header}
${'='.repeat(60)}

${filteredPosts.map((post, index) => `
${index + 1}. ${post.title}
   Date: ${post.date}
   ${post.summary}

   Tags: ${post.tags.join(', ')}
   Read: blog ${post.id}
`).join('\n')}
${'='.repeat(60)}
Type 'blog <post-id>' to read a full post.
${filterTag ? "Type 'blog' to see all posts." : "Type 'blog --tag <tag>' to filter by tag."}
`;

        return { output: output.trim() };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
