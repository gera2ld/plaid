const webpack = require('webpack');
const portfinder = require('portfinder');
const { isProd } = require('@gera2ld/plaid/util');

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
    static: distDir,
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
  config.plugins = [
    ...config.plugins || [],
    !isProd && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
  return config;
};
