import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Router } from '../../../src/utils/Router';
import type { Terminal } from '../../../src/components/Terminal';

describe('Router', () => {
  let mockTerminal: Terminal;
  let router: Router;
  let originalLocation: Location;
  let originalHistory: History;

  beforeEach(() => {
    // Save original window objects
    originalLocation = window.location;
    originalHistory = window.history;

    // Mock window.location
    delete (window as any).location;
    window.location = {
      pathname: '/',
      href: 'http://localhost/',
      search: '',
      hash: '',
    } as Location;

    // Mock window.history
    window.history = {
      pushState: vi.fn(),
      replaceState: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      go: vi.fn(),
      length: 1,
      scrollRestoration: 'auto',
      state: null,
    } as unknown as History;

    // Create mock terminal
    mockTerminal = {
      executeCommand: vi.fn(),
    } as unknown as Terminal;

    // Create router (will set up listeners)
    router = new Router(mockTerminal);
  });

  afterEach(() => {
    // Restore original window objects
    window.location = originalLocation;
    window.history = originalHistory;
    vi.clearAllMocks();
  });

  describe('Route Parsing', () => {
    it('should parse home route /', () => {
      window.location.pathname = '/';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', false);
    });

    it('should parse /about route', () => {
      window.location.pathname = '/about';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', false);
    });

    it('should parse /about/ route with trailing slash', () => {
      window.location.pathname = '/about/';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', false);
    });

    it('should parse /blog route', () => {
      window.location.pathname = '/blog';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('blog', false);
    });

    it('should parse /blog/:postId route', () => {
      window.location.pathname = '/blog/test-post-123';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('blog test-post-123', false);
    });

    it('should parse /portfolio route', () => {
      window.location.pathname = '/portfolio';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('portfolio', false);
    });

    it('should parse /contact route', () => {
      window.location.pathname = '/contact';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('contact', false);
    });

    it('should parse /settings route', () => {
      window.location.pathname = '/settings';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('settings', false);
    });

    it('should parse /help route', () => {
      window.location.pathname = '/help';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('help', false);
    });

    it('should redirect unknown routes to home', () => {
      window.location.pathname = '/unknown-route';

      // Mock pushState to update pathname when called (prevent infinite loop)
      (window.history.pushState as any).mockImplementation((state, title, path) => {
        window.location.pathname = path;
      });

      router.handleInitialRoute();
      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/');
      expect(mockTerminal.executeCommand).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('should navigate to new path and update history', () => {
      window.location.pathname = '/';
      router.navigate('/about');

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/about');
      expect(mockTerminal.executeCommand).toHaveBeenCalled();
    });

    it('should clear terminal by default when navigating', () => {
      window.location.pathname = '/';
      router.navigate('/about');

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', true);
    });

    it('should not clear terminal when clearTerminal is false', () => {
      window.location.pathname = '/';
      router.navigate('/about', false);

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', false);
    });

    it('should prevent navigation loops', () => {
      // Simulate being in the middle of a navigation
      window.location.pathname = '/about';
      router.navigate('/blog');

      // Clear the mock to reset call count
      vi.clearAllMocks();

      // Navigation during route handling should not push state again
      window.location.pathname = '/blog';
      router.handleInitialRoute();

      expect(window.history.pushState).not.toHaveBeenCalled();
    });
  });

  describe('getPathForCommand', () => {
    it('should return /blog for "blog" command', () => {
      expect(router.getPathForCommand('blog')).toBe('/blog');
    });

    it('should return /blog/:postId for "blog postId" command', () => {
      expect(router.getPathForCommand('blog test-post')).toBe('/blog/test-post');
    });

    it('should return /about for "about" command', () => {
      expect(router.getPathForCommand('about')).toBe('/about');
    });

    it('should return /portfolio for "portfolio" command', () => {
      expect(router.getPathForCommand('portfolio')).toBe('/portfolio');
    });

    it('should return /contact for "contact" command', () => {
      expect(router.getPathForCommand('contact')).toBe('/contact');
    });

    it('should return /settings for "settings" command', () => {
      expect(router.getPathForCommand('settings')).toBe('/settings');
    });

    it('should return /help for "help" command', () => {
      expect(router.getPathForCommand('help')).toBe('/help');
    });

    it('should return null for unmapped commands', () => {
      expect(router.getPathForCommand('ls')).toBeNull();
      expect(router.getPathForCommand('echo')).toBeNull();
      expect(router.getPathForCommand('pwd')).toBeNull();
    });

    it('should ignore blog commands with --tag flag', () => {
      expect(router.getPathForCommand('blog --tag test')).toBeNull();
    });

    it('should handle whitespace in commands', () => {
      expect(router.getPathForCommand('  blog  ')).toBe('/blog');
      expect(router.getPathForCommand('  about  ')).toBe('/about');
    });
  });

  describe('syncUrlToCommand', () => {
    it('should update URL when command maps to route', () => {
      window.location.pathname = '/';
      router.syncUrlToCommand('about');

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/about');
    });

    it('should update URL for blog post commands', () => {
      window.location.pathname = '/';
      router.syncUrlToCommand('blog test-post');

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/blog/test-post');
    });

    it('should not update URL if already at correct path', () => {
      window.location.pathname = '/about';
      router.syncUrlToCommand('about');

      expect(window.history.pushState).not.toHaveBeenCalled();
    });

    it('should not update URL for unmapped commands', () => {
      window.location.pathname = '/';
      router.syncUrlToCommand('ls');

      expect(window.history.pushState).not.toHaveBeenCalled();
    });

    it('should not execute command when syncing URL', () => {
      window.location.pathname = '/';
      router.syncUrlToCommand('about');

      // executeCommand should not be called during URL sync
      expect(mockTerminal.executeCommand).not.toHaveBeenCalled();
    });
  });

  describe('Browser Navigation (popstate)', () => {
    it('should handle popstate event (back/forward buttons)', () => {
      window.location.pathname = '/about';

      // Trigger popstate event
      const popstateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popstateEvent);

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('about', false);
    });

    it('should not clear terminal on popstate', () => {
      window.location.pathname = '/blog';

      // Trigger popstate event
      const popstateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popstateEvent);

      // Second parameter should be false (don't clear)
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('blog', false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle blog post IDs with hyphens', () => {
      window.location.pathname = '/blog/2024-01-15-my-post';
      router.handleInitialRoute();

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('blog 2024-01-15-my-post', false);
    });

    it('should handle blog post IDs with alphanumeric characters', () => {
      window.location.pathname = '/blog/post123';
      router.handleInitialRoute();

      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('blog post123', false);
    });

    it('should handle multiple navigations in sequence', () => {
      router.navigate('/about');
      router.navigate('/blog');
      router.navigate('/portfolio');

      expect(window.history.pushState).toHaveBeenCalledTimes(3);
      expect(mockTerminal.executeCommand).toHaveBeenCalledTimes(3);
    });
  });
});
