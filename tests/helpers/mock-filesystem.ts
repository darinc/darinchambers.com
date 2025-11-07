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
                          'test-post.md',
                          {
                            name: 'test-post.md',
                            type: 'file',
                            content: `---
title: Test Post
date: 2024-01-01
summary: A test blog post
tags: test, blog
---

# Test Post

This is test content.`,
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
year: 2024
technologies: TypeScript, React
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
