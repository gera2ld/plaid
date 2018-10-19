const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = options => config => {
  const {
    vueOptions,
  } = options;
  config.resolve.extensions = [
    ...config.resolve.extensions || [],
    '.vue',
  ];
  config.module.rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueOptions,
    },
    ...config.module.rules || [],
  ];
  config.plugins.push(new VueLoaderPlugin());
};
