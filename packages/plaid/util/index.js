const helpers = require('./helpers');
const pagesHelpers = require('./pages');
const env = require('./env');
const style = require('./style');
const defaultOptions = require('./defaults');

function modifyWebpackConfig(configurators, options) {
  if (typeof configurators === 'function') configurators = [configurators];
  return helpers.combineConfig(helpers.loadDefaultWebpackConfig(), configurators, helpers.shallowMerge(defaultOptions, options));
}

Object.assign(exports, helpers, pagesHelpers, env, style);
exports.defaultOptions = defaultOptions;
exports.modifyWebpackConfig = modifyWebpackConfig;
