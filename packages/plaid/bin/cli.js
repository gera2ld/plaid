#!/usr/bin/env node

const { program } = require('./program');
const { requireSilent, exitError } = require('../util');

requireSilent('@gera2ld/plaid-webpack/bin');

program
.command('*')
.action((name) => {
  exitError(1, `Unknown command: ${name}`);
});

program.parse(process.argv);
