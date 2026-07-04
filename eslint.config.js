import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
]);
