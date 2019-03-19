const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = async (config, options) => {
  const {
    swOptions,
  } = options;
  if (!swOptions) return;
  config.plugins = [
    ...config.plugins || [],
    new GenerateSW({
      importWorkboxFrom: 'disabled',
      importScripts: [
        'https://cdn.jsdelivr.net/npm/workbox-cdn',
      ],
      ...swOptions,
    }),
  ];
};
