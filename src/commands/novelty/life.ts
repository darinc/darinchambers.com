import { CommandArgs } from '../../utils/CommandArgs';
import type { ThemeManager } from '../../utils/ThemeManager';
import type { Command } from '../Command';

/**
 * life command - Conway's Game of Life cellular automaton
 *
 * Renders the classic Game of Life simulation in the terminal.
 * Uses toroidal topology (wrapping edges) for continuous evolution.
 * Animation uses current theme colors and runs in real-time.
 * Evolution happens using canvas rendering.
 */

/**
 * Get terminal dimensions for canvas sizing based on viewport
 */
function getTerminalDimensions(): { width: number; height: number } {
  // Use viewport dimensions, not terminal-output (which includes scrollback)
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get header height to subtract from available space
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 60;

  // Use 95% of viewport width for margin, 100% of available height
  const width = Math.max(400, Math.floor(viewportWidth * 0.95));
  const height = Math.max(300, Math.floor(viewportHeight - headerHeight));

  return { width, height };
}

/**
 * Create the Conway's Life command
 */
export function createLifeCommand(themeManager: ThemeManager): Command {
  return {
    name: 'life',
    description: "Conway's Game of Life cellular automaton",
    execute: (args: string[], _stdin?: string) => {
      const cmdArgs = new CommandArgs(args);

      // Check for help flag
      if (cmdArgs.hasFlag('help')) {
        return {
          output: `Usage: life [options]

Display Conway's Game of Life - a cellular automaton simulation.
Cells evolve following simple rules: survive with 2-3 neighbors,
birth with exactly 3 neighbors, otherwise die.

Options:
  --speed <number>    Generations per second (0.5-10, default: 2)
                      Controls how fast the simulation evolves
  --density <number>  Initial cell density 0.0-1.0 (default: 0.3)
                      Higher values create denser starting patterns
  --pattern <name>    Start pattern: random, acorn, glider, blinker
                      (default: random)
                      - acorn: Evolves for 5000+ generations
                      - glider: Classic spaceship that moves
                      - blinker: Simple oscillator
  --theme <name>      Override current theme (green, yellow, white,
                      light-blue, paper, dc, custom)
  --help              Display this help message

Examples:
  life                    # Random pattern, default speed
  life --speed 5          # Fast evolution (5 gen/sec)
  life --pattern acorn    # Classic acorn pattern
  life --density 0.5      # Dense initial population

Note: Animation continues until you scroll, type, or run 'clear'`,
        };
      }

      // Parse speed flag (0.5 - 10 GPS)
      let speed = 2.0;
      const speedFlag = cmdArgs.getFlag('speed');
      if (speedFlag !== undefined) {
        const parsed = parseFloat(String(speedFlag));
        if (isNaN(parsed) || parsed < 0.5 || parsed > 10) {
          return {
            output: `life: invalid speed '${speedFlag}'\nSpeed must be between 0.5 and 10.0`,
            error: true,
          };
        }
        speed = parsed;
      }

      // Parse density flag (0.0 - 1.0)
      let density = 0.3;
      const densityFlag = cmdArgs.getFlag('density');
      if (densityFlag !== undefined) {
        const parsed = parseFloat(String(densityFlag));
        if (isNaN(parsed) || parsed < 0 || parsed > 1) {
          return {
            output: `life: invalid density '${densityFlag}'\nDensity must be between 0.0 and 1.0`,
            error: true,
          };
        }
        density = parsed;
      }

      // Parse pattern flag
      const patternFlag = cmdArgs.getFlag('pattern');
      let pattern = 'random';
      if (patternFlag !== undefined) {
        const patternName = String(patternFlag);
        const validPatterns = ['random', 'acorn', 'glider', 'blinker'];
        if (!validPatterns.includes(patternName)) {
          return {
            output: `life: invalid pattern '${patternName}'\nValid patterns: ${validPatterns.join(', ')}`,
            error: true,
          };
        }
        pattern = patternName;
      }

      // Parse theme flag
      const themeFlag = cmdArgs.getFlag('theme');
      let colors = themeManager.getCurrentColors();

      if (themeFlag !== undefined) {
        const themeName = String(themeFlag);
        const validThemes = ['green', 'yellow', 'white', 'light-blue', 'paper', 'dc', 'custom'];

        if (!validThemes.includes(themeName)) {
          return {
            output: `life: invalid theme '${themeName}'\nValid themes: ${validThemes.join(', ')}`,
            error: true,
          };
        }

        // Get colors from specified theme preset
        if (themeName !== 'custom') {
          const preset = themeManager.getPreset(
            themeName as 'green' | 'yellow' | 'white' | 'light-blue' | 'paper' | 'dc'
          );
          if (preset) {
            colors = preset.colors;
          }
        }
      }

      // Get dynamic canvas dimensions based on terminal size
      const { width: canvasWidth, height: canvasHeight } = getTerminalDimensions();

      // Calculate display height (maintain aspect ratio)
      const displayHeight = Math.floor(canvasHeight * 0.8);

      const accentColor = colors['--terminal-accent'];
      const dimColor = colors['--terminal-dim'];
      const bgColor = colors['--terminal-bg'];

      // Generate HTML with canvas
      const html = `
<div class="life-container" style="background-color: ${bgColor}; min-height: ${displayHeight}px;">
  <canvas id="life-canvas" class="life-grid"
          width="${canvasWidth}"
          height="${canvasHeight}"
          data-speed="${speed}"
          data-density="${density}"
          data-pattern="${pattern}"
          data-accent-color="${accentColor}"
          data-dim-color="${dimColor}"
          style="width: 100%; height: ${displayHeight}px; display: block;">
  </canvas>
</div>
`;

      return {
        output: html,
        html: true,
      };
    },
  };
}
