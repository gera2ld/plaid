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
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'no-mixed-operators': 'off',
    'no-bitwise': ['error', { int32Hint: true }],
    'prefer-promise-reject-errors': 'off',
    'prefer-destructuring': ['error', { array: false }],
    'no-console': ['warn', {
      allow: ['error', 'warn', 'info'],
    }],
    indent: ['error', 2, { MemberExpression: 0 }],
    'object-shorthand': ['error', 'always'],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
