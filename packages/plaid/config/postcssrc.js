const { combineConfigSync } = require('../util/helpers');
const tailwind = require('../postcss/tailwind');
const base = require('../postcss/base');

module.exports = combineConfigSync({}, [tailwind, base]);
