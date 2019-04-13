process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const spawn = require('cross-spawn');
const _ = require('lodash');
const { findProjectConfig, findWebpackConfig } = require('../util');

let child;
let watchers;
let waiting;
const debouncedReload = _.debounce(reload, 1000);

function develop(cmd) {
  if (cmd.server) {
    process.env.PLAID_DEV_SERVER = 1;
  }
  load();
}

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
    fs.watch(projectConfigFile, debouncedReload),
    fs.watch(webpackConfigFile, debouncedReload),
  ];
  child = spawn(process.execPath, [require.resolve('../sub/develop')], { stdio: 'inherit' });
  waiting = new Promise((resolve) => {
    child.on('exit', resolve);
  });
}

async function reload() {
  console.clear();
  console.info('Reloading...');
  await clean();
  await load();
}

module.exports = develop;
