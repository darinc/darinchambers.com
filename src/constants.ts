/**
 * Centralized constants for paths, signals, and configuration values.
 * This eliminates magic strings throughout the codebase.
 */

export const PATHS = {
  HOME_DARIN: '/home/darin',
  HOME_GUEST: '/home/guest',
  CONTENT_BLOG: '/home/darin/blog',
  CONTENT_HELP: '/home/darin/content/help.md',
  CONTENT_ABOUT: '/home/darin/content/about.md',
  CONTENT_CONTACT: '/home/darin/content/contact.md',
  CONTENT_SKILLS: '/home/darin/content/skills.md',
  CONFIG_ALIASES: '/home/guest/.alias'
} as const;

export const COMMAND_SIGNALS = {
  CLEAR_SCREEN: '__CLEAR__',
  NO_OUTPUT: '__NO_OUTPUT__'
} as const;
