const { findConfigFile, parseConfig } = require('./helpers');

async function loadProjectConfig() {
  const filepath = await findConfigFile('plaid', 'No plaid.conf.js is found');
  return parseConfig(require(filepath));
}

exports.loadProjectConfig = loadProjectConfig;
