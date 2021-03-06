module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb-base',
  ],
  plugins: [
    '@babel',
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
    'import/default': 'error',
    'import/prefer-default-export': 'off',
    indent: ['warn', 2],
    'max-len': ['error', 100, 2, { // airbnb-base + ignore comments
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-await-in-loop': 'off',
    'no-bitwise': ['error', { int32Hint: true }],
    'no-cond-assign': ['error', 'except-parens'],
    'no-console': ['warn', {
      allow: ['error', 'warn', 'info'],
    }],
    'no-lonely-if': 'off',
    'no-mixed-operators': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-throw-literal': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', {
      args: 'none',
      ignoreRestSiblings: true,
    }],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: false }],
    'object-shorthand': ['error', 'always'],
    'object-curly-newline': ['error', { consistent: true, multiline: true }],
    'prefer-destructuring': ['error', { array: false }],
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
  },
};
