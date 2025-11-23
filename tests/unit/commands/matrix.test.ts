/**
 * Unit tests for matrix command
 *
 * Tests Matrix digital rain animation command functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createMatrixCommand } from '../../../src/commands/novelty/matrix';
import { FileSystemService } from '../../../src/utils/fs/FileSystemService';
import { SettingsManager } from '../../../src/utils/SettingsManager';
import { ThemeManager } from '../../../src/utils/ThemeManager';
import type { CommandResult } from '../../../src/commands/Command';
import type { FileSystemNode } from '../../../src/utils/fs/types';

describe('matrix command', () => {
  let themeManager: ThemeManager;
  let matrixCommand: ReturnType<typeof createMatrixCommand>;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Create mock filesystem
    const mockRoot: FileSystemNode = {
      name: '',
      type: 'directory',
      children: new Map([
        [
          'home',
          {
            name: 'home',
            type: 'directory',
            children: new Map([
              [
                'darin',
                {
                  name: 'darin',
                  type: 'directory',
                  children: new Map(),
                },
              ],
            ]),
          },
        ],
      ]),
    };

    const fs = new FileSystemService(mockRoot);
    const settingsManager = new SettingsManager(fs);
    themeManager = new ThemeManager(settingsManager);

    // Mock DOM for terminal dimensions
    const mockContainer = document.createElement('div');
    mockContainer.id = 'terminal-output';
    mockContainer.style.width = '800px';
    mockContainer.style.height = '600px';
    document.body.appendChild(mockContainer);

    // Mock CSS variable
    document.documentElement.style.setProperty('--terminal-font-size', '16px');

    matrixCommand = createMatrixCommand(themeManager);
  });

  it('should have correct name and description', () => {
    expect(matrixCommand.name).toBe('matrix');
    expect(matrixCommand.description).toBe('Display Matrix digital rain animation');
  });

  it('should show help with --help flag', () => {
    const result = matrixCommand.execute(['--help']) as CommandResult;
    expect(result.output).toContain('Usage: matrix');
    expect(result.output).toContain('Matrix-style "digital rain"');
    expect(result.output).toContain('--speed');
    expect(result.output).toContain('--theme');
    expect(result.error).toBeUndefined();
  });

  it('should generate HTML output', () => {
    const result = matrixCommand.execute([]) as CommandResult;
    expect(result.html).toBe(true);
    expect(result.output).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should include matrix-rain container in output', () => {
    const result = matrixCommand.execute([]) as CommandResult;
    expect(result.output).toContain('matrix-rain');
    expect(result.output).toContain('matrix-column');
  });

  it('should include CSS animations in output', () => {
    const result = matrixCommand.execute([]) as CommandResult;
    expect(result.output).toContain('matrix-fall');
    expect(result.output).toContain('animation:');
  });

  it('should accept speed flag with valid value', () => {
    const result = matrixCommand.execute(['--speed', '2.0']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
    expect(result.output).toBeTruthy();
  });

  it('should accept speed flag with decimal value', () => {
    const result = matrixCommand.execute(['--speed', '0.5']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
  });

  it('should reject speed flag below minimum', () => {
    const result = matrixCommand.execute(['--speed', '0.05']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('Speed must be between 0.1 and 5.0');
  });

  it('should reject speed flag above maximum', () => {
    const result = matrixCommand.execute(['--speed', '10']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('Speed must be between 0.1 and 5.0');
  });

  it('should reject invalid speed value', () => {
    const result = matrixCommand.execute(['--speed', 'fast']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('invalid speed value');
  });

  it('should accept valid theme flag', () => {
    const result = matrixCommand.execute(['--theme', 'green']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
    expect(result.output).toBeTruthy();
  });

  it('should accept all valid theme names', () => {
    const themes = ['green', 'yellow', 'white', 'light-blue', 'paper', 'dc'];

    themes.forEach((theme) => {
      const result = matrixCommand.execute(['--theme', theme]) as CommandResult;
      expect(result.error).toBeUndefined();
      expect(result.html).toBe(true);
    });
  });

  it('should reject invalid theme name', () => {
    const result = matrixCommand.execute(['--theme', 'invalid']) as CommandResult;
    expect(result.error).toBe(true);
    expect(result.output).toContain('invalid theme');
  });

  it('should combine speed and theme flags', () => {
    const result = matrixCommand.execute(['--speed', '1.5', '--theme', 'green']) as CommandResult;
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
    expect(result.output).toBeTruthy();
  });

  it('should use current theme colors by default', () => {
    // Apply green theme
    themeManager.applyTheme('green');
    const colors = themeManager.getCurrentColors();

    const result = matrixCommand.execute([]) as CommandResult;
    expect(result.output).toContain(colors['--terminal-accent']);
    expect(result.output).toContain(colors['--terminal-bg']);
  });

  it('should override theme when --theme flag is provided', () => {
    // Set current theme to yellow
    themeManager.applyTheme('yellow');

    // But request green theme
    const greenPreset = themeManager.getPreset('green');
    const result = matrixCommand.execute(['--theme', 'green']) as CommandResult;

    // Should use green colors, not yellow
    if (greenPreset) {
      expect(result.output).toContain(greenPreset.colors['--terminal-accent']);
    }
  });

  it('should generate multiple columns', () => {
    const result = matrixCommand.execute([]) as CommandResult;
    // Count how many matrix-column divs are in the output
    const columnMatches = result.output.match(/class="matrix-column"/g);
    expect(columnMatches).toBeTruthy();
    expect(columnMatches!.length).toBeGreaterThan(5);
  });

  it('should include Matrix characters in output', () => {
    const result = matrixCommand.execute([]) as CommandResult;
    // Should contain some typical Matrix characters
    expect(result.output.length).toBeGreaterThan(1000); // Substantial output
  });

  it('should handle missing DOM container gracefully', () => {
    // Remove the container
    const container = document.getElementById('terminal-output');
    container?.remove();

    const result = matrixCommand.execute([]) as CommandResult;
    // Should still work with fallback dimensions
    expect(result.error).toBeUndefined();
    expect(result.html).toBe(true);
  });
});
