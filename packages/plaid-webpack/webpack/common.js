const TerserPlugin = require('terser-webpack-plugin');
const ImportHttpWebpackPlugin = require('import-http/webpack');
const { isProd, shallowMerge } = require('@gera2ld/plaid/util');

module.exports = async (config, options) => {
  const {
    srcDir,
    testDir,
    distDir,
    hashedFilename,
    externals,
    devtool,
    alias,
    extensions,
    optimization,
    importHttp,
  } = options;
  config.mode = isProd ? 'production' : 'development';
  config.target = 'web'; // required by live reloading
  if (devtool) config.devtool = devtool;
  else if (!isProd) config.devtool = 'eval-cheap-module-source-map';
  config.output = {
    path: distDir,
    publicPath: '',
    filename: isProd && hashedFilename ? '[name].[chunkhash].js' : '[name].js',
    hashFunction: 'xxhash64',
    ...config.output,
  };
  config.resolve = {
    alias,
    extensions,
    ...config.resolve,
  },
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.worker\.[jt]s$/,
      use: require.resolve('worker-loader'),
      include: [srcDir, testDir],
    },
    {
      test: /\.m?[jt]sx?$/,
      use: require.resolve('babel-loader'),
      exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
    },
  ];
  config.optimization = shallowMerge({
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      isProd && new TerserPlugin({
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
    ].filter(Boolean),
  }, optimization);
  if (Array.isArray(externals)) {
    // Merge if an array is provided
    let originalExternals = config.externals;
    if (!originalExternals) {
      originalExternals = [];
    } else if (!Array.isArray(originalExternals)) {
      originalExternals = [originalExternals];
    }
    config.externals = [
      ...originalExternals,
      ...externals,
    ];
  } else if (externals) {
    // Override if an object is provided
    config.externals = externals;
  }
  config.plugins = [
    ...config.plugins || [],
    importHttp && new ImportHttpWebpackPlugin(importHttp),
  ].filter(Boolean);
  return config;
};
