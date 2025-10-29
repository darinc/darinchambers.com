import type { IFileSystem } from './fs/IFileSystem';
import { PATHS } from '../constants';

export class AliasManager {
  private aliases: Map<string, string> = new Map();
  private fileSystem: IFileSystem;
  private aliasFilePath: string = PATHS.CONFIG_ALIASES;

  constructor(fileSystem: IFileSystem) {
    this.fileSystem = fileSystem;
    this.loadAliases();
  }

  private loadAliases(): void {
    try {
      if (this.fileSystem.exists(this.aliasFilePath) && this.fileSystem.isFile(this.aliasFilePath)) {
        const content = this.fileSystem.readFile(this.aliasFilePath);
        const lines = content.split('\n').filter(line => line.trim());

        lines.forEach(line => {
          const match = line.match(/^alias\s+(\S+)='(.+)'$/);
          if (match) {
            this.aliases.set(match[1], match[2]);
          }
        });
      }
    } catch (error) {
      // If file doesn't exist or can't be read, start with empty aliases
    }
  }

  private saveAliases(): void {
    const lines = Array.from(this.aliases.entries())
      .map(([name, command]) => `alias ${name}='${command}'`);

    const content = lines.join('\n') + (lines.length > 0 ? '\n' : '');

    try {
      // Write to file system
      this.fileSystem.writeFile(this.aliasFilePath, content);
    } catch (error) {
      throw new Error(`Failed to save aliases: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  setAlias(name: string, command: string): void {
    // Validate alias name (no spaces, valid identifier)
    if (!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name)) {
      throw new Error(`Invalid alias name: ${name}`);
    }

    this.aliases.set(name, command);
    this.saveAliases();
  }

  removeAlias(name: string): boolean {
    const existed = this.aliases.has(name);
    if (existed) {
      this.aliases.delete(name);
      this.saveAliases();
    }
    return existed;
  }

  getAlias(name: string): string | undefined {
    return this.aliases.get(name);
  }

  getAllAliases(): Map<string, string> {
    return new Map(this.aliases);
  }

  resolve(input: string): string {
    // Parse the command name from input
    const commandMatch = input.match(/^(\S+)/);
    if (!commandMatch) return input;

    const commandName = commandMatch[1];
    const alias = this.aliases.get(commandName);

    if (alias) {
      // Replace the command name with the alias expansion
      return input.replace(/^(\S+)/, alias);
    }

    return input;
  }
}
