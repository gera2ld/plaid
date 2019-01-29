module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    // px to rem
    require('postcss-plugin-px2rem')({ rootValue: 100, minPixelValue: 2 }),
  ];
  return config;
};
