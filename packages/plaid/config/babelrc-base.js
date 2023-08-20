const { resolveBabelConfig, isTest } = require('../util');

module.exports = resolveBabelConfig({
  presets: [
    ['@babel/preset-env', {
      ...!isTest && {
        modules: false,
      },
      loose: true,
    }],
  ],
}, require.resolve);
