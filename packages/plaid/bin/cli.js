#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
.version(require('../package.json').version);

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

program
.command('generate <name>')
.description('Generate template files')
.action((...args) => {
  safeRun(require('./generate'), args);
});

program
.command('svgo [files...]')
.description('Compress SVG files')
.action((...args) => {
  safeRun(require('./svgo'), args);
});

program.parse(process.argv);

function safeRun(module, args) {
  const { catchError } = require('../util/helpers');
  const cmd = args.pop();
  catchError(module)(cmd, ...args);
}
