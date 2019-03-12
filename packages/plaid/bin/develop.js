process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const spawn = require('cross-spawn');
const { defaultOptions, loadProjectConfig, findWebpackConfig, exists } = require('../util');

async function develop(cmd) {
  const { global } = await loadProjectConfig();
  const { distDir, publicDir } = { ...defaultOptions, ...global };

  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }

  const argv = [];
  let command;
  if (cmd.server) {
    command = 'webpack-dev-server';
    process.env.PLAID_DEV_SERVER = 1;
  } else {
    // Use webpack watch mode, write in file system
    command = 'webpack-cli';
    argv.push('-w');
  }
  argv.push(
    '--config',
    await findWebpackConfig(),
  );
  spawn(command, argv, { stdio: 'inherit' });
}

module.exports = develop;
