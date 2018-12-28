#!/usr/bin/env node

const program = require('commander');
const { catchError } = require('../util');

program
.version(require('../package.json').version);

program
.command('develop')
.action((cmd) => {
  catchError(require('./develop'))(cmd);
});

program
.command('build')
.action((cmd) => {
  catchError(require('./build'))(cmd);
});

program.parse(process.argv);
