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

function safeRun(module, args) {
  const { catchError } = require('../util/helpers');
  catchError(module)(...args);
}

exports.program = program;
exports.safeRun = safeRun;
