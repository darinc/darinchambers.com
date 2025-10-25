export interface NavItem {
  label: string;
  command: string;
}

export class Navigation {
  private navLinksElement: HTMLElement;
  private onCommandClick: (command: string) => void;

  constructor(
    navLinksElement: HTMLElement,
    onCommandClick: (command: string) => void
  ) {
    this.navLinksElement = navLinksElement;
    this.onCommandClick = onCommandClick;
  }

  setItems(items: NavItem[]): void {
    this.navLinksElement.innerHTML = '';

    items.forEach(item => {
      const link = document.createElement('span');
      link.className = 'nav-link';
      link.textContent = item.label;
      link.setAttribute('data-command', item.command);

      link.addEventListener('click', () => {
        this.onCommandClick(item.command);
      });

      this.navLinksElement.appendChild(link);
    });
  }

  addItem(item: NavItem): void {
    const link = document.createElement('span');
    link.className = 'nav-link';
    link.textContent = item.label;
    link.setAttribute('data-command', item.command);

    link.addEventListener('click', () => {
      this.onCommandClick(item.command);
    });

    this.navLinksElement.appendChild(link);
  }

  clear(): void {
    this.navLinksElement.innerHTML = '';
  }
}
