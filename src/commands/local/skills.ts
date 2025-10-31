import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownService } from '../../utils/MarkdownService';
import { PATHS } from '../../constants';

export function createSkillsCommand(fs: IFileSystem): Command {
  return {
    name: 'skills',
    description: 'Interactive display of technical skills',
    execute: (_args: string[], _stdin?: string) => {
      try {
        const content = fs.readFile(PATHS.CONTENT_SKILLS);
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
