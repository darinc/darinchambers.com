import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';
import { PATHS } from '../../constants';

export function createContactCommand(fs: IFileSystem): Command {
  return {
    name: 'contact',
    description: 'Display contact information',
    execute: (args: string[], stdin?: string) => {
      try {
        const content = fs.readFile(PATHS.CONTENT_CONTACT);
        const html = MarkdownRenderer.render(content);
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
