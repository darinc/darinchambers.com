/**
 * Render Command
 *
 * Renders markdown files with full formatting and styling. Converts markdown syntax
 * into formatted HTML output, supporting headers, code blocks, lists, and inline
 * formatting. Can read from files or stdin for use in pipelines.
 */
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createRenderCommand(fs: IFileSystem): Command {
  return {
    name: 'render',
    description: 'Render markdown file with formatting',
    execute: (args: string[], stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`,
        };
      }

      let content: string;

      // Check if we have piped input
      if (stdin) {
        content = stdin;
      }
      // Otherwise read from file argument
      else if (args.length > 0) {
        const filePath = args[0];

        try {
          // Check if file exists
          if (!fs.exists(filePath)) {
            return {
              output: `render: ${filePath}: No such file or directory`,
              error: true,
            };
          }

          // Check if it's a file (not a directory)
          if (!fs.isFile(filePath)) {
            return {
              output: `render: ${filePath}: Is a directory`,
              error: true,
            };
          }

          // Read the file content
          content = fs.readFile(filePath);
        } catch (error) {
          return {
            output: error instanceof Error ? error.message : String(error),
            error: true,
          };
        }
      }
      // No input provided
      else {
        return {
          output: "render: missing file operand\nTry 'render --help' for more information",
          error: true,
        };
      }

      // Auto-detect if content has YAML frontmatter
      const hasFrontmatter = content.trim().startsWith('---');

      // Render markdown to HTML
      const html = MarkdownService.render(content, hasFrontmatter);

      return {
        output: html,
        html: true,
      };
    },
  };
}
