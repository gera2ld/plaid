process.env.NODE_ENV = 'development';

const fs = require('fs');
const spawn = require('cross-spawn');
const _ = require('lodash');
const log = require('debug')('plaid');
const { findProjectConfig, findWebpackConfig } = require('@gera2ld/plaid/util');

let child;
let watchers;
let waiting;
const debouncedReload = _.debounce(reload, 1000);

async function clean() {
  if (watchers) {
    watchers.forEach(watcher => {
      watcher.close();
    });
    watchers = null;
  }
  if (child) {
    child.kill();
    await waiting;
    child = null;
    waiting = null;
  }
}

async function load() {
  const [projectConfigFile, webpackConfigFile] = await Promise.all([
    findProjectConfig(),
    findWebpackConfig(),
  ]);
  watchers = [
    fs.watch(projectConfigFile, reloadLater),
    fs.watch(webpackConfigFile, reloadLater),
  ];
  child = spawn(process.execPath, [require.resolve('../sub/develop')], { stdio: 'inherit' });
  waiting = new Promise((resolve) => {
    child.on('exit', resolve);
  });
}

function reloadLater(type, filename) {
  log('[%s] %s', type, filename);
  debouncedReload();
}

async function reload() {
  console.clear();
  console.info('Reloading...');
  await clean();
  await load();
}

module.exports = load;
