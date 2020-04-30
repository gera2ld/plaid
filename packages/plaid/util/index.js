const helpers = require('./helpers');
const config = require('./config');
const env = require('./env');
const defaults = require('./defaults');

Object.assign(
  exports,
  helpers,
  config,
  env,
  defaults,
);
helpers.mergeLibraries(exports, 'util', /^plaid-/);
