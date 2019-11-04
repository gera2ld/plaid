const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (config, options) => {
  const {
    analyzer,
  } = options;
  config.plugins = [
    ...config.plugins || [],
    new BundleAnalyzerPlugin(analyzer),
  ];
  return config;
};
