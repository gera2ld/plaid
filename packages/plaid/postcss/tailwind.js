const { defaultOptions } = require('../util');

module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss')({
      purge: defaultOptions.purgeCss,
    }),
  ];
  return config;
};
