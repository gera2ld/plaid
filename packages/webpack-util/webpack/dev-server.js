const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { isProd } = require('../util');

module.exports = options => async config => {
  const {
    devServer,
    distDir,
    successMessages,
  } = options;
  config.devServer = {
    contentBase: distDir,
    quiet: true,
    ...devServer,
    ...config.devServer,
  };
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
