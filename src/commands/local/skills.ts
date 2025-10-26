import type { Command } from '../Command';
import { skillsData } from '../../data/skills';

export const skillsCommand: Command = {
  name: 'skills',
  description: 'Interactive display of technical skills',
  execute: () => {
    const output = `
TECHNICAL SKILLS
${'='.repeat(60)}

${skillsData.map(category => `
${category.category.toUpperCase()}
${category.skills.map(skill => `  • ${skill}`).join('\n')}
`).join('\n')}
${'='.repeat(60)}
Type 'about' for background, 'portfolio' for projects.
`;

    return { output: output.trim() };
  }
};
