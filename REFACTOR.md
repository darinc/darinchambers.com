Refactoring & Testing Strategy
This document outlines the strategic plan to refactor the terminal project into a robust, maintainable, and highly testable architecture.
Guiding Philosophy: Refactor-then-Test (in Slices)
Our goal is to implement the "Greenfield Blueprint" we discussed. The most efficient way to do this is not to write tests for the current, complex code, which will be thrown away. Instead, we will tackle the refactor one "slice" at a time.
For each slice, the process is:
Refactor: Implement the new, clean architecture for that specific module.
Test: Immediately write unit tests for the newly refactored module.
This approach builds our test suite and our new architecture in parallel, ensuring no effort is wasted.


## [x] Phase 1: The FileSystem Split (Decoupling the "God Class") - COMPLETED 2025-10-29
Source Audit: Finding 1.2 (High Complexity), Finding 5.1 (Mixed Responsibilities), Finding 4.1 (High Coupling).
Goal: Split the 350+ line FileSystem.ts into three separate, testable modules: an interface, an implementation, and an initializer.
1.1. Refactor: Define the Contract (IFileSystem.ts)
Create a new file src/utils/fs/IFileSystem.ts. This interface will be our "contract" for dependency inversion.
// src/utils/fs/IFileSystem.ts
import type { FileSystemNode } from './FileSystemNode'; // Create this type/interface file if needed

export interface IFileSystem {
  getCurrentPath(): string;
  setCurrentUsername(username: string): void;
  getShortPath(): string;
  list(path: string): string[];
  changeDirectory(path: string): void;
  readFile(path: string): string;
  exists(path: string): boolean;
  isDirectory(path: string): boolean;
  isFile(path: string): boolean;
  writeFile(path: string, content: string): void;
  getTree(path: string, maxDepth?: number): string[];
  getNode(path: string): FileSystemNode | null; // Keep internal-ish methods if commands need them
}


(You will also want to move FileSystemNode and FileSystemNodeType to a shared file like src/utils/fs/types.ts)
1.2. Refactor: Create the Implementation (FileSystemService.ts)
Rename src/utils/FileSystem.ts to src/utils/fs/FileSystemService.ts.
It will implements IFileSystem.
Its constructor will now receive the root node, not create it.
Delete the initializeFileSystem method from this file.
Delete all the import ... from '...md?raw' statements.
// src/utils/fs/FileSystemService.ts
import type { IFileSystem } from './IFileSystem';
import type { FileSystemNode, FileSystemNodeType } from './types';

export class FileSystemService implements IFileSystem {
  private root: FileSystemNode;
  private currentPath: string;
  private currentUsername: string = 'darin';

  // Constructor now accepts the root node (Dependency Injection)
  constructor(rootNode: FileSystemNode) {
    this.root = rootNode;
    this.currentPath = '/home/darin';
    // The 'initializeFileSystem()' call is GONE
  }

  // ... (all other methods: getCurrentPath, resolvePath, getNode, list, etc.)
  // ... (createDirectoryNode and createFileNode can be static helpers or moved)
}


1.3. Test: Write Tests for FileSystemService
Now that the class is decoupled, it's easy to test. Create src/utils/fs/FileSystemService.test.ts.
// src/utils/fs/FileSystemService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { FileSystemService } from './FileSystemService';
import type { FileSystemNode } from './types';

describe('FileSystemService', () => {
  let fs: FileSystemService;
  let mockRoot: FileSystemNode;

  beforeEach(() => {
    // Create a simple mock file system for each test
    mockRoot = {
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
                ['test.txt', { name: 'test.txt', type: 'file', content: 'hello' }]
              ])
            }]
          ])
        }]
      ])
    };
    fs = new FileSystemService(mockRoot);
  });

  it('should read an existing file', () => {
    const content = fs.readFile('~/test.txt');
    expect(content).toBe('hello');
  });

  it('should throw an error when reading a non-existent file', () => {
    expect(() => fs.readFile('~/bad.txt')).toThrow('No such file or directory');
  });

  it('should change directory', () => {
    fs.changeDirectory('/home');
    expect(fs.getCurrentPath()).toBe('/home');
  });
});


1.4. Refactor: Create the FileSystemInitializer
Create a new file src/utils/fs/FileSystemInitializer.ts. This class will contain only the data-loading logic.
// src/utils/fs/FileSystemInitializer.ts
import type { FileSystemNode } from './types';

// Import all markdown content here
import aiProductionLessons from '../../blog/2024-09-15-ai-production-lessons.md?raw';
// ... all other md?raw imports

export class FileSystemInitializer {
  // Make these private static helpers
  private static createDirectoryNode(name: string): FileSystemNode { /* ... */ }
  private static createFileNode(name: string, content: string): FileSystemNode { /* ... */ }

  // This is the old initializeFileSystem method, now static
  public static createDefaultStructure(): FileSystemNode {
    const root = this.createDirectoryNode('');
    const rootChildren = root.children!;
    
    // ... (all the logic from the old initializeFileSystem)
    // ... (root.set('root', ...), home.children.set('guest', ...), etc.)

    // Load blog posts
    const blog = this.createDirectoryNode('blog');
    darin.children!.set('blog', blog);
    blog.children!.set('2024-09-15-ai-production-lessons.md',
      this.createFileNode('2024-09-15-ai-production-lessons.md', aiProductionLessons));
    // ... etc.
    
    return root;
  }
}


1.5. Test: Write Tests for FileSystemInitializer
Create src/utils/fs/FileSystemInitializer.test.ts.
// src/utils/fs/FileSystemInitializer.test.ts
import { describe, it, expect } from 'vitest';
import { FileSystemInitializer } from './FileSystemInitializer';

describe('FileSystemInitializer', () => {
  it('should create a root node with a /home directory', () => {
    const root = FileSystemInitializer.createDefaultStructure();
    expect(root.children).toBeDefined();
    expect(root.children!.has('home')).toBe(true);
  });

  it('should load the ai-production-lessons blog post', () => {
    const root = FileSystemInitializer.createDefaultStructure();
    const post = root.children!
      .get('home')!.children!
      .get('darin')!.children!
      .get('blog')!.children!
      .get('2024-09-15-ai-production-lessons.md');
      
    expect(post).toBeDefined();
    expect(post!.type).toBe('file');
    expect(post!.content).toContain('Building AI systems that work in production');
  });
});


1.6. Refactor: Update main.ts Wiring
Now, update src/main.ts to use the new modules.
// src/main.ts

// BEFORE
// import { FileSystem } from './utils/FileSystem';
// const fileSystem = new FileSystem();

// AFTER
import { FileSystemService } from './utils/fs/FileSystemService';
import { FileSystemInitializer } from './utils/fs/FileSystemInitializer';
import type { IFileSystem } from './utils/fs/IFileSystem';

const rootNode = FileSystemInitializer.createDefaultStructure();
const fileSystem: IFileSystem = new FileSystemService(rootNode); 
// ^ Note: We use the interface type for all future references


1.7. Refactor: Update Command Dependencies
This is the final payoff. Update all commands (e.g., src/commands/fs/ls.ts) to depend on the interface, not the implementation.
// src/commands/fs/ls.ts

// BEFORE
// import type { FileSystem } from '../../utils/FileSystem';
// export function createLsCommand(fs: FileSystem): Command { /* ... */ }

// AFTER
import type { IFileSystem } from '../../utils/fs/IFileSystem';
export function createLsCommand(fs: IFileSystem): Command { /* ... */ }


Now all your commands are fully testable by mocking IFileSystem.

## [x] Phase 2: Standardize Core Systems - COMPLETED 2025-10-29 (v0.0.24, enhanced v0.0.25)
Goal: Clean up scattered logic (magic strings, errors) and make command parsing robust.
2.1. Refactor: Centralize Constants
Source Audit: Finding 6.2 (Magic Strings).
Create src/constants.ts:
// src/constants.ts
export const PATHS = {
  HOME_DARIN: '/home/darin',
  HOME_GUEST: '/home/guest',
  CONTENT_BLOG: '/home/darin/blog',
  CONTENT_HELP: '/home/darin/content/help.md',
  CONFIG_ALIASES: '/home/guest/.alias'
} as const;

export const COMMAND_SIGNALS = {
  CLEAR_SCREEN: '__CLEAR__',
  NO_OUTPUT: '__NO_OUTPUT__'
} as const;


Refactor Code: Update all files (Terminal.ts, blog.ts, alias.ts, help.ts) to import and use these constants.
// e.g., in src/commands/local/blog.ts
import { PATHS } from '../../constants';
const blogDir = PATHS.CONTENT_BLOG;


2.2. Refactor & Test: Standardize Error Handling
Source Audit: Finding 6.1 (Inconsistent Errors).
Refactor: Create src/utils/errors.ts:
// src/utils/errors.ts
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}
export class FileSystemError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'FileSystemError';
  }
}
export class CommandNotFoundError extends AppError {
  constructor(command: string) {
    super(`Command not found: ${command}`);
    this.name = 'CommandNotFoundError';
  }
}


Refactor: Update FileSystemService.ts: Change all throw new Error(...) to throw new FileSystemError(...).
Refactor: Update CommandDispatcher.ts: This is the key. The dispatcher will now catch all errors and standardize them.
// src/utils/CommandDispatcher.ts
// ... (inside dispatch method)
try {
  return await command.execute(parsed.args);
} catch (error) {
  // Standardize all errors into a CommandResult
  if (error instanceof AppError) {
    return { output: error.message, error: true };
  } else if (error instanceof Error) {
    return { output: `Error: ${error.message}`, error: true };
  }
  return { output: 'An unknown error occurred.', error: true };
}

// ... (inside dispatch method for Command Not Found)
if (!command) {
  // Use our new custom error
  const err = new CommandNotFoundError(parsed.command);
  return {
    output: `${err.message}\nType 'help' for available commands.`,
    error: true
  };
}


Test: Create src/utils/CommandDispatcher.test.ts:
// src/utils/CommandDispatcher.test.ts
import { describe, it, expect, vi } from 'vitest';
import { CommandDispatcher } from './CommandDispatcher';
import { CommandNotFoundError, AppError } from './errors';

it('should return a standardized error if a command throws', async () => {
  const dispatcher = new CommandDispatcher();
  const errorCommand = {
    name: 'fail',
    execute: () => { throw new AppError('This failed'); }
  };
  dispatcher.registerCommand(errorCommand);

  const result = await dispatcher.dispatch('fail');
  expect(result.error).toBe(true);
  expect(result.output).toBe('This failed');
});

it('should return a CommandNotFoundError', async () => {
  const dispatcher = new CommandDispatcher();
  const result = await dispatcher.dispatch('badcommand');
  expect(result.error).toBe(true);
  expect(result.output).toContain('Command not found: badcommand');
});


2.3. Refactor & Test: Typed Command Arguments
Source Audit: Finding 6.3 (Manual Arg Parsing).
Refactor: Create src/utils/CommandArgs.ts:
// src/utils/CommandArgs.ts
export class CommandArgs {
  private flags: Map<string, string | boolean> = new Map();
  private positionals: string[] = [];

  constructor(args: string[]) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith('--')) {
        const flagName = arg.substring(2);
        if (args[i+1] && !args[i+1].startsWith('--')) {
          this.flags.set(flagName, args[i+1]); // e.g., --tag foo
          i++;
        } else {
          this.flags.set(flagName, true); // e.g., --verbose
        }
      } else {
        this.positionals.push(arg);
      }
    }
  }

  getFlag(name: string): string | boolean | undefined {
    return this.flags.get(name);
  }

  getPositional(index: number): string | undefined {
    return this.positionals[index];
  }
}


Test: Create src/utils/CommandArgs.test.ts:
// src/utils/CommandArgs.test.ts
import { describe, it, expect } from 'vitest';
import { CommandArgs } from './CommandArgs';

it('should parse positional and flag arguments', () => {
  const args = new CommandArgs(['post-1', '--tag', 'ai', '--verbose']);
  expect(args.getPositional(0)).toBe('post-1');
  expect(args.getFlag('tag')).toBe('ai');
  expect(args.getFlag('verbose')).toBe(true);
});


Refactor: Update createBlogCommand:
// src/commands/local/blog.ts
import { CommandArgs } from '../../utils/CommandArgs';

// ... inside execute method
const cmdArgs = new CommandArgs(args);
const filterTag = cmdArgs.getFlag('tag') as string | undefined;
const postId = cmdArgs.getPositional(0);
// ... rest of logic


Phase 3: Decouple Core UI Logic
Source Audit: Finding 2.2 (Moderate Cognitive Load in Terminal.ts).
Goal: Make Terminal.ts a "dumb" UI component by extracting its execution logic.
3.1. Refactor: Create CommandExecutor.ts
Create src/utils/CommandExecutor.ts. This class will contain the logic from Terminal.setupInputHandler.
// src/utils/CommandExecutor.ts
import type { CommandDispatcher } from './CommandDispatcher';
import type { AliasManager } from './AliasManager';
import { PipelineParser } from './PipelineParser';
import type { CommandResult } from '../commands/Command';

export class CommandExecutor {
  constructor(
    private dispatcher: CommandDispatcher,
    private aliasManager: AliasManager
  ) {}

  public async execute(command: string): Promise<CommandResult> {
    const trimmedValue = command.trim();
    if (!trimmedValue) {
      return { output: '' };
    }

    const resolvedCommand = this.aliasManager.resolve(trimmedValue);

    const result = PipelineParser.hasPipe(resolvedCommand)
      ? await this.dispatcher.dispatchPipeline(resolvedCommand)
      : await this.dispatcher.dispatch(resolvedCommand);

    return result;
  }
}


3.2. Refactor: Simplify Terminal.ts
Terminal.ts will now create and use the CommandExecutor.
// src/components/Terminal.ts
import { CommandExecutor } from '../utils/CommandExecutor'; // Import new class

export class Terminal {
  // ... (private input, output, dispatcher, aliasManager)
  private executor: CommandExecutor; // Add this

  constructor() {
    // ... (other setup)
    this.dispatcher = new CommandDispatcher();
    // this.aliasManager is set via setAliasManager
    
    // We must wait until aliasManager is set to create the executor
  }

  setAliasManager(aliasManager: AliasManager): void {
    this.aliasManager = aliasManager;
    // NOW we can create the executor
    this.executor = new CommandExecutor(this.dispatcher, this.aliasManager);
  }

  private setupInputHandler(): void {
    this.input.onSubmit(async (value) => {
      this.output.writeCommand(this.getPromptString(), value);
      this.input.addToHistory(value);

      // --- Logic is now delegated ---
      const result = await this.executor.execute(value);
      // --- End of delegation ---

      // Handle displaying the result (this stays in Terminal.ts)
      if (result.output === COMMAND_SIGNALS.CLEAR_SCREEN) {
        this.output.clear();
      } else if (result.output && !result.raw) {
        // ... (display logic for error, html, text)
      }

      this.input.clear();
      this.input.focus();
    });
  }
  // ...
}


(Note: You will need to adjust executeCommand to use the new executor as well)
3.3. Test: Create src/utils/CommandExecutor.test.ts
Now you can test the execution logic without a real UI.
// src/utils/CommandExecutor.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommandExecutor } from './CommandExecutor';
import { CommandDispatcher } from './CommandDispatcher';
import { AliasManager } from './AliasManager';

// Mock the dependencies
vi.mock('./CommandDispatcher');
vi.mock('./AliasManager');
vi.mock('./PipelineParser', () => ({
  PipelineParser: {
    hasPipe: vi.fn(),
  },
}));

describe('CommandExecutor', () => {
  let executor: CommandExecutor;
  let mockDispatcher: CommandDispatcher;
  let mockAliasManager: AliasManager;

  beforeEach(() => {
    // Create new mocks for each test
    mockDispatcher = new CommandDispatcher();
    mockAliasManager = new AliasManager(null as any); // Pass mock fs if needed
    
    // Spy on the methods
    vi.spyOn(mockAliasManager, 'resolve').mockImplementation(cmd => cmd);
    vi.spyOn(mockDispatcher, 'dispatch').mockResolvedValue({ output: 'dispatch' });
    vi.spyOn(mockDispatcher, 'dispatchPipeline').mockResolvedValue({ output: 'pipeline' });

    executor = new CommandExecutor(mockDispatcher, mockAliasManager);
  });

  it('should call dispatch for a simple command', async () => {
    vi.mocked(PipelineParser.hasPipe).mockReturnValue(false);
    
    const result = await executor.execute('ls');
    
    expect(mockAliasManager.resolve).toHaveBeenCalledWith('ls');
    expect(mockDispatcher.dispatch).toHaveBeenCalledWith('ls');
    expect(mockDispatcher.dispatchPipeline).not.toHaveBeenCalled();
    expect(result.output).toBe('dispatch');
  });

  it('should call dispatchPipeline for a piped command', async () => {
    vi.mocked(PipelineParser.hasPipe).mockReturnValue(true);
    
    const result = await executor.execute('ls | cat');
    
    expect(mockAliasManager.resolve).toHaveBeenCalledWith('ls | cat');
    expect(mockDispatcher.dispatch).not.toHaveBeenCalled();
    expect(mockDispatcher.dispatchPipeline).toHaveBeenCalledWith('ls | cat');
    expect(result.output).toBe('pipeline');
  });
});


Conclusion
By following this phased, slice-by-slice approach, you will systematically transform the codebase into one that is clean, maintainable, and—most importantly—protected by a robust test suite. Each phase builds upon the last, reducing risk and making future development faster and safer.

