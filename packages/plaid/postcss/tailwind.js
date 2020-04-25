const { isProd, defaultOptions } = require('../util');

module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss'),
    isProd && require('@fullhuman/postcss-purgecss')(defaultOptions.purgecss),
  ].filter(Boolean);
  return config;
};
