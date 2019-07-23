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
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2, { MemberExpression: 0 }],
    'max-len': ['error', 100, 2, { // airbnb-base + ignore comments
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-await-in-loop': 'off',
    'no-bitwise': ['error', { int32Hint: true }],
    'no-console': ['warn', {
      allow: ['error', 'warn', 'info'],
    }],
    'no-lonely-if': 'off',
    'no-mixed-operators': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-throw-literal': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': ['error', { array: false }],
    'prefer-promise-reject-errors': 'off',
  },
};
