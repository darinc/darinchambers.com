/**
 * Reduced-motion detection.
 *
 * Returns true when the user has asked the OS/browser to minimize non-essential
 * motion (`prefers-reduced-motion: reduce`). Used to suppress auto-playing
 * animations (screensaver, matrix rain) for accessibility (WCAG 2.2.2 / 2.3.3).
 *
 * Guards against non-browser/test environments where `matchMedia` is absent.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
