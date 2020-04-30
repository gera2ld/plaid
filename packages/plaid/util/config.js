const _ = require('lodash');
const { findConfigFile, parseConfig, shallowMerge } = require('./helpers');
const { defaultOptions } = require('./defaults');

async function findProjectConfig() {
  return findConfigFile('plaid', 'No plaid.conf.js is found');
}

async function loadProjectConfig() {
  const projectConfig = await parseConfig(require(await findProjectConfig()));
  const config = shallowMerge(defaultOptions, projectConfig, projectConfig.global);
  return config;
}

function resolveBabelConfig(config, resolve) {
  const resolveItem = item => {
    if (typeof item === 'string') return resolve(item);
    item = [...item];
    item[0] = resolve(item[0]);
    return item;
  };
  if (config && config.presets) {
    config.presets = config.presets.map(resolveItem);
  }
  if (config && config.plugins) {
    config.plugins = config.plugins.map(resolveItem);
  }
  return config;
}

exports.findProjectConfig = findProjectConfig;
exports.loadProjectConfig = _.memoize(loadProjectConfig);
exports.mergeBabelConfig = require('babel-merge');
exports.resolveBabelConfig = resolveBabelConfig;
