const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = async (config, options) => {
  const {
    swOptions,
  } = options;
  config.plugins = [
    ...config.plugins || [],
    new GenerateSW({
      ...swOptions,
    }),
  ];
};
