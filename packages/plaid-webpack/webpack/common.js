const TerserPlugin = require('terser-webpack-plugin');
const { isProd, exists } = require('../util');

module.exports = async (config, options) => {
  const {
    srcDir,
    testDir,
    distDir,
    hashedFilename,
    externals,
    devtool,
  } = options;
  const enableTs = await exists('tsconfig.json', { file: true });
  config.mode = isProd ? 'production' : 'development';
  if (devtool) config.devtool = devtool;
  else if (!isProd) config.devtool = 'cheap-module-eval-source-map';
  config.output = {
    path: distDir,
    publicPath: '',
    filename: isProd && hashedFilename ? '[name].[chunkhash].js' : '[name].js',
    ...config.output,
  };
  config.resolve = {
    extensions: [
      ...enableTs ? ['.ts', '.tsx'] : [],
      '.js', '.jsx',
    ],
    ...config.resolve,
  },
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: enableTs ? /\.(jsx?|tsx?)$/ : /\.jsx?$/,
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
        vendor: {
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
  return config;
};
