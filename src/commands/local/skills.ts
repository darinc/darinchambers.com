/**
 * Skills Command
 *
 * Interactive display of technical skills and expertise areas. Renders the skills.md
 * file with organized categories of programming languages, frameworks, tools, and
 * methodologies. Showcases technical depth and breadth across various domains.
 */
import { PATHS } from '../../constants';
import { MarkdownService } from '../../utils/MarkdownService';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

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
          error: true,
        };
      }
    },
  };
}
