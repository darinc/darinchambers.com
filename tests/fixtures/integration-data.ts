/**
 * Test fixtures for integration tests.
 * Contains sample data for blog posts, markdown content, and common test scenarios.
 */

/**
 * Sample blog post with frontmatter
 */
export const sampleBlogPost = `---
title: Integration Test Blog Post
date: 2024-01-15
tags: testing, integration, typescript
author: Darin Chambers
---

# Integration Test Blog Post

This is a sample blog post for **integration testing**.

## Features to Test

- Frontmatter parsing
- Markdown rendering
- *Italic* and **bold** text
- Code blocks
- Lists

### Code Example

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

### List Example

1. First item
2. Second item
3. Third item

- Bullet point one
- Bullet point two
- Bullet point three

## Links

Check out [this link](https://example.com) for more information.

## Conclusion

This post demonstrates various markdown features.
`;

/**
 * Simple blog post without frontmatter
 */
export const simpleBlogPost = `# Simple Post

This is a simple post without frontmatter.

It has **bold** text and *italic* text.
`;

/**
 * Blog post with XSS attempt (should be sanitized)
 */
export const maliciousBlogPost = `---
title: XSS Test
date: 2024-01-01
---

# XSS Test

This post attempts XSS: <script>alert('XSS')</script>

And also: <img src="x" onerror="alert('XSS')">

Safe HTML should work: <strong>Bold</strong>
`;

/**
 * Portfolio item with frontmatter
 */
export const samplePortfolioItem = `---
title: Test Project
date: 2024-01-01
technologies: TypeScript, React, Node.js
github: https://github.com/test/project
demo: https://test-project.com
---

# Test Project

A sample portfolio project for **integration testing**.

## Technologies Used

- TypeScript
- React
- Node.js

## Features

- Feature one
- Feature two
- Feature three
`;

/**
 * README file content
 */
export const readmeContent = `# Welcome to Darin's Terminal

This is a terminal-based portfolio website.

## Available Commands

Type \`help\` to see all available commands.

## Quick Start

Try these commands:
- \`about\` - Learn about me
- \`blog\` - Read my blog posts
- \`portfolio\` - View my projects
- \`ls\` - List files
`;

/**
 * Sample configuration file
 */
export const sampleConfigFile = `{
  "theme": "yellow",
  "fontSize": "16px",
  "fontFamily": "monospace"
}`;

/**
 * Sample environment variables
 */
export const sampleEnvVars = `USER=testuser
HOME=/home/testuser
PWD=/home/testuser
SHELL=/bin/bash
EDITOR=vim
`;

/**
 * Sample alias configuration
 */
export const sampleAliases = `alias ll='ls -alh'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'
alias ..='cd ..'
alias ...='cd ../..'
`;

/**
 * Common command sequences for testing
 */
export const commandSequences = {
  navigation: ['cd /home/darin', 'pwd', 'ls', 'cd documents', 'pwd'],
  aliasUsage: ['alias ll="ls -alh"', 'll', 'alias', 'unalias ll', 'll'],
  envVarUsage: ['env USER=testuser', 'echo $USER', 'env', 'echo $PWD'],
  pipelineUsage: ['echo "hello world"', 'echo "test" | cat', 'cat /home/darin/readme.md | render'],
  fileOperations: ['ls', 'cd /home/darin/documents', 'cat readme.md', 'tree', 'pwd'],
  settingsChange: ['settings', 'settings theme yellow', 'settings fontSize 18px', 'settings'],
  blogWorkflow: ['blog', 'cat /home/darin/blog/post1.md', 'blog', 'cd blog'],
  errorHandling: [
    'invalid-command',
    'cd /nonexistent',
    'cat /missing-file.txt',
    'ls /invalid/path',
  ],
};

/**
 * Expected output patterns for validation
 */
export const expectedOutputPatterns = {
  blogPost: {
    title: /Integration Test Blog Post/,
    heading: /<h1[^>]*>Integration Test Blog Post<\/h1>/,
    bold: /<strong>integration testing<\/strong>/,
    italic: /<em>Italic<\/em>/,
    codeBlock: /<pre><code[^>]*>[\s\S]*function greet[\s\S]*<\/code><\/pre>/,
    list: /<li>First item<\/li>/,
  },
  lsOutput: {
    directory: /documents/,
    file: /readme\.md/,
    permissions: /drwxr-xr-x|rwxr-xr-x/,
  },
  pwdOutput: {
    path: /\/home\/darin/,
  },
  aliasOutput: {
    aliasDefinition: /ll='ls -alh'/,
  },
  envOutput: {
    variable: /USER=darin/,
  },
  errorOutput: {
    notFound: /not found|No such file or directory/i,
    invalidCommand: /Command not found|Type 'help' for available commands/i,
  },
};

/**
 * Theme configurations for testing
 */
export const themeConfigs = {
  yellow: {
    preset: 'yellow',
    expectedBg: '#1a1410',
    expectedFg: '#f8e5a0',
    expectedAccent: '#ffc107',
  },
  green: {
    preset: 'green',
    expectedBg: '#0a0f0a',
    expectedFg: '#30ff30',
    expectedAccent: '#00ff00',
  },
  blue: {
    preset: 'blue',
    expectedBg: '#0a0f14',
    expectedFg: '#88c0d0',
    expectedAccent: '#5e81ac',
  },
  purple: {
    preset: 'purple',
    expectedBg: '#130a1a',
    expectedFg: '#e0b0ff',
    expectedAccent: '#a020f0',
  },
};

/**
 * Mock filesystem structure for testing
 */
export const mockFilesystemStructure = {
  '/home/darin': {
    type: 'directory',
    children: ['readme.md', 'documents', 'blog', 'portfolio', '.config'],
  },
  '/home/darin/readme.md': {
    type: 'file',
    content: readmeContent,
  },
  '/home/darin/documents': {
    type: 'directory',
    children: ['notes.txt', 'projects'],
  },
  '/home/darin/documents/notes.txt': {
    type: 'file',
    content: 'Sample notes for testing',
  },
  '/home/darin/blog': {
    type: 'directory',
    children: ['post1.md', 'post2.md'],
  },
  '/home/darin/blog/post1.md': {
    type: 'file',
    content: sampleBlogPost,
  },
  '/home/darin/blog/post2.md': {
    type: 'file',
    content: simpleBlogPost,
  },
  '/home/darin/.config': {
    type: 'directory',
    children: ['settings.json', '.alias', '.env'],
  },
  '/home/darin/.config/settings.json': {
    type: 'file',
    content: sampleConfigFile,
  },
  '/home/darin/.config/.alias': {
    type: 'file',
    content: sampleAliases,
  },
  '/home/darin/.config/.env': {
    type: 'file',
    content: sampleEnvVars,
  },
};

/**
 * Helper to create test data on the fly
 */
export function createTestBlogPost(title: string, date: string, content: string): string {
  return `---
title: ${title}
date: ${date}
tags: test
---

# ${title}

${content}
`;
}

/**
 * Helper to create test markdown content
 */
export function createTestMarkdown(content: string): string {
  return `# Test Document

${content}

## End of Document
`;
}
