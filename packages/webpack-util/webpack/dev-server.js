const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');
const { isProd } = require('../util');

module.exports = async (config, options) => {
  const {
    devServer,
    distDir,
    successMessages,
  } = options;
  if (devServer === false) return config;
  config.devServer = {
    contentBase: distDir,
    quiet: true,
    ...devServer,
    ...config.devServer,
  };
  // Make sure port is defined
  if (!isProd && !config.devServer.port) {
    portfinder.basePort = 8080;
    await new Promise((resolve, reject) => {
      portfinder.getPort((err, port) => {
        if (err) {
          reject(err);
        } else {
          config.devServer.port = port;
          resolve();
        }
      });
    });
  }
  if (!successMessages.length) {
    successMessages.push(
      'Envs:',
      `  NODE_ENV=${process.env.NODE_ENV || ''}`,
      `  BABEL_ENV=${process.env.BABEL_ENV || ''}`,
    );
  }
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
    !isProd && new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: successMessages,
      },
    }),
  ].filter(Boolean);
  return config;
};
