const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = require('./env');

function styleLoader(options) {
  const {
    loaders = [],
    extract = env.isProd,
    fallback = 'style-loader',
    modules = false,
  } = options || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules,
      importLoaders: 1,
      sourceMap: false,
    },
  };
  return [
    extract ? MiniCssExtractPlugin.loader : fallback,
    cssLoader,
    ...loaders,
  ];
}

function styleRule(options, rule) {
  return {
    test: /\.css$/,
    use: styleLoader(options),
    ...rule,
  };
}

exports.styleLoader = styleLoader;
exports.styleRule = styleRule;
