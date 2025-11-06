/**
 * DOM Setup Helpers for Testing
 *
 * Provides reusable functions to set up and tear down DOM structures
 * for component testing.
 */

/**
 * Sets up a complete terminal DOM structure for testing components
 */
export function setupTerminalDOM(): void {
  document.body.innerHTML = `
    <div id="terminal-header"></div>
    <nav id="terminal-nav">
      <div class="nav-links"></div>
    </nav>
    <div id="terminal-output">
      <div id="terminal-input-line">
        <span id="terminal-prompt"></span>
        <input id="terminal-input" type="text" autocomplete="off" />
      </div>
    </div>
  `;
}

/**
 * Sets up minimal DOM for output testing
 */
export function setupOutputDOM(): void {
  document.body.innerHTML = `
    <div id="terminal-output">
      <div id="terminal-input-line"></div>
    </div>
  `;
}

/**
 * Sets up minimal DOM for input testing
 */
export function setupInputDOM(): void {
  document.body.innerHTML = `
    <input id="terminal-input" type="text" autocomplete="off" />
    <span id="terminal-prompt"></span>
  `;
}

/**
 * Sets up minimal DOM for navigation testing
 */
export function setupNavigationDOM(): void {
  document.body.innerHTML = `
    <nav id="terminal-nav">
      <div class="nav-links"></div>
    </nav>
  `;
}

/**
 * Sets up minimal DOM for header testing
 */
export function setupHeaderDOM(): void {
  document.body.innerHTML = `
    <div id="terminal-header"></div>
  `;
}

/**
 * Cleans up the DOM after tests
 */
export function cleanupDOM(): void {
  document.body.innerHTML = '';
}

/**
 * Gets a typed element from the DOM
 */
export function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element as T;
}

/**
 * Gets a typed element by query selector
 */
export function querySelector<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element matching "${selector}" not found`);
  }
  return element as T;
}
