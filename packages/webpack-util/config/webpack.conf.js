const { html } = require('../webpack');
const { findFile, parseConfig } = require('../util');
const baseConfig = require('./webpack.base.conf');

module.exports = async () => {
  const pagesConfFile = await findFile([
    'scripts/pages.conf.js',
    'pages.conf.js',
  ], 'No pages.conf.js is found!');
  const pages = await parseConfig(require(pagesConfFile));
  const parsed = await parseConfig(baseConfig);
  return html({ pages })(parsed);
};
