const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function styleLoader(options) {
  const {
    extract,
    localIdentName,
    loaders = [],
    fallback = 'style-loader',
    modules = false,
  } = options || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules,
      localIdentName,
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
