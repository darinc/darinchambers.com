import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';

export function createRenderCommand(fs: FileSystem): Command {
  return {
    name: 'render',
    description: 'Render markdown file with formatting',
    execute: (args: string[]) => {
      if (args.length === 0) {
        return {
          output: 'Usage: render <file>\nRenders markdown with formatting. Auto-detects and formats YAML frontmatter.\nExample: render ~/blog/2024-09-15-ai-production-lessons.md',
          error: true
        };
      }

      const filePath = args[0];

      try {
        // Check if file exists
        if (!fs.exists(filePath)) {
          return {
            output: `render: ${filePath}: No such file or directory`,
            error: true
          };
        }

        // Check if it's a file (not a directory)
        if (!fs.isFile(filePath)) {
          return {
            output: `render: ${filePath}: Is a directory`,
            error: true
          };
        }

        // Read the file content
        const content = fs.readFile(filePath);

        // Auto-detect if file has YAML frontmatter
        const hasFrontmatter = content.trim().startsWith('---');

        // Render markdown to HTML
        const html = MarkdownRenderer.render(content, hasFrontmatter);

        return {
          output: html,
          html: true
        };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true
        };
      }
    }
  };
}
