const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  {
    files: ['*.ts'],
    ignores: ['**/*'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'rxjs': require('eslint-plugin-rxjs'),
      '@nx': require('@nrwl/eslint-plugin-nx'),
    },
    rules: {
      'rxjs/no-create': 'error',
      'rxjs/no-promise': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/no-standalone-components': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@angular-eslint/use-injectable-provided-in': 'error',
    },
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {},
  },
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),
  ...compat.extends('plugin:rxjs/recommended'),
  ...compat.extends('plugin:@nx/angular'),
];