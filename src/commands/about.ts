import type { Command } from './Command';
import { aboutData } from '../data/about';

export const aboutCommand: Command = {
  name: 'about',
  description: 'Display bio and expertise overview',
  execute: () => {
    const output = `
${aboutData.name}
${aboutData.tagline}
${'='.repeat(60)}

${aboutData.bio}

EXPERTISE
${aboutData.expertise.map(item => `  • ${item}`).join('\n')}

EXPERIENCE
${aboutData.experience}

PHILOSOPHY
${aboutData.philosophy}

${'='.repeat(60)}
Type 'portfolio' to see projects, 'skills' for technical skills,
or 'contact' to get in touch.
`;

    return { output: output.trim() };
  }
};
