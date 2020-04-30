const { defaultOptions, resolveBabelConfig } = require('../util');

module.exports = resolveBabelConfig({
  presets: [
    ['@babel/preset-env', {
      ...process.env.BABEL_ENV !== 'test' && {
        modules: false,
      },
      loose: true,
    }],
  ],
  plugins: [
    // stage-1
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],

    // stage-2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-throw-expressions',

    // stage-3
    '@babel/plugin-syntax-import-meta',
    // Use loose mode: facebook/create-react-app#4263
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-numeric-separator',

    'babel-plugin-macros',

    ['babel-plugin-module-resolver', {
      alias: defaultOptions.alias,
      extensions: defaultOptions.extensions,
    }],
  ]
}, require.resolve);
