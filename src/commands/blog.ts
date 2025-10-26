import type { Command } from './Command';
import { blogData } from '../data/blog';

export const blogCommand: Command = {
  name: 'blog',
  description: 'List and read blog posts',
  execute: (args: string[]) => {
    if (args.length > 0) {
      // Show specific blog post
      const postId = args[0];
      const post = blogData.find(p => p.id === postId);

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

    // List all blog posts
    const output = `
BLOG POSTS
${'='.repeat(60)}

${blogData.map((post, index) => `
${index + 1}. ${post.title}
   Date: ${post.date}
   ${post.summary}

   Tags: ${post.tags.join(', ')}
   Read: blog ${post.id}
`).join('\n')}
${'='.repeat(60)}
Type 'blog <post-id>' to read a full post.
`;

    return { output: output.trim() };
  }
};
