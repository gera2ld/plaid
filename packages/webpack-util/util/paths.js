const path = require('path');

module.exports = parsePaths;

function parsePaths(args) {
  let webpackPath;
  const i = args.indexOf('--config');
  const hasConfig = i >= 0;
  if (hasConfig) webpackPath = args[i + 1];
  webpackPath = path.resolve(webpackPath || 'scripts/webpack.conf.js');

  return { hasConfig, webpackPath };
}
