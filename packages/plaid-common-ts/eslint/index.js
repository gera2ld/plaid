module.exports = {
  extends: [
    'airbnb-typescript/base',
  ],
  rules: {
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false }],
  },
};
