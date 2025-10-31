import type { Command } from '../Command';
import { portfolioData } from '../../data/portfolio';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownService } from '../../utils/MarkdownService';

export const portfolioCommand: Command = {
  name: 'portfolio',
  description: 'Showcase projects and accomplishments',
  execute: (args: string[], _stdin?: string) => {
    if (args.length > 0) {
      // Show specific project
      const projectId = args[0];
      const project = portfolioData.find(p => p.id === projectId);

      if (!project) {
        return {
          output: `Project '${projectId}' not found.\nUse 'portfolio' to list all projects.`,
          error: true
        };
      }

      const markdown = ContentFormatter.formatPortfolioDetail(project);
      const html = MarkdownService.render(markdown);
      return { output: html, html: true };
    }

    // List all projects
    const markdown = ContentFormatter.formatPortfolioList(portfolioData);
    const html = MarkdownService.render(markdown);
    return { output: html, html: true };
  }
};
