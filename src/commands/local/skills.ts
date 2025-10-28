import type { Command } from '../Command';
import type { FileSystem } from '../../utils/FileSystem';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';

export function createSkillsCommand(fs: FileSystem): Command {
  return {
    name: 'skills',
    description: 'Interactive display of technical skills',
    execute: (args: string[], stdin?: string) => {
      try {
        const content = fs.readFile('/home/darin/content/skills.md');
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
