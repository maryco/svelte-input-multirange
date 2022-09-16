module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs', '*.js'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['*.d.ts'],
      rules: {
        // prevent 'no-unused-vars' in *.d.ts
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
  },
  globals: {
    // prevent for error 'globalThis' is not defined no-undef
    globalThis: false,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  ignorePatterns: ['*.cjs', '*.js', '__tests__', '*.md'],
}
