const { defaultOptions, resolveBabelConfig, isTest } = require('../util');

module.exports = resolveBabelConfig({
  presets: [
    ['@babel/preset-env', {
      ...!isTest && {
        modules: false,
      },
      loose: true,
    }],
  ],
  plugins: [
    // stage-1
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],

    // stage-2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-throw-expressions',

    'babel-plugin-macros',

    ['babel-plugin-module-resolver', {
      alias: defaultOptions.alias,
      extensions: defaultOptions.extensions,
    }],
  ],
}, require.resolve);
