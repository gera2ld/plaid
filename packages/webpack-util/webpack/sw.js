const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { isProd } = require('../util');

module.exports = (config, options) => {
  const {
    swOptions,
  } = options;
  config.plugins = [
    ...config.plugins || [],
    new SWPrecacheWebpackPlugin({
      minify: isProd,
      ...swOptions,
    }),
  ];
  return config;
};
