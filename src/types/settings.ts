/**
 * TypeScript interfaces and types for the settings system.
 * Defines the structure for user-configurable terminal preferences.
 */

/**
 * Custom color configuration for theme customization.
 * Allows users to override individual CSS variables.
 */
export interface CustomColors {
  background: string;
  foreground: string;
  accent: string;
  dim: string;
  error: string;
  cursor: string;
  backgroundSecondary: string;
}

/**
 * Color scheme mapping CSS variable names to color values.
 * Used by ThemeManager to apply themes to the DOM.
 */
export interface ColorScheme {
  '--terminal-bg': string;
  '--terminal-fg': string;
  '--terminal-accent': string;
  '--terminal-dim': string;
  '--terminal-error': string;
  '--terminal-cursor': string;
  '--terminal-bg-secondary': string;
}

/**
 * Preset theme configuration with display name and colors.
 */
export interface ThemePreset {
  name: string;
  displayName: string;
  colors: ColorScheme;
}

/**
 * Complete settings configuration structure.
 * Persisted to localStorage and synced to virtual filesystem.
 */
export interface SettingsConfig {
  theme: {
    preset: ThemePresetName;
    customColors?: CustomColors;
  };
  font: {
    size: number; // 8-24px range
    family: FontFamily;
  };
  effects: {
    scanLines: boolean;
    glow: boolean;
    border: boolean;
    animationSpeed: number; // 0.5-2.0x multiplier
    soundEffects: boolean;
  };
  prompt: {
    format: string; // Prompt format string (bash-style escapes supported)
  };
}

/**
 * Available theme preset names.
 */
export type ThemePresetName = 'green' | 'yellow' | 'white' | 'light-blue' | 'paper' | 'custom';

/**
 * Available monospace font families.
 */
export type FontFamily = 'Courier New' | 'Consolas' | 'Monaco' | 'monospace';
