module.exports = (config, options) => {
  config.resolve.extensions = [
    ...config.resolve.extensions || [],
    '.svelte',
  ];
  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
  config.module.rules = [
    {
      test: /\.svelte$/,
      use: {
        loader: require.resolve('svelte-loader'),
        options: {
          emitCss: true,
        },
      },
    },
    ...config.module.rules || [],
  ];
};
