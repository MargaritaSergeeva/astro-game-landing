import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ['src/scripts/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      curly: ['error', 'all'],
    },
  },
]);
