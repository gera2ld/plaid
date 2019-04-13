const util = require('./util');
const { requireSilent } = util;

const webpack = requireSilent('@gera2ld/plaid-webpack/webpack');

Object.assign(exports, util, webpack);
