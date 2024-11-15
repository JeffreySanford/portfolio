const nx = require('@nx/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          'apps/frontend/tsconfig.json',
          'apps/backend/tsconfig.json',
          'apps/frontend/tsconfig.app.json',
          'apps/backend/tsconfig.app.json',
          'apps/frontend/tsconfig.spec.json',
          'apps/backend/tsconfig.spec.json',
        ],
        sourceType: 'module',
      },
    },

    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  {
    files: ['**/*.html', '**/jest.config.ts'],
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    },
  },
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),
  ...compat.extends('plugin:rxjs/recommended'),
  ...compat.extends('plugin:@nx/angular'),
];
