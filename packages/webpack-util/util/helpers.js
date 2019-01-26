const path = require('path');
const fs = require('fs-extra');
const cosmiconfig = require('cosmiconfig');

const DEFAULT_WEBPACK = require.resolve('../config/webpack.conf');

async function combineConfig(input, reducers, options = {}) {
  let config = await input;
  for (const reducer of reducers) {
    if (reducer) {
      config = await reducer(config, options) || config;
    }
  }
  return config;
}

function combineConfigSync(input, reducers, options = {}) {
  let config = input;
  for (const reducer of reducers) {
    if (reducer) {
      config = reducer(config, options) || config;
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
  const explorer = cosmiconfig(name, {
    stopDir: place,
  });
  const result = explorer.searchSync(place);
  return result;
}

async function findConfig(name, place = process.cwd()) {
  const explorer = cosmiconfig(name, {
    stopDir: place,
  });
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

function findConfigFile(name, message) {
  return findFile([
    `scripts/${name}.conf.js`,
    `scripts/${name}.config.js`,
    `${name}.conf.js`,
    `${name}.config.js`,
  ], message);
}

async function findWebpackConfig() {
  let filepath;
  try {
    filepath = await findConfigFile('webpack', 'No webpack.conf.js is found');
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

function loadDefaultWebpackConfig() {
  return parseConfig(require(DEFAULT_WEBPACK));
}

function shallowMerge(first, ...others) {
  const out = Object.assign({}, first);
  for (const other of others) {
    if (!other) continue;
    Object.entries(other)
    .forEach(([key, value]) => {
      if (Array.isArray(value)) {
        out[key] = [
          ...out[key] || [],
          ...value,
        ];
      } else if (value && typeof value === 'object') {
        out[key] = {
          ...out[key],
          ...value,
        };
      } else {
        out[key] = value;
      }
    });
  }
  return out;
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

exports.combineConfigSync = combineConfigSync;
exports.combineConfig = combineConfig;
exports.parseConfig = parseConfig;
exports.findConfigSync = findConfigSync;
exports.loadConfig = loadConfig;
exports.loadConfigSync = loadConfigSync;
exports.findFile = findFile;
exports.findConfigFile = findConfigFile;
exports.findWebpackConfig = findWebpackConfig;
exports.loadWebpackConfig = loadWebpackConfig;
exports.loadDefaultWebpackConfig = loadDefaultWebpackConfig;
exports.shallowMerge = shallowMerge;
exports.exists = exists;
exports.findConfig = findConfig;
exports.exitError = exitError;
exports.catchError = catchError;
