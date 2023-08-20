const { program, safeRun } = require('@gera2ld/plaid/bin/program');
const { templateInfo } = require('@gera2ld/plaid/bin/generate');

program
.command('develop')
.description('Start development')
.action((...args) => {
  safeRun(require('./develop'), args);
});

program
.command('build')
.description('Build static files')
.option('-k, --keep', 'Keep previously built files')
.option('--no-copy', 'Copy `src/public/**` to `dist`')
.option('--api', 'Build with webpack API')
.option('-a, --analyze', 'Analyze package size')
.action((...args) => {
  safeRun(require('./build'), args);
});

templateInfo.push({
  name: 'webpack',
  filepath: 'scripts/webpack.config.cjs',
  template: `\
const { modifyWebpackConfig } = require('@gera2ld/plaid');

module.exports = modifyWebpackConfig(async (config) => {
  return config;
});`,
});
