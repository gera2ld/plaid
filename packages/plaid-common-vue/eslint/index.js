module.exports = {
  parserOptions: {
    // This is passed to vue-eslint-parser
    parser: 'babel-eslint',
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
