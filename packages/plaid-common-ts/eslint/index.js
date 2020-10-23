module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['TSTypeParameterInstantiation']
    }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'none',
      ignoreRestSiblings: true,
    }],
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false }],
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off', // use @typescript-eslint/indent instead
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
    'no-unused-vars': 'off', // use @typescript-eslint/no-unused-vars instead
    'no-use-before-define': ['error', 'nofunc'],
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': ['error', { array: false }],
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
  },
};
