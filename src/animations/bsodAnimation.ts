/**
 * BSOD Animation Controller
 *
 * Handles the Blue Screen of Death animation effects.
 * Manages the full-screen overlay, progress counter (modern style),
 * and blinking cursor (classic style).
 */

interface BsodAnimation {
  element: HTMLElement;
  style: 'modern' | 'classic';
  cleanupFns: (() => void)[];
  stopAnimation: () => void;
}

const activeAnimations = new Map<HTMLElement, BsodAnimation>();

/**
 * Stop all active BSOD animations
 */
export function stopAllBsodAnimations(): void {
  activeAnimations.forEach((animation) => {
    animation.stopAnimation();
  });
  activeAnimations.clear();

  // Remove any orphaned overlays
  const overlays = document.querySelectorAll('.bsod-overlay');
  overlays.forEach((overlay) => {
    overlay.remove();
  });
}

/**
 * Remove the BSOD overlay with fade animation
 */
function removeOverlay(overlay: HTMLElement): void {
  overlay.style.animation = 'bsod-fade-out 0.3s ease forwards';
  overlay.addEventListener(
    'animationend',
    () => {
      overlay.remove();
    },
    { once: true }
  );

  // Fallback removal in case animation doesn't fire
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.remove();
    }
  }, 500);
}

/**
 * Start the modern BSOD progress counter animation
 */
function startProgressAnimation(element: HTMLElement, animation: BsodAnimation): void {
  const progressElement = element.querySelector<HTMLElement>('[data-bsod-progress]');
  if (!progressElement) return;

  let progress = 0;
  const intervalId = setInterval(() => {
    if (!activeAnimations.has(element)) {
      clearInterval(intervalId);
      return;
    }

    progress = (progress + 1) % 101;
    progressElement.textContent = String(progress);
  }, 100);

  animation.cleanupFns.push(() => {
    clearInterval(intervalId);
  });
}

/**
 * Start the classic BSOD cursor blink animation
 */
function startCursorAnimation(element: HTMLElement, animation: BsodAnimation): void {
  const cursorElement = element.querySelector<HTMLElement>('[data-bsod-cursor]');
  if (!cursorElement) return;

  let visible = true;
  const intervalId = setInterval(() => {
    if (!activeAnimations.has(element)) {
      clearInterval(intervalId);
      return;
    }

    visible = !visible;
    cursorElement.style.visibility = visible ? 'visible' : 'hidden';
  }, 530);

  animation.cleanupFns.push(() => {
    clearInterval(intervalId);
  });
}

/**
 * Start managing a BSOD element
 */
function startBsodAnimation(bsodElement: HTMLElement): void {
  // Stop any previous BSOD animations
  stopAllBsodAnimations();

  const style = (bsodElement.dataset.bsodStyle ?? 'modern') as 'modern' | 'classic';

  const animation: BsodAnimation = {
    element: bsodElement,
    style,
    cleanupFns: [],
    stopAnimation: () => {
      // Run all cleanup functions
      animation.cleanupFns.forEach((fn) => fn());
      animation.cleanupFns = [];

      // Remove overlay
      if (bsodElement.parentNode) {
        removeOverlay(bsodElement);
      }

      activeAnimations.delete(bsodElement);
    },
  };

  activeAnimations.set(bsodElement, animation);

  // Move overlay to body for full-screen effect
  document.body.appendChild(bsodElement);

  // Start style-specific animations
  if (style === 'modern') {
    startProgressAnimation(bsodElement, animation);
  } else {
    startCursorAnimation(bsodElement, animation);
  }

  // Set up cleanup triggers
  setupCleanupTriggers(bsodElement, animation);
}

/**
 * Set up triggers to stop the animation
 */
function setupCleanupTriggers(bsodElement: HTMLElement, animation: BsodAnimation): void {
  const terminalOutput = document.getElementById('terminal-output');

  // Stop on any keypress (except during initial animation)
  const keypressHandler = (e: KeyboardEvent) => {
    // Ignore modifier keys alone
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }
    animation.stopAnimation();
  };

  // Delay keypress listener slightly so typing the command doesn't immediately stop it
  setTimeout(() => {
    if (activeAnimations.has(bsodElement)) {
      document.addEventListener('keydown', keypressHandler, { once: true });
      animation.cleanupFns.push(() => {
        document.removeEventListener('keydown', keypressHandler);
      });
    }
  }, 100);

  // Stop on click
  const clickHandler = () => {
    animation.stopAnimation();
  };
  setTimeout(() => {
    if (activeAnimations.has(bsodElement)) {
      document.addEventListener('click', clickHandler, { once: true });
      animation.cleanupFns.push(() => {
        document.removeEventListener('click', clickHandler);
      });
    }
  }, 100);

  // Stop when new content is added to terminal
  const contentObserver = new MutationObserver((mutations) => {
    // Check if new content was added that isn't the BSOD itself
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node !== bsodElement && node.nodeType === Node.ELEMENT_NODE) {
          animation.stopAnimation();
          contentObserver.disconnect();
          return;
        }
      }
    }
  });

  if (terminalOutput) {
    contentObserver.observe(terminalOutput, { childList: true, subtree: true });
    animation.cleanupFns.push(() => {
      contentObserver.disconnect();
    });
  }

  // Stop if the element is removed from DOM
  const removalObserver = new MutationObserver(() => {
    if (!document.body.contains(bsodElement)) {
      animation.stopAnimation();
      removalObserver.disconnect();
    }
  });

  removalObserver.observe(document.body, { childList: true, subtree: true });
  animation.cleanupFns.push(() => {
    removalObserver.disconnect();
  });
}

/**
 * Initialize BSOD observer
 * Watches for [data-bsod] elements being added to the DOM and starts animations
 */
export function initBsodObserver(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Check if the added node itself is a BSOD element
          if (element.hasAttribute('data-bsod')) {
            startBsodAnimation(element);
          }

          // Check for BSOD elements within the added node
          const bsodElements = element.querySelectorAll('[data-bsod]');
          bsodElements.forEach((bsodElement) => {
            startBsodAnimation(bsodElement as HTMLElement);
          });
        }
      });
    });
  });

  // Observe the terminal output for new content
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalOutput) {
    observer.observe(terminalOutput, { childList: true, subtree: true });
  }

  // Also check for any existing BSOD elements (in case this loads late)
  const existingBsodElements = document.querySelectorAll('[data-bsod]');
  existingBsodElements.forEach((element) => {
    startBsodAnimation(element as HTMLElement);
  });
}
