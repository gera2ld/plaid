module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'no-constant-condition': 'off',
    semi: ['error', 'always'],
    'require-atomic-updates': 'off',
  },
};
