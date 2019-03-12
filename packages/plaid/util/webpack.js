const { findConfigFile, parseConfig } = require('./helpers');

const DEFAULT_WEBPACK = require.resolve('../config/webpack.conf');

async function findWebpackConfig() {
  let filepath;
  try {
    filepath = await findConfigFile('webpack', 'No webpack.conf.js is found');
  } catch (err) {
    filepath = DEFAULT_WEBPACK;
  }
  return filepath;
}

async function loadWebpackConfig() {
  const filepath = await findWebpackConfig();
  const config = await parseConfig(require(filepath));
  return config;
}

function loadDefaultWebpackConfig() {
  return parseConfig(require(DEFAULT_WEBPACK));
}

exports.findWebpackConfig = findWebpackConfig;
exports.loadWebpackConfig = loadWebpackConfig;
exports.loadDefaultWebpackConfig = loadDefaultWebpackConfig;
