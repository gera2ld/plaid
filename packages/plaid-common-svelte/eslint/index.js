module.exports = {
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off',
        'import/no-mutable-exports': 'off',
        'no-labels': 'off',
        'no-multiple-empty-lines': 'off',
        'no-restricted-syntax': 'off',
        'no-sequences': 'off',
        'no-unused-expressions': 'off',
        'prefer-const': 'off',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
