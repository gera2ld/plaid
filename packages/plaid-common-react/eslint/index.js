module.exports = {
  extends: [
    'airbnb-base/rules/strict',
    'airbnb/rules/react',
  ],
  rules: {
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: '16.13.1',
    },
  },
};
