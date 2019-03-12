const { findConfigFile, parseConfig } = require('./helpers');

async function findProjectConfig() {
  return findConfigFile('plaid', 'No plaid.conf.js is found');
}

async function loadProjectConfig() {
  return parseConfig(require(await findProjectConfig()));
}

exports.findProjectConfig = findProjectConfig;
exports.loadProjectConfig = loadProjectConfig;
