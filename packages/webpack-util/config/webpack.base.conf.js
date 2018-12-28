const webpack = require('webpack');
const webpackUtil = require('../webpack');
const { combineConfig } = require('../util');

const baseConfig = combineConfig({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV || ''),
    }),
  ],
}, [
  webpackUtil.common(),
  webpackUtil.css(),
  webpackUtil.less(),
  webpackUtil.url(),
  webpackUtil.raw(),
  webpackUtil.svg(),
  webpackUtil.devServer(),
  process.env.RUN_ENV === 'analyze' && webpackUtil.analyze(),

  webpackUtil.vue && webpackUtil.vue(),
]);

module.exports = baseConfig;
