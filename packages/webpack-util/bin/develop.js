process.env.NODE_ENV = 'development';

module.exports = develop;

async function develop(args) {
  // Allow util to be modified when webpack.conf.js is required
  const { hasConfig, webpackPath } = require('../util/paths')(args);
  const webpackConfig = require(webpackPath);
  const argv = [
    process.argv[0],
  ];
  let module;
  if (webpackConfig.devServer) {
    // Use webpack-dev-server, write in memory
    argv.push('webpack-dev-server');
    module = 'webpack-dev-server/bin/webpack-dev-server';
  } else {
    // Use webpack watch mode, write in file system
    argv.push('webpack-cli', '-w');
    module = 'webpack-cli/bin/cli';
  }
  if (!hasConfig) argv.push('--config', webpackPath);
  process.argv = argv;
  require(module);
}
