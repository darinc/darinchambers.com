/**
 * Portfolio Command
 *
 * Showcases professional projects and accomplishments. Lists all projects with titles,
 * years, and technology stacks, or displays detailed project information including
 * descriptions, achievements, and technical implementations when a specific project
 * is requested. Supports --tags flag to list available tags or filter projects by
 * one or more tags (comma-separated).
 */
import { MESSAGES, PATHS } from '../../constants';
import { CommandArgs } from '../../utils/CommandArgs';
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
      const cmdArgs = new CommandArgs(args);

      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: portfolio [options] [project-id|number]

Description:
  Showcase projects and accomplishments

Options:
  --tags               List all available tags
  --tags <tag>         Filter projects by tag
  --tags <tag1,tag2>   Filter by multiple tags (shows projects with ANY tag)

Examples:
  portfolio                     # List all projects
  portfolio 1                   # View project #1
  portfolio --tags              # Show available tags
  portfolio --tags major        # Filter by single tag
  portfolio --tags major,patents  # Filter by multiple tags
  portfolio proj-id             # View specific project by ID`,
        };
      }

      const portfolioDir = PATHS.CONTENT_PORTFOLIO;

      try {
        // Get all portfolio files from the filesystem
        const files = fs.list(portfolioDir);
        const portfolioFiles = files.filter((f) => f.endsWith('.md'));

        // Parse command arguments
        const tagsValue = cmdArgs.getFlag('tags');
        const hasTags = cmdArgs.hasFlag('tags');
        const projectId = cmdArgs.getPositional(0);

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

        // Sort projects by order field (ascending), then by title as fallback
        projects.sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return a.title.localeCompare(b.title);
        });

        // Handle empty portfolio
        if (projects.length === 0 && !hasTags && !projectId) {
          const markdown = `# Portfolio

${MESSAGES.EMPTY_PORTFOLIO}`;
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        // Handle --tags flag
        if (hasTags) {
          // If --tags has no value, list all available tags
          if (typeof tagsValue === 'boolean' || !tagsValue) {
            const allTags = new Set<string>();
            const tagCounts = new Map<string, number>();

            projects.forEach((project) => {
              project.tags?.forEach((tag) => {
                allTags.add(tag);
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
              });
            });

            const sortedTags = Array.from(allTags).sort();

            if (sortedTags.length === 0) {
              const markdown = `# Portfolio Tags

${MESSAGES.NO_TAGS_AVAILABLE}`;
              const html = MarkdownService.render(markdown);
              return { output: html, html: true, scrollBehavior: 'top' };
            }

            const tagList = sortedTags
              .map((tag) => {
                const count = tagCounts.get(tag) ?? 0;
                return `- <button data-command="portfolio --tags ${tag}" class="tag-link">${tag}</button> (${count} project${count !== 1 ? 's' : ''})`;
              })
              .join('\n');

            const markdown = `# Portfolio Tags

${tagList}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;

            const html = MarkdownService.render(markdown);
            return { output: html, html: true, scrollBehavior: 'top' };
          }
        }

        // Show specific project
        if (projectId) {
          let project: Project | undefined;

          // Check if projectId is a number (e.g., "1", "2", "3")
          const projectNumber = parseInt(projectId, 10);
          if (!isNaN(projectNumber) && projectNumber > 0 && projectNumber <= projects.length) {
            // Convert display number to array index (1 = index 0)
            const arrayIndex = projectNumber - 1;
            project = projects[arrayIndex];
          } else {
            // Otherwise try to find by ID
            project = projects.find((p) => p.id === projectId);
          }

          if (!project) {
            return {
              output: `Project '${projectId}' not found.\nUse 'portfolio' to list all projects.\nTry 'portfolio --help' for more information`,
              error: true,
            };
          }

          const markdown = ContentFormatter.formatPortfolioDetail(project);
          const html = MarkdownService.render(markdown);
          return { output: html, html: true, scrollBehavior: 'top' };
        }

        // Filter by tags if requested
        let filteredProjects = projects;
        let filterTags: string[] = [];

        if (hasTags && typeof tagsValue === 'string') {
          // Split comma-separated tags and trim whitespace
          filterTags = tagsValue.split(',').map((t) => t.trim().toLowerCase());

          filteredProjects = projects.filter((p) =>
            p.tags?.some((t) => filterTags.includes(t.toLowerCase()))
          );

          if (filteredProjects.length === 0) {
            const tagList = filterTags.map((t) => `'${t}'`).join(', ');

            // Get top 5 most popular tags to suggest
            const tagCounts = new Map<string, number>();
            projects.forEach((project) => {
              project.tags?.forEach((tag) => {
                tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
              });
            });
            const topTags = Array.from(tagCounts.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([tag]) => tag);

            const suggestion =
              topTags.length > 0 ? `\nTry one of these tags: ${topTags.join(', ')}` : '';

            return {
              output: `No projects found with tag${filterTags.length > 1 ? 's' : ''} ${tagList}.${suggestion}\nUse 'portfolio' to see all projects.`,
              error: false,
            };
          }
        }

        // List all projects (or filtered projects)
        const filterLabel = filterTags.length > 0 ? filterTags.join(', ') : undefined;
        const markdown = ContentFormatter.formatPortfolioList(filteredProjects, filterLabel);
        const html = MarkdownService.render(markdown);
        return { output: html, html: true, scrollBehavior: 'top' };
      } catch (error: unknown) {
        return {
          output: `Error loading portfolio: ${String(error)}`,
          error: true,
        };
      }
    },
  };
}
