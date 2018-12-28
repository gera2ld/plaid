#!/usr/bin/env node

const program = require('commander');

program
.version(require('../package.json').version);

program
.command('develop')
.action((cmd) => {
  require('./develop')(cmd);
});

program
.command('build')
.action((cmd) => {
  require('./build')(cmd);
});

program.parse(process.argv);
