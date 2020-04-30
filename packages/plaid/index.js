const util = require('./util');
const { requireSilent, mergeLibraries } = util;

mergeLibraries(Object.assign(exports, util), null, [
  'plaid-rollup',
  'plaid-webpack',
]);
