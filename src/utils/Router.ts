/**
 * Router Service
 *
 * Handles URL-based routing for the terminal application using the History API.
 * Maps URLs to terminal commands and keeps the address bar in sync with navigation.
 */

import type { Terminal } from '../components/Terminal';

interface Route {
  pattern: RegExp;
  commandBuilder: (matches: RegExpMatchArray) => string;
}

export class Router {
  private terminal: Terminal;
  private routes: Route[];
  private isNavigating: boolean = false;
  private onRouteChangeCallback: ((command: string) => void) | null = null;

  /**
   * Creates a new Router instance.
   *
   * @param terminal Terminal instance for command execution
   */
  constructor(terminal: Terminal) {
    this.terminal = terminal;
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
        commandBuilder: (matches) => `blog ${matches[1]}`
      },
      // Blog list route: /blog
      {
        pattern: /^\/blog\/?$/,
        commandBuilder: () => 'blog'
      },
      // About route: /about
      {
        pattern: /^\/about\/?$/,
        commandBuilder: () => 'about'
      },
      // Portfolio route: /portfolio
      {
        pattern: /^\/portfolio\/?$/,
        commandBuilder: () => 'portfolio'
      },
      // Contact route: /contact
      {
        pattern: /^\/contact\/?$/,
        commandBuilder: () => 'contact'
      },
      // Skills route: /skills
      {
        pattern: /^\/skills\/?$/,
        commandBuilder: () => 'skills'
      },
      // Settings route: /settings
      {
        pattern: /^\/settings\/?$/,
        commandBuilder: () => 'settings'
      },
      // Help route: /help
      {
        pattern: /^\/help\/?$/,
        commandBuilder: () => 'help'
      },
      // Home route: /
      {
        pattern: /^\/$/,
        commandBuilder: () => 'about'
      }
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
   */
  handleInitialRoute(): void {
    this.handleRouteChange(false);
  }

  /**
   * Parse current URL and execute corresponding command.
   *
   * @param clearTerminal Whether to clear terminal before executing command
   */
  private handleRouteChange(clearTerminal: boolean): void {
    const pathname = window.location.pathname;
    const command = this.parseRoute(pathname);

    if (command) {
      // Prevent infinite loop - don't trigger navigate() from command execution
      this.isNavigating = true;
      this.terminal.executeCommand(command, clearTerminal);
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
   * @returns Command string or null if no match
   */
  private parseRoute(pathname: string): string | null {
    for (const route of this.routes) {
      const matches = pathname.match(route.pattern);
      if (matches) {
        return route.commandBuilder(matches);
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
  navigate(path: string, clearTerminal: boolean = true): void {
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
      return `/blog/${postId}`;
    }

    // Handle simple command mappings
    const commandMap: Record<string, string> = {
      'blog': '/blog',
      'about': '/about',
      'portfolio': '/portfolio',
      'contact': '/contact',
      'skills': '/skills',
      'settings': '/settings',
      'help': '/help'
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
    return this.parseRoute(window.location.pathname);
  }
}
