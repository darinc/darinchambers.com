import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'import-x': importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Using unused-imports plugin instead
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn', // Changed from error to warn
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'warn', // Changed from error to warn
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Made explicit as warning
      '@typescript-eslint/unbound-method': 'off', // Too strict for event listeners
      '@typescript-eslint/only-throw-error': 'warn', // Changed from error to warn
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn', // Style preference
      '@typescript-eslint/restrict-template-expressions': 'warn', // Too strict

      // Best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-debugger': 'warn',

      // Import ordering and organization
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Unused imports detection
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Prevent circular dependencies
      'import-x/no-cycle': 'error',
    },
  },
  {
    // Test files can be more lenient
    files: ['tests/**/*.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    // Node.js scripts - lint JavaScript without TypeScript
    files: ['scripts/**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      // Keep JavaScript best practices
      'no-console': 'off', // Scripts use console.log
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    ignores: [
      'dist/',
      'coverage/',
      'node_modules/',
      '*.config.js',
      'vite.config.ts',
      'vitest.config.ts',
      'public/libs/**/*.js',
    ],
  },
  prettierConfig
);
