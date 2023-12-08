#!/usr/bin/env node

const { program } = require('./program');
// Avoid loading env here so that process.env.NODE_ENV can be changed later in
// commands.
const { exitError } = require('../util/helpers');

program
.command('*')
.action((cmd) => {
  const [name] = cmd.args;
  exitError(1, `Unknown command: ${name}`);
});

program.parse(process.argv);
