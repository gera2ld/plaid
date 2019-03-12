const _ = require('lodash');
const { findConfigFile, parseConfig, shallowMerge } = require('./helpers');
const defaultOptions = require('./defaults');

async function findProjectConfig() {
  return findConfigFile('plaid', 'No plaid.conf.js is found');
}

async function loadProjectConfig() {
  const config = await parseConfig(require(await findProjectConfig()));
  config.global = shallowMerge(defaultOptions, config.global);
  return config;
}

exports.findProjectConfig = findProjectConfig;
exports.loadProjectConfig = _.memoize(loadProjectConfig);
