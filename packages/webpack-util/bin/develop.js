process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const { defaultOptions, findWebpackConfig, loadWebpackConfig, exists } = require('../util');

module.exports = develop;

async function develop() {
  // Allow util to be modified when webpack.conf.js is required
  const webpackConfig = await loadWebpackConfig();

  const { distDir, publicDir } = defaultOptions;
  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }

  const argv = [
    process.argv[0],
  ];
  let module;
  if (webpackConfig.devServer) {
    // Use webpack-dev-server, write in memory
    defaultOptions.successMessages.push(
      `Your application is running here: http://localhost:${webpackConfig.devServer.port}`,
    );
    argv.push('webpack-dev-server');
    module = 'webpack-dev-server/bin/webpack-dev-server';
  } else {
    // Use webpack watch mode, write in file system
    argv.push('webpack-cli', '-w');
    module = 'webpack-cli/bin/cli';
  }
  argv.push(
    '--config',
    await findWebpackConfig(),
  );
  process.argv = argv;
  require(module);
}
