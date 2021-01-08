const fs = require('fs-extra');
const {
  loadProjectConfig,
  findWebpackConfig,
  exists,
} = require('@gera2ld/plaid/util');

async function develop() {
  const { distDir, publicDir, devServer } = await loadProjectConfig();

  if (await exists(publicDir, { dir: true })) {
    await fs.copy(publicDir, distDir);
  }

  const argv = [
    process.argv[0],
    'webpack',
  ];
  const module = 'webpack-cli/bin/cli';
  if (devServer !== false) {
    // Use webpack-dev-server, write in memory
    argv.push('serve');
  } else {
    // Use webpack watch mode, write in file system
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
