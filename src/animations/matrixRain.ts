/**
 * Matrix Rain Animation Controller
 *
 * Handles dynamic character updates for the Matrix digital rain effect.
 * This runs in the main JavaScript bundle (not stripped by sanitization).
 */

interface MatrixAnimation {
  animationId: number | null;
  frameCount: number;
  matrixChars: string;
  rainElement: HTMLElement;
  stopAnimation: () => void;
}

const activeAnimations = new Map<HTMLElement, MatrixAnimation>();

/**
 * Start animating a matrix rain element
 */
export function startMatrixRainAnimation(rainElement: HTMLElement): void {
  // Don't start if already animating
  if (activeAnimations.has(rainElement)) {
    return;
  }

  // Get the character set from data attribute
  const matrixChars = rainElement.dataset.matrixChars ?? '';
  if (!matrixChars) {
    console.warn('[Matrix] No character set found in data-matrix-chars');
    return;
  }

  const animation: MatrixAnimation = {
    animationId: null,
    frameCount: 0,
    matrixChars,
    rainElement,
    stopAnimation: () => {
      if (animation.animationId) {
        cancelAnimationFrame(animation.animationId);
        animation.animationId = null;
      }
      activeAnimations.delete(rainElement);
    },
  };

  activeAnimations.set(rainElement, animation);

  function getRandomChar(): string {
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
  }

  function updateCharacters() {
    animation.frameCount++;

    const columns = rainElement.querySelectorAll('.matrix-column');
    columns.forEach((column) => {
      const chars = column.querySelectorAll('.matrix-char');
      const trailLength = parseInt((column as HTMLElement).dataset.trailLength ?? '20');

      chars.forEach((char, index) => {
        const isBright = char.classList.contains('matrix-char-bright');

        if (isBright) {
          // Leading bright character changes 1-2 times per second (every 30-60 frames at 60fps)
          // Use modulo ranges to create variability: change when frameCount hits 30, 60, 90, etc.
          // with occasional skips for natural variation
          if (
            animation.frameCount % 45 === 0 ||
            (animation.frameCount % 60 === 0 && Math.random() < 0.5)
          ) {
            char.textContent = getRandomChar();
          }
        } else {
          // Trail characters change less frequently
          // Characters closer to the head change more often
          const distanceFromHead = trailLength - index - 1;
          const changeFrequency = Math.max(8, Math.floor(distanceFromHead / 2));

          if (animation.frameCount % changeFrequency === 0 && Math.random() < 0.3) {
            char.textContent = getRandomChar();
          }
        }
      });
    });

    animation.animationId = requestAnimationFrame(updateCharacters);
  }

  // Start the animation loop
  animation.animationId = requestAnimationFrame(updateCharacters);

  // Set up cleanup triggers
  setupCleanupTriggers(rainElement, animation);
}

/**
 * Set up triggers to stop the animation
 */
function setupCleanupTriggers(rainElement: HTMLElement, animation: MatrixAnimation): void {
  const terminalOutput = document.getElementById('terminal-output');

  // Stop on scroll
  if (terminalOutput) {
    const scrollHandler = () => {
      animation.stopAnimation();
    };
    terminalOutput.addEventListener('scroll', scrollHandler, { once: true });
  }

  // Stop when new content is added after the matrix rain
  const observer = new MutationObserver(() => {
    // Check if new content was added after the matrix rain
    if (rainElement.nextElementSibling) {
      animation.stopAnimation();
      observer.disconnect();
    }
  });

  if (terminalOutput) {
    observer.observe(terminalOutput, { childList: true, subtree: true });
  }

  // Stop if the element is removed from DOM
  const removalObserver = new MutationObserver(() => {
    if (!document.body.contains(rainElement)) {
      animation.stopAnimation();
      removalObserver.disconnect();
    }
  });

  removalObserver.observe(document.body, { childList: true, subtree: true });
}

/**
 * Initialize matrix rain observer
 * Watches for .matrix-rain elements being added to the DOM and starts animations
 */
export function initMatrixRainObserver(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Check if the added node itself is a matrix rain element
          if (element.classList.contains('matrix-rain')) {
            startMatrixRainAnimation(element);
          }

          // Check for matrix rain elements within the added node
          const matrixElements = element.querySelectorAll('.matrix-rain');
          matrixElements.forEach((matrixElement) => {
            startMatrixRainAnimation(matrixElement as HTMLElement);
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

  // Also check for any existing matrix rain elements (in case this loads late)
  const existingMatrixElements = document.querySelectorAll('.matrix-rain');
  existingMatrixElements.forEach((element) => {
    startMatrixRainAnimation(element as HTMLElement);
  });
}
