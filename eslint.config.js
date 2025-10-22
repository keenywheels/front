import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import preferArrow from 'eslint-plugin-prefer-arrow';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['build', '.react-router', 'node_modules']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'prefer-arrow': preferArrow,
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
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '_' },
      ],
    },
  },
]);
