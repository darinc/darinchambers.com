/**
 * Centralized constants for paths, signals, and configuration values.
 * This eliminates magic strings throughout the codebase.
 */

import { homeDir, siteConfig } from './site.config';
import type { SettingsConfig } from './types/settings';

export const PATHS = {
  HOME: homeDir,
  HOME_GUEST: '/home/guest',
  CONTENT_BLOG: `${homeDir}/blog`,
  CONTENT_PORTFOLIO: `${homeDir}/portfolio`,
  CONTENT_POSTS: `${homeDir}/posts`,
  CONTENT_HELP: `${homeDir}/content/help.md`,
  CONTENT_ABOUT: `${homeDir}/content/about.md`,
  CONTENT_CONTACT: `${homeDir}/content/contact.md`,
  CONFIG_ALIASES: '/home/guest/.alias',
  CONFIG_SETTINGS: `${homeDir}/.settings`,
  CONFIG_ENV: `${homeDir}/.env`,
} as const;

export const COMMAND_SIGNALS = {
  CLEAR_SCREEN: '__CLEAR__',
  NO_OUTPUT: '__NO_OUTPUT__',
} as const;

export const STORAGE_KEYS = {
  SETTINGS: 'terminal_settings',
  ENVIRONMENT: 'terminal_env_vars',
} as const;

export const MESSAGES = {
  EMPTY_PORTFOLIO: 'No portfolio projects yet. Check back soon!',
  EMPTY_BLOG: 'No blog posts yet. Check back soon!',
  EMPTY_POSTS: 'No notes yet. Check back soon!',
  NO_TAGS_AVAILABLE: 'No tags available yet.',
} as const;

export const DEFAULT_SETTINGS: SettingsConfig = {
  theme: {
    preset: siteConfig.defaultTheme,
    customColors: undefined,
  },
  font: {
    size: 16,
    family: 'Fira Code',
  },
  effects: {
    scanLines: false,
    glow: false,
    border: true,
    animationSpeed: 1.0,
    soundEffects: false,
    autoScrollBehavior: true,
  },
  prompt: {
    format: '\\W \\$ ',
  },
  screensaver: {
    enabled: true,
    timeoutMinutes: 5,
    activeScreensaver: 'matrix',
  },
} as const;

export const SCREENSAVER_CONSTANTS = {
  MIN_TIMEOUT_MINUTES: 1,
  MAX_TIMEOUT_MINUTES: 60,
  ACTIVITY_DEBOUNCE_MS: 100,
  DEFAULT_SCREENSAVER: 'matrix',
} as const;
