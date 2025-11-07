export interface NavItem {
  label: string;
  command: string;
}

export class Navigation {
  private navLinksElement: HTMLElement;
  private onCommandClick: (command: string) => void;
  private activeCommand: string | null = null;

  constructor(navLinksElement: HTMLElement, onCommandClick: (command: string) => void) {
    this.navLinksElement = navLinksElement;
    this.onCommandClick = onCommandClick;
  }

  setItems(items: NavItem[]): void {
    this.navLinksElement.innerHTML = '';

    items.forEach((item) => {
      const link = document.createElement('button');
      link.className = 'nav-link';
      link.type = 'button';
      link.textContent = item.label;
      link.setAttribute('data-command', item.command);
      link.setAttribute('aria-label', `Navigate to ${item.label}`);

      link.addEventListener('click', () => {
        this.onCommandClick(item.command);
      });

      this.navLinksElement.appendChild(link);
    });
  }

  addItem(item: NavItem): void {
    const link = document.createElement('button');
    link.className = 'nav-link';
    link.type = 'button';
    link.textContent = item.label;
    link.setAttribute('data-command', item.command);
    link.setAttribute('aria-label', `Navigate to ${item.label}`);

    link.addEventListener('click', () => {
      this.onCommandClick(item.command);
    });

    this.navLinksElement.appendChild(link);
  }

  clear(): void {
    this.navLinksElement.innerHTML = '';
  }

  setActiveItem(command: string): void {
    this.activeCommand = command;

    // Remove aria-current from all buttons
    const buttons = this.navLinksElement.querySelectorAll('button[data-command]');
    buttons.forEach((button) => {
      button.removeAttribute('aria-current');
    });

    // Add aria-current to the matching button
    const activeButton = this.navLinksElement.querySelector(`button[data-command="${command}"]`);
    if (activeButton) {
      activeButton.setAttribute('aria-current', 'page');
    }
  }

  getActiveCommand(): string | null {
    return this.activeCommand;
  }
}
