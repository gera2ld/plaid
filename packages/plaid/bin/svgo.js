const path = require('path');
const spawn = require('cross-spawn');

function svgo(cmd, files) {
  spawn('svgo', [
    '--config',
    path.resolve(__dirname, '../config/svgo.yml'),
    ...files.length ? files : ['src/resources/svg'],
  ], { stdio: 'inherit' })
  .on('exit', (code) => {
    process.exitCode = code;
  });
}

module.exports = svgo;
