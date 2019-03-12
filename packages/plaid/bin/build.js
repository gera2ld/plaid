process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const spawn = require('cross-spawn');
const webpack = require('webpack');
const {
  defaultOptions,
  loadProjectConfig,
  findWebpackConfig,
  loadWebpackConfig,
  exists,
  webpackCallback,
} = require('../util');

async function prebuild(cmd) {
  const { global } = await loadProjectConfig();
  const { distDir, publicDir } = { ...defaultOptions, ...global };
  if (!cmd.keep) await fs.emptyDir(distDir);
  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }
}

async function buildWithCLI() {
  spawn('webpack-cli', [
    '--config',
    await findWebpackConfig(),
  ], { stdio: 'inherit' })
  .on('exit', (code) => {
    process.exitCode = code;
  });
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
