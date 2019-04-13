const util = require('@gera2ld/plaid/util');
const style = require('./style');
const webpack = require('./webpack');

module.exports = Object.assign(util, style, webpack);
