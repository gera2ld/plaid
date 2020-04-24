const { combineConfigSync } = require('../util/helpers');
const tailwind = require('../postcss/tailwind');
const precss = require('../postcss/precss');

module.exports = combineConfigSync({}, [tailwind, precss]);
