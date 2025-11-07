/**
 * Contact Command
 *
 * Displays contact information and professional links. Renders the contact.md file
 * with email, social media, GitHub, LinkedIn, and other professional contact methods.
 * Provides visitors with multiple ways to get in touch.
 */
import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownService } from '../../utils/MarkdownService';
import { PATHS } from '../../constants';

export function createContactCommand(fs: IFileSystem): Command {
  return {
    name: 'contact',
    description: 'Display contact information',
    execute: (_args: string[], _stdin?: string) => {
      try {
        const content = fs.readFile(PATHS.CONTENT_CONTACT);
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
