import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';

export function createAboutCommand(fs: IFileSystem): Command {
  return {
    name: 'about',
    description: 'Display bio and expertise overview',
    execute: (args: string[], stdin?: string) => {
      try {
        const content = fs.readFile('/home/darin/content/about.md');
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
