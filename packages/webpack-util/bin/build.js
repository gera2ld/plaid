process.env.NODE_ENV = 'production';

const fs = require('fs-extra');

module.exports = build;

async function build(args) {
  // Allow util to be modified when webpack.conf.js is required
  const { hasConfig, webpackPath } = require('../util/paths')(args);
  await require(webpackPath);

  const { defaultOptions } = require('../util');
  const { distDir, publicDir } = defaultOptions;
  await fs.emptyDir(distDir);
  await fs.copy(publicDir, distDir);

  const argv = [
    process.argv[0],
    'webpack-cli',
  ];
  if (!hasConfig) argv.push('--config', webpackPath);
  process.argv = argv;
  require('webpack-cli/bin/cli');
}
