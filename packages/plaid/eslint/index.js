module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2, { MemberExpression: 0 }],
    'no-await-in-loop': 'off',
    'no-bitwise': ['error', { int32Hint: true }],
    'no-console': ['warn', {
      allow: ['error', 'warn', 'info'],
    }],
    'no-mixed-operators': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': ['error', { array: false }],
    'prefer-promise-reject-errors': 'off',
  },
};
