#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
.version(require('../package.json').version);

program
.command('develop')
.description('Start development server')
.action((...args) => {
  safeRun(require('./develop'), args);
});

program
.command('build')
.description('Build static files')
.option('-c, --clean', 'Clean previously built files')
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

program.parse(process.argv);

function safeRun(module, args) {
  const { catchError } = require('../util/helpers');
  const cmd = args.pop();
  catchError(module)(cmd, ...args);
}
