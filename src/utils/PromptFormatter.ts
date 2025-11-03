/**
 * Prompt Formatter
 *
 * Formats shell prompts with support for:
 * - Bash-style escape sequences (\u, \h, \w, \W, \$, etc.)
 * - Variable expansion ($VAR, ${VAR})
 * - Custom tokens ({user}, {hostname}, {path}, {lastdir})
 *
 * Common escape sequences:
 * \u - username
 * \h - hostname (short form)
 * \H - hostname (full form)
 * \w - current working directory (full path with ~ expansion)
 * \W - basename of current working directory (last dir only)
 * \$ - # if root, $ otherwise
 * \d - date (e.g., "Sat Nov 02")
 * \t - time in HH:MM:SS format
 * \A - time in HH:MM format
 * \! - history number
 * \# - command number
 * \\ - backslash
 */

import type { EnvVarManager } from './EnvVarManager';

export interface PromptContext {
  user: string;
  hostname: string;
  pwd: string;        // Full path: /home/darin/blog/posts
  shortPwd: string;   // With ~ expansion: ~/blog/posts
  lastDir: string;    // Last directory only: posts
  isRoot: boolean;
  historyNumber?: number;
  commandNumber?: number;
}

export class PromptFormatter {
  private envVarManager?: EnvVarManager;

  constructor(envVarManager?: EnvVarManager) {
    this.envVarManager = envVarManager;
  }

  /**
   * Format a prompt string with the given context.
   *
   * @param template Prompt format template
   * @param context Prompt context with user, hostname, paths, etc.
   * @returns Formatted prompt string
   */
  format(template: string, context: PromptContext): string {
    let result = template;

    // Step 1: Expand environment variables if manager is available
    if (this.envVarManager) {
      result = this.envVarManager.expandVariables(result);
    }

    // Step 2: Expand bash-style escape sequences
    result = this.expandBashEscapes(result, context);

    // Step 3: Expand custom tokens (for user-friendliness)
    result = this.expandCustomTokens(result, context);

    return result;
  }

  /**
   * Expand bash-style escape sequences.
   */
  private expandBashEscapes(template: string, context: PromptContext): string {
    let result = template;

    // User and host
    result = result.replace(/\\u/g, context.user);
    result = result.replace(/\\h/g, this.getShortHostname(context.hostname));
    result = result.replace(/\\H/g, context.hostname);

    // Path variations
    result = result.replace(/\\w/g, context.shortPwd);  // Full path with ~
    result = result.replace(/\\W/g, context.lastDir);   // Last dir only

    // Prompt character
    result = result.replace(/\\\$/g, context.isRoot ? '#' : '$');

    // Date and time
    result = result.replace(/\\d/g, this.getDate());
    result = result.replace(/\\t/g, this.getTime24());
    result = result.replace(/\\T/g, this.getTime12());
    result = result.replace(/\\A/g, this.getTimeShort());
    result = result.replace(/\\@/g, this.getTimeAMPM());

    // Command and history numbers
    if (context.historyNumber !== undefined) {
      result = result.replace(/\\!/g, String(context.historyNumber));
    }
    if (context.commandNumber !== undefined) {
      result = result.replace(/\\#/g, String(context.commandNumber));
    }

    // Literal characters
    result = result.replace(/\\\\/g, '\\');
    result = result.replace(/\\n/g, '\n');

    return result;
  }

  /**
   * Expand custom tokens (alternative to bash escapes).
   */
  private expandCustomTokens(template: string, context: PromptContext): string {
    let result = template;

    result = result.replace(/\{user\}/g, context.user);
    result = result.replace(/\{hostname\}/g, context.hostname);
    result = result.replace(/\{path\}/g, context.shortPwd);
    result = result.replace(/\{lastdir\}/g, context.lastDir);
    result = result.replace(/\{pwd\}/g, context.pwd);

    return result;
  }

  /**
   * Get short hostname (up to first dot).
   */
  private getShortHostname(hostname: string): string {
    const dotIndex = hostname.indexOf('.');
    return dotIndex > 0 ? hostname.substring(0, dotIndex) : hostname;
  }

  /**
   * Get formatted date (e.g., "Sat Nov 02").
   */
  private getDate(): string {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = String(date.getDate()).padStart(2, '0');

    return `${day} ${month} ${dayOfMonth}`;
  }

  /**
   * Get time in 24-hour format (HH:MM:SS).
   */
  private getTime24(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Get time in 12-hour format (HH:MM:SS).
   */
  private getTime12(): string {
    const date = new Date();
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hoursStr = String(hours).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
  }

  /**
   * Get time in short format (HH:MM).
   */
  private getTimeShort(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Get time in AM/PM format (HH:MM AM/PM).
   */
  private getTimeAMPM(): string {
    const date = new Date();
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hoursStr = String(hours).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hoursStr}:${minutes} ${ampm}`;
  }

  /**
   * Extract last directory from a path.
   *
   * @param path Path string (e.g., "~/blog/posts" or "/home/darin")
   * @returns Last directory component or "~" if at home, "/" if at root
   */
  static getLastDir(path: string): string {
    // Handle root directory
    if (path === '/') {
      return '/';
    }

    // Handle home directory
    if (path === '~' || path === '') {
      return '~';
    }

    // Split path and filter out empty parts
    const parts = path.split('/').filter(p => p && p !== '~');

    // Return last part or ~ if empty (shouldn't happen with above checks)
    return parts.length > 0 ? parts[parts.length - 1] : '~';
  }
}
