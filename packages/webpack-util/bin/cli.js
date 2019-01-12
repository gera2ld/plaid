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
.action((cmd) => {
  safeRun(require('./build'), cmd);
});

program.parse(process.argv);

function safeRun(module, cmd) {
  const { catchError } = require('../util/helpers');
  catchError(module)(cmd);
}
