const { defaultOptions } = require('../util');

module.exports = {
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
    '@babel/plugin-transform-runtime',

    ['module-resolver', {
      alias: defaultOptions.alias,
      extensions: [
        '.js', '.vue',
      ],
    }],
  ]
};
