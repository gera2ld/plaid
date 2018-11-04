const webpack = require('webpack');
const { isProd } = require('../util');

module.exports = options => config => {
  const {
    devServer,
    distDir,
  } = options;
  config.devServer = {
    contentBase: distDir,
    ...devServer,
    ...config.devServer,
  };
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
  return config;
};
