process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');

module.exports = build;

async function build(...args) {
  let webpackPath;
  const i = args.indexOf('--config');
  if (i >= 0) webpackPath = args[i + 1];
  webpackPath = path.resolve(webpackPath || 'scripts/webpack.conf.js');
  // Allow util to be modified when webpack.conf.js is required
  require(webpackPath);
  const { defaultOptions } = require('../util');
  const { distDir, publicDir } = defaultOptions;

  await fs.emptyDir(distDir);
  await fs.copy(publicDir, distDir);
  spawn.sync('webpack', ['--config', webpackPath], { stdio: 'inherit' });
}
