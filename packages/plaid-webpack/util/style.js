const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function styleLoader(options) {
  const {
    extract,
    loaders = [],
    fallback = require.resolve('style-loader'),
    modules = false,
  } = options || {};
  const cssLoader = {
    loader: require.resolve('css-loader'),
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
