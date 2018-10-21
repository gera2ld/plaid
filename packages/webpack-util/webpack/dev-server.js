const webpack = require('webpack');
const { isProd } = require('../util');

module.exports = options => config => {
  const {
    publicDir,
  } = options;
  config.devServer = {
    hot: true,
    contentBase: publicDir,
    ...config.devServer,
  };
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
  return config;
};
