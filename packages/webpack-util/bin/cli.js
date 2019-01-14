#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
.version(require('../package.json').version);

program
.command('develop')
.action((cmd) => {
  safeRun(require('./develop'), cmd);
});

program
.command('build')
.option('-c, --clean', 'Clean previously built files')
.action((cmd) => {
  safeRun(require('./build'), cmd);
});

program
.command('analyze')
.action((cmd) => {
  safeRun(require('./analyze'), cmd);
});

program
.command('generate <name>', 'Generate template files')
.action((name, cmd) => {
  safeRun(require('./generate'), name, cmd);
});

program.parse(process.argv);

function safeRun(module, ...args) {
  const { catchError } = require('../util/helpers');
  catchError(module)(...args);
}
