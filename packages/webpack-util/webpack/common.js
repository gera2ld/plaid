const TerserPlugin = require('terser-webpack-plugin');
const { isProd, exists } = require('../util');

module.exports = async (config, options) => {
  const {
    srcDir,
    testDir,
    distDir,
    nodeModules,
    hashedFilename,
  } = options;
  const enableTs = await exists('tsconfig.json', { file: true });
  config.mode = isProd ? 'production' : 'development';
  if (!isProd) config.devtool = 'cheap-module-eval-source-map';
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
