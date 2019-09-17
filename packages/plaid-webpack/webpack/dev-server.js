const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const { isProd } = require('../util');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = async (config, options) => {
  const {
    devServer,
    distDir,
  } = options;
  if (devServer === false) return config;
  config.devServer = {
    contentBase: distDir,
    quiet: true,
    ...devServer,
    ...config.devServer,
  };
  // Make sure port is defined
  if (!isProd) {
    if (!config.devServer.port) {
      // find an available port
      config.devServer.port = await portfinder.getPortPromise();
    } else {
      // check if the given port is available
      const { port } = config.devServer;
      while (true) {
        try {
          await portfinder.getPortPromise({
            port,
            stopPort: port,
          });
          break;
        } catch (err) {
          console.clear();
          console.error(`Port ${port} is already in use`);
          await delay(1000);
        }
      }
    }
  }
  const successMessages = options.successMessages || [
    'Envs:',
    `  NODE_ENV=${process.env.NODE_ENV || ''}`,
    `  BABEL_ENV=${process.env.BABEL_ENV || ''}`,
    `Your application is running here: http://localhost:${config.devServer.port}`,
  ];
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
