/**
 * Mock Filesystem Helpers for Testing
 *
 * Provides utilities to create mock filesystem structures for testing
 * filesystem-dependent components and commands.
 */

import { FileSystemService, type FileNode } from '../../src/utils/fs/FileSystemService';

/**
 * Creates a basic mock filesystem with common structure
 */
export function createMockFileSystem(): FileSystemService {
  const mockRoot: FileNode = {
    name: '',
    type: 'directory',
    children: new Map([
      [
        'home',
        {
          name: 'home',
          type: 'directory',
          children: new Map([
            [
              'guest',
              {
                name: 'guest',
                type: 'directory',
                children: new Map([
                  [
                    '.alias',
                    {
                      name: '.alias',
                      type: 'file',
                      isHidden: true,
                      content: '',
                    },
                  ],
                ]),
              },
            ],
            [
              'darin',
              {
                name: 'darin',
                type: 'directory',
                children: new Map([
                  [
                    'test.txt',
                    {
                      name: 'test.txt',
                      type: 'file',
                      content: 'Test content',
                    },
                  ],
                  [
                    'readme.md',
                    {
                      name: 'readme.md',
                      type: 'file',
                      content: '# Welcome\n\nWelcome to the terminal!',
                    },
                  ],
                  [
                    'documents',
                    {
                      name: 'documents',
                      type: 'directory',
                      children: new Map([
                        [
                          'readme.md',
                          {
                            name: 'readme.md',
                            type: 'file',
                            content: '# README\n\nTest readme file',
                          },
                        ],
                      ]),
                    },
                  ],
                  [
                    'blog',
                    {
                      name: 'blog',
                      type: 'directory',
                      children: new Map([
                        [
                          '2024-01-01-test-post.md',
                          {
                            name: '2024-01-01-test-post.md',
                            type: 'file',
                            content: `---
title: Test Post
date: 2024-01-01
summary: A test blog post
tags: [test, blog]
---

# Test Post

This is test content.`,
                          },
                        ],
                        [
                          '2024-01-02-my-post-123.md',
                          {
                            name: '2024-01-02-my-post-123.md',
                            type: 'file',
                            content: `---
title: My Post 123
date: 2024-01-02
summary: Another test blog post
tags: [test, example]
---

# My Post 123

This is another test post for integration testing.`,
                          },
                        ],
                      ]),
                    },
                  ],
                  [
                    'portfolio',
                    {
                      name: 'portfolio',
                      type: 'directory',
                      children: new Map([
                        [
                          'test-project.md',
                          {
                            name: 'test-project.md',
                            type: 'file',
                            content: `---
id: test-project
title: Test Project
summary: A test portfolio project
year: 2024
order: 1
technologies: ['TypeScript', 'React']
impact: Test impact
---

# Test Project

Project description.`,
                          },
                        ],
                      ]),
                    },
                  ],
                  [
                    'content',
                    {
                      name: 'content',
                      type: 'directory',
                      children: new Map([
                        [
                          'about.md',
                          {
                            name: 'about.md',
                            type: 'file',
                            content: `# About Me

I'm a software engineer with expertise in web development.

## Skills

- JavaScript/TypeScript
- React
- Node.js`,
                          },
                        ],
                        [
                          'contact.md',
                          {
                            name: 'contact.md',
                            type: 'file',
                            content: `# Contact

Feel free to reach out!

- Email: test@example.com
- GitHub: github.com/test`,
                          },
                        ],
                        [
                          'help.md',
                          {
                            name: 'help.md',
                            type: 'file',
                            content: `# Help

Available commands and usage information.`,
                          },
                        ],
                      ]),
                    },
                  ],
                  [
                    '.config',
                    {
                      name: '.config',
                      type: 'directory',
                      isHidden: true,
                      children: new Map([
                        [
                          'settings.json',
                          {
                            name: 'settings.json',
                            type: 'file',
                            content: JSON.stringify(
                              {
                                theme: { preset: 'green' },
                                fontSize: '16px',
                                fontFamily: 'monospace',
                              },
                              null,
                              2
                            ),
                          },
                        ],
                        [
                          '.alias',
                          {
                            name: '.alias',
                            type: 'file',
                            isHidden: true,
                            content: "alias ll='ls -alh'\n",
                          },
                        ],
                        [
                          '.env',
                          {
                            name: '.env',
                            type: 'file',
                            isHidden: true,
                            content: 'USER=darin\nHOME=/home/darin\nPWD=/home/darin\n',
                          },
                        ],
                        [
                          '.settings',
                          {
                            name: '.settings',
                            type: 'file',
                            isHidden: true,
                            content: JSON.stringify(
                              {
                                theme: { preset: 'dc' },
                                font: { size: 16, family: 'Fira Code' },
                                effects: {
                                  scanLines: false,
                                  glow: false,
                                  border: true,
                                  animationSpeed: 1.0,
                                  soundEffects: false,
                                  autoScrollBehavior: true,
                                },
                                prompt: { format: '\\W \\$ ' },
                              },
                              null,
                              2
                            ),
                          },
                        ],
                      ]),
                    },
                  ],
                ]),
              },
            ],
          ]),
        },
      ],
      [
        'etc',
        {
          name: 'etc',
          type: 'directory',
          children: new Map([
            [
              'config',
              {
                name: 'config',
                type: 'file',
                content: 'config=value',
              },
            ],
          ]),
        },
      ],
    ]),
  };

  return new FileSystemService(mockRoot);
}

/**
 * Creates a minimal mock filesystem (just home directory)
 */
export function createMinimalFileSystem(): FileSystemService {
  const mockRoot: FileNode = {
    name: '',
    type: 'directory',
    children: new Map([
      [
        'home',
        {
          name: 'home',
          type: 'directory',
          children: new Map([
            [
              'darin',
              {
                name: 'darin',
                type: 'directory',
                children: new Map(),
              },
            ],
          ]),
        },
      ],
    ]),
  };

  return new FileSystemService(mockRoot);
}

/**
 * Creates a filesystem with blog content for testing
 */
export function createBlogFileSystem(): FileSystemService {
  const mockRoot: FileNode = {
    name: '',
    type: 'directory',
    children: new Map([
      [
        'home',
        {
          name: 'home',
          type: 'directory',
          children: new Map([
            [
              'darin',
              {
                name: 'darin',
                type: 'directory',
                children: new Map([
                  [
                    'blog',
                    {
                      name: 'blog',
                      type: 'directory',
                      children: new Map([
                        [
                          '2024-01-01-test-post.md',
                          {
                            name: '2024-01-01-test-post.md',
                            type: 'file',
                            content: `---
title: Test Post
date: 2024-01-01
summary: A test blog post
tags: [test, blog]
---

# Test Post

This is test content.`,
                          },
                        ],
                        [
                          '2024-01-02-my-post-123.md',
                          {
                            name: '2024-01-02-my-post-123.md',
                            type: 'file',
                            content: `---
title: My Post 123
date: 2024-01-02
summary: Another test blog post
tags: [test, example]
---

# My Post 123

This is another test post for integration testing.`,
                          },
                        ],
                      ]),
                    },
                  ],
                ]),
              },
            ],
          ]),
        },
      ],
    ]),
  };

  return new FileSystemService(mockRoot);
}

/**
 * Creates a filesystem with portfolio content for testing
 */
export function createPortfolioFileSystem(): FileSystemService {
  const mockRoot: FileNode = {
    name: '',
    type: 'directory',
    children: new Map([
      [
        'home',
        {
          name: 'home',
          type: 'directory',
          children: new Map([
            [
              'darin',
              {
                name: 'darin',
                type: 'directory',
                children: new Map([
                  [
                    'portfolio',
                    {
                      name: 'portfolio',
                      type: 'directory',
                      children: new Map([
                        [
                          'test-project.md',
                          {
                            name: 'test-project.md',
                            type: 'file',
                            content: `---
id: test-project
title: Test Project
summary: A test portfolio project
year: 2024
order: 1
technologies: ['TypeScript', 'React']
impact: Test impact
---

# Test Project

Project description.`,
                          },
                        ],
                      ]),
                    },
                  ],
                ]),
              },
            ],
          ]),
        },
      ],
    ]),
  };

  return new FileSystemService(mockRoot);
}

/**
 * Creates an empty filesystem (only root)
 */
export function createEmptyFileSystem(): FileSystemService {
  const mockRoot: FileNode = {
    name: '',
    type: 'directory',
    children: new Map(),
  };

  return new FileSystemService(mockRoot);
}
