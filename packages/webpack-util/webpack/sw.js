const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { isProd } = require('../util');

module.exports = options => config => {
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
