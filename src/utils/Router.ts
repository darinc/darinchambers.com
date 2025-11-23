/**
 * Router Service
 *
 * Handles URL-based routing for the terminal application using the History API.
 * Maps URLs to terminal commands and keeps the address bar in sync with navigation.
 */

import { PATHS } from '../constants';
import { BlogParser } from './BlogParser';
import type { Terminal } from '../components/Terminal';
import type { IFileSystem } from './fs/IFileSystem';

interface Route {
  pattern: RegExp;
  commandBuilder: (matches: RegExpMatchArray, queryParams?: URLSearchParams) => string;
}

export class Router {
  private terminal: Terminal;
  private routes: Route[];
  private isNavigating = false;
  private onRouteChangeCallback: ((command: string) => void) | null = null;
  private fileSystem: IFileSystem;

  /**
   * Creates a new Router instance.
   *
   * @param terminal Terminal instance for command execution
   * @param fileSystem File system for validating blog posts and portfolio items
   */
  constructor(terminal: Terminal, fileSystem: IFileSystem) {
    this.terminal = terminal;
    this.fileSystem = fileSystem;
    this.routes = this.initializeRoutes();
    this.setupListeners();
  }

  /**
   * Initialize route patterns and their command mappings.
   */
  private initializeRoutes(): Route[] {
    return [
      // Blog post route: /blog/:postId
      {
        pattern: /^\/blog\/([a-zA-Z0-9-]+)$/,
        commandBuilder: (matches) => `blog ${matches[1]}`,
      },
      // Blog list route: /blog
      {
        pattern: /^\/blog\/?$/,
        commandBuilder: () => 'blog',
      },
      // About route: /about
      {
        pattern: /^\/about\/?$/,
        commandBuilder: () => 'about',
      },
      // Portfolio project route: /portfolio/:projectId
      {
        pattern: /^\/portfolio\/([a-zA-Z0-9-]+)$/,
        commandBuilder: (matches) => `portfolio ${matches[1]}`,
      },
      // Portfolio list route: /portfolio (with optional tag filtering)
      {
        pattern: /^\/portfolio\/?$/,
        commandBuilder: (_matches, queryParams) => {
          const tags = queryParams?.get('tags');
          if (tags) {
            return `portfolio --tags ${tags}`;
          }
          return 'portfolio';
        },
      },
      // Contact route: /contact
      {
        pattern: /^\/contact\/?$/,
        commandBuilder: () => 'contact',
      },
      // Settings route: /settings
      {
        pattern: /^\/settings\/?$/,
        commandBuilder: () => 'settings',
      },
      // Help route: /help
      {
        pattern: /^\/help\/?$/,
        commandBuilder: () => 'help',
      },
      // Matrix route: /matrix
      {
        pattern: /^\/matrix\/?$/,
        commandBuilder: () => 'matrix',
      },
      // Home route: /
      {
        pattern: /^\/$/,
        commandBuilder: () => 'about',
      },
    ];
  }

  /**
   * Set up event listeners for browser navigation.
   */
  private setupListeners(): void {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRouteChange(false);
    });
  }

  /**
   * Handle initial page load routing.
   * Call this once after terminal is fully initialized.
   *
   * Also handles GitHub Pages SPA redirect workaround by checking sessionStorage
   * for a saved redirect path from 404.html.
   */
  handleInitialRoute(): void {
    // GitHub Pages SPA redirect workaround
    // Check if we're being redirected from 404.html
    const redirectPath = sessionStorage.getItem('ghPagesRedirect');
    if (redirectPath) {
      sessionStorage.removeItem('ghPagesRedirect');
      // Use replaceState to replace the history entry
      window.history.replaceState({}, '', redirectPath);
    }

    this.handleRouteChange(false);
  }

  /**
   * Parse current URL and execute corresponding command.
   *
   * @param clearTerminal Whether to clear terminal before executing command
   */
  private handleRouteChange(clearTerminal: boolean): void {
    const pathname = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);
    const command = this.parseRoute(pathname, queryParams);

    if (command) {
      // Prevent infinite loop - don't trigger navigate() from command execution
      this.isNavigating = true;
      void this.terminal.executeCommand(command, clearTerminal);
      this.isNavigating = false;

      // Notify callback of route change (for aria-current updates)
      if (this.onRouteChangeCallback) {
        this.onRouteChangeCallback(command);
      }
    } else {
      // Unknown route - redirect to home
      this.navigate('/', true);
    }
  }

  /**
   * Parse a URL pathname and return the corresponding command.
   *
   * @param pathname URL pathname to parse
   * @param queryParams Optional query parameters from the URL
   * @returns Command string or null if no match
   */
  private parseRoute(pathname: string, queryParams?: URLSearchParams): string | null {
    for (const route of this.routes) {
      const matches = pathname.match(route.pattern);
      if (matches) {
        return route.commandBuilder(matches, queryParams);
      }
    }
    return null;
  }

  /**
   * Navigate to a new URL and execute the corresponding command.
   * Updates browser history and address bar without page reload.
   *
   * @param path URL path to navigate to (e.g., '/blog' or '/about')
   * @param clearTerminal Whether to clear terminal before executing command
   */
  navigate(path: string, clearTerminal = true): void {
    // Don't push state if we're already handling a route change
    if (this.isNavigating) {
      return;
    }

    // Update browser history and URL
    window.history.pushState({}, '', path);

    // Execute the corresponding command
    this.handleRouteChange(clearTerminal);
  }

  /**
   * Get all valid blog post IDs from the file system.
   * @returns Set of valid blog post IDs
   */
  private getValidBlogPostIds(): Set<string> {
    try {
      const blogDir = PATHS.CONTENT_BLOG;
      const files = this.fileSystem.list(blogDir);
      const blogFiles = files.filter((f) => f.endsWith('.md'));

      const validIds = new Set<string>();
      for (const filename of blogFiles) {
        const id = BlogParser.getIdFromFilename(filename);
        validIds.add(id);
      }
      return validIds;
    } catch {
      // If we can't read the blog directory, return empty set
      return new Set();
    }
  }

  /**
   * Get the route path for a given command.
   * Useful for updating URL when user types commands directly.
   *
   * @param command Command string (e.g., 'blog' or 'blog 2024-09-15-ai-production-lessons')
   * @returns URL path or null if command doesn't map to a route
   */
  getPathForCommand(command: string): string | null {
    const trimmed = command.trim();

    // Handle blog post commands
    if (trimmed.startsWith('blog ') && !trimmed.includes('--tag')) {
      const postId = trimmed.substring(5).trim();

      // Validate that the blog post exists before returning the path
      const validIds = this.getValidBlogPostIds();
      if (validIds.has(postId)) {
        return `/blog/${postId}`;
      }

      // If the blog post doesn't exist, don't return a path
      return null;
    }

    // Handle portfolio commands with tag filtering
    if (trimmed.startsWith('portfolio --tags ')) {
      const tagsValue = trimmed.substring('portfolio --tags '.length).trim();
      if (tagsValue) {
        return `/portfolio?tags=${encodeURIComponent(tagsValue)}`;
      }
      return '/portfolio';
    }

    // Handle portfolio project commands
    if (trimmed.startsWith('portfolio ')) {
      const projectId = trimmed.substring(10).trim();
      return `/portfolio/${projectId}`;
    }

    // Handle simple command mappings
    const commandMap: Record<string, string> = {
      blog: '/blog',
      about: '/about',
      portfolio: '/portfolio',
      contact: '/contact',
      settings: '/settings',
      help: '/help',
      matrix: '/matrix',
    };

    return commandMap[trimmed] || null;
  }

  /**
   * Update URL to match a command that was executed.
   * Call this when user types a command directly in terminal.
   *
   * @param command Command that was executed
   */
  syncUrlToCommand(command: string): void {
    const path = this.getPathForCommand(command);
    if (path && window.location.pathname !== path) {
      // Update URL without executing command again
      window.history.pushState({}, '', path);
    }

    // Notify callback of command execution (for aria-current updates)
    if (this.onRouteChangeCallback) {
      this.onRouteChangeCallback(command);
    }
  }

  /**
   * Register a callback to be notified when routes change.
   * Useful for updating aria-current on navigation elements.
   *
   * @param callback Function to call with the executed command
   */
  onRouteChange(callback: (command: string) => void): void {
    this.onRouteChangeCallback = callback;
  }

  /**
   * Get the current command based on the current URL.
   *
   * @returns Current command string or null if no match
   */
  getCurrentCommand(): string | null {
    const queryParams = new URLSearchParams(window.location.search);
    return this.parseRoute(window.location.pathname, queryParams);
  }
}
