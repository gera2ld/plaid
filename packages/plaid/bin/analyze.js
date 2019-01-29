process.env.RUN_ENV = 'analyze';

module.exports = analyze;

function analyze(...args) {
  require('./build')(...args);
}
