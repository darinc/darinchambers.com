/**
 * CommandArgs provides typed argument parsing for commands.
 * Handles both flags (--flag, --key value) and positional arguments.
 */
export class CommandArgs {
  private flags: Map<string, string | boolean> = new Map();
  private positionals: string[] = [];

  // Single-letter flags that expect string values (not boolean)
  private static VALUE_FLAGS = new Set(['f', 'L', 'w']);

  constructor(args: string[]) {
    // First pass: expand combined short flags like -alh to -a -l -h
    const expandedArgs: string[] = [];
    for (const arg of args) {
      if (arg.startsWith('-') && !arg.startsWith('--') && arg.length > 2) {
        // Combined short flags like -alh
        for (let j = 1; j < arg.length; j++) {
          expandedArgs.push(`-${arg[j]}`);
        }
      } else {
        expandedArgs.push(arg);
      }
    }

    // Second pass: parse the expanded args
    for (let i = 0; i < expandedArgs.length; i++) {
      const arg = expandedArgs[i];
      if (arg.startsWith('--')) {
        const flagName = arg.substring(2);
        // Check if next arg exists and is not a flag (value for this flag)
        const nextArg = expandedArgs[i + 1];
        if (nextArg !== undefined && !nextArg.startsWith('--') && !nextArg.startsWith('-')) {
          this.flags.set(flagName, nextArg); // e.g., --tag foo
          i++; // Skip the value in next iteration
        } else {
          this.flags.set(flagName, true); // e.g., --verbose
        }
      } else if (arg.startsWith('-') && arg.length === 2) {
        // Single letter flags like -L
        const flagName = arg.substring(1);
        const nextArg = expandedArgs[i + 1];
        // Treat next arg as a value if:
        // 1. The flag is in VALUE_FLAGS (expects string values), OR
        // 2. It looks like a number (for numeric flags like -L 3)
        // Otherwise, treat the flag as boolean
        if (nextArg !== undefined && !nextArg.startsWith('-') &&
            (CommandArgs.VALUE_FLAGS.has(flagName) || /^\d+$/.test(nextArg))) {
          this.flags.set(flagName, nextArg); // e.g., -f slant, -L 3
          i++; // Skip the value in next iteration
        } else {
          this.flags.set(flagName, true); // e.g., -v, -a, -l, -h
        }
      } else {
        // It's a positional argument
        this.positionals.push(arg);
      }
    }
  }

  getFlag(name: string): string | boolean | undefined {
    return this.flags.get(name);
  }

  hasFlag(name: string): boolean {
    return this.flags.has(name);
  }

  getPositional(index: number): string | undefined {
    return this.positionals[index];
  }

  getAllFlags(): Map<string, string | boolean> {
    return new Map(this.flags);
  }

  getAllPositionals(): string[] {
    return [...this.positionals];
  }

  get positionalCount(): number {
    return this.positionals.length;
  }
}
