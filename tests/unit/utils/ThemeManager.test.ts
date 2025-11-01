/**
 * Unit tests for ThemeManager
 *
 * Tests theme application, preset management, custom colors, and CSS variable manipulation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeManager } from '../../../src/utils/ThemeManager';
import { SettingsManager } from '../../../src/utils/SettingsManager';
import { FileSystemService } from '../../../src/utils/fs/FileSystemService';
import type { FileSystemNode } from '../../../src/utils/fs/types';
import type { ColorScheme } from '../../../src/types/settings';

describe('ThemeManager', () => {
  let fs: FileSystemService;
  let settingsManager: SettingsManager;
  let themeManager: ThemeManager;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Create mock filesystem
    const mockRoot: FileSystemNode = {
      name: '',
      type: 'directory',
      children: new Map([
        ['home', {
          name: 'home',
          type: 'directory',
          children: new Map([
            ['darin', {
              name: 'darin',
              type: 'directory',
              children: new Map()
            }]
          ])
        }]
      ])
    };
    fs = new FileSystemService(mockRoot);

    // Create managers
    settingsManager = new SettingsManager(fs);
    themeManager = new ThemeManager(settingsManager);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should initialize with preset themes', () => {
      const presets = themeManager.getPresets();
      expect(presets).toHaveLength(4);
    });

    it('should have green preset', () => {
      const green = themeManager.getPreset('green');
      expect(green).not.toBeNull();
      expect(green?.name).toBe('green');
      expect(green?.displayName).toBe('Green (Default)');
    });

    it('should have yellow preset', () => {
      const yellow = themeManager.getPreset('yellow');
      expect(yellow).not.toBeNull();
      expect(yellow?.name).toBe('yellow');
      expect(yellow?.displayName).toBe('Yellow (Amber)');
    });

    it('should have white preset', () => {
      const white = themeManager.getPreset('white');
      expect(white).not.toBeNull();
      expect(white?.name).toBe('white');
      expect(white?.displayName).toBe('White (Light)');
    });

    it('should have light-blue preset', () => {
      const lightBlue = themeManager.getPreset('light-blue');
      expect(lightBlue).not.toBeNull();
      expect(lightBlue?.name).toBe('light-blue');
      expect(lightBlue?.displayName).toBe('Light Blue (Cyan)');
    });
  });

  describe('Preset Management', () => {
    it('should return all presets', () => {
      const presets = themeManager.getPresets();

      const names = presets.map(p => p.name);
      expect(names).toContain('green');
      expect(names).toContain('yellow');
      expect(names).toContain('white');
      expect(names).toContain('light-blue');
    });

    it('should return null for invalid preset name', () => {
      const invalid = themeManager.getPreset('invalid' as any);
      expect(invalid).toBeNull();
    });

    it('should have correct color structure for each preset', () => {
      const presets = themeManager.getPresets();

      presets.forEach(preset => {
        expect(preset.colors).toHaveProperty('--terminal-bg');
        expect(preset.colors).toHaveProperty('--terminal-fg');
        expect(preset.colors).toHaveProperty('--terminal-accent');
        expect(preset.colors).toHaveProperty('--terminal-dim');
        expect(preset.colors).toHaveProperty('--terminal-error');
        expect(preset.colors).toHaveProperty('--terminal-cursor');
      });
    });

    it('should have valid hex colors in all presets', () => {
      const presets = themeManager.getPresets();
      const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      presets.forEach(preset => {
        Object.values(preset.colors).forEach(color => {
          expect(hexPattern.test(color)).toBe(true);
        });
      });
    });
  });

  describe('Theme Application', () => {
    it('should apply green theme', () => {
      themeManager.applyTheme('green');

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('green');
    });

    it('should apply yellow theme', () => {
      themeManager.applyTheme('yellow');

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('yellow');
    });

    it('should apply white theme', () => {
      themeManager.applyTheme('white');

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('white');
    });

    it('should apply light-blue theme', () => {
      themeManager.applyTheme('light-blue');

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('light-blue');
    });

    it('should throw error for invalid theme name', () => {
      expect(() => {
        themeManager.applyTheme('invalid' as any);
      }).toThrow('Invalid theme name');
    });

    it('should throw error when trying to apply custom theme directly', () => {
      expect(() => {
        themeManager.applyTheme('custom');
      }).toThrow('Cannot apply "custom" theme directly');
    });

    it('should persist theme selection to localStorage', () => {
      themeManager.applyTheme('yellow');

      const stored = localStorage.getItem('terminal-settings');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.theme.preset).toBe('yellow');
    });

    it('should persist theme selection to filesystem', () => {
      themeManager.applyTheme('white');

      const content = fs.readFile('/home/darin/.settings');
      const parsed = JSON.parse(content);

      expect(parsed.theme.preset).toBe('white');
    });
  });

  describe('Custom Colors', () => {
    it('should apply custom colors', () => {
      const customColors: Partial<ColorScheme> = {
        '--terminal-accent': '#ff0000'
      };

      themeManager.applyCustomColors(customColors);

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('custom');
      expect(settings.theme.customColors).toBeDefined();
    });

    it('should merge custom colors with existing colors', () => {
      const customColors: Partial<ColorScheme> = {
        '--terminal-accent': '#ff0000',
        '--terminal-cursor': '#00ff00'
      };

      themeManager.applyCustomColors(customColors);

      const settings = settingsManager.loadSettings();
      const saved = settings.theme.customColors!;

      expect(saved.accent).toBe('#ff0000');
      expect(saved.cursor).toBe('#00ff00');
      // Other colors should still exist
      expect(saved.background).toBeTruthy();
      expect(saved.foreground).toBeTruthy();
    });

    it('should validate custom color format', () => {
      const invalidColors: Partial<ColorScheme> = {
        '--terminal-accent': 'red' // Invalid: named color
      };

      expect(() => {
        themeManager.applyCustomColors(invalidColors);
      }).toThrow('Invalid color value');
    });

    it('should accept 6-digit hex colors', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-accent': '#ff0000'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should accept 3-digit hex colors', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-accent': '#f00'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should reject colors without # prefix', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-accent': 'ff0000'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).toThrow('Invalid color value');
    });

    it('should reject invalid hex formats', () => {
      const invalidFormats = [
        'rgb(255, 0, 0)',
        '#gg0000',
        '#12345',
        '#1234567',
        'transparent'
      ];

      invalidFormats.forEach(color => {
        expect(() => {
          themeManager.applyCustomColors({
            '--terminal-accent': color
          });
        }).toThrow();
      });
    });

    it('should persist custom colors to localStorage', () => {
      themeManager.applyCustomColors({
        '--terminal-accent': '#ff0000'
      });

      const stored = localStorage.getItem('terminal-settings');
      const parsed = JSON.parse(stored!);

      expect(parsed.theme.preset).toBe('custom');
      expect(parsed.theme.customColors.accent).toBe('#ff0000');
    });
  });

  describe('Current Theme Loading', () => {
    it('should load preset theme from settings', () => {
      // Set a theme
      settingsManager.setThemePreset('yellow');

      // Create new theme manager to test loading
      const newThemeManager = new ThemeManager(settingsManager);
      newThemeManager.applyCurrentTheme();

      // Verify it loaded the saved theme
      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('yellow');
    });

    it('should load custom theme from settings', () => {
      const customColors = {
        background: '#000000',
        foreground: '#ffffff',
        accent: '#ff0000',
        dim: '#888888',
        error: '#ff0000',
        cursor: '#ffffff'
      };

      settingsManager.setCustomColors(customColors);

      const newThemeManager = new ThemeManager(settingsManager);
      newThemeManager.applyCurrentTheme();

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('custom');
      expect(settings.theme.customColors).toEqual(customColors);
    });

    it('should fallback to green for unknown preset', () => {
      // Manually set an invalid preset in settings
      const invalidSettings = settingsManager.loadSettings();
      invalidSettings.theme.preset = 'invalid' as any;
      settingsManager.saveSettings(invalidSettings);

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const newThemeManager = new ThemeManager(settingsManager);
      newThemeManager.applyCurrentTheme();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown preset "invalid"')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Color Validation', () => {
    it('should validate 6-digit hex colors', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-bg': '#0a0e14'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should validate 3-digit hex colors', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-bg': '#000'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should accept lowercase hex', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-bg': '#abc123'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should accept uppercase hex', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-bg': '#ABC123'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });

    it('should accept mixed case hex', () => {
      const colors: Partial<ColorScheme> = {
        '--terminal-bg': '#AbC123'
      };

      expect(() => {
        themeManager.applyCustomColors(colors);
      }).not.toThrow();
    });
  });

  describe('getCurrentColors', () => {
    it('should return current color scheme', () => {
      const colors = themeManager.getCurrentColors();

      expect(colors).toHaveProperty('--terminal-bg');
      expect(colors).toHaveProperty('--terminal-fg');
      expect(colors).toHaveProperty('--terminal-accent');
      expect(colors).toHaveProperty('--terminal-dim');
      expect(colors).toHaveProperty('--terminal-error');
      expect(colors).toHaveProperty('--terminal-cursor');
    });

    it('should return all color values as strings', () => {
      const colors = themeManager.getCurrentColors();

      Object.values(colors).forEach(color => {
        expect(typeof color).toBe('string');
      });
    });
  });

  describe('Integration with SettingsManager', () => {
    it('should save applied theme to settings', () => {
      themeManager.applyTheme('yellow');

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('yellow');
    });

    it('should save custom colors to settings', () => {
      themeManager.applyCustomColors({
        '--terminal-accent': '#ff0000'
      });

      const settings = settingsManager.loadSettings();
      expect(settings.theme.preset).toBe('custom');
      expect(settings.theme.customColors?.accent).toBe('#ff0000');
    });

    it('should persist to both localStorage and filesystem', () => {
      themeManager.applyTheme('white');

      // Check localStorage
      const stored = localStorage.getItem('terminal-settings');
      const parsedLS = JSON.parse(stored!);
      expect(parsedLS.theme.preset).toBe('white');

      // Check filesystem
      const fsContent = fs.readFile('/home/darin/.settings');
      const parsedFS = JSON.parse(fsContent);
      expect(parsedFS.theme.preset).toBe('white');
    });
  });
});
