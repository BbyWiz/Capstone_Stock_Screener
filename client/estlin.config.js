import pluginAngular from 'angular-eslint';
import js from '@eslint/js';
export default [
  js.configs.recommended,
  ...pluginAngular.configs.tsRecommended,
  {
    rules: {
      'no-console': 'warn',
    },
  },
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
