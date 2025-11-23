# API Documentation

**Last Updated:** 2025-11-22 (v0.11.0)

## Table of Contents

1. [Overview](#overview)
2. [Command Interface](#command-interface)
3. [File System API](#file-system-api)
4. [Settings API](#settings-api)
5. [State Management APIs](#state-management-apis)
6. [Parser APIs](#parser-apis)
7. [How to Extend](#how-to-extend)

---

## Overview

This document describes the public interfaces and APIs for extending the terminal portfolio application. Whether you're adding new commands, integrating with the file system, or customizing settings, this guide provides the necessary information.

### Core Interfaces

- **Command Interface**: Define new terminal commands
- **FileSystem Interface**: Read/write virtual files
- **Settings Interface**: Manage user preferences
- **State Managers**: Control environment variables, aliases, themes

---

## Command Interface

### Command Type Definition

Location: `src/commands/Command.ts`

```typescript
interface Command {
  name: string; // Command name (e.g., 'ls', 'cat', 'about')
  description: string; // Short description shown in help
  aliases?: string[]; // Optional aliases (e.g., ['ll', 'la'])
  execute: (args: string[], stdin?: string) => CommandResult | Promise<CommandResult>;
}

interface CommandResult {
  output: string; // Command output text
  error?: boolean; // True if command failed
  html?: boolean; // True if output is HTML to render
  raw?: boolean; // True if output is for piping (don't display)
  scrollBehavior?: 'top' | 'bottom'; // Controls scroll position after output
}
```

### Command Execution Context

Commands receive:

- **args**: Array of string arguments (parsed from command line)
- **stdin**: Optional string input from pipe (e.g., `cat file | command`)

Commands return:

- **output**: String to display (text or HTML)
- **error**: Boolean flag indicating failure
- **html**: Boolean flag indicating HTML rendering needed
- **raw**: Boolean flag for pipeline passthrough

### Simple Command Example

```typescript
// src/commands/core/echo.ts
export const echoCommand: Command = {
  name: 'echo',
  description: 'Display a line of text',
  execute: (args: string[], stdin?: string) => {
    const output = args.join(' ');
    return { output };
  },
};
```

### Command with Flags

```typescript
// src/commands/fs/ls.ts (simplified)
export function createLsCommand(fs: IFileSystem): Command {
  return {
    name: 'ls',
    description: 'List directory contents',
    aliases: ['dir'],
    execute: (args: string[], _stdin?: string) => {
      const flags = parseFlags(args); // Extract -a, -l flags
      const path = args.find((arg) => !arg.startsWith('-')) || '.';

      const entries = fs.listDirectory(path);

      if (flags.a) {
        // Show hidden files
      }

      if (flags.l) {
        // Long format
      }

      return { output: entries.join('\n') };
    },
  };
}
```

### Async Command Example

```typescript
// Async command that fetches data
export const fetchCommand: Command = {
  name: 'fetch',
  description: 'Fetch data from API',
  execute: async (args: string[], _stdin?: string) => {
    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();
      return { output: data };
    } catch (error) {
      return {
        output: `Error: ${error.message}`,
        error: true,
      };
    }
  },
};
```

### Pipeline Support (stdin)

```typescript
// Command that accepts piped input
export const grepCommand: Command = {
  name: 'grep',
  description: 'Search for pattern',
  execute: (args: string[], stdin?: string) => {
    const pattern = args[0];
    const input = stdin || '';

    const lines = input.split('\n');
    const matches = lines.filter((line) => line.includes(pattern));

    return { output: matches.join('\n') };
  },
};

// Usage: cat file.txt | grep "search term"
```

### HTML Output

```typescript
// Command that returns HTML
export const htmlCommand: Command = {
  name: 'render',
  description: 'Render markdown to HTML',
  execute: (args: string[], stdin?: string) => {
    const markdown = stdin || args.join(' ');
    const html = MarkdownService.render(markdown);

    return {
      output: html,
      html: true, // Tells terminal to render as HTML
    };
  },
};
```

### Registering Commands

Location: `src/main.ts`

```typescript
// Create command instances
const myCommand: Command = {
  /* ... */
};

// Register with terminal
terminal.registerCommands([
  myCommand,
  // ... other commands
]);
```

---

## File System API

### IFileSystem Interface

Location: `src/utils/fs/IFileSystem.ts`

```typescript
interface IFileSystem {
  // Path operations
  getCurrentPath(): string;
  changeDirectory(path: string): void;
  getShortPath(): string;

  // File operations
  readFile(path: string): string;
  writeFile(path: string, content: string): void;
  exists(path: string): boolean;
  isDirectory(path: string): boolean;
  isFile(path: string): boolean;

  // Directory operations
  list(path: string): string[];
  getNode(path: string): FileSystemNode | null;
  createDirectory(path: string): void;

  // Tree operations
  getTree(path: string, maxDepth?: number): string[];

  // User operations
  setCurrentUsername(username: string): void;
}
```

### FileSystemNode Structure

Location: `src/utils/fs/types.ts`

```typescript
interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string; // For files
  children?: Map<string, FileSystemNode>; // For directories
  permissions?: string; // Unix-style permissions (e.g., 'rw-r--r--')
  owner?: string; // File owner
  size?: number; // File size in bytes
  modifiedTime?: Date; // Last modified timestamp
  isHidden?: boolean; // Hidden file flag
}
```

### Reading Files

```typescript
import type { IFileSystem } from './utils/fs/IFileSystem';

function readBlogPost(fs: IFileSystem, postId: string): string {
  const path = `/home/darin/blog/${postId}.md`;

  if (!fs.exists(path)) {
    throw new Error(`Blog post not found: ${postId}`);
  }

  return fs.readFile(path);
}
```

### Writing Files

```typescript
function saveSettings(fs: IFileSystem, settings: object): void {
  const path = '~/.terminalrc';
  const content = JSON.stringify(settings, null, 2);
  fs.writeFile(path, content);
}
```

### Listing Directories

```typescript
function listBlogPosts(fs: IFileSystem): string[] {
  const blogPath = '~/blog';
  const entries = fs.list(blogPath);

  // Filter for markdown files
  return entries.filter((entry) => entry.endsWith('.md'));
}
```

### Path Resolution

Path resolution (tilde expansion, relative paths, etc.) is handled internally by the FileSystemService implementation. Commands should pass paths to the file system methods and they will be resolved automatically:

```typescript
// Tilde expansion: ~ → /home/darin
fs.readFile('~/about.md');

// Relative paths: ./file → /current/path/file
fs.readFile('./file.txt');

// Parent directory: ../file → /parent/path/file
fs.readFile('../file.txt');

// Absolute paths: /home/darin/file → /home/darin/file
fs.readFile('/home/darin/file.txt');
```

### Checking File/Directory

```typescript
function processPath(fs: IFileSystem, path: string): void {
  if (!fs.exists(path)) {
    throw new Error(`Path does not exist: ${path}`);
  }

  if (fs.isDirectory(path)) {
    const entries = fs.list(path);
    console.log('Directory contains:', entries);
  } else {
    const content = fs.readFile(path);
    console.log('File content:', content);
  }
}
```

### Creating Directory Structure

```typescript
// src/utils/fs/FileSystemInitializer.ts
class FileSystemInitializer {
  static createDefaultStructure(): FileSystemNode {
    return {
      name: '',
      type: 'directory',
      children: new Map([
        ['home', {
          name: 'home',
          type: 'directory',
          children: new Map([
            ['darin', {
              name: 'darin',
              type: 'directory',
              children: new Map([
                ['about.md', {
                  name: 'about.md',
                  type: 'file',
                  content: '# About Me\n...',
                  permissions: 'rw-r--r--',
                  owner: 'darin'
                }],
                ['blog', {
                  name: 'blog',
                  type: 'directory',
                  children: new Map()
                }]
              ])
            }]
          })
        }]
      ])
    };
  }
}
```

---

## Settings API

### SettingsManager Interface

Location: `src/utils/SettingsManager.ts`

```typescript
class SettingsManager {
  // Load/save settings
  loadSettings(): SettingsConfig;
  saveSettings(config: SettingsConfig): void;

  // Get specific settings
  getSetting(key: keyof SettingsConfig): any;
  setSetting(key: keyof SettingsConfig, value: any): void;

  // Theme methods
  getThemePreset(): ThemePresetName;
  setThemePreset(preset: ThemePresetName): void;
  getCustomColors(): CustomColors | undefined;
  setCustomColors(colors: CustomColors): void;

  // Font methods
  getFont(): FontConfig;
  setFontSize(size: number): void;
  setFontFamily(family: FontFamily): void;

  // Effects methods
  getScanLines(): boolean;
  setScanLines(enabled: boolean): void;
  getGlow(): boolean;
  setGlow(enabled: boolean): void;
  getBorder(): boolean;
  setBorder(enabled: boolean): void;
  getAnimationSpeed(): number;
  setAnimationSpeed(speed: number): void;
  getSoundEffects(): boolean;
  setSoundEffects(enabled: boolean): void;
  getAutoScrollBehavior(): boolean;
  setAutoScrollBehavior(enabled: boolean): void;

  // Prompt methods
  getPromptFormat(): string;
  setPromptFormat(format: string): void;

  // Reset to defaults
  reset(): void;
}
```

### SettingsConfig Structure

Location: `src/types/settings.ts`

```typescript
interface SettingsConfig {
  theme: {
    preset: ThemePresetName;
    customColors?: CustomColors;
  };
  font: FontConfig;
  effects: EffectsConfig;
  prompt: PromptConfig;
}

type ThemePresetName =
  | 'green'
  | 'yellow' // Previously 'amber'
  | 'white'
  | 'light-blue' // Previously 'cyan'
  | 'paper'
  | 'dc' // New custom preset
  | 'custom'; // For user-defined colors

interface CustomColors {
  foreground: string; // Hex color
  background: string; // Hex color
  dim: string; // Hex color
  accent: string; // Hex color
}

interface FontConfig {
  family: FontFamily;
  size: number; // 8-24 (pixels)
}

type FontFamily =
  | 'Fira Code'
  | 'JetBrains Mono'
  | 'Cascadia Code'
  | 'Menlo'
  | 'Monaco'
  | 'Courier New'
  | 'monospace';

interface EffectsConfig {
  scanLines: boolean;
  glow: boolean;
  border: boolean;
  animationSpeed: number; // 0.5-2.0
  soundEffects: boolean; // New
  autoScrollBehavior: boolean; // New
}

interface PromptConfig {
  format: string; // Bash-style format string (e.g., '\u@\h:\w$ ')
}
```

### Using Settings

```typescript
// Get current theme preset
const themePreset = settingsManager.getThemePreset();
console.log(themePreset); // 'green'

// Change theme preset
settingsManager.setThemePreset('yellow');

// Set custom colors
settingsManager.setCustomColors({
  foreground: '#ff6600',
  background: '#000000',
  dim: '#666666',
  accent: '#ff9944',
});

// Adjust font settings
settingsManager.setFontSize(16);
settingsManager.setFontFamily('Fira Code');

// Toggle effects
const scanLines = settingsManager.getScanLines();
settingsManager.setScanLines(!scanLines);

// Enable sound effects
settingsManager.setSoundEffects(true);

// Set prompt format
settingsManager.setPromptFormat('\\u@\\h:\\w$ ');

// Reset to defaults
settingsManager.reset();
```

### ThemeManager

Location: `src/utils/ThemeManager.ts`

```typescript
class ThemeManager {
  constructor(settingsManager: SettingsManager);

  // Get available theme presets
  getPresets(): ThemePreset[];

  // Get specific preset configuration
  getPreset(name: ThemePresetName): ThemePreset | null;

  // Apply theme by name
  applyTheme(themeName: ThemePresetName): void;

  // Apply custom colors
  applyCustomColors(colors: Partial<ColorScheme>): void;

  // Apply current theme from settings
  applyCurrentTheme(): void;

  // Get current color scheme
  getCurrentColors(): ColorScheme;
}
```

**Types**:

```typescript
interface ThemePreset {
  name: ThemePresetName;
  displayName: string;
  colors: ColorScheme;
}

interface ColorScheme {
  foreground: string;
  background: string;
  dim: string;
  accent: string;
}
```

**Usage**:

```typescript
// Get all available presets
const presets = themeManager.getPresets();
// Returns array of ThemePreset objects

// Get specific preset
const greenTheme = themeManager.getPreset('green');
// Returns: { name: 'green', displayName: 'Green', colors: {...} }

// Apply theme
themeManager.applyTheme('yellow');
// Applies yellow theme to CSS variables

// Apply custom colors
themeManager.applyCustomColors({
  foreground: '#ff6600',
  background: '#000000',
  dim: '#666666',
  accent: '#ff9944',
});

// Apply theme from settings
themeManager.applyCurrentTheme();
// Reads current theme from SettingsManager and applies it

// Get current colors
const colors = themeManager.getCurrentColors();
// Returns: { foreground: '#...', background: '#...', ... }
```

**Available Themes**:

- `green` - Classic terminal green
- `yellow` - Amber/yellow (previously 'amber')
- `white` - High contrast white
- `light-blue` - Cyan/light blue (previously 'cyan')
- `paper` - Paper-like beige
- `dc` - Custom DC theme
- `custom` - User-defined colors

---

## State Management APIs

### EnvVarManager

Location: `src/utils/EnvVarManager.ts`

```typescript
class EnvVarManager {
  constructor(fileSystem: IFileSystem, username: string, hostname: string);

  // Get environment variable
  getVariable(name: string): string | undefined;

  // Set user environment variable
  setVariable(name: string, value: string): void;

  // Unset environment variable
  unsetVariable(name: string): void;

  // Get all variables (platform + user)
  getAllVariables(): Map<string, string>;

  // Get platform-managed variables
  getPlatformVariables(): Map<string, string>;

  // Get user-defined variables
  getUserVariables(): Map<string, string>;

  // Update platform variable (internal use)
  updatePlatformVariable(name: string, value: string): void;

  // Expand variables in string ($VAR syntax)
  expandVariables(input: string): string;

  // Export variables as shell format
  exportFormat(): string[];
}
```

**Built-in Platform Variables**:

- `$HOME` - User home directory (e.g., `/home/darin`)
- `$PWD` - Current working directory
- `$OLDPWD` - Previous working directory
- `$USER` - Username
- `$HOSTNAME` - Host name
- `$SHELL` - Shell path
- `$PATH` - Executable search path

**Usage**:

```typescript
// Get built-in variable
const home = envVarManager.getVariable('HOME');
const pwd = envVarManager.getVariable('PWD');

// Set custom variable
envVarManager.setVariable('MY_VAR', 'value');

// Unset variable
envVarManager.unsetVariable('MY_VAR');

// Expand variables in command
const expanded = envVarManager.expandVariables('cd $HOME/blog');
// Result: 'cd /home/darin/blog'

// Get all user-defined variables
const userVars = envVarManager.getUserVariables();

// Export format (for 'env' command)
const exports = envVarManager.exportFormat();
// Result: ['HOME=/home/darin', 'PWD=/home/darin', ...]
```

### AliasManager

Location: `src/utils/AliasManager.ts`

```typescript
class AliasManager {
  // Create/update alias
  setAlias(name: string, command: string): void;

  // Remove alias (returns true if removed, false if not found)
  removeAlias(name: string): boolean;

  // Get alias command
  getAlias(name: string): string | undefined;

  // Get all aliases
  getAllAliases(): Map<string, string>;

  // Check if alias is a default/built-in alias
  isDefaultAlias(name: string): boolean;

  // Resolve alias in command (primary method)
  resolve(input: string): string;

  // Legacy method (kept for compatibility)
  resolveAlias(command: string): string;
}
```

**Usage**:

```typescript
// Create alias
aliasManager.setAlias('ll', 'ls -la');

// Resolve alias (preferred method)
const resolved = aliasManager.resolve('ll ~/blog');
// Result: 'ls -la ~/blog'

// Check if alias is built-in
const isBuiltIn = aliasManager.isDefaultAlias('ll');

// Remove alias
const removed = aliasManager.removeAlias('ll');
// Returns: true (if existed), false (if not found)

// List all aliases (returns Map)
const aliases = aliasManager.getAllAliases();
// Map { 'll' => 'ls -la', 'blog-ai' => 'blog --tags ai' }

// Convert to object if needed
const aliasesObj = Object.fromEntries(aliases);
// { ll: 'ls -la', 'blog-ai': 'blog --tags ai' }
```

---

## Parser APIs

### CommandParser

Location: `src/utils/CommandParser.ts`

```typescript
interface ParsedCommand {
  command: string;
  args: string[];
  raw: string; // Original input string
}

class CommandParser {
  static parse(input: string): ParsedCommand;
}
```

**Usage**:

```typescript
const parsed = CommandParser.parse('ls -la ~/blog');
// Result:
// {
//   command: 'ls',
//   args: ['-la', '~/blog'],
//   raw: 'ls -la ~/blog'
// }

// Note: Individual commands are responsible for parsing their own flags
// Path expansion (~ -> /home/darin) happens later in the execution pipeline
```

### PipelineParser

Location: `src/utils/PipelineParser.ts`

```typescript
class PipelineParser {
  // Parse input into pipeline commands
  static parse(input: string): string[];

  // Check if input contains pipe operators
  static hasPipe(input: string): boolean;
}
```

**Usage**:

```typescript
// Parse pipeline
const commands = PipelineParser.parse('cat file.md | render');
// Result: ['cat file.md', 'render']

// Check for pipes
const isPipeline = PipelineParser.hasPipe('cat file.md | render');
// Result: true

const isSimple = PipelineParser.hasPipe('ls -la');
// Result: false
```

### Markdown Parser

Location: `src/utils/MarkdownService.ts`

```typescript
class MarkdownService {
  static render(markdown: string, renderFrontmatter = false): string;
}
```

**Usage**:

```typescript
// Render markdown to HTML
const html = MarkdownService.render('# Hello\nWorld');

// Render with frontmatter included
const htmlWithFrontmatter = MarkdownService.render(fileContent, true);
```

**Implementation Notes**:

- MarkdownService is a facade that delegates to either:
  - `MarkdownRenderer` (custom implementation, default)
  - `MarkedAdapter` (marked library wrapper)
- Renderer selection is controlled by `config.features.useMarkedRenderer` flag
- Frontmatter parsing is handled internally using `FrontmatterParser` class
- The `render()` method handles both markdown rendering and optional frontmatter extraction/rendering

---

## How to Extend

### Adding a New Command

#### Step 1: Create Command File

Create `src/commands/[category]/mycommand.ts`:

```typescript
import type { Command } from '../Command';

export const myCommand: Command = {
  name: 'mycommand',
  description: 'My custom command',
  aliases: ['mc'],
  execute: (args: string[], stdin?: string) => {
    // Your logic here
    const output = `Executed with args: ${args.join(', ')}`;
    return { output };
  },
};
```

#### Step 2: Register Command

Edit `src/main.ts`:

```typescript
import { myCommand } from './commands/[category]/mycommand';

// Add to registration
terminal.registerCommands([
  // ... existing commands
  myCommand,
]);
```

#### Step 3: Add Tests

Create `tests/unit/commands/[category]/mycommand.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { myCommand } from '@/commands/[category]/mycommand';

describe('mycommand', () => {
  it('should execute successfully', () => {
    const result = myCommand.execute(['arg1', 'arg2']);
    expect(result.output).toBe('Executed with args: arg1, arg2');
    expect(result.error).toBeUndefined();
  });
});
```

#### Step 4: Update Documentation

Add to `src/content/help.md`:

```markdown
### `mycommand`

Description of my command

- Usage: `mycommand [args]`
- Example: `mycommand foo bar`
```

### Adding Content Command

Example: Adding a "resume" command

```typescript
// src/commands/local/resume.ts
import type { Command } from '../Command';
import type { IFileSystem } from '../../utils/fs/IFileSystem';
import { MarkdownService } from '../../utils/MarkdownService';

export function createResumeCommand(fs: IFileSystem): Command {
  return {
    name: 'resume',
    description: 'View my resume',
    execute: (_args: string[], _stdin?: string) => {
      try {
        const content = fs.readFile('~/resume.md');
        const html = MarkdownService.render(content);
        return { output: html, html: true };
      } catch (error) {
        return {
          output: error instanceof Error ? error.message : String(error),
          error: true,
        };
      }
    },
  };
}
```

### Adding Navigation Link

Edit `src/main.ts`:

```typescript
const navItems: NavItem[] = [
  { label: 'about', command: 'about' },
  { label: 'resume', command: 'resume' }, // Add this
  // ... other items
];

// Add to router mapping
const commandToPath: Record<string, string> = {
  about: '/about',
  resume: '/resume', // Add this
  // ...
};
```

### Adding Theme Preset

Edit `src/constants.ts`:

```typescript
export const THEME_PRESETS = {
  // ... existing themes
  custom: {
    foreground: '#ff6600',
    background: '#000000',
    dim: '#666666',
    accent: '#ff9944',
  },
};

export type ThemePresetName =
  | 'green'
  | 'yellow'
  | 'white'
  | 'light-blue'
  | 'paper'
  | 'dc'
  | 'custom'; // Add this
```

### Adding Custom Markdown Handler

```typescript
// src/utils/markdown/handlers/MyHandler.ts
import type { LineHandler } from '../MarkdownParser';

export class MyHandler implements LineHandler {
  canHandle(line: string): boolean {
    return line.startsWith('>>>'); // Custom syntax
  }

  handle(line: string, context: ParseContext): string {
    const content = line.slice(3).trim();
    return `<div class="custom-block">${content}</div>`;
  }
}
```

Register in `src/utils/markdown/MarkdownParser.ts`:

```typescript
this.handlers = [
  new CodeBlockHandler(),
  new MyHandler(), // Add this
  // ... other handlers
];
```

---

## Best Practices

### Command Design

1. **Keep commands focused**: One command, one responsibility
2. **Handle errors gracefully**: Return `{ output: error, error: true }`
3. **Support piping**: Accept stdin when appropriate
4. **Validate inputs**: Check args before processing
5. **Add help text**: Include `--help` flag support

### File System Usage

1. **Use resolvePath()**: Always resolve paths before use
2. **Check existence**: Use `exists()` before reading
3. **Handle errors**: Try/catch around file operations
4. **Use short paths**: `getShortPath()` for display

### State Management

1. **Use managers**: Don't access localStorage directly
2. **Emit events**: Use 'settings-changed' for updates
3. **Validate data**: Check structure before saving
4. **Provide defaults**: Always have fallback values

### Testing

1. **Unit test all commands**: Aim for 100% coverage
2. **Mock dependencies**: Use test helpers for filesystem
3. **Test edge cases**: Empty args, invalid input, etc.
4. **Test pipelines**: Verify stdin handling

---

## API Reference Summary

| API             | Purpose                  | Location                       |
| --------------- | ------------------------ | ------------------------------ |
| Command         | Define terminal commands | `src/commands/Command.ts`      |
| IFileSystem     | Virtual file operations  | `src/utils/fs/IFileSystem.ts`  |
| SettingsManager | User preferences         | `src/utils/SettingsManager.ts` |
| ThemeManager    | Theme application        | `src/utils/ThemeManager.ts`    |
| EnvVarManager   | Environment variables    | `src/utils/EnvVarManager.ts`   |
| AliasManager    | Command aliases          | `src/utils/AliasManager.ts`    |
| CommandParser   | Parse command input      | `src/utils/CommandParser.ts`   |
| PipelineParser  | Parse pipes              | `src/utils/PipelineParser.ts`  |
| MarkdownService | Render markdown          | `src/utils/MarkdownService.ts` |

---

## Examples Repository

For more examples, see:

- **Simple commands**: `src/commands/core/echo.ts`, `src/commands/core/date.ts`
- **Filesystem commands**: `src/commands/fs/ls.ts`, `src/commands/fs/cat.ts`
- **Content commands**: `src/commands/local/about.ts`, `src/commands/local/blog.ts`
- **Complex commands**: `src/commands/novelty/figlet.ts`

---

## Additional Resources

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [README.md](README.md) - Project overview
- [AUDIT.md](AUDIT.md) - Code quality audit

For questions or suggestions, please open an issue on GitHub.
