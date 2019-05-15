const TerserPlugin = require('terser-webpack-plugin');
const { isProd, exists } = require('../util');

module.exports = async (config, options) => {
  const {
    srcDir,
    testDir,
    distDir,
    hashedFilename,
    externals,
  } = options;
  const enableTs = await exists('tsconfig.json', { file: true });
  config.mode = isProd ? 'production' : 'development';
  if (!isProd && !config.devtool) config.devtool = 'cheap-module-eval-source-map';
  config.output = {
    path: distDir,
    publicPath: '',
    filename: hashedFilename ? '[name].[chunkhash].js' : '[name].js',
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
  config.externals = externals;
  return config;
};
