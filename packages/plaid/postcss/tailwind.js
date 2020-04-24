const { isProd } = require('../util');

module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss'),
    isProd && require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.js',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ].filter(Boolean);
  return config;
};
