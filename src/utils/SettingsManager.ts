/**
 * SettingsManager Service
 *
 * Manages user-configurable terminal settings with dual storage:
 * - localStorage for persistence across browser sessions
 * - Virtual filesystem for visibility (readable via cat command)
 *
 * Follows the pattern established by AliasManager but uses JSON format
 * and provides type-safe accessors for all settings.
 */

import { PATHS, STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants';
import type { IFileSystem } from './fs/IFileSystem';
import type { SettingsConfig, ThemePresetName, CustomColors, FontFamily } from '../types/settings';

export class SettingsManager {
  private settings: SettingsConfig;
  private fileSystem: IFileSystem;
  private settingsPath: string = PATHS.CONFIG_SETTINGS;
  private storageKey: string = STORAGE_KEYS.SETTINGS;

  /**
   * Creates a new SettingsManager instance.
   * Automatically loads settings from localStorage or falls back to defaults.
   *
   * @param fileSystem Virtual filesystem instance for syncing settings file
   */
  constructor(fileSystem: IFileSystem) {
    this.fileSystem = fileSystem;
    this.settings = this.loadFromLocalStorage() ?? this.getDefaults();

    // Sync initial settings to filesystem
    this.syncToFileSystem();
  }

  /**
   * Loads settings from localStorage.
   * Handles corrupted or missing data gracefully.
   *
   * @returns Parsed settings or null if not found/invalid
   */
  private loadFromLocalStorage(): SettingsConfig | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        return null;
      }

      const parsed = JSON.parse(stored) as SettingsConfig;

      // Basic validation - ensure required top-level keys exist
      if (!parsed.theme || !parsed.font || !parsed.effects || !parsed.prompt) {
        console.warn('SettingsManager: Invalid settings structure in localStorage, using defaults');
        return null;
      }

      return parsed;
    } catch (error) {
      console.warn('SettingsManager: Failed to load settings from localStorage:', error);
      return null;
    }
  }

  /**
   * Saves current settings to localStorage.
   */
  private saveToLocalStorage(): void {
    try {
      const json = JSON.stringify(this.settings, null, 2);
      localStorage.setItem(this.storageKey, json);
    } catch (error) {
      console.error('SettingsManager: Failed to save settings to localStorage:', error);
      throw new Error(
        `Failed to save settings: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Syncs current settings to virtual filesystem as a readable JSON file.
   * Errors are logged but don't throw to prevent disrupting the application.
   */
  private syncToFileSystem(): void {
    try {
      const json = JSON.stringify(this.settings, null, 2);
      this.fileSystem.writeFile(this.settingsPath, json);
    } catch (error) {
      // Log but don't throw - localStorage is the source of truth
      console.error('SettingsManager: Failed to sync settings to filesystem:', error);
    }
  }

  /**
   * Returns a deep copy of default settings.
   */
  private getDefaults(): SettingsConfig {
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS)) as SettingsConfig;
  }

  /**
   * Gets the current settings configuration.
   *
   * @returns Current settings (in-memory copy)
   */
  loadSettings(): SettingsConfig {
    return this.settings;
  }

  /**
   * Updates the entire settings configuration.
   * Saves to both localStorage and virtual filesystem.
   *
   * @param settings New settings configuration
   */
  saveSettings(settings: SettingsConfig): void {
    this.settings = settings;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets a specific top-level setting value.
   * Provides type-safe access to settings.
   *
   * @param key Setting key (theme, font, or effects)
   * @returns Setting value with correct type
   */
  getSetting<K extends keyof SettingsConfig>(key: K): SettingsConfig[K] {
    return this.settings[key];
  }

  /**
   * Sets a specific top-level setting value.
   * Automatically persists to storage.
   *
   * @param key Setting key to update
   * @param value New value for the setting
   */
  setSetting<K extends keyof SettingsConfig>(key: K, value: SettingsConfig[K]): void {
    this.settings[key] = value;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the current theme preset name.
   */
  getThemePreset(): ThemePresetName {
    return this.settings.theme.preset;
  }

  /**
   * Sets the theme preset.
   * Validates the preset name before applying.
   * Clears custom colors when switching to a preset theme.
   *
   * @param preset Theme preset name
   */
  setThemePreset(preset: ThemePresetName): void {
    if (!this.validateThemePreset(preset)) {
      throw new Error(`Invalid theme preset: ${String(preset)}`);
    }

    this.settings.theme.preset = preset;

    // Clear custom colors when switching to a preset theme (not 'custom')
    if (preset !== 'custom') {
      this.settings.theme.customColors = undefined;
    }

    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the custom colors configuration if set.
   */
  getCustomColors(): CustomColors | undefined {
    return this.settings.theme.customColors;
  }

  /**
   * Sets custom theme colors.
   * Automatically switches preset to 'custom'.
   *
   * @param colors Custom color configuration
   */
  setCustomColors(colors: CustomColors): void {
    this.settings.theme.preset = 'custom';
    this.settings.theme.customColors = colors;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the current font size.
   */
  getFontSize(): number {
    return this.settings.font.size;
  }

  /**
   * Sets the font size.
   * Validates size is within acceptable range (8-24px).
   *
   * @param size Font size in pixels
   */
  setFontSize(size: number): void {
    if (!this.validateFontSize(size)) {
      throw new Error(`Invalid font size: ${size}. Must be between 8 and 24.`);
    }

    this.settings.font.size = size;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the current font family.
   */
  getFontFamily(): FontFamily {
    return this.settings.font.family;
  }

  /**
   * Sets the font family.
   * Validates font family is a supported option.
   *
   * @param family Font family name
   */
  setFontFamily(family: FontFamily): void {
    if (!this.validateFontFamily(family)) {
      throw new Error(`Invalid font family: ${String(family)}`);
    }

    this.settings.font.family = family;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the scan lines enabled state.
   */
  getScanLines(): boolean {
    return this.settings.effects.scanLines;
  }

  /**
   * Sets the scan lines enabled state.
   *
   * @param enabled Whether scan lines should be enabled
   */
  setScanLines(enabled: boolean): void {
    this.settings.effects.scanLines = enabled;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the glow effect enabled state.
   */
  getGlow(): boolean {
    return this.settings.effects.glow;
  }

  /**
   * Sets the glow effect enabled state.
   *
   * @param enabled Whether glow should be enabled
   */
  setGlow(enabled: boolean): void {
    this.settings.effects.glow = enabled;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the page border enabled state.
   */
  getBorder(): boolean {
    return this.settings.effects.border;
  }

  /**
   * Sets the page border enabled state.
   *
   * @param enabled Whether page border should be enabled
   */
  setBorder(enabled: boolean): void {
    this.settings.effects.border = enabled;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the animation speed multiplier.
   */
  getAnimationSpeed(): number {
    return this.settings.effects.animationSpeed;
  }

  /**
   * Sets the animation speed multiplier.
   * Validates speed is within acceptable range (0.5-2.0x).
   *
   * @param speed Animation speed multiplier
   */
  setAnimationSpeed(speed: number): void {
    if (!this.validateAnimationSpeed(speed)) {
      throw new Error(`Invalid animation speed: ${speed}. Must be between 0.5 and 2.0.`);
    }

    this.settings.effects.animationSpeed = speed;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the sound effects enabled state.
   */
  getSoundEffects(): boolean {
    return this.settings.effects.soundEffects;
  }

  /**
   * Sets the sound effects enabled state.
   *
   * @param enabled Whether sound effects should be enabled
   */
  setSoundEffects(enabled: boolean): void {
    this.settings.effects.soundEffects = enabled;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Gets the current prompt format string.
   */
  getPromptFormat(): string {
    return this.settings.prompt.format;
  }

  /**
   * Sets the prompt format string.
   * Supports bash-style escape sequences.
   *
   * @param format Prompt format string
   */
  setPromptFormat(format: string): void {
    this.settings.prompt.format = format;
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Resets all settings to their default values.
   * Clears localStorage and re-syncs to filesystem.
   */
  reset(): void {
    this.settings = this.getDefaults();

    // Clear localStorage and write fresh defaults
    localStorage.removeItem(this.storageKey);
    this.saveToLocalStorage();
    this.syncToFileSystem();
  }

  /**
   * Validates a theme preset name.
   */
  private validateThemePreset(preset: string): preset is ThemePresetName {
    const validPresets: ThemePresetName[] = [
      'green',
      'yellow',
      'white',
      'light-blue',
      'paper',
      'dc',
      'custom',
    ];
    return validPresets.includes(preset as ThemePresetName);
  }

  /**
   * Validates a font size value.
   */
  private validateFontSize(size: number): boolean {
    return typeof size === 'number' && size >= 8 && size <= 24 && !isNaN(size);
  }

  /**
   * Validates a font family name.
   */
  private validateFontFamily(family: string): family is FontFamily {
    const validFamilies: FontFamily[] = ['Courier New', 'Consolas', 'Monaco', 'monospace'];
    return validFamilies.includes(family as FontFamily);
  }

  /**
   * Validates an animation speed value.
   */
  private validateAnimationSpeed(speed: number): boolean {
    return typeof speed === 'number' && speed >= 0.5 && speed <= 2.0 && !isNaN(speed);
  }
}
