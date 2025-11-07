/**
 * About Command
 *
 * Displays professional bio and expertise overview. Renders the about.md file with
 * formatted markdown, showcasing background, experience, and technical capabilities.
 * This is typically the first content visitors see when accessing the portfolio.
 */
import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownService } from '../../utils/MarkdownService';
import { PATHS } from '../../constants';

export function createAboutCommand(fs: IFileSystem): Command {
  return {
    name: 'about',
    description: 'Display bio and expertise overview',
    execute: (_args: string[], _stdin?: string) => {
      try {
        const content = fs.readFile(PATHS.CONTENT_ABOUT);
        const html = MarkdownService.render(content);
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
