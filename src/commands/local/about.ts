import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';

export function createAboutCommand(fs: FileSystem): Command {
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
