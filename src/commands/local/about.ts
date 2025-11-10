/**
 * About Command
 *
 * Displays professional bio and expertise overview. Renders the about.md file with
 * formatted markdown, showcasing background, experience, and technical capabilities.
 * This is typically the first content visitors see when accessing the portfolio.
 */
import { PATHS } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createAboutCommand(fs: IFileSystem): Command {
  return {
    name: 'about',
    description: 'Display bio and expertise overview',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`,
        };
      }

      try {
        const content = fs.readFile(PATHS.CONTENT_ABOUT);
        const html = MarkdownService.render(content);
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
