const { styleLoader } = require('../util');

module.exports = (config, options) => {
  const {
    lessLoader,
    cssLoaders,
    nodeModules,
  } = options;
  config.module.rules = [
    ...config.module.rules || [],

    {
      test: /\.module\.less$/,
      use: styleLoader({
        loaders: [...cssLoaders, lessLoader],
        modules: true,
      }),
      exclude: [nodeModules],
    },

    {
      test: /\.less$/,
      use: styleLoader({
        loaders: [...cssLoaders, lessLoader],
      }),
      exclude: [/\.module\.less$/],
    },
  ];
  return config;
};
