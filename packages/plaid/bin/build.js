process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const { defaultOptions, findWebpackConfig, loadWebpackConfig, exists } = require('../util');

module.exports = build;

async function build(cmd) {
  // Allow util to be modified when webpack.conf.js is required
  await loadWebpackConfig();

  const { distDir, publicDir } = defaultOptions;
  if (cmd.clean) await fs.emptyDir(distDir);
  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }

  const argv = [
    process.argv[0],
    'webpack-cli',
    '--config',
    await findWebpackConfig(),
  ];
  process.argv = argv;
  require('webpack-cli/bin/cli');
}
