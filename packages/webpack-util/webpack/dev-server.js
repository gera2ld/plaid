const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');
const { isProd } = require('../util');

module.exports = options => async config => {
  const {
    devServer,
    distDir,
  } = options;
  config.devServer = {
    contentBase: distDir,
    quiet: true,
    ...devServer,
    ...config.devServer,
  };
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
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
    !isProd && new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'Envs:',
          `  NODE_ENV=${process.env.NODE_ENV || ''}`,
          `  BABEL_ENV=${process.env.BABEL_ENV || ''}`,
          `Your application is running here: http://localhost:${config.devServer.port}`,
        ],
      },
    }),
  ].filter(Boolean);
  return config;
};
