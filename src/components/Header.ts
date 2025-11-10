import { AsciiArt } from '../utils/AsciiArt';
import { sanitizeHtml } from '../utils/sanitizeHtml';

export class Header {
  private headerElement: HTMLElement;

  constructor(headerElement: HTMLElement) {
    this.headerElement = headerElement;
    this.render();
    this.setupClickHandler();
  }

  private render(): void {
    const asciiText = AsciiArt.generateHeader();
    const tagline = AsciiArt.getTagline();

    // Sanitize HTML even though this is static content (defense-in-depth)
    this.headerElement.innerHTML = sanitizeHtml(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${asciiText}</pre>
      </div>
      <p class="header-tagline">${tagline}</p>
    `);
  }

  private setupClickHandler(): void {
    // Handle click on ASCII art to clear terminal
    this.headerElement.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if clicked on the ASCII art text
      if (target.classList.contains('header-clickable') || target.closest('.header-clickable')) {
        // Dispatch terminal-command event to trigger clear
        const clearEvent = new CustomEvent('terminal-command', {
          detail: 'clear',
          bubbles: true,
        });
        document.dispatchEvent(clearEvent);
      }
    });
  }
}
