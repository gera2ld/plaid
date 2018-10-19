const { styleLoader } = require('../util');

module.exports = options => config => {
  const {
    lessLoader,
    nodeModules,
  } = options;
  config.module.rules = [
    ...config.module.rules || [],

    {
      test: /\.module\.less$/,
      use: styleLoader({
        loaders: ['postcss-loader', lessLoader],
        modules: true,
      }),
      exclude: [nodeModules],
    },

    {
      test: /\.less$/,
      use: styleLoader({
        loaders: ['postcss-loader', lessLoader],
      }),
      exclude: [/\.module\.less$/],
    },
  ];
  return config;
};
