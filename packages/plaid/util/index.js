const helpers = require('./helpers');
const config = require('./config');
const webpack = require('./webpack');
const env = require('./env');
const style = require('./style');
const defaultOptions = require('./defaults');

function modifyWebpackConfig(configurators) {
  if (typeof configurators === 'function') configurators = [configurators];
  return helpers.combineConfig(webpack.loadDefaultWebpackConfig(), configurators);
}

Object.assign(exports, helpers, config, webpack, env, style);
exports.defaultOptions = defaultOptions;
exports.modifyWebpackConfig = modifyWebpackConfig;
