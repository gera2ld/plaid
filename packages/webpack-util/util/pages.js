const { findConfigFile, parseConfig } = require('./helpers');

async function loadPagesConfig() {
  const filepath = await findConfigFile('pages', 'No pages.conf.js is found');
  return parseConfig(require(filepath));
}

exports.loadPagesConfig = loadPagesConfig;
