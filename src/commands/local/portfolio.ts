import type { Command } from '../Command';
import { portfolioData } from '../../data/portfolio';

export const portfolioCommand: Command = {
  name: 'portfolio',
  description: 'Showcase projects and accomplishments',
  execute: (args: string[], stdin?: string) => {
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

      const output = `
${project.title} (${project.year})
${'='.repeat(60)}

${project.description}

TECHNOLOGIES
  ${project.technologies.join(', ')}
${project.impact ? `\nIMPACT\n  ${project.impact}` : ''}

${'='.repeat(60)}
Use 'portfolio' to see all projects.
`;
      return { output: output.trim() };
    }

    // List all projects
    const output = `
PORTFOLIO
${'='.repeat(60)}

${portfolioData.map((project, index) => `
${index + 1}. ${project.title} (${project.year})
   ${project.description}

   Technologies: ${project.technologies.join(', ')}
   ${project.impact ? `Impact: ${project.impact}` : ''}

   Details: portfolio ${project.id}
`).join('\n')}
${'='.repeat(60)}
Type 'portfolio <project-id>' to view detailed information.
`;

    return { output: output.trim() };
  }
};
