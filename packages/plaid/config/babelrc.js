const { resolveBabelConfig } = require('../util');

module.exports = resolveBabelConfig({
  extends: require.resolve('./babelrc-base'),
  presets: [
    ['@babel/preset-env', {
      ...process.env.BABEL_ENV !== 'test' && {
        modules: false,
      },
      useBuiltIns: 'usage',
      corejs: 3,
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      useESModules: true,
      version: '^7.5.0',
    }],
  ]
}, require.resolve);
