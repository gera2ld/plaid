module.exports = {
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-multiple-empty-lines': 'off',
        'prefer-const': 'off',
      },
    },
  ],
};
