/**
 * Canvas mocking helpers for tests.
 *
 * jsdom does not implement the 2D canvas context, so these helpers provide a
 * stub context (every drawing call is a spy) and install it on
 * HTMLCanvasElement.prototype.getContext so code under test can render.
 */
import { vi } from 'vitest';

/** A 2D context whose every method is a vitest spy. */
export function createMockContext(): CanvasRenderingContext2D {
  return {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    font: '',
    textAlign: 'left',
    textBaseline: 'alphabetic',
    globalAlpha: 1,
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    setTransform: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    fillText: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

/**
 * Install the mock context on the canvas prototype. Returns the context so tests
 * can assert on its spies. Call vi.restoreAllMocks() in afterEach to undo.
 */
export function installCanvasMock(): CanvasRenderingContext2D {
  const ctx = createMockContext();
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(ctx);
  return ctx;
}
