const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { isProd, styleRule, loadConfig } = require('../util');

module.exports = async (config, options) => {
  const {
    nodeModules,
    postcssLoader,
    styleOptions,
    hashedFilename,
  } = options;
  if (!postcssLoader.options) {
    // Initialize postcss config
    postcssLoader.options = await loadConfig('postcss') || require('../config/postcssrc');
  }
  config.module.rules = [
    ...config.module.rules || [],

    // CSS modules: src/**/*.module.css
    styleRule({
      ...styleOptions,
      loaders: [postcssLoader],
      modules: true,
    }, {
      test: /\.module\.css$/,
      exclude: [nodeModules],
    }),

    // normal CSS files: src/**/*.css
    styleRule({
      ...styleOptions,
      loaders: [postcssLoader],
    }, {
      exclude: [/\.module\.css$/, nodeModules],
    }),

    // library CSS files: node_modules/**/*.css
    styleRule(styleOptions, {
      include: [nodeModules],
    }),
  ];
  config.optimization = {
    ...config.optimization,
  };
  config.optimization.minimizer = [
    ...config.optimization.minimizer || [],
    isProd && new OptimizeCSSAssetsPlugin(),
  ].filter(Boolean);
  config.plugins = [
    ...config.plugins || [],
    styleOptions.extract && new MiniCssExtractPlugin({
      filename: hashedFilename ? '[name].[contenthash].css' : '[name].css',
    }),
  ].filter(Boolean);
  return config;
};
