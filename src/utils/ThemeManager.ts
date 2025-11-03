/**
 * ThemeManager Service
 *
 * Handles theme application and CSS variable manipulation for the terminal interface.
 * Manages preset themes and custom color configurations, applying them to the DOM
 * and persisting selections via SettingsManager.
 */

import type { SettingsManager } from './SettingsManager';
import type { ThemePreset, ThemePresetName, ColorScheme, CustomColors } from '../types/settings';

export class ThemeManager {
  private settingsManager: SettingsManager;
  private presets: Map<ThemePresetName, ThemePreset>;

  /**
   * Creates a new ThemeManager instance.
   *
   * @param settingsManager SettingsManager instance for persistence
   */
  constructor(settingsManager: SettingsManager) {
    this.settingsManager = settingsManager;
    this.presets = new Map();
    this.initializePresets();
  }

  /**
   * Initializes the preset theme definitions.
   */
  private initializePresets(): void {
    const presets: ThemePreset[] = [
      {
        name: 'green',
        displayName: 'Green',
        colors: {
          '--terminal-bg': '#0a0e14',
          '--terminal-fg': '#39ff14',
          '--terminal-accent': '#39ff14',
          '--terminal-dim': '#20c20e',
          '--terminal-error': '#ff3333',
          '--terminal-cursor': '#39ff14',
          '--terminal-bg-secondary': '#0d1117'
        }
      },
      {
        name: 'yellow',
        displayName: 'Amber',
        colors: {
          '--terminal-bg': '#1a1410',
          '--terminal-fg': '#ffb000',
          '--terminal-accent': '#ffd700',
          '--terminal-dim': '#cc8800',
          '--terminal-error': '#ff3333',
          '--terminal-cursor': '#ffb000',
          '--terminal-bg-secondary': '#241c14'
        }
      },
      {
        name: 'white',
        displayName: 'White',
        colors: {
          '--terminal-bg': '#1a1a1a',
          '--terminal-fg': '#e0e0e0',
          '--terminal-accent': '#ffffff',
          '--terminal-dim': '#999999',
          '--terminal-error': '#ff5555',
          '--terminal-cursor': '#ffffff',
          '--terminal-bg-secondary': '#242424'
        }
      },
      {
        name: 'light-blue',
        displayName: 'Cyan',
        colors: {
          '--terminal-bg': '#0a1420',
          '--terminal-fg': '#00d4ff',
          '--terminal-accent': '#00ffff',
          '--terminal-dim': '#0088aa',
          '--terminal-error': '#ff3333',
          '--terminal-cursor': '#00d4ff',
          '--terminal-bg-secondary': '#0d1825'
        }
      },
      {
        name: 'paper',
        displayName: 'Paper',
        colors: {
          '--terminal-bg': '#ffffff',
          '--terminal-fg': '#1a1a1a',
          '--terminal-accent': '#008cb4',
          '--terminal-dim': '#919191',
          '--terminal-error': '#cc0000',
          '--terminal-cursor': '#1a1a1a',
          '--terminal-bg-secondary': '#f0f0f0'
        }
      }
    ];

    presets.forEach(preset => {
      this.presets.set(preset.name as ThemePresetName, preset);
    });
  }

  /**
   * Gets all available preset themes.
   *
   * @returns Array of all theme presets
   */
  getPresets(): ThemePreset[] {
    return Array.from(this.presets.values());
  }

  /**
   * Gets a specific preset theme by name.
   *
   * @param name Theme preset name
   * @returns Theme preset or null if not found
   */
  getPreset(name: ThemePresetName): ThemePreset | null {
    return this.presets.get(name) || null;
  }

  /**
   * Applies a preset theme to the terminal.
   * Updates CSS variables and persists the selection.
   *
   * @param themeName Name of the preset theme to apply
   */
  applyTheme(themeName: ThemePresetName): void {
    // Skip 'custom' as it's not a preset
    if (themeName === 'custom') {
      throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');
    }

    const preset = this.presets.get(themeName);
    if (!preset) {
      const available = Array.from(this.presets.keys()).join(', ');
      throw new Error(`Invalid theme name: ${themeName}. Available themes: ${available}`);
    }

    // Apply colors to DOM
    this.updateCSSVariables(preset.colors);

    // Persist to settings
    this.settingsManager.setThemePreset(themeName);
  }

  /**
   * Applies custom colors to the terminal.
   * Merges provided colors with current colors and persists the configuration.
   *
   * @param colors Partial color scheme with custom values
   */
  applyCustomColors(colors: Partial<ColorScheme>): void {
    // Validate all provided colors
    Object.entries(colors).forEach(([variable, value]) => {
      if (!this.validateColor(value)) {
        throw new Error(
          `Invalid color value for ${variable}: ${value}. ` +
          `Expected hex format (e.g., #ff0000 or #f00)`
        );
      }
    });

    // Get current colors and merge with custom values
    const currentColors = this.getCurrentColors();
    const mergedColors = this.mergeColors(currentColors, colors);

    // Apply to DOM
    this.updateCSSVariables(mergedColors);

    // Convert ColorScheme to CustomColors format for persistence
    const customColors: CustomColors = {
      background: mergedColors['--terminal-bg'],
      foreground: mergedColors['--terminal-fg'],
      accent: mergedColors['--terminal-accent'],
      dim: mergedColors['--terminal-dim'],
      error: mergedColors['--terminal-error'],
      cursor: mergedColors['--terminal-cursor'],
      backgroundSecondary: mergedColors['--terminal-bg-secondary']
    };

    // Persist to settings (automatically sets preset to 'custom')
    this.settingsManager.setCustomColors(customColors);
  }

  /**
   * Applies the currently saved theme from settings.
   * Called on initialization to restore the user's selected theme.
   */
  applyCurrentTheme(): void {
    const settings = this.settingsManager.loadSettings();
    const { preset, customColors } = settings.theme;

    if (preset === 'custom' && customColors) {
      // Apply custom colors
      const colorScheme: ColorScheme = {
        '--terminal-bg': customColors.background,
        '--terminal-fg': customColors.foreground,
        '--terminal-accent': customColors.accent,
        '--terminal-dim': customColors.dim,
        '--terminal-error': customColors.error,
        '--terminal-cursor': customColors.cursor,
        '--terminal-bg-secondary': customColors.backgroundSecondary
      };
      this.updateCSSVariables(colorScheme);
    } else if (preset !== 'custom') {
      // Apply preset theme
      const themePreset = this.presets.get(preset);
      if (themePreset) {
        this.updateCSSVariables(themePreset.colors);
      } else {
        // Fallback to green if preset not found
        console.warn(`ThemeManager: Unknown preset "${preset}", falling back to green`);
        const greenPreset = this.presets.get('green');
        if (greenPreset) {
          this.updateCSSVariables(greenPreset.colors);
        }
      }
    }
  }

  /**
   * Gets the current CSS variable values from the DOM.
   *
   * @returns Current color scheme
   */
  getCurrentColors(): ColorScheme {
    if (typeof document === 'undefined') {
      // Return green preset as fallback in non-browser environments
      const greenPreset = this.presets.get('green');
      return greenPreset ? greenPreset.colors : {} as ColorScheme;
    }

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    return {
      '--terminal-bg': computedStyle.getPropertyValue('--terminal-bg').trim() || '#0a0e14',
      '--terminal-fg': computedStyle.getPropertyValue('--terminal-fg').trim() || '#39ff14',
      '--terminal-accent': computedStyle.getPropertyValue('--terminal-accent').trim() || '#39ff14',
      '--terminal-dim': computedStyle.getPropertyValue('--terminal-dim').trim() || '#20c20e',
      '--terminal-error': computedStyle.getPropertyValue('--terminal-error').trim() || '#ff3333',
      '--terminal-cursor': computedStyle.getPropertyValue('--terminal-cursor').trim() || '#39ff14',
      '--terminal-bg-secondary': computedStyle.getPropertyValue('--terminal-bg-secondary').trim() || '#0d1117'
    };
  }

  /**
   * Updates CSS variables on the document root element.
   *
   * @param colors Color scheme to apply
   */
  private updateCSSVariables(colors: ColorScheme): void {
    // Safety check for SSR/non-browser environments
    if (typeof document === 'undefined') {
      console.warn('ThemeManager: document not available, skipping CSS update');
      return;
    }

    const root = document.documentElement;

    // Apply each CSS variable
    Object.entries(colors).forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });
  }

  /**
   * Validates a color value in hex format.
   *
   * @param color Color string to validate
   * @returns True if valid hex color, false otherwise
   */
  private validateColor(color: string): boolean {
    // Match 3-digit or 6-digit hex colors with # prefix
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);
  }

  /**
   * Merges a partial color scheme with a base color scheme.
   *
   * @param base Base color scheme
   * @param custom Partial color scheme with overrides
   * @returns Complete merged color scheme
   */
  private mergeColors(base: ColorScheme, custom: Partial<ColorScheme>): ColorScheme {
    return {
      '--terminal-bg': custom['--terminal-bg'] || base['--terminal-bg'],
      '--terminal-fg': custom['--terminal-fg'] || base['--terminal-fg'],
      '--terminal-accent': custom['--terminal-accent'] || base['--terminal-accent'],
      '--terminal-dim': custom['--terminal-dim'] || base['--terminal-dim'],
      '--terminal-error': custom['--terminal-error'] || base['--terminal-error'],
      '--terminal-cursor': custom['--terminal-cursor'] || base['--terminal-cursor'],
      '--terminal-bg-secondary': custom['--terminal-bg-secondary'] || base['--terminal-bg-secondary']
    };
  }
}
