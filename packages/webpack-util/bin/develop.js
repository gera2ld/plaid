process.env.NODE_ENV = 'development';

module.exports = develop;

async function develop(args) {
  // Allow util to be modified when webpack.conf.js is required
  const { hasConfig, webpackPath } = require('../util/paths')(args);
  const argv = [
    process.argv[0],
    'webpack-dev-server',
  ];
  if (!hasConfig) argv.push('--config', webpackPath);
  process.argv = argv;
  require('webpack-dev-server/bin/webpack-dev-server');
}
