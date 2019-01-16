const { styleLoader } = require('../util');

module.exports = (config, options) => {
  const {
    lessLoader,
    postcssLoader,
    styleOptions,
    nodeModules,
  } = options;
  config.module.rules = [
    ...config.module.rules || [],

    {
      test: /\.module\.less$/,
      use: styleLoader({
        ...styleOptions,
        loaders: [postcssLoader, lessLoader],
        modules: true,
      }),
      exclude: [nodeModules],
    },

    {
      test: /\.less$/,
      use: styleLoader({
        ...styleOptions,
        loaders: [postcssLoader, lessLoader],
      }),
      exclude: [/\.module\.less$/],
    },
  ];
  return config;
};
