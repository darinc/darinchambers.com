/**
 * Email Protection Utility
 *
 * Provides JavaScript-based email obfuscation to prevent automated scraping
 * while maintaining full functionality for human users.
 *
 * Usage:
 * 1. Add HTML with data attributes: <a href="#" class="email-protected" data-user="hello" data-domain="example.com">hello@example.com</a>
 * 2. Call initEmailProtection() after content is rendered
 * 3. Click handler constructs mailto: link dynamically
 */

/**
 * Initialize email protection for all email links on the page.
 * Adds click handlers to construct mailto links dynamically.
 *
 * Should be called after new content is rendered to the terminal.
 */
export function initEmailProtection(): void {
  const emailLinks = document.querySelectorAll<HTMLAnchorElement>('a.email-protected');

  emailLinks.forEach((link) => {
    // Skip if already initialized
    if (link.dataset.protected === 'true') {
      return;
    }

    const user = link.dataset.user;
    const domain = link.dataset.domain;

    if (!user || !domain) {
      console.warn('Email link missing data-user or data-domain attributes', link);
      return;
    }

    // Mark as initialized
    link.dataset.protected = 'true';

    // Add click handler
    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();

      // Construct mailto URL
      const email = `${user}@${domain}`;
      const mailtoUrl = `mailto:${email}`;

      // Open email client
      window.location.href = mailtoUrl;
    });

    // Add keyboard accessibility
    link.addEventListener('keydown', (event: KeyboardEvent) => {
      // Trigger on Enter or Space
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        const email = `${user}@${domain}`;
        const mailtoUrl = `mailto:${email}`;

        window.location.href = mailtoUrl;
      }
    });

    // Ensure link is keyboard accessible
    if (!link.hasAttribute('tabindex')) {
      link.setAttribute('tabindex', '0');
    }
  });
}

/**
 * Create an obfuscated email link HTML string.
 * Returns HTML with data attributes for use in markdown content.
 *
 * @param email - Full email address (e.g., "hello@example.com")
 * @param displayText - Optional display text (defaults to email address)
 * @returns HTML string with obfuscated email
 */
export function createObfuscatedEmailLink(email: string, displayText?: string): string {
  const [user, domain] = email.split('@');

  if (!user || !domain) {
    throw new Error(`Invalid email format: ${email}`);
  }

  const text = displayText ?? email;

  return `<a href="#" class="email-protected" data-user="${user}" data-domain="${domain}">${text}</a>`;
}
