/**
 * Environment Variable Manager
 *
 * Manages environment variables including platform (system) variables
 * and user-defined variables. Provides variable expansion and persistence.
 *
 * Platform Variables (auto-generated):
 * - HOME, USER, HOSTNAME, PWD, OLDPWD, SHELL, PATH, TERM, LOGNAME
 *
 * User Variables (stored in ~/.env):
 * - Custom variables set via export command or settings
 */

import { PATHS, STORAGE_KEYS } from '../constants';
import type { IFileSystem } from './fs/IFileSystem';

export type EnvironmentVariables = Record<string, string>;

export class EnvVarManager {
  private platformVars = new Map<string, string>();
  private userVars = new Map<string, string>();
  private fileSystem: IFileSystem;

  constructor(fileSystem: IFileSystem, username: string, hostname: string) {
    this.fileSystem = fileSystem;
    this.initializePlatformVariables(username, hostname);
    this.loadUserVariables();
  }

  /**
   * Initialize platform (system) environment variables.
   * These are auto-generated and cannot be permanently changed.
   */
  private initializePlatformVariables(username: string, hostname: string): void {
    const homeDir = `/home/${username}`;

    this.platformVars.set('HOME', homeDir);
    this.platformVars.set('USER', username);
    this.platformVars.set('LOGNAME', username);
    this.platformVars.set('HOSTNAME', hostname);
    this.platformVars.set('PWD', homeDir);
    this.platformVars.set('OLDPWD', '');
    this.platformVars.set('SHELL', '/bin/dcsh');
    this.platformVars.set('PATH', '/usr/local/bin:/usr/bin:/bin');
    this.platformVars.set('TERM', 'xterm-256color');
  }

  /**
   * Load user-defined variables from localStorage and virtual filesystem.
   */
  private loadUserVariables(): void {
    try {
      // Try localStorage first (primary storage)
      const stored = localStorage.getItem(STORAGE_KEYS.ENVIRONMENT);
      if (stored) {
        const vars = JSON.parse(stored) as EnvironmentVariables;
        Object.entries(vars).forEach(([key, value]) => {
          this.userVars.set(key, value);
        });
      }

      // Sync to virtual filesystem if needed
      this.syncToFileSystem();
    } catch (error) {
      console.warn('Failed to load environment variables from localStorage:', error);
    }
  }

  /**
   * Save user variables to localStorage and sync to virtual filesystem.
   */
  private saveUserVariables(): void {
    try {
      const vars: EnvironmentVariables = {};
      this.userVars.forEach((value, key) => {
        vars[key] = value;
      });

      localStorage.setItem(STORAGE_KEYS.ENVIRONMENT, JSON.stringify(vars));
      this.syncToFileSystem();
    } catch (error) {
      console.warn('Failed to save environment variables to localStorage:', error);
    }
  }

  /**
   * Sync variables to virtual filesystem as a readable file.
   */
  private syncToFileSystem(): void {
    try {
      const lines: string[] = [];

      // Add header
      lines.push('# Environment Variables');
      lines.push('# Platform variables (read-only):');

      // Platform variables
      this.platformVars.forEach((value, key) => {
        lines.push(`${key}=${value}`);
      });

      // User variables
      if (this.userVars.size > 0) {
        lines.push('');
        lines.push('# User variables:');
        this.userVars.forEach((value, key) => {
          lines.push(`export ${key}=${value}`);
        });
      }

      const content = lines.join('\n');
      this.fileSystem.writeFile(PATHS.CONFIG_ENV, content);
    } catch (error) {
      console.warn('Failed to sync environment variables to filesystem:', error);
    }
  }

  /**
   * Get an environment variable by name.
   * Checks user variables first, then platform variables.
   */
  getVariable(name: string): string | undefined {
    return this.userVars.get(name) ?? this.platformVars.get(name);
  }

  /**
   * Set a user-defined environment variable.
   * Platform variables cannot be permanently modified.
   */
  setVariable(name: string, value: string): void {
    // Validate variable name
    if (!/^[A-Z_][A-Z0-9_]*$/i.test(name)) {
      throw new Error(`Invalid variable name: ${name}`);
    }

    this.userVars.set(name, value);
    this.saveUserVariables();
  }

  /**
   * Update a platform variable (session only, not persisted).
   * Used for dynamic variables like PWD, OLDPWD.
   */
  updatePlatformVariable(name: string, value: string): void {
    if (this.platformVars.has(name)) {
      this.platformVars.set(name, value);
      // Don't persist - these are session variables
    }
  }

  /**
   * Remove a user-defined variable.
   * Platform variables cannot be removed.
   */
  unsetVariable(name: string): void {
    if (this.userVars.delete(name)) {
      this.saveUserVariables();
    }
  }

  /**
   * Get all platform variables.
   */
  getPlatformVariables(): Map<string, string> {
    return new Map(this.platformVars);
  }

  /**
   * Get all user-defined variables.
   */
  getUserVariables(): Map<string, string> {
    return new Map(this.userVars);
  }

  /**
   * Get all variables (platform + user).
   */
  getAllVariables(): Map<string, string> {
    const all = new Map<string, string>();

    // Platform vars first
    this.platformVars.forEach((value, key) => {
      all.set(key, value);
    });

    // User vars override platform vars if there's a conflict
    this.userVars.forEach((value, key) => {
      all.set(key, value);
    });

    return all;
  }

  /**
   * Expand variables in a text string.
   * Supports both $VAR and ${VAR} syntax.
   *
   * @param text Text containing variable references
   * @returns Text with variables expanded
   */
  expandVariables(text: string): string {
    let result = text;

    // Expand ${VAR} first (more specific)
    result = result.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi, (match, varName: string) => {
      const value = this.getVariable(varName);
      return value ?? match;
    });

    // Expand $VAR (but not if escaped \$VAR)
    result = result.replace(/(?<!\\)\$([A-Z_][A-Z0-9_]*)/gi, (match, varName: string) => {
      const value = this.getVariable(varName);
      return value ?? match;
    });

    // Remove escape character from \$VAR
    result = result.replace(/\\\$/g, '$');

    return result;
  }

  /**
   * Export variables as KEY=VALUE format for display.
   */
  exportFormat(): string[] {
    const lines: string[] = [];

    this.getAllVariables().forEach((value, key) => {
      lines.push(`${key}=${value}`);
    });

    return lines.sort();
  }
}
