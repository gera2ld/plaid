const { Command } = require('commander');

const program = new Command();

program
.version(require('../package.json').version);

program
  .command('generate [...names]')
  .option('-f, --force', 'Override existing config files')
  .description('Generate template files')
  .action((names, opts) => {
    safeRun(require('./generate').generate, [names, opts]);
  });

function safeRun(module, args) {
  const { catchError } = require('../util/helpers');
  catchError(module)(...args);
}

exports.program = program;
exports.safeRun = safeRun;
