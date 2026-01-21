/**
 * Melt Effect Animation Controller
 *
 * Creates a "melting screen" visual effect for the rm -rf / easter egg.
 * Uses pure CSS animations for smooth 60fps performance - the browser
 * handles all interpolation on the GPU with zero JavaScript per-frame.
 */

interface MeltAnimation {
  container: HTMLElement;
  styleElement: HTMLStyleElement;
  cleanupFns: (() => void)[];
}

const activeAnimations = new Map<HTMLElement, MeltAnimation>();

/**
 * Simple seeded random for consistent noise
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

/**
 * Stop all active melt animations and remove containers
 */
export function stopAllMeltAnimations(): void {
  activeAnimations.forEach((animation) => {
    animation.cleanupFns.forEach((fn) => fn());
    animation.styleElement.remove();
    animation.container.remove();
  });
  activeAnimations.clear();

  // Remove any orphaned melt containers and styles
  const containers = document.querySelectorAll('.melt-container');
  containers.forEach((container) => container.remove());
  const styles = document.querySelectorAll('style[data-melt-styles]');
  styles.forEach((style) => style.remove());
}

/**
 * Parse CSS linear-gradient and create canvas gradient
 */
function createCanvasGradient(
  ctx: CanvasRenderingContext2D,
  gradientCSS: string,
  rect: DOMRect
): CanvasGradient | null {
  // Match linear-gradient with angle or direction
  const gradientMatch = /linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/.exec(gradientCSS);
  if (!gradientMatch) return null;

  const angle = parseInt(gradientMatch[1]);
  const colorStops = gradientMatch[2];

  // Create gradient based on angle (90deg = left to right)
  let x0, y0, x1, y1;
  if (angle === 90) {
    x0 = rect.left;
    y0 = rect.top;
    x1 = rect.right;
    y1 = rect.top;
  } else {
    // Default to horizontal
    x0 = rect.left;
    y0 = rect.top;
    x1 = rect.right;
    y1 = rect.top;
  }

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  // Parse color stops: "#ff6b35 0%, #ff8c42 8%, ..."
  const stopMatches = colorStops.matchAll(/(#[0-9a-fA-F]{6}|rgb[a]?\([^)]+\))\s*(\d+)?%?/g);
  for (const match of stopMatches) {
    const color = match[1];
    const position = match[2] ? parseInt(match[2]) / 100 : 0;
    try {
      gradient.addColorStop(position, color);
    } catch {
      // Invalid color stop, skip
    }
  }

  return gradient;
}

/**
 * Render a DOM element's text content to canvas, preserving colors and positions
 */
function renderElementToCanvas(
  ctx: CanvasRenderingContext2D,
  element: HTMLElement,
  defaultFont: string,
  defaultColor: string
): void {
  try {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

    let textNode: Text | null;
    while ((textNode = walker.nextNode() as Text | null)) {
      const text = textNode.textContent || '';
      if (!text.trim()) continue;

      const parent = textNode.parentElement;
      if (!parent) continue;

      // Get the computed style of the parent element
      const style = getComputedStyle(parent);
      const fontSize = style.fontSize;
      const fontFamily = style.fontFamily;
      const fontWeight = style.fontWeight;

      // Create a range to get the exact position of this text node
      const range = document.createRange();
      range.selectNodeContents(textNode);

      // getClientRects may not exist in jsdom test environment
      if (typeof range.getClientRects !== 'function') {
        continue;
      }

      const rects = range.getClientRects();
      if (rects.length === 0) continue;

      // Check if element uses background-clip: text (gradient text)
      const bgClip = style.getPropertyValue('-webkit-background-clip') || style.backgroundClip;
      const isGradientText = bgClip === 'text';

      // Determine fill style
      let fillStyle: string | CanvasGradient = style.color || defaultColor;

      if (isGradientText) {
        // Get the element's bounding rect for gradient calculation
        const elemRect = parent.getBoundingClientRect();
        const bgImage = style.backgroundImage;

        if (bgImage?.includes('linear-gradient')) {
          const gradient = createCanvasGradient(ctx, bgImage, elemRect);
          if (gradient) {
            fillStyle = gradient;
          }
        }
      }

      // Set up canvas context for this text
      ctx.fillStyle = fillStyle;
      const weight = parseInt(fontWeight) >= 600 ? 'bold ' : '';
      ctx.font = `${weight}${fontSize} ${fontFamily || defaultFont}`;

      // Draw text at each rect position (handles line wrapping)
      for (const rect of rects) {
        if (rect.width > 0 && rect.height > 0) {
          ctx.fillText(text, rect.left, rect.top + rect.height * 0.85);
        }
      }
    }
  } catch {
    // Fallback for environments without full DOM support (e.g., jsdom)
    // Just skip rendering - the melt effect will still work with background color
  }
}

/**
 * Capture the current screen to a canvas, preserving colors and styling
 */
function captureScreen(): HTMLCanvasElement {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;

  // Get terminal colors
  const computedStyle = getComputedStyle(document.documentElement);
  const bgColor = computedStyle.getPropertyValue('--terminal-bg').trim() || '#0a0a0a';
  const fgColor = computedStyle.getPropertyValue('--terminal-fg').trim() || '#00ff00';
  const defaultFont = computedStyle.getPropertyValue('--terminal-font-family') || 'monospace';

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Render header with actual colors and positions
  const header = document.querySelector('header');
  if (header) {
    renderElementToCanvas(ctx, header, defaultFont, fgColor);
  }

  // Render terminal output with actual colors and positions
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalOutput) {
    renderElementToCanvas(ctx, terminalOutput, defaultFont, fgColor);
  }

  // Render terminal input area
  const terminalInputContainer = document.querySelector('.terminal-input-container');
  if (terminalInputContainer) {
    renderElementToCanvas(ctx, terminalInputContainer as HTMLElement, defaultFont, fgColor);
  }

  return canvas;
}

/**
 * Start the melt animation using pure CSS animations for smooth 60fps
 */
function startMeltAnimation(triggerElement: HTMLElement): void {
  // Stop any existing animations
  stopAllMeltAnimations();

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Inject CSS keyframes animation
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-melt-styles', '');
  styleElement.textContent = `
    @keyframes melt-drop {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(${height * 1.5}px);
        opacity: 0.4;
      }
    }
    @keyframes melt-message-fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleElement);

  // Create fullscreen container
  const container = document.createElement('div');
  container.className = 'melt-container';

  // Capture screen content
  const sourceCanvas = captureScreen();
  const dataUrl = sourceCanvas.toDataURL('image/png');

  // Use wider columns for better performance (fewer DOM elements)
  const columnWidth = 12;
  const columnCount = Math.ceil(width / columnWidth);
  const random = seededRandom(Date.now());

  // Create column elements with CSS animations
  for (let i = 0; i < columnCount; i++) {
    const col = document.createElement('div');
    col.className = 'melt-column';
    col.style.left = `${i * columnWidth}px`;
    col.style.width = `${columnWidth}px`;
    col.style.height = `${height}px`;
    col.style.backgroundImage = `url(${dataUrl})`;
    col.style.backgroundPosition = `-${i * columnWidth}px 0`;
    col.style.backgroundSize = `${width}px ${height}px`;

    // Randomize animation timing - center columns start first
    const centerDistance = Math.abs(i - columnCount / 2) / (columnCount / 2);
    const delay = centerDistance * 0.4 + random() * 0.3;
    const duration = 2.5 + random() * 1.5;

    // Apply CSS animation with randomized timing
    col.style.animation = `melt-drop ${duration}s ease-in ${delay}s forwards`;

    container.appendChild(col);
  }

  // Create message element
  const message = document.createElement('div');
  message.className = 'melt-message';
  message.textContent = "yeah, you probably shouldn't do that";
  message.style.animation = 'melt-message-fade 0.5s ease-out 2s forwards';
  container.appendChild(message);

  document.body.appendChild(container);

  const animation: MeltAnimation = {
    container,
    styleElement,
    cleanupFns: [],
  };

  activeAnimations.set(triggerElement, animation);

  // Auto-cleanup after animation completes
  const autoCleanupTimeout = setTimeout(() => {
    if (activeAnimations.has(triggerElement)) {
      stopAllMeltAnimations();
    }
  }, 6500);

  animation.cleanupFns.push(() => clearTimeout(autoCleanupTimeout));

  // Set up cleanup triggers with delay
  setTimeout(() => {
    if (!activeAnimations.has(triggerElement)) return;

    const cleanup = () => stopAllMeltAnimations();

    const keypressHandler = (e: KeyboardEvent) => {
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      cleanup();
    };

    const clickHandler = () => cleanup();

    document.addEventListener('keydown', keypressHandler, { once: true });
    document.addEventListener('click', clickHandler, { once: true });

    animation.cleanupFns.push(() => {
      document.removeEventListener('keydown', keypressHandler);
      document.removeEventListener('click', clickHandler);
    });
  }, 500);
}

/**
 * Initialize melt effect observer
 * Watches for [data-melt] elements being added to the DOM
 */
export function initMeltObserver(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          if (element.hasAttribute('data-melt')) {
            startMeltAnimation(element);
          }

          const meltElements = element.querySelectorAll('[data-melt]');
          meltElements.forEach((meltElement) => {
            startMeltAnimation(meltElement as HTMLElement);
          });
        }
      });
    });
  });

  // Observe terminal output
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalOutput) {
    observer.observe(terminalOutput, { childList: true, subtree: true });
  }

  // Also observe body
  observer.observe(document.body, { childList: true, subtree: true });
}
