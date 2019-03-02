process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const webpack = require('webpack');
const {
  defaultOptions,
  findWebpackConfig,
  loadWebpackConfig,
  exists,
  webpackCallback,
} = require('../util');

async function prebuild(cmd) {
  // Allow util to be modified when webpack.conf.js is required
  await loadWebpackConfig();

  const { distDir, publicDir } = defaultOptions;
  if (!cmd.keep) await fs.emptyDir(distDir);
  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }
}

async function buildWithCLI() {
  const argv = [
    process.argv[0],
    'webpack-cli',
    '--config',
    await findWebpackConfig(),
  ];
  process.argv = argv;
  require('webpack-cli/bin/cli');
}

async function buildWithAPI() {
  const compiler = webpack(await loadWebpackConfig());
  await new Promise((resolve, reject) => compiler.run(webpackCallback(resolve, reject)));
}

async function build(cmd) {
  await prebuild(cmd);
  await (cmd.api ? buildWithAPI : buildWithCLI)();
}

module.exports = build;
