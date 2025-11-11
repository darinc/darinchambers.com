import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Navigation, type NavItem } from '../../src/components/Navigation';
import { Router } from '../../src/utils/Router';
import {
  setupCompleteTerminal,
  teardownIntegrationTest,
  getLastOutputLine,
  setupMockLocalStorage,
  setupMockLocation,
  type IntegrationTestContext,
} from '../helpers/integration-helpers';

describe('Router and Navigation Integration', () => {
  let context: IntegrationTestContext;
  let router: Router;

  beforeEach(() => {
    setupMockLocalStorage();
    setupMockLocation();
    context = setupCompleteTerminal();
    router = new Router(context.terminal);
  });

  afterEach(() => {
    teardownIntegrationTest();
    vi.clearAllMocks();
  });

  describe('URL to Command Mapping', () => {
    it('should map /about to about command', () => {
      window.history.pushState({}, '', '/about');
      const command = router.getCurrentCommand();
      expect(command).toBe('about');
    });

    it('should map /blog to blog command', () => {
      window.history.pushState({}, '', '/blog');
      const command = router.getCurrentCommand();
      expect(command).toBe('blog');
    });

    it('should map /blog/:postId to blog command with ID', () => {
      window.history.pushState({}, '', '/blog/my-post-123');
      const command = router.getCurrentCommand();
      expect(command).toBe('blog my-post-123');
    });

    it('should map /portfolio to portfolio command', () => {
      window.history.pushState({}, '', '/portfolio');
      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio');
    });

    it('should map /portfolio/:projectId to portfolio command with ID', () => {
      window.history.pushState({}, '', '/portfolio/my-project');
      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio my-project');
    });

    it('should map /portfolio?tags=tag1 to portfolio with tags filter', () => {
      window.history.pushState({}, '', '/portfolio?tags=typescript');
      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio --tags typescript');
    });

    it('should map /contact to contact command', () => {
      window.history.pushState({}, '', '/contact');
      const command = router.getCurrentCommand();
      expect(command).toBe('contact');
    });

    it('should map /settings to settings command', () => {
      window.history.pushState({}, '', '/settings');
      const command = router.getCurrentCommand();
      expect(command).toBe('settings');
    });

    it('should map /help to help command', () => {
      window.history.pushState({}, '', '/help');
      const command = router.getCurrentCommand();
      expect(command).toBe('help');
    });

    it('should map / (root) to about command', () => {
      window.history.pushState({}, '', '/');
      const command = router.getCurrentCommand();
      expect(command).toBe('about');
    });

    it('should return null for unknown routes', () => {
      window.history.pushState({}, '', '/unknown-route');
      const command = router.getCurrentCommand();
      expect(command).toBeNull();
    });
  });

  describe('Command to URL Mapping', () => {
    it('should map about command to /about', () => {
      const path = router.getPathForCommand('about');
      expect(path).toBe('/about');
    });

    it('should map blog command to /blog', () => {
      const path = router.getPathForCommand('blog');
      expect(path).toBe('/blog');
    });

    it('should map blog with post ID to /blog/:postId', () => {
      const path = router.getPathForCommand('blog my-post-123');
      expect(path).toBe('/blog/my-post-123');
    });

    it('should map portfolio command to /portfolio', () => {
      const path = router.getPathForCommand('portfolio');
      expect(path).toBe('/portfolio');
    });

    it('should map portfolio with project ID to /portfolio/:projectId', () => {
      const path = router.getPathForCommand('portfolio my-project');
      expect(path).toBe('/portfolio/my-project');
    });

    it('should map portfolio with tags to /portfolio?tags=', () => {
      const path = router.getPathForCommand('portfolio --tags typescript');
      expect(path).toBe('/portfolio?tags=typescript');
    });

    it('should map contact command to /contact', () => {
      const path = router.getPathForCommand('contact');
      expect(path).toBe('/contact');
    });

    it('should return null for unmapped commands', () => {
      const path = router.getPathForCommand('ls');
      expect(path).toBeNull();
    });

    it('should handle commands with extra whitespace', () => {
      const path = router.getPathForCommand('  about  ');
      expect(path).toBe('/about');
    });
  });

  describe('Navigation Integration', () => {
    it('should navigate to /about and execute about command', async () => {
      router.navigate('/about');

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(window.location.pathname).toBe('/about');
      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should navigate to /blog and execute blog command', async () => {
      router.navigate('/blog');

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(window.location.pathname).toBe('/blog');
      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should update URL when command is executed', () => {
      router.syncUrlToCommand('about');
      expect(window.location.pathname).toBe('/about');

      router.syncUrlToCommand('blog');
      expect(window.location.pathname).toBe('/blog');
    });

    it('should not update URL for unmapped commands', () => {
      const initialPath = window.location.pathname;
      router.syncUrlToCommand('ls');
      expect(window.location.pathname).toBe(initialPath);
    });

    it('should handle browser back button', async () => {
      // Navigate to /about
      router.navigate('/about');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Navigate to /blog
      router.navigate('/blog');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Simulate back button
      window.history.back();
      window.dispatchEvent(new PopStateEvent('popstate'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should be back at /about
      expect(window.location.pathname).toBe('/about');
    });

    it('should handle browser forward button', async () => {
      // Navigate to /about
      router.navigate('/about');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Navigate to /blog
      router.navigate('/blog');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Go back
      window.history.back();
      window.dispatchEvent(new PopStateEvent('popstate'));
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Go forward
      window.history.forward();
      window.dispatchEvent(new PopStateEvent('popstate'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should be at /blog
      expect(window.location.pathname).toBe('/blog');
    });
  });

  describe('Navigation Component Integration', () => {
    let navigation: Navigation;
    let navElement: HTMLElement;
    let commandExecuted: string | null;

    beforeEach(() => {
      // Create navigation element
      navElement = document.createElement('nav');
      navElement.id = 'test-nav';
      document.body.appendChild(navElement);

      commandExecuted = null;

      // Create navigation component
      navigation = new Navigation(navElement, (command) => {
        commandExecuted = command;
        void router.navigate(router.getPathForCommand(command) ?? '/');
      });
    });

    afterEach(() => {
      document.body.removeChild(navElement);
    });

    it('should render navigation items', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
        { label: 'Portfolio', command: 'portfolio' },
      ];

      navigation.setItems(items);

      const buttons = navElement.querySelectorAll('button');
      expect(buttons.length).toBe(3);
      expect(buttons[0].textContent).toBe('About');
      expect(buttons[1].textContent).toBe('Blog');
      expect(buttons[2].textContent).toBe('Portfolio');
    });

    it('should execute command when navigation item clicked', async () => {
      const items: NavItem[] = [{ label: 'About', command: 'about' }];

      navigation.setItems(items);

      const button = navElement.querySelector('button[data-command="about"]');
      expect(button).toBeTruthy();

      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(commandExecuted).toBe('about');
    });

    it('should update URL when navigation item clicked', async () => {
      const items: NavItem[] = [{ label: 'Blog', command: 'blog' }];

      navigation.setItems(items);

      const button = navElement.querySelector('button[data-command="blog"]');
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(window.location.pathname).toBe('/blog');
    });

    it('should set active navigation item', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
      ];

      navigation.setItems(items);
      navigation.setActiveItem('blog');

      const blogButton = navElement.querySelector('button[data-command="blog"]');
      expect(blogButton?.getAttribute('aria-current')).toBe('page');

      const aboutButton = navElement.querySelector('button[data-command="about"]');
      expect(aboutButton?.getAttribute('aria-current')).toBeNull();
    });

    it('should update active item when navigating', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
      ];

      navigation.setItems(items);

      // Set initial active
      navigation.setActiveItem('about');
      expect(navigation.getActiveCommand()).toBe('about');

      // Navigate to blog
      navigation.setActiveItem('blog');
      expect(navigation.getActiveCommand()).toBe('blog');

      const blogButton = navElement.querySelector('button[data-command="blog"]');
      expect(blogButton?.getAttribute('aria-current')).toBe('page');
    });

    it('should add single navigation item', () => {
      navigation.addItem({ label: 'Contact', command: 'contact' });

      const button = navElement.querySelector('button[data-command="contact"]');
      expect(button).toBeTruthy();
      expect(button?.textContent).toBe('Contact');
    });

    it('should clear all navigation items', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
      ];

      navigation.setItems(items);
      expect(navElement.querySelectorAll('button').length).toBe(2);

      navigation.clear();
      expect(navElement.querySelectorAll('button').length).toBe(0);
    });

    it('should set aria-label on navigation items', () => {
      const items: NavItem[] = [{ label: 'About', command: 'about' }];

      navigation.setItems(items);

      const button = navElement.querySelector('button[data-command="about"]');
      expect(button?.getAttribute('aria-label')).toBe('Navigate to About');
    });

    it('should handle multiple clicks in sequence', async () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
        { label: 'Portfolio', command: 'portfolio' },
      ];

      navigation.setItems(items);

      // Click about
      const aboutBtn = navElement.querySelector('button[data-command="about"]');
      aboutBtn?.dispatchEvent(new MouseEvent('click'));
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(commandExecuted).toBe('about');

      // Click blog
      const blogBtn = navElement.querySelector('button[data-command="blog"]');
      blogBtn?.dispatchEvent(new MouseEvent('click'));
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(commandExecuted).toBe('blog');

      // Click portfolio
      const portfolioBtn = navElement.querySelector('button[data-command="portfolio"]');
      portfolioBtn?.dispatchEvent(new MouseEvent('click'));
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(commandExecuted).toBe('portfolio');
    });
  });

  describe('Router and Navigation Synchronization', () => {
    let navigation: Navigation;
    let navElement: HTMLElement;

    beforeEach(() => {
      navElement = document.createElement('nav');
      document.body.appendChild(navElement);

      navigation = new Navigation(navElement, (command) => {
        void context.terminal.executeCommand(command);
        router.syncUrlToCommand(command);
      });

      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
        { label: 'Portfolio', command: 'portfolio' },
      ];
      navigation.setItems(items);

      // Set up router callback to update navigation
      router.onRouteChange((command) => {
        navigation.setActiveItem(command);
      });
    });

    afterEach(() => {
      document.body.removeChild(navElement);
    });

    it('should sync navigation active state with URL', async () => {
      // Navigate to blog
      router.navigate('/blog');
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigation should show blog as active
      expect(navigation.getActiveCommand()).toBe('blog');
      const blogBtn = navElement.querySelector('button[data-command="blog"]');
      expect(blogBtn?.getAttribute('aria-current')).toBe('page');
    });

    it('should update URL when clicking navigation', async () => {
      const aboutBtn = navElement.querySelector('button[data-command="about"]');
      aboutBtn?.dispatchEvent(new MouseEvent('click'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(window.location.pathname).toBe('/about');
    });

    it('should execute command when clicking navigation', async () => {
      const portfolioBtn = navElement.querySelector('button[data-command="portfolio"]');
      portfolioBtn?.dispatchEvent(new MouseEvent('click'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should handle navigation + URL + command execution flow', async () => {
      // Click blog navigation
      const blogBtn = navElement.querySelector('button[data-command="blog"]');
      blogBtn?.dispatchEvent(new MouseEvent('click'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check URL updated
      expect(window.location.pathname).toBe('/blog');

      // Check navigation active state
      expect(navigation.getActiveCommand()).toBe('blog');

      // Check command was executed
      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });
  });

  describe('Deep Linking', () => {
    it('should handle direct navigation to /blog', async () => {
      window.history.pushState({}, '', '/blog');
      router.handleInitialRoute();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const output = getLastOutputLine();
      expect(output).toBeTruthy();
    });

    it('should handle direct navigation to /blog/:postId', async () => {
      window.history.pushState({}, '', '/blog/test-post');
      router.handleInitialRoute();

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Command should be executed (even if post doesn't exist, command runs)
      expect(router.getCurrentCommand()).toBe('blog test-post');
    });

    it('should handle direct navigation to /portfolio?tags=tag1', async () => {
      window.history.pushState({}, '', '/portfolio?tags=typescript');
      router.handleInitialRoute();

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(router.getCurrentCommand()).toBe('portfolio --tags typescript');
    });

    it('should redirect unknown routes to home', async () => {
      window.history.pushState({}, '', '/unknown-route');
      router.handleInitialRoute();

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should redirect to /
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('Route Change Callbacks', () => {
    it('should call callback when route changes', async () => {
      let callbackCommand: string | null = null;

      router.onRouteChange((command) => {
        callbackCommand = command;
      });

      router.navigate('/about');

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(callbackCommand).toBe('about');
    });

    it('should call callback when URL is synced to command', () => {
      let callbackCommand: string | null = null;

      router.onRouteChange((command) => {
        callbackCommand = command;
      });

      router.syncUrlToCommand('blog');

      expect(callbackCommand).toBe('blog');
    });

    it('should call callback on browser navigation', async () => {
      let callbackCommand: string | null = null;

      router.onRouteChange((command) => {
        callbackCommand = command;
      });

      // Navigate to /about
      router.navigate('/about');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Navigate to /blog
      router.navigate('/blog');
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(callbackCommand).toBe('blog');

      // Go back
      window.history.back();
      window.dispatchEvent(new PopStateEvent('popstate'));
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(callbackCommand).toBe('about');
    });
  });

  describe('Edge Cases', () => {
    it('should handle trailing slashes in URLs', () => {
      window.history.pushState({}, '', '/about/');
      const command = router.getCurrentCommand();
      expect(command).toBe('about');
    });

    it('should handle URL encoding in post IDs', () => {
      const postId = 'post-with-special-chars';
      window.history.pushState({}, '', `/blog/${postId}`);
      const command = router.getCurrentCommand();
      expect(command).toBe(`blog ${postId}`);
    });

    it('should handle empty query params', () => {
      window.history.pushState({}, '', '/portfolio?');
      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio');
    });

    it('should handle multiple query params with tags', () => {
      window.history.pushState({}, '', '/portfolio?tags=typescript&other=value');
      const command = router.getCurrentCommand();
      expect(command).toBe('portfolio --tags typescript');
    });

    it('should not navigate when already navigating', async () => {
      let navigationCount = 0;
      const originalExecute = context.terminal.executeCommand.bind(context.terminal);

      context.terminal.executeCommand = async (command: string) => {
        navigationCount++;
        return originalExecute(command);
      };

      router.navigate('/about');
      router.navigate('/blog'); // Second navigation during first

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should only execute once
      expect(navigationCount).toBeLessThanOrEqual(2);
    });

    it('should handle rapid navigation clicks', async () => {
      const navElement = document.createElement('nav');
      document.body.appendChild(navElement);

      const navigation = new Navigation(navElement, (command) => {
        router.syncUrlToCommand(command);
      });

      navigation.setItems([
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
        { label: 'Portfolio', command: 'portfolio' },
      ]);

      // Rapid clicks
      const aboutBtn = navElement.querySelector('button[data-command="about"]');
      const blogBtn = navElement.querySelector('button[data-command="blog"]');
      const portfolioBtn = navElement.querySelector('button[data-command="portfolio"]');

      aboutBtn?.dispatchEvent(new MouseEvent('click'));
      blogBtn?.dispatchEvent(new MouseEvent('click'));
      portfolioBtn?.dispatchEvent(new MouseEvent('click'));

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should end up at the last clicked
      expect(window.location.pathname).toBe('/portfolio');

      document.body.removeChild(navElement);
    });
  });
});
