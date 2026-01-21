/**
 * Boot Sequence Animation Controller
 *
 * Handles the boot/shutdown/reboot animation effects.
 * Manages the "powered off" overlay that appears after shutdown
 * and cleanup triggers for user interaction.
 */

interface BootSequenceAnimation {
  element: HTMLElement;
  bootType: 'boot' | 'shutdown' | 'reboot';
  overlay: HTMLElement | null;
  cleanupFns: (() => void)[];
  stopAnimation: () => void;
}

const activeAnimations = new Map<HTMLElement, BootSequenceAnimation>();

/**
 * Stop all active boot sequence animations
 */
export function stopAllBootSequences(): void {
  activeAnimations.forEach((animation) => {
    animation.stopAnimation();
  });
  activeAnimations.clear();

  // Remove any orphaned overlays
  const overlays = document.querySelectorAll('.boot-overlay');
  overlays.forEach((overlay) => {
    overlay.remove();
  });
}

/**
 * Remove the power-off overlay with fade animation
 */
function removeOverlay(overlay: HTMLElement): void {
  overlay.style.animation = 'boot-overlay-fade 0.3s ease forwards';
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
 * Start managing a boot sequence element
 */
function startBootSequenceAnimation(bootElement: HTMLElement): void {
  // Stop any previous boot animations
  stopAllBootSequences();

  const bootType = (bootElement.dataset.bootType ?? 'boot') as 'boot' | 'shutdown' | 'reboot';

  // Find existing overlays and remove them for boot sequences
  // (boot should clear the shutdown overlay)
  if (bootType === 'boot') {
    const existingOverlays = document.querySelectorAll('.boot-overlay');
    existingOverlays.forEach((overlay) => {
      removeOverlay(overlay as HTMLElement);
    });
  }

  const animation: BootSequenceAnimation = {
    element: bootElement,
    bootType,
    overlay: null,
    cleanupFns: [],
    stopAnimation: () => {
      // Run all cleanup functions
      animation.cleanupFns.forEach((fn) => fn());
      animation.cleanupFns = [];

      // Remove overlay if present
      if (animation.overlay?.parentNode) {
        removeOverlay(animation.overlay);
        animation.overlay = null;
      }

      activeAnimations.delete(bootElement);
    },
  };

  activeAnimations.set(bootElement, animation);

  // Set up overlay detection for shutdown sequences
  if (bootType === 'shutdown' || bootType === 'reboot') {
    // Watch for the overlay element to become visible
    const overlayElement = bootElement.querySelector<HTMLElement>('[data-boot-overlay]');
    if (overlayElement) {
      animation.overlay = overlayElement;

      // The overlay starts in the boot-sequence container
      // Move it to body once its animation delay has passed
      const overlayStyle = getComputedStyle(overlayElement);
      const delayStr = overlayStyle.animationDelay;
      const delayMs = parseFloat(delayStr) * (delayStr.includes('ms') ? 1 : 1000);

      setTimeout(() => {
        // Only move if still in the animation
        if (activeAnimations.has(bootElement) && overlayElement.parentNode) {
          // Move overlay to body for full-screen effect
          document.body.appendChild(overlayElement);
        }
      }, delayMs);
    }
  }

  // Set up cleanup triggers
  setupCleanupTriggers(bootElement, animation);
}

/**
 * Set up triggers to stop the animation
 */
function setupCleanupTriggers(bootElement: HTMLElement, animation: BootSequenceAnimation): void {
  const terminalOutput = document.getElementById('terminal-output');

  // Stop on scroll
  if (terminalOutput) {
    const scrollHandler = () => {
      animation.stopAnimation();
    };
    terminalOutput.addEventListener('scroll', scrollHandler, { once: true });
    animation.cleanupFns.push(() => {
      terminalOutput.removeEventListener('scroll', scrollHandler);
    });
  }

  // Stop on any keypress (except during initial animation)
  const keypressHandler = (e: KeyboardEvent) => {
    // Allow the animation to show for at least a moment
    // Ignore modifier keys alone
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }
    animation.stopAnimation();
  };

  // Delay keypress listener slightly so typing the command doesn't immediately stop it
  setTimeout(() => {
    if (activeAnimations.has(bootElement)) {
      document.addEventListener('keydown', keypressHandler, { once: true });
      animation.cleanupFns.push(() => {
        document.removeEventListener('keydown', keypressHandler);
      });
    }
  }, 100);

  // Stop on click (for overlay dismissal)
  const clickHandler = () => {
    animation.stopAnimation();
  };
  setTimeout(() => {
    if (activeAnimations.has(bootElement)) {
      document.addEventListener('click', clickHandler, { once: true });
      animation.cleanupFns.push(() => {
        document.removeEventListener('click', clickHandler);
      });
    }
  }, 100);

  // Stop when new content is added after the boot sequence
  const contentObserver = new MutationObserver(() => {
    // Check if new content was added after the boot sequence
    if (bootElement.nextElementSibling) {
      animation.stopAnimation();
      contentObserver.disconnect();
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
    if (!document.body.contains(bootElement)) {
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
 * Initialize boot sequence observer
 * Watches for .boot-sequence elements being added to the DOM and starts animations
 */
export function initBootSequenceObserver(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Check if the added node itself is a boot sequence element
          if (element.classList.contains('boot-sequence')) {
            startBootSequenceAnimation(element);
          }

          // Check for boot sequence elements within the added node
          const bootElements = element.querySelectorAll('.boot-sequence');
          bootElements.forEach((bootElement) => {
            startBootSequenceAnimation(bootElement as HTMLElement);
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

  // Also check for any existing boot sequence elements (in case this loads late)
  const existingBootElements = document.querySelectorAll('.boot-sequence');
  existingBootElements.forEach((element) => {
    startBootSequenceAnimation(element as HTMLElement);
  });
}
