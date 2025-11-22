# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a terminal-inspired portfolio website built with vanilla TypeScript, Vite, and Vitest. It simulates a Unix-like terminal environment in the browser with a real virtual file system, command execution pipeline, and persistent state management.

**Tech Stack:**

- TypeScript 5.7.3 (strict mode, zero `any` usage)
- Vite 7.2.1 (build tool)
- Vitest 4.0.4 (testing)
- No framework - vanilla JavaScript/TypeScript
- Dependencies: marked (markdown), figlet (ASCII art), DOMPurify (XSS protection)

**Bundle Size:** 121KB total (110KB JS, 11KB CSS)
**Test Coverage:** 70% (1229 tests across 50 test files)
**Deployment:** Cloudflare Pages

## Development Commands

### Essential Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:5173
npm run dev:host         # Start dev server with network access

# Building
npm run build            # Production build (runs tsc + vite build)
npm run preview          # Preview production build locally

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once (use in CI/pre-commit)
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI

# Linting and Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Type Checking
npm run type-check       # Run TypeScript compiler (no emit)
npm run type-coverage    # Check type coverage (requires 95%+)

# Validation (runs all checks)
npm run validate         # type-check + lint + format:check + test:run
```

### Running Single Tests

```bash
# Run a specific test file
npm run test:run tests/unit/commands/core/help.test.ts

# Run tests matching a pattern
npm run test -- --grep "CommandParser"
```

## Architecture Overview

### Core Design Patterns

1. **Command Pattern**: Each terminal command implements the `Command` interface with `name`, `description`, and `execute()` method
2. **Dependency Injection**: Components receive dependencies via constructor injection
3. **Chain of Responsibility**: Markdown parsing uses specialized handlers for different element types
4. **Virtual File System**: Hierarchical tree structure with Map-based storage for O(1) lookups

### Key Components

**Terminal Stack:**

```
Terminal (orchestrator)
├── TerminalInput (keyboard input, history, tab completion)
├── TerminalOutput (render output, sanitize HTML)
└── CommandExecutor (parse, expand aliases/vars, execute)
    └── CommandDispatcher (route to specific command)
        └── Command implementations (22 commands)
```

**State Management:**

- `SettingsManager`: localStorage + virtual filesystem (`~/.terminalrc`)
- `EnvVarManager`: Environment variables ($HOME, $PWD, etc.)
- `AliasManager`: Command aliases (`~/.bash_aliases`)
- `ThemeManager`: CSS variables for themes
- `Router`: Browser History API for URL state

**Virtual File System:**

```
/
└── home/
    └── darin/
        ├── about.md, contact.md, skills.md, help.md
        ├── .terminalrc (settings JSON)
        ├── .env (environment variables)
        ├── .bash_aliases (command aliases)
        ├── portfolio/*.md (lazy loaded)
        └── blog/*.md (lazy loaded)
```

### Command Execution Pipeline

```
User Input → TerminalInput
  → Terminal.executeCommand()
  → CommandExecutor.execute()
     ├→ AliasManager.resolve() (expand aliases)
     ├→ EnvVarManager.expandVariables() (replace $VAR)
     └→ CommandParser.parse() (parse args, flags)
  → CommandDispatcher.dispatch()
  → Command.execute()
  → TerminalOutput.append() (sanitize + render)
```

### Command Piping

Commands support Unix-like piping via `|`:

```bash
cat file.md | render    # Read file, pipe to render command
ls -la | render         # List files, pipe to render
```

Implementation: `PipelineParser.ts` splits by `|`, passes stdout as stdin to next command.

## Code Organization

### Directory Structure

```
src/
├── commands/           # Command implementations (22 commands)
│   ├── core/          # Core terminal commands (echo, date, env, export, etc.)
│   ├── fs/            # File system commands (ls, cd, pwd, cat, tree)
│   ├── local/         # Content commands (about, blog, portfolio, contact)
│   └── novelty/       # Fun commands (matrix, figlet, ddate)
├── components/        # UI components (Terminal, TerminalInput, TerminalOutput, etc.)
├── content/           # Markdown content
│   ├── blog/         # Blog posts (YYYY-MM-DD-NN-slug.md format)
│   └── portfolio/    # Portfolio projects (slug.md format)
├── utils/             # Utilities
│   ├── fs/           # Virtual file system (FileSystemService, FileSystemInitializer)
│   └── markdown/     # Markdown parsing (MarkdownParser, handlers)
├── styles/            # CSS
├── types/             # TypeScript interfaces
└── main.ts            # Application entry point
```

### File Naming Conventions

- **TypeScript files**: PascalCase for classes (`CommandParser.ts`, `FileSystemService.ts`)
- **Test files**: Same name as source + `.test.ts` (`CommandParser.test.ts`)
- **Components**: PascalCase (`Terminal.ts`, `TerminalInput.ts`)
- **Constants**: `constants.ts`

### Import Patterns

```typescript
// External imports first
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Internal type imports
import type { Command } from './Command';
import type { IFileSystem } from './utils/fs/IFileSystem';

// Internal implementation imports
import { FileSystemService } from './utils/fs/FileSystemService';
import { MarkdownService } from './utils/MarkdownService';
```

## Adding New Features

### Adding a New Command

1. **Create command file** in appropriate category (core/fs/local/novelty):

   ```typescript
   // src/commands/category/mycommand.ts
   import type { Command } from '../Command';

   export const myCommand: Command = {
     name: 'mycommand',
     description: 'Brief description',
     execute: (args: string[], stdin?: string) => {
       // Implementation
       return { output: 'result' };
     },
   };
   ```

2. **Register in `src/main.ts`**:

   ```typescript
   import { myCommand } from './commands/category/mycommand';
   terminal.registerCommands([
     // ... existing commands
     myCommand,
   ]);
   ```

3. **Add tests** in `tests/unit/commands/category/mycommand.test.ts`

4. **Update help** in `src/content/help.md` (if user-facing)

### Adding Blog Posts

Blog posts use a specific naming convention:

**Format:** `YYYY-MM-DD-NN-slug.md`

- `YYYY-MM-DD`: Publication date (ISO 8601)
- `NN`: Two-digit sequence number (01, 02, etc.) for ordering posts on the same day
- `slug`: URL-friendly identifier (lowercase, hyphens)

**Example:** `2025-11-07-01-building-this-site.md`

**Frontmatter:**

```yaml
---
title: 'Post Title'
date: '2025-11-07'
tags: ['AI', 'Web-Development', 'Developer-Experience']
summary: 'Brief description (1-2 sentences)'
---
```

**Tag conventions:**

- Multi-word tags: Use hyphens (`Web-Development`, `Developer-Experience`)
- Single-word tags: No modification (`AI`, `TypeScript`)

Posts are sorted by filename in reverse order (newest first).

### Adding Portfolio Projects

**Format:** `slug.md` (no date prefix)

**Frontmatter:**

```yaml
---
id: project-slug
title: 'Project Title'
technologies: ['Tech1', 'Tech2']
impact: 'Brief impact statement'
year: '2020-2023'
tags: ['tag1', 'tag2']
---
```

## Code Style and Best Practices

### TypeScript

- **Strict mode enabled**: No `any` types allowed
- **Prefer interfaces** for object shapes that may be extended
- **Prefer type aliases** for unions, intersections, or mapped types
- **Use type guards** for runtime validation
- **Explicit return types** on public functions

### Naming Conventions

- **Classes**: PascalCase (`CommandDispatcher`, `FileSystemService`)
- **Interfaces**: PascalCase, `I` prefix for abstract interfaces (`IFileSystem`)
- **Functions**: camelCase (`executeCommand`, `parseArgs`)
- **Variables**: camelCase (`currentPath`, `isDirectory`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_SETTINGS`, `PATHS`)

### Error Handling

- Use custom error classes when appropriate
- Always handle errors explicitly
- Provide meaningful error messages
- Return `{ output: errorMessage, error: true }` for command errors

### Security

**Multi-layer XSS Protection:**

1. HTML escaping (`htmlEscape.ts`)
2. DOMPurify sanitization (`sanitizeHtml.ts`) before `innerHTML`
3. Content Security Policy (CSP) in `index.html` and `public/_headers`
4. No inline event handlers (use event delegation)

**Input Validation:**

- Environment variables: Regex validation
- Font size: Range 8-24px
- Paths: Normalized to prevent directory traversal

### Testing

- **Coverage requirement**: 80% for new code (current: 70%, improving)
- **Test structure**: Arrange-Act-Assert pattern
- **Use descriptive test names**: "should return error when path is invalid"
- **Test edge cases**: Empty inputs, null, undefined, errors
- **Mock dependencies**: Use test helpers in `tests/helpers/`

**Test helpers:**

- `tests/helpers/dom-setup.ts`: DOM setup/cleanup
- `tests/helpers/mock-filesystem.ts`: Mock file system

## Common Development Tasks

### Running the Development Server

The dev server runs on port 5173. If you need to access it from another device on the network, use `npm run dev:host`.

### Building for Production

The build process:

1. TypeScript compilation (`tsc --project tsconfig.build.json`) - type checking only
2. Vite build - bundles and minifies
3. Output to `dist/` directory

**Important files for deployment:**

- `public/_redirects`: SPA routing configuration (`/* /index.html 200`)
- `public/_headers`: Security headers (CSP, HSTS, etc.)

### Adding a New Theme

1. Add theme preset to `src/constants.ts`
2. Ensure WCAG AA contrast compliance (use contrast checker)
3. Update theme type definitions
4. Add to settings UI options in `src/commands/local/settings.ts`

### Modifying the Virtual File System

The virtual file system is initialized in `FileSystemInitializer.createDefaultStructure()`. To add new files:

1. Add content files to `src/content/`
2. Update `FileSystemInitializer.ts` to include them in the tree
3. For lazy-loaded content (blog/portfolio), add import statements

## Git Workflow

### Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config)

**Examples:**

```bash
feat(commands): add grep command with regex support
fix(parser): handle escaped quotes in command args
docs(api): add examples for file system API
test(commands): add tests for cd command edge cases
```

### Version Bumping

This project follows semantic versioning. See `.claude/commands/CLAUDE.md` for the version bump workflow.

## Troubleshooting

### Build Failures

**TypeScript errors:**

```bash
npm run type-check  # Run tsc to see all errors
```

**Missing dependencies:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Test Failures

**Update snapshots:**

```bash
npm run test:run -- -u
```

**Run specific test:**

```bash
npm run test:run -- tests/unit/path/to/test.test.ts
```

### Performance Issues

- Bundle should be ~121KB total
- Use `npm run build` to check bundle size
- Use Chrome DevTools Lighthouse for performance profiling
- Check for memory leaks with Chrome DevTools Memory profiler

## Additional Documentation

- **ARCHITECTURE.md**: Detailed system design, design patterns, data flow
- **CONTRIBUTING.md**: Development guidelines, code style, testing requirements
- **DEPLOYMENT.md**: Cloudflare Pages deployment instructions
- **README.md**: Project overview, quick start, available commands
- **SECURITY.md**: Security policy and reporting

## Important Notes

- **No framework**: This is vanilla TypeScript, no React/Vue/etc.
- **Zero `any` usage**: Strict TypeScript mode, all types must be explicit
- **Security first**: Multi-layer XSS protection, always sanitize before rendering
- **Test coverage**: Maintain 70%+ coverage, aim for 80%+ on new code
- **Bundle size**: Keep total bundle under 150KB
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Browser support**: Chrome 107+, Firefox 104+, Safari 16+ (via Vite's `baseline-widely-available`)
