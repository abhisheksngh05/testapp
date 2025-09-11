// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  // ✅ TypeScript + Angular strict rules
    {
    ignores: [
      '*.json',
      '*.md',
      '*.lock',
      '*.css',
      '*.scss',
      '.vscode/**',
      'angular.json',
      '.prettierrc.json',
      'node_modules/**',
      'dist/**'
    ]
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict, // strict TS rules
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin, // 👈 register plugin
    },
    rules: {
      // 🔹 Angular rules
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',

      

      // 🔹 Strict TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

      // 🔹 Code quality & safety
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      curly: ['error', 'all'],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      complexity: ['warn', { max: 15 }],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
    },
  },

  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      prettier: prettierPlugin, // 👈 also available here
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/attributes-order': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      'prettier/prettier': 'error',
      '@angular-eslint/template/cyclomatic-complexity': ['error', { maxComplexity: 5 }],
    },
  },

  // ✅ Prettier (disable stylistic conflicts)
  {
    files: ['**/*.{ts,html,css,scss,json,md}'],
    extends: [prettier],
  },
);
