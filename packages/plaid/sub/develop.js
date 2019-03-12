const fs = require('fs-extra');
const { defaultOptions, loadProjectConfig, findWebpackConfig, exists } = require('../util');

async function develop() {
  const { global } = await loadProjectConfig();
  const { distDir, publicDir } = { ...defaultOptions, ...global };

  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }

  const argv = [
    process.argv[0],
  ];
  let module;
  if (process.env.PLAID_DEV_SERVER) {
    // Use webpack-dev-server, write in memory
    module = 'webpack-dev-server/bin/webpack-dev-server';
    argv.push('webpack-dev-server');
  } else {
    // Use webpack watch mode, write in file system
    module = 'webpack-cli/bin/cli';
    argv.push('-w');
  }
  argv.push(
    '--config',
    await findWebpackConfig(),
  );
  process.argv = argv;
  require(module);
}

develop();
