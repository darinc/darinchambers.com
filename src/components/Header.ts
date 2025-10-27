import { AsciiArt } from '../utils/AsciiArt';

export class Header {
  private headerElement: HTMLElement;

  constructor(headerElement: HTMLElement) {
    this.headerElement = headerElement;
    this.render();
  }

  private render(): void {
    const asciiText = AsciiArt.generateHeader();
    const tagline = AsciiArt.getTagline();

    this.headerElement.innerHTML = `
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text">${asciiText}</pre>
      </div>
      <div class="header-tagline">${tagline}</div>
    `;
  }
}
