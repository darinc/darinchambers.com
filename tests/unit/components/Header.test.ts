import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Header } from '../../../src/components/Header';
import { setupHeaderDOM, cleanupDOM, getElement } from '../../helpers/dom-setup';

// Mock the sanitizeHtml module
vi.mock('../../../src/utils/sanitizeHtml', () => ({
  sanitizeHtml: vi.fn((html: string) => html), // Pass through for testing
}));

// Mock the AsciiArt module
vi.mock('../../../src/utils/AsciiArt', () => ({
  AsciiArt: {
    generateHeader: vi.fn(() => 'MOCKED ASCII ART'),
    getTagline: vi.fn(() => 'Mocked tagline'),
  },
}));

describe('Header', () => {
  let header: Header;
  let headerElement: HTMLElement;

  beforeEach(() => {
    setupHeaderDOM();
    headerElement = getElement('terminal-header');
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('Rendering', () => {
    it('should render with ASCII art and tagline', () => {
      header = new Header(headerElement);

      // Check that the header contains the prompt
      expect(headerElement.innerHTML).toContain('$ whoami | figlet | lolcat');

      // Check that the ASCII art is rendered
      expect(headerElement.innerHTML).toContain('MOCKED ASCII ART');

      // Check that the tagline is rendered
      expect(headerElement.innerHTML).toContain('Mocked tagline');

      // Check for structural elements
      const prompt = headerElement.querySelector('.header-prompt');
      const asciiDiv = headerElement.querySelector('.header-ascii');
      const tagline = headerElement.querySelector('.header-tagline');

      expect(prompt).toBeTruthy();
      expect(asciiDiv).toBeTruthy();
      expect(tagline).toBeTruthy();
    });

    it('should sanitize HTML during render', async () => {
      const { sanitizeHtml } = await import('../../../src/utils/sanitizeHtml');

      header = new Header(headerElement);

      // Verify sanitizeHtml was called
      expect(sanitizeHtml).toHaveBeenCalled();

      // Verify it was called with HTML content containing the expected elements
      const callArg = (sanitizeHtml as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(callArg).toContain('header-prompt');
      expect(callArg).toContain('header-ascii');
      expect(callArg).toContain('header-tagline');
    });
  });

  describe('Click Event Handling', () => {
    it('should dispatch terminal-command event with "clear" when clicking on ASCII art', () => {
      header = new Header(headerElement);

      // Set up event listener to capture the custom event
      let eventFired = false;
      let eventDetail = '';
      let eventBubbles = false;

      const eventListener = (e: Event) => {
        eventFired = true;
        const customEvent = e as CustomEvent;
        eventDetail = customEvent.detail;
        eventBubbles = customEvent.bubbles;
      };

      document.addEventListener('terminal-command', eventListener);

      // Find and click the clickable element
      const clickableElement = headerElement.querySelector<HTMLElement>('.header-clickable');
      expect(clickableElement).toBeTruthy();

      clickableElement!.click();

      // Verify event was dispatched correctly
      expect(eventFired).toBe(true);
      expect(eventDetail).toBe('clear');
      expect(eventBubbles).toBe(true);

      // Cleanup
      document.removeEventListener('terminal-command', eventListener);
    });

    it('should not dispatch event when clicking on non-clickable area', () => {
      header = new Header(headerElement);

      // Set up event listener to capture any custom events
      let eventFired = false;

      const eventListener = () => {
        eventFired = true;
      };

      document.addEventListener('terminal-command', eventListener);

      // Click on the tagline (non-clickable area)
      const tagline = headerElement.querySelector<HTMLElement>('.header-tagline');
      expect(tagline).toBeTruthy();

      tagline!.click();

      // Verify event was NOT dispatched
      expect(eventFired).toBe(false);

      // Also try clicking on the prompt
      const prompt = headerElement.querySelector<HTMLElement>('.header-prompt');
      expect(prompt).toBeTruthy();

      prompt!.click();

      // Verify event was still NOT dispatched
      expect(eventFired).toBe(false);

      // Cleanup
      document.removeEventListener('terminal-command', eventListener);
    });
  });
});
