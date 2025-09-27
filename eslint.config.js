import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // react first
            ['^react'],

            // other external packages
            ['^@?\\w'],

            // specific scoped packages
            ['^@hookform', '^@radix-ui'],

            // internal packages
            ['^@(app|processes|pages|widgets|features|entities|shared)(/.*|$)'],

            // side effect imports (like polyfills)
            ['^\\u0000'],

            // parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // sibling imports and current directory
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // style imports
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
