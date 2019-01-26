const fs = require('fs-extra');
const { exists } = require('../util/helpers');

module.exports = generate;

const TEMPLATE_WEBPACK = `\
const { modifyWebpackConfig } = require('webpack-util/util');

module.exports = modifyWebpackConfig(async (config) => {
  return config;
});`;

async function generate(name) {
  if (name === 'webpack') {
    await handleConflict('scripts/webpack.conf.js', TEMPLATE_WEBPACK);
    console.info('Webpack config is generated successfully at scripts/webpack.conf.js');
    return;
  }
  throw new Error(`Unknown type to generate: ${name}`);
}

async function handleConflict(filepath, content) {
  if (await exists(filepath, { file: true })) {
    throw new Error(`File already exists: ${filepath}`);
  }
  return fs.writeFile(filepath, content, 'utf8');
}
