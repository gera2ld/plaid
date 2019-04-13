const util = require('@gera2ld/plaid/util');
const style = require('./style');
const webpack = require('./webpack');
const { defaultOptions } = require('./defaults');

Object.assign(util.defaultOptions, defaultOptions);

module.exports = Object.assign(util, style, webpack);
