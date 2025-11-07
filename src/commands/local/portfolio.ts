/**
 * Portfolio Command
 *
 * Showcases professional projects and accomplishments. Lists all projects with titles,
 * years, and technology stacks, or displays detailed project information including
 * descriptions, achievements, and technical implementations when a specific project
 * is requested. Demonstrates practical application of skills across various domains.
 */
import { PATHS } from '../../constants';
import { ContentFormatter } from '../../utils/ContentFormatter';
import { MarkdownService } from '../../utils/MarkdownService';
import { PortfolioParser } from '../../utils/PortfolioParser';
import type { Project } from '../../types/portfolio';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import type { Command } from '../Command';

export function createPortfolioCommand(fs: IFileSystem): Command {
  return {
    name: 'portfolio',
    description: 'Showcase projects and accomplishments',
    execute: (args: string[], _stdin?: string) => {
      const portfolioDir = PATHS.CONTENT_PORTFOLIO;

      try {
        // Get all portfolio files from the filesystem
        const files = fs.list(portfolioDir);
        const portfolioFiles = files.filter((f) => f.endsWith('.md'));

        // Parse all portfolio projects
        const projects: Project[] = [];
        for (const filename of portfolioFiles) {
          const content = fs.readFile(`${portfolioDir}/${filename}`);
          if (content) {
            try {
              const project = PortfolioParser.parseProject(filename, content);
              projects.push(project);
            } catch (error) {
              console.error(`Error parsing ${filename}:`, error);
            }
          }
        }

        if (args.length > 0) {
          // Show specific project
          const projectId = args[0];
          const project = projects.find((p) => p.id === projectId);

          if (!project) {
            return {
              output: `Project '${projectId}' not found.\nUse 'portfolio' to list all projects.`,
              error: true,
            };
          }

          const markdown = ContentFormatter.formatPortfolioDetail(project);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true };
        }

        // List all projects
        const markdown = ContentFormatter.formatPortfolioList(projects);
        const html = MarkdownService.render(markdown);
        return { output: html, html: true };
      } catch (error) {
        return {
          output: `Error loading portfolio: ${error}`,
          error: true,
        };
      }
    },
  };
}
