/**
 * TypeScript interfaces and types for the screensaver system.
 * Defines types for screensaver state management and configuration.
 */

/**
 * Screensaver state enum
 */
export type ScreensaverState = 'idle' | 'active' | 'disabled';

/**
 * Activity callback function type
 */
export type ActivityCallback = () => void;

/**
 * Screensaver settings configuration
 * This is integrated into SettingsConfig in settings.ts
 */
export interface ScreensaverSettings {
  enabled: boolean;
  timeoutMinutes: number; // 1-60 minutes
  activeScreensaver: string; // Command name: 'matrix', 'stars', etc.
}
