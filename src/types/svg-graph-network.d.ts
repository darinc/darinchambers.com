/**
 * Type declarations for SVG Graph Network library
 * External library loaded via script tag
 */

declare global {
  interface Window {
    SVGGraphNetwork: new (container: string | HTMLElement, options?: unknown) => void;
    initializeGraphs?: () => Promise<void>;
  }
}

export {};
