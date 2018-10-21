#!/usr/bin/env node

const [command, ...args] = process.argv.slice(2);

if (command === 'build') require('./build')(...args);
