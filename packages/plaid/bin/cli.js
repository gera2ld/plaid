#!/usr/bin/env node

const { program } = require('./program');
// Avoid loading env here so that process.env.NODE_ENV can be changed later in
// commands.
const { requireSilent, exitError } = require('../util/helpers');

requireSilent('@gera2ld/plaid-webpack/bin');

program
.command('*')
.action((cmd, name) => {
  exitError(1, `Unknown command: ${name}`);
});

program.parse(process.argv);
