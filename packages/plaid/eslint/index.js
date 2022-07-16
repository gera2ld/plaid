module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
