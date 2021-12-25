const { defaultOptions } = require('../util');

module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss/nesting'),
    require('tailwindcss')(defaultOptions.tailwindcss),
  ];
  return config;
};
