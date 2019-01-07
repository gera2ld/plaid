const TerserPlugin = require('terser-webpack-plugin');
const { isProd } = require('../util');

module.exports = (config, options) => {
  const {
    srcDir,
    testDir,
    distDir,
    nodeModules,
    hashedFilename,
    jsOptions,
  } = options;
  config.mode = isProd ? 'production' : 'development';
  config.output = {
    path: distDir,
    publicPath: '',
    filename: hashedFilename ? '[name].[chunkhash].js' : '[name].js',
    ...config.output,
  };
  config.resolve = {
    // Tell webpack to look for peer dependencies in `node_modules`
    // when packages are linked from outside directories
    modules: [nodeModules],
    extensions: ['.js'],
    ...jsOptions.resolve,
    ...config.resolve,
  },
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: jsOptions.test,
      use: 'babel-loader',
      include: [srcDir, testDir],
    },
  ];
  config.optimization = {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
    ...config.optimization,
  };
  config.optimization.minimizer = [
    ...config.optimization.minimizer || [],
    isProd && new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      terserOptions: {
        output: {
          ascii_only: true,
        },
      },
    }),
  ].filter(Boolean);
  return config;
};
