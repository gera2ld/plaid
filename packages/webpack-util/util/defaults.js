const path = require('path');
const { loadConfigSync } = require('./helpers');
const { isProd } = require('./env');

const defaultOptions = {
  srcDir: path.resolve('src'),
  testDir: path.resolve('test'),
  distDir: path.resolve('dist'),
  publicDir: path.resolve('src/public'),
  nodeModules: path.resolve('node_modules'),
  svgDir: path.resolve('src/resources/svg'),
  hashedFilename: false,
  postcssLoader: {
    loader: 'postcss-loader',
    options: loadConfigSync('postcss') || require('../config/postcssrc'),
  },
  styleOptions: {
    extract: isProd,
  },
  lessLoader: {
    loader: 'less-loader',
    // For ant-design
    // options: {
    //   javascriptEnabled: true,
    //   modifyVars: {
    //     hd: '2px',
    //   },
    // },
  },
  htmlOptions: {
    minify: isProd && {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    },
    template: path.resolve(__dirname, '../webpack/html/template.html'),
    meta: { viewport: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0' },
    css: [],
    js: [],
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
  },
  successMessages: [],
};

module.exports = defaultOptions;
