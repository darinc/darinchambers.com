import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createObfuscatedEmailLink, initEmailProtection } from '../../../src/utils/EmailProtection';

describe('EmailProtection', () => {
  beforeEach(() => {
    // Clear DOM before each test
    document.body.innerHTML = '';
    // Reset location.href mock
    delete (window as { location?: unknown }).location;
    window.location = { href: '' } as any;
  });

  describe('createObfuscatedEmailLink', () => {
    it('should create obfuscated email link with default display text', () => {
      const html = createObfuscatedEmailLink('hello@example.com');

      expect(html).toBe(
        '<a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>'
      );
    });

    it('should create obfuscated email link with custom display text', () => {
      const html = createObfuscatedEmailLink('hello@example.com', 'Email me');

      expect(html).toBe(
        '<a href="#" class="email-protected" data-user="hello" data-domain="example.com">Email me</a>'
      );
    });

    it('should throw error for invalid email format', () => {
      expect(() => createObfuscatedEmailLink('invalid-email')).toThrow(
        'Invalid email format: invalid-email'
      );
    });

    it('should throw error for email without @ symbol', () => {
      expect(() => createObfuscatedEmailLink('notemail.com')).toThrow(
        'Invalid email format: notemail.com'
      );
    });
  });

  describe('initEmailProtection', () => {
    it('should initialize email protection for single email link', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      // Execute
      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Verify initialization
      expect(link.dataset.protected).toBe('true');
      expect(link.getAttribute('tabindex')).toBe('0');
    });

    it('should handle click event and construct mailto link', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Simulate click
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

      link.dispatchEvent(clickEvent);

      // Verify
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.location.href).toBe('mailto:hello@example.com');
    });

    it('should handle keyboard Enter key', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Simulate Enter key
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(keyEvent, 'preventDefault');

      link.dispatchEvent(keyEvent);

      // Verify
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.location.href).toBe('mailto:hello@example.com');
    });

    it('should handle keyboard Space key', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Simulate Space key
      const keyEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(keyEvent, 'preventDefault');

      link.dispatchEvent(keyEvent);

      // Verify
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.location.href).toBe('mailto:hello@example.com');
    });

    it('should ignore other keyboard keys', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Simulate Tab key (should be ignored)
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(keyEvent, 'preventDefault');

      link.dispatchEvent(keyEvent);

      // Verify - preventDefault should NOT be called, href should not change
      expect(preventDefaultSpy).not.toHaveBeenCalled();
      expect(window.location.href).toBe('');
    });

    it('should handle multiple email links on the page', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
        <a href="#" class="email-protected" data-user="support" data-domain="test.com">support@test.com</a>
      `;

      initEmailProtection();

      const links = document.querySelectorAll<HTMLAnchorElement>('a.email-protected');

      // Verify both initialized
      expect(links[0].dataset.protected).toBe('true');
      expect(links[1].dataset.protected).toBe('true');

      // Click first link
      const clickEvent1 = new MouseEvent('click', { bubbles: true, cancelable: true });
      links[0].dispatchEvent(clickEvent1);
      expect(window.location.href).toBe('mailto:hello@example.com');

      // Click second link
      const clickEvent2 = new MouseEvent('click', { bubbles: true, cancelable: true });
      links[1].dispatchEvent(clickEvent2);
      expect(window.location.href).toBe('mailto:support@test.com');
    });

    it('should skip already initialized links', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
      `;

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Initialize once
      initEmailProtection();
      expect(link.dataset.protected).toBe('true');

      // Click should work
      const clickEvent1 = new MouseEvent('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(clickEvent1);
      expect(window.location.href).toBe('mailto:hello@example.com');

      // Call initEmailProtection again - should skip because already protected
      initEmailProtection();

      // Click should still work (not double-initialized)
      window.location.href = ''; // Reset
      const clickEvent2 = new MouseEvent('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(clickEvent2);
      expect(window.location.href).toBe('mailto:hello@example.com');
    });

    it('should warn and skip links missing data-user attribute', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Setup - missing data-user
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-domain="example.com">Email</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Verify warning
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Email link missing data-user or data-domain attributes',
        link
      );

      // Verify not initialized
      expect(link.dataset.protected).toBeUndefined();

      consoleWarnSpy.mockRestore();
    });

    it('should warn and skip links missing data-domain attribute', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Setup - missing data-domain
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello">Email</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Verify warning
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Email link missing data-user or data-domain attributes',
        link
      );

      // Verify not initialized
      expect(link.dataset.protected).toBeUndefined();

      consoleWarnSpy.mockRestore();
    });

    it('should not add tabindex if already present', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="hello" data-domain="example.com" tabindex="5">hello@example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Verify existing tabindex preserved
      expect(link.getAttribute('tabindex')).toBe('5');
    });

    it('should handle emails with subdomains', () => {
      // Setup
      document.body.innerHTML = `
        <a href="#" class="email-protected" data-user="info" data-domain="mail.example.com">info@mail.example.com</a>
      `;

      initEmailProtection();

      const link = document.querySelector<HTMLAnchorElement>('a.email-protected')!;

      // Simulate click
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(clickEvent);

      // Verify
      expect(window.location.href).toBe('mailto:info@mail.example.com');
    });
  });
});
