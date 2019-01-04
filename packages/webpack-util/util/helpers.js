const path = require('path');
const fs = require('fs-extra');
const cosmiconfig = require('cosmiconfig');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';
process.env.NODE_ENV = NODE_ENV;
const DEFAULT_WEBPACK = require.resolve('../config/webpack.conf');

async function combineConfig(input, reducers) {
  let config = await input;
  for (const reducer of reducers) {
    if (reducer) {
      config = await reducer(config) || config;
    }
  }
  return config;
}

function combineConfigSync(input, reducers) {
  let config = input;
  for (const reducer of reducers) {
    if (reducer) {
      config = reducer(config) || config;
    }
  }
  return config;
}

function parseConfig(input) {
  let config = input;
  if (typeof config === 'function') {
    config = config();
  }
  return config;
}

function findConfigSync(name, place = process.cwd()) {
  const explorer = cosmiconfig(name);
  const result = explorer.searchSync(place);
  return result;
}

async function findConfig(name, place = process.cwd()) {
  const explorer = cosmiconfig(name);
  const result = await explorer.search(place);
  return result;
}

function loadConfigSync(name) {
  const result = findConfigSync(name);
  let config;
  if (result) {
    // Do not support Promise-like value
    config = parseConfig(result.config);
  }
  return config;
}

async function loadConfig(name) {
  const result = await findConfig(name);
  let config;
  if (result) {
    config = await parseConfig(result.config);
  }
  return config;
}

async function exists(filepath, { file, dir } = {}) {
  try {
    const stats = await fs.stat(filepath);
    if (file && stats.isFile()) return true;
    if (dir && stats.isDirectory()) return true;
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
    }
  }
  return false;
}

async function findFile(candidates, message) {
  for (const name of candidates) {
    const filepath = path.resolve(name);
    if (await exists(filepath, { file: true })) {
      return filepath;
    }
  }
  throw new Error(message || 'File not found');
}

async function findWebpackConfig() {
  let filepath;
  try {
    filepath = await findFile([
      'scripts/webpack.conf.js',
      'scripts/webpack.config.js',
      'webpack.conf.js',
      'webpack.config.js',
    ], 'No webpack.conf.js is found');
  } catch (err) {
    filepath = DEFAULT_WEBPACK;
  }
  return filepath;
}

async function loadWebpackConfig() {
  const filepath = await findWebpackConfig();
  const config = await parseConfig(require(filepath));
  return config;
}

function exitError(code, message) {
  if (message) console.error(message);
  process.exit(code);
}

function catchError(func) {
  return async (...args) => {
    try {
      await func(...args);
    } catch (err) {
      exitError(1, err);
    }
  };
}

exports.isProd = isProd;
exports.combineConfigSync = combineConfigSync;
exports.combineConfig = combineConfig;
exports.parseConfig = parseConfig;
exports.findConfigSync = findConfigSync;
exports.loadConfig = loadConfig;
exports.loadConfigSync = loadConfigSync;
exports.findFile = findFile;
exports.findWebpackConfig = findWebpackConfig;
exports.loadWebpackConfig = loadWebpackConfig;
exports.exists = exists;
exports.findConfig = findConfig;
exports.exitError = exitError;
exports.catchError = catchError;
