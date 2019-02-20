const { combineConfigSync } = require('../util/helpers');
const precss = require('../postcss/precss');

module.exports = combineConfigSync({}, [precss]);
