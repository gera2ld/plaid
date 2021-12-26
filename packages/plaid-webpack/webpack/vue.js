let VueLoaderPlugin;
try {
  ({ VueLoaderPlugin } = require('vue-loader'));
} catch (err) {
  // ignore
}

module.exports = VueLoaderPlugin && ((config, options) => {
  const {
    vueOptions,
  } = options;
  config.module.rules = [
    {
      test: /\.vue$/,
      loader: require.resolve('vue-loader'),
      options: vueOptions,
    },
    ...config.module.rules || [],
  ];
  config.plugins.push(new VueLoaderPlugin());
});
