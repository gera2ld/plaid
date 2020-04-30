const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (config, options) => {
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
};
