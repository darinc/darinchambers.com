/**
 * Unit tests for SettingsManager
 *
 * Tests settings persistence, validation, and filesystem synchronization.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PATHS, STORAGE_KEYS } from '../../../src/constants';
import { FileSystemService } from '../../../src/utils/fs/FileSystemService';
import { SettingsManager } from '../../../src/utils/SettingsManager';
import type { SettingsConfig } from '../../../src/types/settings';
import type { FileSystemNode } from '../../../src/utils/fs/types';

describe('SettingsManager', () => {
  let fs: FileSystemService;
  let settingsManager: SettingsManager;

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

    // Create settings manager
    settingsManager = new SettingsManager(fs);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should initialize with default settings when localStorage is empty', () => {
      const settings = settingsManager.loadSettings();

      expect(settings.theme.preset).toBe('dc');
      expect(settings.font.size).toBe(16);
      expect(settings.font.family).toBe('Fira Code');
      expect(settings.effects.scanLines).toBe(false);
      expect(settings.effects.glow).toBe(false);
      expect(settings.effects.border).toBe(true);
      expect(settings.effects.animationSpeed).toBe(1.0);
      expect(settings.effects.soundEffects).toBe(false);
    });

    it('should load settings from localStorage when available', () => {
      const customSettings: SettingsConfig = {
        theme: { preset: 'dc', customColors: undefined },
        font: { size: 16, family: 'Monaco' },
        effects: {
          scanLines: false,
          glow: false,
          border: true,
          animationSpeed: 1.5,
          soundEffects: true,
          autoScrollBehavior: true,
        },
        prompt: { format: '\\u@\\h:\\W\\$ ' },
        screensaver: {
          enabled: true,
          timeoutMinutes: 5,
          activeScreensaver: 'matrix',
        },
      };

      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(customSettings));

      const newManager = new SettingsManager(fs);
      const settings = newManager.loadSettings();

      expect(settings.theme.preset).toBe('dc');
      expect(settings.font.size).toBe(16);
      expect(settings.font.family).toBe('Monaco');
      expect(settings.effects.scanLines).toBe(false);
      expect(settings.effects.glow).toBe(false);
      expect(settings.effects.border).toBe(true);
      expect(settings.effects.animationSpeed).toBe(1.5);
      expect(settings.effects.soundEffects).toBe(true);
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, 'invalid json{');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const newManager = new SettingsManager(fs);
      const settings = newManager.loadSettings();

      expect(settings.theme.preset).toBe('dc'); // Falls back to defaults
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should sync initial settings to virtual filesystem', () => {
      expect(fs.exists(PATHS.CONFIG_SETTINGS)).toBe(true);
      expect(fs.isFile(PATHS.CONFIG_SETTINGS)).toBe(true);

      const content = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsed = JSON.parse(content);

      expect(parsed.theme.preset).toBe('dc');
    });
  });

  describe('Theme Settings', () => {
    it('should get current theme preset', () => {
      expect(settingsManager.getThemePreset()).toBe('dc');
    });

    it('should set theme preset', () => {
      settingsManager.setThemePreset('dc');
      expect(settingsManager.getThemePreset()).toBe('dc');
    });

    it('should persist theme changes to localStorage', () => {
      settingsManager.setThemePreset('white');

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.theme.preset).toBe('white');
    });

    it('should sync theme changes to filesystem', () => {
      settingsManager.setThemePreset('light-blue');

      const content = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsed = JSON.parse(content);

      expect(parsed.theme.preset).toBe('light-blue');
    });

    it('should reject invalid theme preset', () => {
      expect(() => {
        settingsManager.setThemePreset('invalid' as any);
      }).toThrow('Invalid theme preset');
    });

    it('should set custom colors and switch to custom theme', () => {
      const colors = {
        background: '#000000',
        backgroundSecondary: '#111111',
        foreground: '#ffffff',
        accent: '#ff0000',
        dim: '#888888',
        error: '#ff0000',
        cursor: '#ffffff',
      };

      settingsManager.setCustomColors(colors);

      expect(settingsManager.getThemePreset()).toBe('custom');
      expect(settingsManager.getCustomColors()).toEqual(colors);
    });
  });

  describe('Font Settings', () => {
    it('should get current font size', () => {
      expect(settingsManager.getFontSize()).toBe(16);
    });

    it('should set valid font size', () => {
      settingsManager.setFontSize(16);
      expect(settingsManager.getFontSize()).toBe(16);
    });

    it('should accept minimum font size (8px)', () => {
      settingsManager.setFontSize(8);
      expect(settingsManager.getFontSize()).toBe(8);
    });

    it('should accept maximum font size (24px)', () => {
      settingsManager.setFontSize(24);
      expect(settingsManager.getFontSize()).toBe(24);
    });

    it('should reject font size below minimum', () => {
      expect(() => {
        settingsManager.setFontSize(7);
      }).toThrow('Invalid font size');
    });

    it('should reject font size above maximum', () => {
      expect(() => {
        settingsManager.setFontSize(25);
      }).toThrow('Invalid font size');
    });

    it('should get current font family', () => {
      expect(settingsManager.getFontFamily()).toBe('Fira Code');
    });

    it('should set valid font family', () => {
      settingsManager.setFontFamily('Monaco');
      expect(settingsManager.getFontFamily()).toBe('Monaco');
    });

    it('should reject invalid font family', () => {
      expect(() => {
        settingsManager.setFontFamily('Comic Sans' as any);
      }).toThrow('Invalid font family');
    });

    it('should persist font changes to localStorage', () => {
      settingsManager.setFontSize(18);
      settingsManager.setFontFamily('JetBrains Mono');

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.font.size).toBe(18);
      expect(parsed.font.family).toBe('JetBrains Mono');
    });
  });

  describe('Effects Settings', () => {
    it('should get scan lines state', () => {
      expect(settingsManager.getScanLines()).toBe(false);
    });

    it('should set scan lines state', () => {
      settingsManager.setScanLines(true);
      expect(settingsManager.getScanLines()).toBe(true);
    });

    it('should get glow state', () => {
      expect(settingsManager.getGlow()).toBe(false);
    });

    it('should set glow state', () => {
      settingsManager.setGlow(true);
      expect(settingsManager.getGlow()).toBe(true);
    });

    it('should get border state', () => {
      expect(settingsManager.getBorder()).toBe(true);
    });

    it('should set border state', () => {
      settingsManager.setBorder(false);
      expect(settingsManager.getBorder()).toBe(false);
    });

    it('should get animation speed', () => {
      expect(settingsManager.getAnimationSpeed()).toBe(1.0);
    });

    it('should set valid animation speed', () => {
      settingsManager.setAnimationSpeed(1.5);
      expect(settingsManager.getAnimationSpeed()).toBe(1.5);
    });

    it('should accept minimum animation speed (0.5x)', () => {
      settingsManager.setAnimationSpeed(0.5);
      expect(settingsManager.getAnimationSpeed()).toBe(0.5);
    });

    it('should accept maximum animation speed (2.0x)', () => {
      settingsManager.setAnimationSpeed(2.0);
      expect(settingsManager.getAnimationSpeed()).toBe(2.0);
    });

    it('should reject animation speed below minimum', () => {
      expect(() => {
        settingsManager.setAnimationSpeed(0.4);
      }).toThrow('Invalid animation speed');
    });

    it('should reject animation speed above maximum', () => {
      expect(() => {
        settingsManager.setAnimationSpeed(2.1);
      }).toThrow('Invalid animation speed');
    });

    it('should get sound effects state', () => {
      expect(settingsManager.getSoundEffects()).toBe(false);
    });

    it('should set sound effects state', () => {
      settingsManager.setSoundEffects(true);
      expect(settingsManager.getSoundEffects()).toBe(true);
    });

    it('should persist effects changes to localStorage', () => {
      settingsManager.setScanLines(false);
      settingsManager.setGlow(false);
      settingsManager.setBorder(true);
      settingsManager.setAnimationSpeed(1.5);
      settingsManager.setSoundEffects(true);

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.effects.scanLines).toBe(false);
      expect(parsed.effects.glow).toBe(false);
      expect(parsed.effects.border).toBe(true);
      expect(parsed.effects.animationSpeed).toBe(1.5);
      expect(parsed.effects.soundEffects).toBe(true);
    });
  });

  describe('Generic Getters/Setters', () => {
    it('should get setting by key', () => {
      const themeSettings = settingsManager.getSetting('theme');
      expect(themeSettings.preset).toBe('dc');

      const fontSettings = settingsManager.getSetting('font');
      expect(fontSettings.size).toBe(16);

      const effectsSettings = settingsManager.getSetting('effects');
      expect(effectsSettings.scanLines).toBe(false);
      expect(effectsSettings.glow).toBe(false);
      expect(effectsSettings.border).toBe(true);
    });

    it('should set setting by key', () => {
      settingsManager.setSetting('theme', {
        preset: 'dc',
        customColors: undefined,
      });

      expect(settingsManager.getThemePreset()).toBe('dc');
    });

    it('should persist changes made via setSetting', () => {
      settingsManager.setSetting('font', {
        size: 20,
        family: 'Monaco',
      });

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.font.size).toBe(20);
      expect(parsed.font.family).toBe('Monaco');
    });
  });

  describe('Reset', () => {
    it('should reset all settings to defaults', () => {
      // Make some changes
      settingsManager.setThemePreset('dc');
      settingsManager.setFontSize(20);
      settingsManager.setScanLines(true);
      settingsManager.setGlow(true);
      settingsManager.setBorder(false);

      // Reset
      settingsManager.reset();

      // Verify defaults restored
      expect(settingsManager.getThemePreset()).toBe('dc');
      expect(settingsManager.getFontSize()).toBe(16);
      expect(settingsManager.getScanLines()).toBe(false);
      expect(settingsManager.getGlow()).toBe(false);
      expect(settingsManager.getBorder()).toBe(true);
    });

    it('should clear and rewrite localStorage on reset', () => {
      settingsManager.setThemePreset('dc');
      settingsManager.reset();

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.theme.preset).toBe('dc');
    });

    it('should sync reset to filesystem', () => {
      settingsManager.setThemePreset('dc');
      settingsManager.reset();

      const content = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsed = JSON.parse(content);

      expect(parsed.theme.preset).toBe('dc');
    });
  });

  describe('Screensaver Settings', () => {
    it('should get screensaver enabled state', () => {
      expect(settingsManager.getScreensaverEnabled()).toBe(true); // Default
    });

    it('should set screensaver enabled state', () => {
      settingsManager.setScreensaverEnabled(false);
      expect(settingsManager.getScreensaverEnabled()).toBe(false);
    });

    it('should persist screensaver enabled state', () => {
      settingsManager.setScreensaverEnabled(false);

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.screensaver.enabled).toBe(false);
    });

    it('should get screensaver timeout', () => {
      expect(settingsManager.getScreensaverTimeout()).toBe(5); // Default 5 minutes
    });

    it('should set screensaver timeout', () => {
      settingsManager.setScreensaverTimeout(10);
      expect(settingsManager.getScreensaverTimeout()).toBe(10);
    });

    it('should validate screensaver timeout minimum', () => {
      expect(() => settingsManager.setScreensaverTimeout(0)).toThrow();
    });

    it('should validate screensaver timeout maximum', () => {
      expect(() => settingsManager.setScreensaverTimeout(61)).toThrow();
    });

    it('should persist screensaver timeout', () => {
      settingsManager.setScreensaverTimeout(15);

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.screensaver.timeoutMinutes).toBe(15);
    });

    it('should get active screensaver', () => {
      expect(settingsManager.getActiveScreensaver()).toBe('matrix'); // Default
    });

    it('should set active screensaver', () => {
      settingsManager.setActiveScreensaver('stars');
      expect(settingsManager.getActiveScreensaver()).toBe('stars');
    });

    it('should persist active screensaver', () => {
      settingsManager.setActiveScreensaver('stars');

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = JSON.parse(stored!);

      expect(parsed.screensaver.activeScreensaver).toBe('stars');
    });

    it('should sync screensaver settings to filesystem', () => {
      settingsManager.setScreensaverEnabled(false);
      settingsManager.setScreensaverTimeout(20);
      settingsManager.setActiveScreensaver('stars');

      const content = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsed = JSON.parse(content);

      expect(parsed.screensaver.enabled).toBe(false);
      expect(parsed.screensaver.timeoutMinutes).toBe(20);
      expect(parsed.screensaver.activeScreensaver).toBe('stars');
    });
  });

  describe('Complete Settings Operations', () => {
    it('should load complete settings', () => {
      const settings = settingsManager.loadSettings();

      expect(settings).toHaveProperty('theme');
      expect(settings).toHaveProperty('font');
      expect(settings).toHaveProperty('effects');
    });

    it('should save complete settings', () => {
      const newSettings: SettingsConfig = {
        theme: { preset: 'white', customColors: undefined },
        font: { size: 18, family: 'Monaco' },
        effects: {
          scanLines: false,
          glow: true,
          border: false,
          animationSpeed: 1.2,
          soundEffects: true,
          autoScrollBehavior: false,
        },
        prompt: { format: '\\u@\\h:\\w\\$ ' },
        screensaver: {
          enabled: true,
          timeoutMinutes: 5,
          activeScreensaver: 'matrix',
        },
      };

      settingsManager.saveSettings(newSettings);

      const loaded = settingsManager.loadSettings();
      expect(loaded).toEqual(newSettings);
    });

    it('should persist complete settings to both storages', () => {
      const newSettings: SettingsConfig = {
        theme: { preset: 'light-blue', customColors: undefined },
        font: { size: 12, family: 'Monaco' },
        effects: {
          scanLines: true,
          glow: false,
          border: true,
          animationSpeed: 0.8,
          soundEffects: false,
          autoScrollBehavior: true,
        },
        prompt: { format: '\\u@\\h:\\w\\$ ' },
        screensaver: {
          enabled: true,
          timeoutMinutes: 5,
          activeScreensaver: 'matrix',
        },
      };

      settingsManager.saveSettings(newSettings);

      // Check localStorage
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsedLS = JSON.parse(stored!);
      expect(parsedLS).toEqual(newSettings);

      // Check filesystem
      const fsContent = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsedFS = JSON.parse(fsContent);
      expect(parsedFS).toEqual(newSettings);
    });
  });

  describe('Filesystem Synchronization', () => {
    it('should create settings file on initialization', () => {
      expect(fs.exists(PATHS.CONFIG_SETTINGS)).toBe(true);
    });

    it('should write formatted JSON to filesystem', () => {
      const content = fs.readFile(PATHS.CONFIG_SETTINGS);

      // Should be pretty-printed with indentation
      expect(content).toContain('\n');
      expect(content).toContain('  '); // 2-space indent
    });

    it('should be readable via cat command', () => {
      // This simulates what users will do
      const content = fs.readFile(PATHS.CONFIG_SETTINGS);
      const parsed = JSON.parse(content);

      expect(parsed.theme).toBeDefined();
      expect(parsed.font).toBeDefined();
      expect(parsed.effects).toBeDefined();
    });

    it('should handle filesystem write errors gracefully', () => {
      // Create a filesystem that throws on write
      const mockRoot: FileSystemNode = {
        name: '',
        type: 'directory',
        children: new Map(),
      };
      const errorFS = new FileSystemService(mockRoot);
      errorFS.writeFile = vi.fn(() => {
        throw new Error('Write failed');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const errorManager = new SettingsManager(errorFS);

      // Should not throw, just log error
      expect(() => {
        errorManager.setThemePreset('dc');
      }).not.toThrow();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
