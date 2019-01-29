const { combineConfigSync } = require('../util/helpers');
const precss = require('../postcss/precss');
const px2rem = require('../postcss/px2rem');

module.exports = combineConfigSync({}, [precss, px2rem]);
