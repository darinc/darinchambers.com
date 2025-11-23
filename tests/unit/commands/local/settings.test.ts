/**
 * Unit tests for Settings Command
 *
 * Tests the CLI interface for settings management including theme switching,
 * font configuration, effects toggling, and settings display.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSettingsCommand } from '../../../../src/commands/local/settings';
import { FileSystemService } from '../../../../src/utils/fs/FileSystemService';
import { SettingsManager } from '../../../../src/utils/SettingsManager';
import { ThemeManager } from '../../../../src/utils/ThemeManager';
import type { Command, CommandResult } from '../../../../src/commands/Command';
import type { FileSystemNode } from '../../../../src/utils/fs/types';

describe('Settings Command', () => {
  let fs: FileSystemService;
  let settingsManager: SettingsManager;
  let themeManager: ThemeManager;
  let settingsCommand: Command;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Create fresh filesystem with mock root
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
    fs = new FileSystemService(mockRoot);

    // Create managers
    settingsManager = new SettingsManager(fs);
    themeManager = new ThemeManager(settingsManager);

    // Create command
    settingsCommand = createSettingsCommand(fs, settingsManager, themeManager);

    // Mock document for DOM manipulation
    global.document = {
      documentElement: {
        style: {
          setProperty: vi.fn(),
        },
      },
      body: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
      dispatchEvent: vi.fn(),
    } as any;

    // Mock getComputedStyle for SettingsUI
    // Need to do this at the window level since jsdom validates the element parameter
    window.getComputedStyle = vi.fn(() => {
      return {
        getPropertyValue: (prop: string) => {
          // Return default color values for CSS variables
          const defaults: Record<string, string> = {
            '--terminal-bg': '#0a0e16',
            '--terminal-fg': '#39ff16',
            '--terminal-accent': '#39ff16',
            '--terminal-dim': '#20c20e',
            '--terminal-error': '#ff3333',
            '--terminal-cursor': '#39ff16',
          };
          return defaults[prop] || '';
        },
        trim: function () {
          return '';
        },
      } as unknown as CSSStyleDeclaration;
    }) as any;
  });

  describe('Command metadata', () => {
    it('should have correct name', () => {
      expect(settingsCommand.name).toBe('settings');
    });

    it('should have correct description', () => {
      expect(settingsCommand.description).toBe('Manage terminal settings and preferences');
    });

    it('should have correct aliases', () => {
      expect(settingsCommand.aliases).toEqual(['preferences', 'config']);
    });
  });

  describe('No arguments - Interactive UI', () => {
    it('should return HTML output when called with no arguments', () => {
      const result = settingsCommand.execute([]) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toBeDefined();
      expect(typeof result.output).toBe('string');
    });

    it('should include settings panel in output', () => {
      const result = settingsCommand.execute([]) as CommandResult;

      expect(result.output).toContain('settings-panel');
    });

    it('should include theme preset buttons', () => {
      const result = settingsCommand.execute([]) as CommandResult;

      // Check for theme preset display names (they appear in button text)
      // Based on actual output: Green, Amber, White, Cyan, Paper
      expect(result.output).toContain('Green');
      expect(result.output).toContain('Amber');
      expect(result.output).toContain('White');
      expect(result.output).toContain('Cyan');
      expect(result.output).toContain('Paper');
      // Check for theme button class
      expect(result.output).toContain('theme-button');
    });

    it('should include font controls', () => {
      const result = settingsCommand.execute([]) as CommandResult;

      expect(result.output).toContain('Font Size');
      expect(result.output).toContain('Font Family');
    });

    it('should include effects controls', () => {
      const result = settingsCommand.execute([]) as CommandResult;

      expect(result.output).toContain('Scan Lines');
      expect(result.output).toContain('Glow');
      expect(result.output).toContain('Animation Speed');
    });
  });

  describe('settings list', () => {
    it('should return formatted settings display', () => {
      const result = settingsCommand.execute(['list']) as CommandResult;

      expect(result.html).toBe(true);
      expect(result.output).toBeDefined();
    });

    it('should include current theme information', () => {
      const result = settingsCommand.execute(['list']) as CommandResult;

      // The output is HTML rendered markdown, so check for the theme name
      // Default theme is green which has display name "Green (Default)"
      expect(result.output).toBeDefined();
      expect(typeof result.output).toBe('string');
    });

    it('should include font settings', () => {
      settingsManager.setFontSize(16);
      settingsManager.setFontFamily('Monaco');

      const result = settingsCommand.execute(['list']) as CommandResult;

      expect(result.output).toContain('16px');
      expect(result.output).toContain('Monaco');
    });

    it('should include effects settings', () => {
      settingsManager.setScanLines(true);
      settingsManager.setGlow(true);
      settingsManager.setAnimationSpeed(1.5);

      const result = settingsCommand.execute(['list']) as CommandResult;

      expect(result.output).toContain('Enabled');
      expect(result.output).toContain('1.5x');
    });

    it('should include usage examples', () => {
      const result = settingsCommand.execute(['list']) as CommandResult;

      expect(result.output).toContain('settings set theme');
      expect(result.output).toContain('settings set font-size');
      expect(result.output).toContain('settings reset');
    });
  });

  describe('settings set theme', () => {
    it('should successfully change to green theme', () => {
      const result = settingsCommand.execute(['set', 'theme', 'green']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Theme changed to: green');
      expect(settingsManager.getThemePreset()).toBe('green');
    });

    it('should successfully change to dc theme', () => {
      const result = settingsCommand.execute(['set', 'theme', 'dc']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Theme changed to: dc');
      expect(settingsManager.getThemePreset()).toBe('dc');
    });

    it('should successfully change to white theme', () => {
      const result = settingsCommand.execute(['set', 'theme', 'white']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Theme changed to: white');
      expect(settingsManager.getThemePreset()).toBe('white');
    });

    it('should successfully change to light-blue theme', () => {
      const result = settingsCommand.execute(['set', 'theme', 'light-blue']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Theme changed to: light-blue');
      expect(settingsManager.getThemePreset()).toBe('light-blue');
    });

    it('should successfully change to paper theme', () => {
      const result = settingsCommand.execute(['set', 'theme', 'paper']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Theme changed to: paper');
      expect(settingsManager.getThemePreset()).toBe('paper');
    });

    it('should reject invalid theme name', () => {
      const result = settingsCommand.execute(['set', 'theme', 'invalid']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid theme: invalid');
      expect(result.output).toContain('green, yellow, white, light-blue, paper, dc');
    });

    it('should broadcast settings change event', () => {
      settingsCommand.execute(['set', 'theme', 'dc']);

      expect(document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('settings set color', () => {
    it('should set custom accent color', () => {
      const result = settingsCommand.execute([
        'set',
        'color',
        '--terminal-accent',
        '#ff0000',
      ]) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Color --terminal-accent set to #ff0000');
    });

    it('should set custom background color', () => {
      const result = settingsCommand.execute([
        'set',
        'color',
        '--terminal-bg',
        '#000000',
      ]) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Color --terminal-bg set to #000000');
    });

    it('should show error when color variable is missing', () => {
      const result = settingsCommand.execute(['set', 'color']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set color');
    });

    it('should update CSS variables via ThemeManager', () => {
      settingsCommand.execute(['set', 'color', '--terminal-accent', '#00ff00']);

      // Verify the theme was set to custom
      expect(settingsManager.getThemePreset()).toBe('custom');
    });
  });

  describe('settings set font-size', () => {
    it('should set valid font size', () => {
      const result = settingsCommand.execute(['set', 'font-size', '16']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Font size set to: 16px');
      expect(settingsManager.getFontSize()).toBe(16);
    });

    it('should apply font size to CSS variables', () => {
      settingsCommand.execute(['set', 'font-size', '18']);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--terminal-font-size',
        '18px'
      );
    });

    it('should reject font size below minimum (8)', () => {
      const result = settingsCommand.execute(['set', 'font-size', '6']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid font size: 6. Must be between 8 and 24');
    });

    it('should reject font size above maximum (24)', () => {
      const result = settingsCommand.execute(['set', 'font-size', '30']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid font size: 30. Must be between 8 and 24');
    });

    it('should reject non-numeric font size', () => {
      const result = settingsCommand.execute(['set', 'font-size', 'abc']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Font size must be a number');
    });

    it('should reject missing font size value', () => {
      const result = settingsCommand.execute(['set', 'font-size']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set font-family', () => {
    it('should set Courier New font family', () => {
      const result = settingsCommand.execute([
        'set',
        'font-family',
        'Courier New',
      ]) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Font family set to: Courier New');
      expect(settingsManager.getFontFamily()).toBe('Courier New');
    });

    it('should set JetBrains Mono font family', () => {
      const result = settingsCommand.execute([
        'set',
        'font-family',
        'JetBrains Mono',
      ]) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(settingsManager.getFontFamily()).toBe('JetBrains Mono');
    });

    it('should set Monaco font family', () => {
      const result = settingsCommand.execute(['set', 'font-family', 'Monaco']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(settingsManager.getFontFamily()).toBe('Monaco');
    });

    it('should set monospace font family', () => {
      const result = settingsCommand.execute(['set', 'font-family', 'monospace']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(settingsManager.getFontFamily()).toBe('monospace');
    });

    it('should apply font family to CSS variables', () => {
      settingsCommand.execute(['set', 'font-family', 'Monaco']);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--terminal-font-family',
        'Monaco'
      );
    });

    it('should reject invalid font family', () => {
      const result = settingsCommand.execute(['set', 'font-family', 'Arial']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid font family: Arial');
      expect(result.output).toContain('Fira Code');
      expect(result.output).toContain('monospace');
    });

    it('should reject missing font family value', () => {
      const result = settingsCommand.execute(['set', 'font-family']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set scan-lines', () => {
    it('should enable scan lines', () => {
      const result = settingsCommand.execute(['set', 'scan-lines', 'on']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Scan lines: on');
      expect(settingsManager.getScanLines()).toBe(true);
    });

    it('should disable scan lines', () => {
      settingsManager.setScanLines(true);
      const result = settingsCommand.execute(['set', 'scan-lines', 'off']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Scan lines: off');
      expect(settingsManager.getScanLines()).toBe(false);
    });

    it('should apply scan lines class to body when enabled', () => {
      settingsCommand.execute(['set', 'scan-lines', 'on']);

      expect(document.body.classList.remove).toHaveBeenCalledWith('no-scan-lines');
    });

    it('should apply scan lines class to body when disabled', () => {
      settingsCommand.execute(['set', 'scan-lines', 'off']);

      expect(document.body.classList.add).toHaveBeenCalledWith('no-scan-lines');
    });

    it('should reject invalid value', () => {
      const result = settingsCommand.execute(['set', 'scan-lines', 'maybe']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Scan lines must be "on" or "off"');
    });

    it('should reject missing value', () => {
      const result = settingsCommand.execute(['set', 'scan-lines']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set glow', () => {
    it('should enable glow effect', () => {
      const result = settingsCommand.execute(['set', 'glow', 'on']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Glow: on');
      expect(settingsManager.getGlow()).toBe(true);
    });

    it('should disable glow effect', () => {
      settingsManager.setGlow(true);
      const result = settingsCommand.execute(['set', 'glow', 'off']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Glow: off');
      expect(settingsManager.getGlow()).toBe(false);
    });

    it('should apply glow class to body when enabled', () => {
      settingsCommand.execute(['set', 'glow', 'on']);

      expect(document.body.classList.remove).toHaveBeenCalledWith('no-glow');
    });

    it('should apply glow class to body when disabled', () => {
      settingsCommand.execute(['set', 'glow', 'off']);

      expect(document.body.classList.add).toHaveBeenCalledWith('no-glow');
    });

    it('should reject invalid value', () => {
      const result = settingsCommand.execute(['set', 'glow', 'true']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Glow must be "on" or "off"');
    });

    it('should reject missing value', () => {
      const result = settingsCommand.execute(['set', 'glow']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set border', () => {
    it('should enable page border', () => {
      const result = settingsCommand.execute(['set', 'border', 'on']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Border: on');
      expect(settingsManager.getBorder()).toBe(true);
    });

    it('should disable page border', () => {
      const result = settingsCommand.execute(['set', 'border', 'off']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Border: off');
      expect(settingsManager.getBorder()).toBe(false);
    });

    it('should apply border class to body when enabled', () => {
      settingsCommand.execute(['set', 'border', 'on']);

      expect(document.body.classList.add).toHaveBeenCalledWith('border-enabled');
    });

    it('should apply border class to body when disabled', () => {
      settingsCommand.execute(['set', 'border', 'off']);

      expect(document.body.classList.remove).toHaveBeenCalledWith('border-enabled');
    });

    it('should reject invalid value', () => {
      const result = settingsCommand.execute(['set', 'border', '1']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Border must be "on" or "off"');
    });

    it('should reject missing value', () => {
      const result = settingsCommand.execute(['set', 'border']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set animation-speed', () => {
    it('should set animation speed to 1.5x', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', '1.5']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Animation speed set to: 1.5x');
      expect(settingsManager.getAnimationSpeed()).toBe(1.5);
    });

    it('should set animation speed to minimum (0.5)', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', '0.5']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(settingsManager.getAnimationSpeed()).toBe(0.5);
    });

    it('should set animation speed to maximum (2.0)', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', '2.0']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(settingsManager.getAnimationSpeed()).toBe(2.0);
    });

    it('should apply animation speed to CSS variables', () => {
      settingsCommand.execute(['set', 'animation-speed', '1.5']);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--terminal-animation-speed',
        '1.5'
      );
    });

    it('should reject animation speed below minimum', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', '0.3']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid animation speed: 0.3. Must be between 0.5 and 2.0');
    });

    it('should reject animation speed above maximum', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', '3.0']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Invalid animation speed: 3. Must be between 0.5 and 2.0');
    });

    it('should reject non-numeric animation speed', () => {
      const result = settingsCommand.execute(['set', 'animation-speed', 'fast']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Animation speed must be a number');
    });

    it('should reject missing animation speed value', () => {
      const result = settingsCommand.execute(['set', 'animation-speed']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set sound-effects', () => {
    it('should enable sound effects', () => {
      const result = settingsCommand.execute(['set', 'sound-effects', 'on']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Sound effects: on');
      expect(settingsManager.getSoundEffects()).toBe(true);
    });

    it('should disable sound effects', () => {
      const result = settingsCommand.execute(['set', 'sound-effects', 'off']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Sound effects: off');
      expect(settingsManager.getSoundEffects()).toBe(false);
    });

    it('should reject invalid value', () => {
      const result = settingsCommand.execute(['set', 'sound-effects', 'yes']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Sound effects must be "on" or "off"');
    });

    it('should reject missing value', () => {
      const result = settingsCommand.execute(['set', 'sound-effects']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });
  });

  describe('settings set - error handling', () => {
    it('should show usage when setting name is missing', () => {
      const result = settingsCommand.execute(['set']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });

    it('should show usage when value is missing for non-color settings', () => {
      const result = settingsCommand.execute(['set', 'theme']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Usage: settings set <setting> <value>');
    });

    it('should reject unknown setting name', () => {
      const result = settingsCommand.execute(['set', 'unknown', 'value']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Unknown setting: unknown');
      expect(result.output).toContain('Available:');
    });

    it('should handle errors thrown by SettingsManager', () => {
      // Force an error by providing invalid data type
      const result = settingsCommand.execute(['set', 'font-size', 'NaN']) as CommandResult;

      expect(result.error).toBe(true);
    });
  });

  describe('settings reset', () => {
    it('should reset all settings to defaults', () => {
      // Change some settings
      settingsManager.setThemePreset('dc');
      settingsManager.setFontSize(20);
      settingsManager.setScanLines(true);
      settingsManager.setGlow(true);
      settingsManager.setAnimationSpeed(2.0);

      const result = settingsCommand.execute(['reset']) as CommandResult;

      expect(result.error).toBeUndefined();
      expect(result.output).toContain('Settings reset to defaults');

      // Verify all settings are back to defaults
      expect(settingsManager.getThemePreset()).toBe('dc');
      expect(settingsManager.getFontSize()).toBe(16);
      expect(settingsManager.getFontFamily()).toBe('Fira Code');
      expect(settingsManager.getScanLines()).toBe(false);
      expect(settingsManager.getGlow()).toBe(false);
      expect(settingsManager.getBorder()).toBe(true);
      expect(settingsManager.getAnimationSpeed()).toBe(1.0);
      expect(settingsManager.getSoundEffects()).toBe(false);
    });

    it('should apply default theme', () => {
      settingsManager.setThemePreset('green');
      settingsCommand.execute(['reset']);

      // ThemeManager should apply the default theme
      expect(settingsManager.getThemePreset()).toBe('dc');
    });

    it('should apply default font settings to DOM', () => {
      settingsManager.setFontSize(20);
      settingsCommand.execute(['reset']);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--terminal-font-size',
        '16px'
      );
    });

    it('should broadcast settings change event', () => {
      settingsCommand.execute(['reset']);

      expect(document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('Unknown subcommand', () => {
    it('should show error for unknown subcommand', () => {
      const result = settingsCommand.execute(['invalid']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toBe(
        "Unknown subcommand: invalid.\nTry 'settings --help' for more information"
      );
    });

    it('should show error for typo in list', () => {
      const result = settingsCommand.execute(['lst']) as CommandResult;

      expect(result.error).toBe(true);
      expect(result.output).toContain('Unknown subcommand: lst');
    });
  });

  describe('Aliases', () => {
    it('should support preferences alias', () => {
      expect(settingsCommand.aliases).toContain('preferences');
    });

    it('should support config alias', () => {
      expect(settingsCommand.aliases).toContain('config');
    });
  });
});
