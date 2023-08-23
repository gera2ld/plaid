const { resolveBabelConfig, isTest } = require('../util');

module.exports = resolveBabelConfig({
  presets: [
    ['@babel/preset-env', {
      ...!isTest && {
        modules: false,
      },
      useBuiltIns: 'usage',
      corejs: 3,
      loose: true,
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      useESModules: !isTest,
      version: '^7.5.0',
    }],
  ]
}, require.resolve);
