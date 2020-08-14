module.exports = {
  parserOptions: {
    // This is passed to vue-eslint-parser
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:vue/essential',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
