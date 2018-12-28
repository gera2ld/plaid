const path = require('path');
const { html } = require('../webpack');
const config = require('./webpack.base.conf');
const pages = require(path.resolve('pages.conf'));

module.exports = async () => html({ pages })(await config);
