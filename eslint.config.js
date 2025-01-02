const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['node_modules', 'dist', 'build', '*.log', 'android', 'ios'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-native': reactNativePlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin, // 추가된 플러그인
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Prettier 관련 규칙
      'prettier/prettier': 'error',

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Import 정렬 규칙 (플러그인 활성화 후 오류 해결)
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      // React Native 관련 규칙
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-raw-text': 'warn',

      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
