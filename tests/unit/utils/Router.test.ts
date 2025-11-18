import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Router } from '../../../src/utils/Router';
import type { Terminal } from '../../../src/components/Terminal';
import type { IFileSystem } from '../../../src/utils/fs/IFileSystem';

describe('Router', () => {
  let mockTerminal: Terminal;
  let mockFileSystem: IFileSystem;
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

    // Create mock filesystem with test blog posts
    mockFileSystem = {
      list: vi.fn((path: string) => {
        if (path === '/home/darin/blog') {
          return ['2024-01-01-test-post.md', '2024-01-02-my-post-123.md'];
        }
        return [];
      }),
      readFile: vi.fn(),
      exists: vi.fn(),
      isDirectory: vi.fn(),
      isFile: vi.fn(),
      writeFile: vi.fn(),
      createDirectory: vi.fn(),
      getCurrentPath: vi.fn(),
      setCurrentUsername: vi.fn(),
      getShortPath: vi.fn(),
      changeDirectory: vi.fn(),
      getTree: vi.fn(),
      getNode: vi.fn(),
    } as unknown as IFileSystem;

    // Create router (will set up listeners)
    router = new Router(mockTerminal, mockFileSystem);
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

    it('should parse /portfolio/:projectId route', () => {
      window.location.pathname = '/portfolio/scaling-hypergrowth';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith(
        'portfolio scaling-hypergrowth',
        false
      );
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

    it('should parse /matrix route', () => {
      window.location.pathname = '/matrix';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('matrix', false);
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

    it('should return /portfolio/:projectId for "portfolio projectId" command', () => {
      expect(router.getPathForCommand('portfolio scaling-hypergrowth')).toBe(
        '/portfolio/scaling-hypergrowth'
      );
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

    it('should return /matrix for "matrix" command', () => {
      expect(router.getPathForCommand('matrix')).toBe('/matrix');
    });

    it('should return null for unmapped commands', () => {
      expect(router.getPathForCommand('ls')).toBeNull();
      expect(router.getPathForCommand('echo')).toBeNull();
      expect(router.getPathForCommand('pwd')).toBeNull();
      expect(router.getPathForCommand('figlet')).toBeNull();
      expect(router.getPathForCommand('ddate')).toBeNull();
    });

    it('should ignore blog commands with --tags flag', () => {
      expect(router.getPathForCommand('blog --tags test')).toBeNull();
    });

    it('should return /portfolio?tags= for "portfolio --tags" command with single tag', () => {
      expect(router.getPathForCommand('portfolio --tags major')).toBe('/portfolio?tags=major');
    });

    it('should return /portfolio?tags= for "portfolio --tags" command with multiple tags', () => {
      expect(router.getPathForCommand('portfolio --tags major,patents')).toBe(
        '/portfolio?tags=major%2Cpatents'
      );
    });

    it('should URL encode tags with special characters', () => {
      expect(router.getPathForCommand('portfolio --tags revenue-generation,video streaming')).toBe(
        '/portfolio?tags=revenue-generation%2Cvideo%20streaming'
      );
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

  describe('Query Parameters', () => {
    it('should parse /portfolio?tags=single with single tag', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '?tags=major';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('portfolio --tags major', false);
    });

    it('should parse /portfolio?tags=multiple,tags with multiple tags', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '?tags=major,patents';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith(
        'portfolio --tags major,patents',
        false
      );
    });

    it('should parse /portfolio?tags=kubernetes,leadership with comma-separated tags', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '?tags=kubernetes,leadership';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith(
        'portfolio --tags kubernetes,leadership',
        false
      );
    });

    it('should handle URL-encoded tags', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '?tags=revenue-generation%2Cvideo-streaming';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith(
        'portfolio --tags revenue-generation,video-streaming',
        false
      );
    });

    it('should handle /portfolio without query params as regular portfolio command', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '';
      router.handleInitialRoute();
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith('portfolio', false);
    });

    it('should sync URL for portfolio --tags commands', () => {
      window.location.pathname = '/';
      window.location.search = '';
      router.syncUrlToCommand('portfolio --tags major');

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/portfolio?tags=major');
    });

    it('should sync URL for portfolio --tags commands with multiple tags', () => {
      window.location.pathname = '/';
      window.location.search = '';
      router.syncUrlToCommand('portfolio --tags leadership,kubernetes');

      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        '/portfolio?tags=leadership%2Ckubernetes'
      );
    });

    it('should get current command with query parameters', () => {
      window.location.pathname = '/portfolio';
      window.location.search = '?tags=major';

      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio --tags major');
    });

    it('should navigate to tag-filtered portfolio URL', () => {
      window.location.pathname = '/';

      // Mock pushState to update location when called
      (window.history.pushState as any).mockImplementation((state, title, path) => {
        const url = new URL(path, 'http://localhost');
        window.location.pathname = url.pathname;
        window.location.search = url.search;
      });

      router.navigate('/portfolio?tags=major,serious');

      expect(window.history.pushState).toHaveBeenCalledWith(
        {},
        '',
        '/portfolio?tags=major,serious'
      );
      expect(mockTerminal.executeCommand).toHaveBeenCalledWith(
        'portfolio --tags major,serious',
        true
      );
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
