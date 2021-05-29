const { resolveBabelConfig, isTest } = require('../util');

module.exports = resolveBabelConfig({
  extends: require.resolve('./babelrc-base'),
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
      useESModules: true,
      version: '^7.5.0',
    }],
  ]
}, require.resolve);
