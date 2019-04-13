const { program, safeRun } = require('@gera2ld/plaid/bin/program');
const { templateInfo } = require('@gera2ld/plaid/bin/generate');

program
.command('develop')
.description('Start development')
.option('--no-server', 'Do not use webpack-dev-server')
.action((...args) => {
  safeRun(require('./develop'), args);
});

program
.command('build')
.description('Build static files')
.option('-k, --keep', 'Keep previously built files')
.option('--api', 'Build with webpack API')
.action((...args) => {
  safeRun(require('./build'), args);
});

program
.command('analyze')
.description('Analyze package size')
.action((...args) => {
  safeRun(require('./analyze'), args);
});

templateInfo.push({
  name: 'webpack',
  filepath: 'scripts/webpack.conf.js',
  template: `\
const { modifyWebpackConfig } = require('@gera2ld/plaid/util');

module.exports = modifyWebpackConfig(async (config) => {
  return config;
});`,
  successMessage: 'Webpack config is generated successfully at scripts/webpack.conf.js',
});
