/**
 * CommandArgs provides typed argument parsing for commands.
 * Handles both flags (--flag, --key value) and positional arguments.
 */
export class CommandArgs {
  private flags: Map<string, string | boolean> = new Map();
  private positionals: string[] = [];

  constructor(args: string[]) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith('--')) {
        const flagName = arg.substring(2);
        // Check if next arg exists and is not a flag (value for this flag)
        const nextArg = args[i + 1];
        if (nextArg !== undefined && !nextArg.startsWith('--') && !nextArg.startsWith('-')) {
          this.flags.set(flagName, nextArg); // e.g., --tag foo
          i++; // Skip the value in next iteration
        } else {
          this.flags.set(flagName, true); // e.g., --verbose
        }
      } else if (arg.startsWith('-') && arg.length === 2) {
        // Single letter flags like -L
        const flagName = arg.substring(1);
        const nextArg = args[i + 1];
        if (nextArg !== undefined && !nextArg.startsWith('-')) {
          this.flags.set(flagName, nextArg); // e.g., -L 3
          i++; // Skip the value in next iteration
        } else {
          this.flags.set(flagName, true); // e.g., -v
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
