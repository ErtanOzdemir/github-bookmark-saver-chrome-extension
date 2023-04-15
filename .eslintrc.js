module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 'error',
    'no-var': 'error',
    'no-plusplus': 'error',
    'no-unused-vars': 'error',
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
};
