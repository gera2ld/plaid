const fs = require('fs-extra');
const { exists } = require('../util/helpers');

module.exports = generate;

const TEMPLATE_WEBPACK = `\
const webpackUtil = require('webpack-util/webpack');
const { defaultOptions, loadDefaultWebpackConfig, combineConfig } = require('webpack-util/util');

module.exports = async () => {
  const config = await combineConfig(loadDefaultWebpackConfig(), [
  ], {
    ...defaultOptions,
  });
  return config;
};`;

async function generate(name) {
  if (name === 'webpack') {
    return handleConflict('scripts/webpack.conf.js', TEMPLATE_WEBPACK);
  }
  throw new Error(`Unknown type to generate: ${name}`);
}

async function handleConflict(filepath, content) {
  if (await exists(filepath, { file: true })) {
    throw new Error(`File already exists: ${filepath}`);
  }
  return fs.writeFile(filepath, content, 'utf8');
}
