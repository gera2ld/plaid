const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { isProd, styleRule } = require('../util');

module.exports = options => config => {
  const {
    nodeModules,
    cssSourceOptions,
    styleOptions,
    hashedFilename,
  } = options;
  config.module.rules = [
    ...config.module.rules || [],

    // CSS modules: src/**/*.module.css
    styleRule({
      ...styleOptions,
      ...cssSourceOptions,
      modules: true,
    }, {
      test: /\.module\.css$/,
      exclude: [nodeModules],
    }),

    // normal CSS files: src/**/*.css
    styleRule({
      ...styleOptions,
      ...cssSourceOptions,
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
  config.optimization.minimizer = (config.optimization.minimizer || [
    isProd && new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    isProd && new OptimizeCSSAssetsPlugin(),
  ]).filter(Boolean);
  config.plugins = [
    ...config.plugins || [],
    isProd && new MiniCssExtractPlugin({
      filename: hashedFilename ? '[name].[contenthash].css' : '[name].css',
    }),
  ].filter(Boolean);
  return config;
};
