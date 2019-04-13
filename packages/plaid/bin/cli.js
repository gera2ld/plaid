#!/usr/bin/env node

const { program } = require('./program');
const { requireSilent } = require('../util');

requireSilent('@gera2ld/plaid-webpack/bin');

program.parse(process.argv);
