import { ESLint } from 'eslint';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        // глобальные переменные, если нужно
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',

      // Пробелы в конце строк: игнорируем для пустых строк, разрешаем для многострочных комментариев
      'no-trailing-spaces': ['warn', { skipBlankLines: false, ignoreComments: true }],

      // Кавычки вокруг идентификаторов: требует либо все в кавычках, либо все без
      'quote-props': ['warn', 'as-needed'],

      // Требуем одинарные кавычки
      quotes: ['warn', 'single'],

      // Длина строки: не более 125 символов, кроме комментариев
      'max-len': ['error', { ignoreComments: true, code: 125 }],
    },
  },
  {
    // ESLint recommended rules
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'eqeqeq': 'warn',
    },
  },
  {
    // @typescript-eslint recommended rules
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
