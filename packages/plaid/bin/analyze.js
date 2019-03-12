process.env.RUN_ENV = 'analyze';

function analyze(...args) {
  require('./build')(...args);
}

module.exports = analyze;
