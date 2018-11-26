const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const defaultOptions = {
  srcDir: path.resolve('src'),
  testDir: path.resolve('test'),
  distDir: path.resolve('dist'),
  publicDir: path.resolve('src/public'),
  nodeModules: path.resolve('node_modules'),
  svgDir: path.resolve('src/resources/svg'),
  hashedFilename: false,
  cssSourceOptions: {
    loaders: ['postcss-loader'],
  },
  styleOptions: {},
  lessLoader: {
    loader: 'less-loader',
    // For ant-design
    options: {
      javascriptEnabled: true,
      modifyVars: {
        hd: '2px',
      },
    },
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
    hot: true,
  },
};

function styleLoader(options) {
  const {
    loaders = [],
    extract = isProd,
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

exports.isDev = isDev;
exports.isProd = isProd;
exports.defaultOptions = defaultOptions;
exports.styleLoader = styleLoader;
exports.styleRule = styleRule;
