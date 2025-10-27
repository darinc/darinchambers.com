import type { Command } from '../Command';
import { contactData } from '../../data/contact';

export const contactCommand: Command = {
  name: 'contact',
  description: 'Display contact information',
  execute: (args: string[], stdin?: string) => {
    const output = `
CONTACT INFORMATION
${'='.repeat(60)}

Email:     ${contactData.email}
LinkedIn:  ${contactData.linkedin}
GitHub:    ${contactData.github}
Twitter:   ${contactData.twitter}

Location:  ${contactData.location}

${'='.repeat(60)}

${contactData.preferredContact}

${contactData.availability}
`;

    return { output: output.trim() };
  }
};
