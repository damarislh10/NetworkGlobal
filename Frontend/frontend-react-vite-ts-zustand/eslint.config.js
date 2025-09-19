import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.recommended,
  prettier,
  {
    ignores: ['dist', 'vite.config.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-tsx-scope': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.0.2' },
    },
  },
];