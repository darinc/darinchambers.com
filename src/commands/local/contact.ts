/**
 * Contact Command
 *
 * Displays contact information and professional links. Renders the contact.md file
 * with email, social media, GitHub, LinkedIn, and other professional contact methods.
 * Provides visitors with multiple ways to get in touch.
 */
import { PATHS } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';
import { MarkdownService } from '../../utils/MarkdownService';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createContactCommand(fs: IFileSystem): Command {
  return {
    name: 'contact',
    description: 'Display contact information',
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`,
        };
      }

      try {
        const content = fs.readFile(PATHS.CONTENT_CONTACT);
        const html = MarkdownService.render(content);
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
