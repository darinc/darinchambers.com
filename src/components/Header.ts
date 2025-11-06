import { AsciiArt } from '../utils/AsciiArt';
import { sanitizeHtml } from '../utils/sanitizeHtml';

export class Header {
  private headerElement: HTMLElement;

  constructor(headerElement: HTMLElement) {
    this.headerElement = headerElement;
    this.render();
  }

  private render(): void {
    const asciiText = AsciiArt.generateHeader();
    const tagline = AsciiArt.getTagline();

    // Sanitize HTML even though this is static content (defense-in-depth)
    this.headerElement.innerHTML = sanitizeHtml(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text">${asciiText}</pre>
      </div>
      <div class="header-tagline">${tagline}</div>
    `);
  }
}
