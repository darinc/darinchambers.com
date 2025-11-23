import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom environment for DOM testing
    environment: 'jsdom',

    // Test file patterns
    include: ['tests/**/*.test.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        ...configDefaults.exclude,
        'src/animations/**', // 0% coverage visual code (Matrix rain)
        'src/types/**', // 0% coverage TypeScript definitions
        'src/**/*.d.ts',
        'src/main.ts',
        'src/data/**',
        'src/content/**',
        'src/blog/**',
      ],
      // Coverage thresholds
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // Global test settings
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
});
