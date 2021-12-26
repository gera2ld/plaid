module.exports = (config, options) => {
  let VueLoaderPlugin;
  try {
    VueLoaderPlugin = require('vue-loader/lib/plugin');
  } catch (err) {
    console.error(`Please install @gera2ld/plaid-webpack-vue or @gera2ld/plaid-webpack-vue3 first`);
    throw err;
  }
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
