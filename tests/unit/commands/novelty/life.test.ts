/**
 * Tests for life command
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createLifeCommand } from '../../../../src/commands/novelty/life';
import type { CommandResult } from '../../../../src/commands/Command';
import type { ColorScheme, ThemePreset } from '../../../../src/types/settings';
import type { ThemeManager } from '../../../../src/utils/ThemeManager';

describe('life command', () => {
  let mockThemeManager: ThemeManager;
  let mockColors: ColorScheme;

  beforeEach(() => {
    // Setup mock theme colors
    mockColors = {
      '--terminal-bg': '#0a0e14',
      '--terminal-fg': '#b3b1ad',
      '--terminal-accent': '#39bae6',
      '--terminal-dim': '#626a73',
      '--terminal-error': '#ff3333',
      '--terminal-cursor': '#39bae6',
      '--terminal-bg-secondary': '#0d1117',
    };

    // Mock ThemeManager
    mockThemeManager = {
      getCurrentColors: () => mockColors,
      getPreset: (name: string) => {
        const presets: Record<string, ThemePreset> = {
          green: {
            name: 'green',
            displayName: 'Matrix Green',
            colors: {
              '--terminal-bg': '#000000',
              '--terminal-fg': '#00ff00',
              '--terminal-accent': '#00ff00',
              '--terminal-dim': '#008800',
              '--terminal-error': '#ff0000',
              '--terminal-cursor': '#00ff00',
              '--terminal-bg-secondary': '#001100',
            },
          },
          yellow: {
            name: 'yellow',
            displayName: 'Amber',
            colors: {
              '--terminal-bg': '#1e1e1e',
              '--terminal-fg': '#ffb000',
              '--terminal-accent': '#ffcc00',
              '--terminal-dim': '#997700',
              '--terminal-error': '#ff0000',
              '--terminal-cursor': '#ffcc00',
              '--terminal-bg-secondary': '#2a2a2a',
            },
          },
        };
        return presets[name];
      },
    } as ThemeManager;

    // Setup DOM
    document.body.innerHTML = `
      <div id="terminal-output" style="width: 800px; height: 600px;"></div>
    `;

    // Mock CSS custom properties
    document.documentElement.style.setProperty('--terminal-font-size', '16');
  });

  it('should have correct name and description', () => {
    const command = createLifeCommand(mockThemeManager);

    expect(command.name).toBe('life');
    expect(command.description).toBe("Conway's Game of Life cellular automaton");
  });

  it('should show help message with --help flag', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--help']) as CommandResult;

    expect(result.output).toContain('Usage: life [options]');
    expect(result.output).toContain("Conway's Game of Life");
    expect(result.output).toContain('--speed');
    expect(result.output).toContain('--density');
    expect(result.output).toContain('--pattern');
    expect(result.output).toContain('--theme');
    expect(result.output).toContain('Examples:');
  });

  it('should generate HTML output with canvas', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([]) as CommandResult;

    expect(result.html).toBe(true);
    expect(result.output).toContain('<canvas');
    expect(result.output).toContain('id="life-canvas"');
    expect(result.output).toContain('class="life-grid"');
  });

  it('should include canvas with data attributes', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--speed', '5', '--density', '0.5']) as CommandResult;

    expect(result.output).toContain('data-speed="5"');
    expect(result.output).toContain('data-density="0.5"');
    expect(result.output).toContain('data-pattern="random"');
  });

  it('should validate speed range (minimum)', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--speed', '0.3']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid speed '0.3'");
    expect(result.output).toContain('Speed must be between 0.5 and 10.0');
  });

  it('should validate speed range (maximum)', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--speed', '11']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid speed '11'");
    expect(result.output).toContain('Speed must be between 0.5 and 10.0');
  });

  it('should validate speed as number', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--speed', 'fast']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid speed 'fast'");
  });

  it('should accept valid speed values', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--speed', '2.5']) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain('data-speed="2.5"');
  });

  it('should accept minimum density value', () => {
    const command = createLifeCommand(mockThemeManager);

    // Test boundary: 0.0 should be valid
    const result = command.execute(['--density', '0']) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain('data-density="0"');
  });

  it('should validate density range (maximum)', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--density', '1.5']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid density '1.5'");
    expect(result.output).toContain('Density must be between 0.0 and 1.0');
  });

  it('should validate density as number', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--density', 'high']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid density 'high'");
  });

  it('should accept valid density values', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--density', '0.5']) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain('data-density="0.5"');
  });

  it('should validate pattern names', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--pattern', 'invalid']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid pattern 'invalid'");
    expect(result.output).toContain('Valid patterns: random, acorn, glider, blinker');
  });

  it('should accept valid pattern names', () => {
    const command = createLifeCommand(mockThemeManager);

    const patterns = ['random', 'acorn', 'glider', 'blinker'];

    patterns.forEach((pattern) => {
      const result = command.execute(['--pattern', pattern]) as CommandResult;
      expect(result.error).toBeUndefined();
      expect(result.output).toContain(`data-pattern="${pattern}"`);
    });
  });

  it('should use default values when no flags provided', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([]) as CommandResult;

    expect(result.output).toContain('data-speed="2"');
    expect(result.output).toContain('data-density="0.3"');
    expect(result.output).toContain('data-pattern="random"');
  });

  it('should validate theme names', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--theme', 'invalid-theme']) as CommandResult;

    expect(result.error).toBe(true);
    expect(result.output).toContain("invalid theme 'invalid-theme'");
    expect(result.output).toContain('Valid themes:');
  });

  it('should apply theme colors when theme flag is provided', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--theme', 'green']) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain('data-accent-color="#00ff00"');
    expect(result.output).toContain('data-dim-color="#008800"');
  });

  it('should use current theme when no theme flag provided', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([]) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain(`data-accent-color="${mockColors['--terminal-accent']}"`);
    expect(result.output).toContain(`data-dim-color="${mockColors['--terminal-dim']}"`);
  });

  it('should handle custom theme option', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute(['--theme', 'custom']) as CommandResult;

    expect(result.error).toBeUndefined();
    // Custom theme uses current colors
    expect(result.output).toContain(`data-accent-color="${mockColors['--terminal-accent']}"`);
  });

  it('should set canvas dimensions based on terminal size', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([]) as CommandResult;

    // Canvas dimensions should be dynamic based on terminal container
    // With mock container (800x600), expect width ~760, height ~360
    expect(result.output).toContain('width=');
    expect(result.output).toContain('height=');
    expect(result.output).toContain('style="width: 100%');
    expect(result.output).toMatch(/width="\d+"/);
    expect(result.output).toMatch(/height="\d+"/);
  });

  it('should include life-container wrapper', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([]) as CommandResult;

    expect(result.output).toContain('<div class="life-container"');
    expect(result.output).toContain('background-color:');
  });

  it('should combine multiple flags correctly', () => {
    const command = createLifeCommand(mockThemeManager);

    const result = command.execute([
      '--speed',
      '5',
      '--density',
      '0.5',
      '--pattern',
      'acorn',
      '--theme',
      'yellow',
    ]) as CommandResult;

    expect(result.error).toBeUndefined();
    expect(result.output).toContain('data-speed="5"');
    expect(result.output).toContain('data-density="0.5"');
    expect(result.output).toContain('data-pattern="acorn"');
    expect(result.output).toContain('data-accent-color="#ffcc00"');
  });
});
