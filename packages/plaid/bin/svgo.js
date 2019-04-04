const path = require('path');
const spawn = require('cross-spawn');
const { findConfigFile } = require('../util');

async function svgo(cmd, files) {
  let svgoConfig;
  try {
    svgoConfig = await findConfigFile('svgo');
  } catch (e) {
    svgoConfig = path.resolve(__dirname, '../config/svgo.yml');
  }
  spawn('svgo', [
    '--config',
    svgoConfig,
    ...files.length ? files : ['src/resources/svg'],
  ], { stdio: 'inherit' })
  .on('exit', (code) => {
    process.exitCode = code;
  });
}

module.exports = svgo;
