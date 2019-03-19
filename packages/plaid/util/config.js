const _ = require('lodash');
const { findConfigFile, parseConfig, shallowMerge } = require('./helpers');
const { defaultOptions } = require('./defaults');

async function findProjectConfig() {
  return findConfigFile('plaid', 'No plaid.conf.js is found');
}

async function loadProjectConfig() {
  const projectConfig = await parseConfig(require(await findProjectConfig()));
  const config = shallowMerge(defaultOptions, projectConfig.global, {
    pagesConfig: projectConfig.pages,
  });
  return config;
}

exports.findProjectConfig = findProjectConfig;
exports.loadProjectConfig = _.memoize(loadProjectConfig);
