const util = require('./util');
const { mergeLibraries } = util;

mergeLibraries(Object.assign(exports, util), null, [
  'plaid-rollup',
  'plaid-webpack',
]);
