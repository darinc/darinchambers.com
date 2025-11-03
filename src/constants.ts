/**
 * Centralized constants for paths, signals, and configuration values.
 * This eliminates magic strings throughout the codebase.
 */

import type { SettingsConfig } from './types/settings';

export const PATHS = {
  HOME_DARIN: '/home/darin',
  HOME_GUEST: '/home/guest',
  CONTENT_BLOG: '/home/darin/blog',
  CONTENT_HELP: '/home/darin/content/help.md',
  CONTENT_ABOUT: '/home/darin/content/about.md',
  CONTENT_CONTACT: '/home/darin/content/contact.md',
  CONTENT_SKILLS: '/home/darin/content/skills.md',
  CONFIG_ALIASES: '/home/guest/.alias',
  CONFIG_SETTINGS: '/home/darin/.settings',
  CONFIG_ENV: '/home/darin/.env'
} as const;

export const COMMAND_SIGNALS = {
  CLEAR_SCREEN: '__CLEAR__',
  NO_OUTPUT: '__NO_OUTPUT__'
} as const;

export const STORAGE_KEYS = {
  SETTINGS: 'terminal-settings',
  ENVIRONMENT: 'terminal-env-vars'
} as const;

export const DEFAULT_SETTINGS: SettingsConfig = {
  theme: {
    preset: 'green',
    customColors: undefined
  },
  font: {
    size: 14,
    family: 'Courier New'
  },
  effects: {
    scanLines: false,
    glow: false,
    border: true,
    animationSpeed: 1.0,
    soundEffects: false
  },
  prompt: {
    format: '\\W \\$ '
  }
} as const;
