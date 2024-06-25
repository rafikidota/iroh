import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

const config = [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint,
      'import': importPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-absolute-path': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default config;
