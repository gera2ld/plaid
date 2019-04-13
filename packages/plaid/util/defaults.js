const path = require('path');

exports.defaultOptions = {
  srcDir: path.resolve('src'),
  testDir: path.resolve('test'),
  distDir: path.resolve('dist'),
  publicDir: path.resolve('src/public'),
  nodeModules: path.resolve('node_modules'),
  svgDir: path.resolve('src/resources/svg'),
  hashedFilename: false,
  cssFilename: (options) => options.hashedFilename ? '[name].[contenthash].css' : '[name].css',
  alias: {
    '#': './src',
  },
};
