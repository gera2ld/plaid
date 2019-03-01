const path = require('path');

function svgo(cmd, files) {
  process.argv = [
    process.argv[0],
    'svgo',
    '--config',
    path.resolve(__dirname, '../config/svgo.yml'),
    ...files.length ? files : ['src/resources/svg'],
  ];
  require('svgo/bin/svgo');
}

module.exports = svgo;
