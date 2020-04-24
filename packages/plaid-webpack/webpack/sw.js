const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = async (config, options) => {
  const {
    swOptions,
  } = options;
  if (!swOptions) return;
  config.plugins = [
    ...config.plugins || [],
    new GenerateSW({
      ...swOptions,
    }),
  ];
};
