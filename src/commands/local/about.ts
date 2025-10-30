import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';
import { PATHS } from '../../constants';

export function createAboutCommand(fs: IFileSystem): Command {
  return {
    name: 'about',
    description: 'Display bio and expertise overview',
    execute: (_args: string[], _stdin?: string) => {
      try {
        const content = fs.readFile(PATHS.CONTENT_ABOUT);
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
