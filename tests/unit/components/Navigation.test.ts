import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Navigation, type NavItem } from '../../../src/components/Navigation';
import { setupNavigationDOM, cleanupDOM, querySelector } from '../../helpers/dom-setup';

describe('Navigation', () => {
  let navigation: Navigation;
  let navLinksElement: HTMLElement;
  let onCommandClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setupNavigationDOM();
    navLinksElement = querySelector('.nav-links');
    onCommandClickMock = vi.fn();
    navigation = new Navigation(navLinksElement, onCommandClickMock);
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('setItems', () => {
    it('should set navigation items', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' },
        { label: 'Portfolio', command: 'portfolio' }
      ];

      navigation.setItems(items);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(3);
      expect(links[0].textContent).toBe('About');
      expect(links[1].textContent).toBe('Blog');
      expect(links[2].textContent).toBe('Portfolio');
    });

    it('should set data-command attributes', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog list' }
      ];

      navigation.setItems(items);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links[0].getAttribute('data-command')).toBe('about');
      expect(links[1].getAttribute('data-command')).toBe('blog list');
    });

    it('should clear existing items before setting new ones', () => {
      const items1: NavItem[] = [{ label: 'Item1', command: 'cmd1' }];
      const items2: NavItem[] = [
        { label: 'Item2', command: 'cmd2' },
        { label: 'Item3', command: 'cmd3' }
      ];

      navigation.setItems(items1);
      navigation.setItems(items2);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(2);
      expect(links[0].textContent).toBe('Item2');
    });

    it('should handle empty items array', () => {
      navigation.setItems([]);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(0);
    });

    it('should call callback when item is clicked', () => {
      const items: NavItem[] = [{ label: 'About', command: 'about' }];

      navigation.setItems(items);

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledWith('about');
    });

    it('should call callback with correct command for each item', () => {
      const items: NavItem[] = [
        { label: 'About', command: 'about' },
        { label: 'Blog', command: 'blog' }
      ];

      navigation.setItems(items);

      const links = navLinksElement.querySelectorAll('.nav-link');
      (links[0] as HTMLElement).click();
      expect(onCommandClickMock).toHaveBeenCalledWith('about');

      (links[1] as HTMLElement).click();
      expect(onCommandClickMock).toHaveBeenCalledWith('blog');
    });
  });

  describe('addItem', () => {
    it('should add a single item', () => {
      const item: NavItem = { label: 'About', command: 'about' };

      navigation.addItem(item);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(1);
      expect(links[0].textContent).toBe('About');
    });

    it('should add multiple items sequentially', () => {
      navigation.addItem({ label: 'About', command: 'about' });
      navigation.addItem({ label: 'Blog', command: 'blog' });
      navigation.addItem({ label: 'Portfolio', command: 'portfolio' });

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(3);
    });

    it('should preserve existing items when adding new one', () => {
      navigation.setItems([{ label: 'Existing', command: 'existing' }]);
      navigation.addItem({ label: 'New', command: 'new' });

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(2);
      expect(links[0].textContent).toBe('Existing');
      expect(links[1].textContent).toBe('New');
    });

    it('should set data-command attribute', () => {
      navigation.addItem({ label: 'Test', command: 'test command' });

      const link = navLinksElement.querySelector('.nav-link');
      expect(link?.getAttribute('data-command')).toBe('test command');
    });

    it('should attach click event to new item', () => {
      navigation.addItem({ label: 'Test', command: 'test' });

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledWith('test');
    });
  });

  describe('clear', () => {
    it('should remove all navigation items', () => {
      navigation.setItems([
        { label: 'Item1', command: 'cmd1' },
        { label: 'Item2', command: 'cmd2' },
        { label: 'Item3', command: 'cmd3' }
      ]);

      navigation.clear();

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(0);
    });

    it('should clear items added with addItem', () => {
      navigation.addItem({ label: 'Item1', command: 'cmd1' });
      navigation.addItem({ label: 'Item2', command: 'cmd2' });

      navigation.clear();

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(0);
    });

    it('should have no effect when already empty', () => {
      navigation.clear();
      navigation.clear();

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(0);
    });
  });

  describe('Click Event Handling', () => {
    it('should trigger callback exactly once per click', () => {
      navigation.setItems([{ label: 'Test', command: 'test' }]);

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledTimes(2);
    });

    it('should pass correct command to callback', () => {
      navigation.setItems([
        { label: 'Command with args', command: 'echo "hello world"' }
      ]);

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledWith('echo "hello world"');
    });
  });

  describe('Edge Cases', () => {
    it('should handle labels with special characters', () => {
      navigation.setItems([
        { label: 'Label & Special <> "Chars"', command: 'test' }
      ]);

      const link = navLinksElement.querySelector('.nav-link');
      expect(link?.textContent).toBe('Label & Special <> "Chars"');
    });

    it('should handle very long labels', () => {
      const longLabel = 'a'.repeat(1000);
      navigation.setItems([{ label: longLabel, command: 'test' }]);

      const link = navLinksElement.querySelector('.nav-link');
      expect(link?.textContent?.length).toBe(1000);
    });

    it('should handle very long commands', () => {
      const longCommand = 'echo ' + 'a'.repeat(1000);
      navigation.setItems([{ label: 'Test', command: longCommand }]);

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledWith(longCommand);
    });

    it('should handle empty label', () => {
      navigation.setItems([{ label: '', command: 'test' }]);

      const link = navLinksElement.querySelector('.nav-link');
      expect(link?.textContent).toBe('');
    });

    it('should handle empty command', () => {
      navigation.setItems([{ label: 'Test', command: '' }]);

      const link = navLinksElement.querySelector('.nav-link') as HTMLElement;
      link.click();

      expect(onCommandClickMock).toHaveBeenCalledWith('');
    });

    it('should handle many navigation items', () => {
      const items: NavItem[] = [];
      for (let i = 0; i < 100; i++) {
        items.push({ label: `Item ${i}`, command: `cmd${i}` });
      }

      navigation.setItems(items);

      const links = navLinksElement.querySelectorAll('.nav-link');
      expect(links.length).toBe(100);
    });
  });
});
