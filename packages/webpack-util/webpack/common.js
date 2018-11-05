const { isProd } = require('../util');

module.exports = options => config => {
  const {
    srcDir,
    testDir,
    distDir,
    nodeModules,
    hashedFilename,
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
    ...config.resolve,
  },
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.js$/,
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
  return config;
};
