const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { isProd } = require('../util');

module.exports = options => config => {
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
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
    !isProd && new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'Envs:',
          `  NODE_ENV=${process.env.NODE_ENV || ''}`,
          `  BABEL_ENV=${process.env.BABEL_ENV || ''}`,
          `Your application is running here: http://localhost:${config.devServer.port || 8080}`,
        ],
      },
    }),
  ].filter(Boolean);
  return config;
};
