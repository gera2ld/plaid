module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    // Transform CSS next
    require('postcss-preset-env'),
  ];
  return config;
};
