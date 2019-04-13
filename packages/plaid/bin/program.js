const { Command } = require('commander');

const program = new Command();

program
.version(require('../package.json').version);

program
.command('generate <name>')
.description('Generate template files')
.action((...args) => {
  safeRun(require('./generate'), args);
});

program
.command('svgo [files...]')
.description('Compress SVG files')
.action((...args) => {
  safeRun(require('./svgo'), args);
});

function safeRun(module, args) {
  const { catchError } = require('../util/helpers');
  const cmd = args.pop();
  catchError(module)(cmd, ...args);
}

exports.program = program;
exports.safeRun = safeRun;
