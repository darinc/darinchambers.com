# Contributing to Terminal Portfolio

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to this project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Style](#code-style)
5. [Testing Requirements](#testing-requirements)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Project Structure](#project-structure)
9. [Adding Features](#adding-features)

---

## Code of Conduct

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be collaborative**: Work together constructively
- **Be inclusive**: Welcome diverse perspectives
- **Be patient**: Help others learn and grow
- **Focus on what is best**: Prioritize the project and community

### Unacceptable Behavior

- Harassment, discrimination, or trolling
- Personal attacks or insults
- Publishing others' private information
- Other conduct deemed inappropriate

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git
- A code editor (VS Code recommended)

### Initial Setup

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/darinchambers.com.git
cd dc.com

# Add upstream remote
git remote add upstream https://github.com/darinc/darinchambers.com.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test
```

### Verify Setup

```bash
# Check that tests pass
pnpm test:run

# Check that build succeeds
pnpm build

# Preview production build
pnpm preview
```

---

## Development Workflow

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write code following the [Code Style](#code-style) guidelines
- Add tests for new functionality
- Update documentation as needed
- Test your changes locally

### 3. Commit Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new command for X"

# Push to your fork
git push origin feature/your-feature-name
```

### 4. Create Pull Request

- Go to GitHub and create a pull request
- Fill out the PR template
- Wait for review and address feedback

---

## Code Style

### TypeScript Guidelines

#### Strict Mode

- **Always use strict TypeScript**: No `any` types allowed
- Use proper type annotations
- Avoid type assertions unless absolutely necessary

```typescript
// ❌ Bad
function process(data: any) {
  return data as SomeType;
}

// ✅ Good
function process(data: unknown): SomeType {
  if (isSomeType(data)) {
    return data;
  }
  throw new Error('Invalid data type');
}
```

#### Type Guards

Use type guards for runtime validation:

```typescript
function isValidConfig(data: unknown): data is Config {
  return (
    typeof data === 'object' &&
    data !== null &&
    'property' in data &&
    typeof data.property === 'string'
  );
}
```

#### Interfaces vs Types

- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, or mapped types

```typescript
// ✅ Use interface for extensible objects
interface Command {
  name: string;
  execute: () => void;
}

// ✅ Use type for unions
type ThemePreset = 'green' | 'amber' | 'white';
```

### Naming Conventions

- **Classes**: PascalCase (`CommandDispatcher`, `FileSystemService`)
- **Interfaces**: PascalCase with `I` prefix for abstract interfaces (`IFileSystem`)
- **Functions**: camelCase (`executeCommand`, `parseArgs`)
- **Variables**: camelCase (`currentPath`, `isDirectory`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_SETTINGS`, `PATHS`)
- **Files**: kebab-case (`command-parser.ts`, `file-system.ts`)

### Code Organization

```typescript
// 1. Imports (external first, then internal)
import { marked } from 'marked';
import type { Command } from './Command';
import { FileSystemService } from './utils/fs/FileSystemService';

// 2. Type definitions
interface Config {
  // ...
}

// 3. Constants
const DEFAULT_VALUE = 'value';

// 4. Main code
export class MyClass {
  // ...
}

// 5. Helper functions
function helperFunction() {
  // ...
}
```

### Function Style

- Keep functions small and focused (< 50 lines)
- Use descriptive names
- Prefer pure functions when possible
- Document complex logic with comments

```typescript
// ✅ Good: Small, focused, descriptive
function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ❌ Bad: Too long, multiple responsibilities
function processUserData(data: any) {
  // 100+ lines of mixed logic...
}
```

### Error Handling

- Use custom error classes
- Always handle errors explicitly
- Provide meaningful error messages

```typescript
// ✅ Good
try {
  const content = fs.readFile(path);
  return { output: content };
} catch (error) {
  if (error instanceof FileSystemError) {
    return { output: error.message, error: true };
  }
  throw error; // Re-throw unexpected errors
}
```

### Comments

- Write self-documenting code (good names > comments)
- Add comments for complex logic or "why" not "what"
- Use TSDoc for public APIs

```typescript
/**
 * Resolves a path relative to the current directory.
 * Handles tilde expansion (~) and parent directory references (..).
 *
 * @param path - The path to resolve
 * @returns The absolute resolved path
 * @throws {FileSystemError} If path is invalid
 */
function resolvePath(path: string): string {
  // Implementation...
}
```

---

## Testing Requirements

### Test Coverage

- **Minimum coverage**: 80% for new code
- **Current coverage**: 70% (improving to 80%)
- All new features must include tests
- Bug fixes should include regression tests

### Test Structure

```typescript
// tests/unit/commands/core/mycommand.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { myCommand } from '@/commands/core/mycommand';

describe('myCommand', () => {
  beforeEach(() => {
    // Setup
  });

  describe('execute', () => {
    it('should return output for valid input', () => {
      const result = myCommand.execute(['arg1']);
      expect(result.output).toBe('expected output');
      expect(result.error).toBeUndefined();
    });

    it('should handle empty arguments', () => {
      const result = myCommand.execute([]);
      expect(result.error).toBe(true);
    });

    it('should support piped input', () => {
      const result = myCommand.execute([], 'piped input');
      expect(result.output).toContain('piped input');
    });
  });
});
```

### Testing Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **One assertion per test**: Focus tests on single behaviors
3. **Use descriptive names**: Test names should describe behavior
4. **Mock dependencies**: Isolate units being tested
5. **Test edge cases**: Empty inputs, null, undefined, errors

### Running Tests

```bash
# Run all tests (watch mode)
npm run test

# Run tests once
npm run test:run

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui

# Run specific test file
npm run test:run path/to/test.test.ts
```

### Test Helpers

Use existing test helpers:

```typescript
// tests/helpers/dom-setup.ts
import { setupDOM, cleanupDOM } from '../helpers/dom-setup';

describe('Component', () => {
  beforeEach(() => {
    setupDOM();
  });

  afterEach(() => {
    cleanupDOM();
  });
});

// tests/helpers/mock-filesystem.ts
import { createMockFilesystem } from '../helpers/mock-filesystem';

it('should read file', () => {
  const fs = createMockFilesystem();
  // Use mock filesystem
});
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config)
- `perf`: Performance improvements

### Examples

```bash
# Feature
git commit -m "feat(commands): add grep command with regex support"

# Bug fix
git commit -m "fix(parser): handle escaped quotes in command args"

# Documentation
git commit -m "docs(api): add examples for file system API"

# Refactor
git commit -m "refactor(markdown): extract header parsing to separate handler"

# Test
git commit -m "test(commands): add tests for cd command edge cases"
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- Keep subject line under 72 characters
- Reference issues in footer (`Closes #123`)
- Break up large changes into multiple commits

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass (`npm run test:run`)
- [ ] Build succeeds (`npm run build`)
- [ ] New tests added for features
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Type safety maintained (no `any`)

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe testing performed

## Checklist

- [ ] Tests pass
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated checks**: Tests and build must pass
2. **Code review**: At least one approving review required
3. **Address feedback**: Make requested changes
4. **Squash commits**: Clean up commit history if needed
5. **Merge**: Maintainer will merge when approved

### After Merge

- Delete your branch
- Update your local main branch
- Close any related issues

---

## Project Structure

### Directory Layout

```
dc.com/
├── src/
│   ├── commands/        # Command implementations
│   │   ├── core/        # Core terminal commands
│   │   ├── fs/          # File system commands
│   │   ├── local/       # Content commands
│   │   └── novelty/     # Fun commands
│   ├── components/      # UI components
│   ├── content/         # Markdown content
│   ├── styles/          # CSS modules
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utilities
├── tests/
│   ├── unit/            # Unit tests
│   └── helpers/         # Test helpers
└── public/              # Static assets
```

### Module Organization

- **One class per file**: Keep files focused
- **Group related files**: Use subdirectories
- **Index exports**: Use index.ts for cleaner imports
- **Avoid circular deps**: Use interfaces to break cycles

---

## Adding Features

### Adding a New Command

See [API.md](API.md#adding-a-new-command) for detailed instructions.

**Summary**:

1. Create command file in appropriate category
2. Implement Command interface
3. Register in `src/main.ts`
4. Add tests in `tests/unit/commands/`
5. Update `src/content/help.md`

### Adding Blog Posts

Blog posts are stored in `src/content/blog/` as markdown files with YAML frontmatter.

**Naming Convention**: `YYYY-MM-DD-NN-slug.md`

- `YYYY-MM-DD`: Publication date (ISO 8601 format)
- `NN`: Two-digit sequence number (01, 02, 03, etc.)
  - Used to order posts published on the same day
  - Start at 01 for the first post of the day
  - Increment for each additional post (02, 03, etc.)
- `slug`: URL-friendly post identifier (lowercase, hyphens only)

**Examples**:

- `2025-11-07-01-building-this-site.md` (first post on Nov 7)
- `2025-11-07-02-we-trick-rocks-into-thinking.md` (second post on Nov 7)
- `2025-11-09-01-vibe-coding-graph-library.md` (first post on Nov 9)

**Frontmatter Requirements**:

```yaml
---
title: 'Post Title Here'
date: '2025-11-07'
tags: ['AI', 'Web-Development', 'Developer-Experience']
summary: 'Brief description of the post (1-2 sentences)'
---
```

**Tag Naming Convention**:

- Use hyphens for multi-word tags: `Web-Development`, `Developer-Experience`
- Single-word tags need no modification: `AI`, `TypeScript`, `Philosophy`
- Hyphenated tags can be filtered without quotes: `blog --tags Web-Development`
- Quoted tags with spaces still work: `blog --tags "Web Development"`

Posts are sorted by filename in reverse order (newest first). The sequence number ensures correct ordering when multiple posts share the same date.

### Adding Portfolio Projects

Portfolio projects are stored in `src/content/portfolio/` as markdown files.

**Naming Convention**: `slug.md` (no date prefix needed)

**Frontmatter Requirements**:

```yaml
---
id: project-slug
title: 'Project Title'
technologies: ['Tech1', 'Tech2', 'Tech3']
impact: 'Brief impact statement'
year: '2020-2023'
tags: ['tag1', 'tag2']
---
```

### Adding Other Content

1. Create markdown file in appropriate `src/content/` subdirectory
2. Add YAML frontmatter as needed
3. Create or update command to display content
4. Update file system initialization if needed

### Adding a Theme

1. Add theme preset to `src/constants.ts`
2. Ensure WCAG AA contrast compliance
3. Update theme type definitions
4. Add to settings UI options

### Adding Documentation

- Update relevant .md files
- Keep documentation synchronized with code
- Add examples where helpful
- Use clear, concise language

---

## Getting Help

### Resources

- [README.md](README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [API.md](API.md) - API documentation
- [AUDIT.md](AUDIT.md) - Code quality analysis

### Communication

- **Issues**: Bug reports and feature requests
- **Discussions**: Questions and ideas
- **Pull Requests**: Code contributions

### Common Issues

**Build failing**:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Tests failing**:

```bash
# Update snapshots
npm run test:run -- -u

# Run specific test
npm run test:run -- path/to/test.test.ts
```

**Type errors**:

```bash
# Check types
npx tsc --noEmit
```

---

## Recognition

Contributors will be:

- Listed in CHANGELOG.md for their contributions
- Credited in release notes
- Acknowledged in the project

Thank you for contributing! 🎉

---

## Questions?

If you have questions not covered here:

1. Check existing documentation
2. Search closed issues
3. Open a new discussion
4. Reach out via contact info in README

We appreciate your contributions and look forward to working with you!
