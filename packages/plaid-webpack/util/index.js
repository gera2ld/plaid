const util = require('@gera2ld/plaid/util');
const style = require('./style');
const webpack = require('./webpack');
const defaults = require('./defaults');

module.exports = Object.assign(util, style, webpack, defaults, util.requireSilent('@gera2ld/plaid-vue/util'));
