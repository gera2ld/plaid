const { GenerateSW } = require('workbox-webpack-plugin');
const { isProd } = require('../util');

module.exports = async (config, options) => {
  const {
    swOptions,
  } = options;
  if (!swOptions) return;
  config.plugins = [
    ...config.plugins || [],
    new GenerateSW({
      ...isProd ? {
        importWorkboxFrom: 'disabled',
        importScripts: [
          'https://cdn.jsdelivr.net/npm/workbox-cdn',
        ],
      } : {
        importWorkboxFrom: 'local',
      },
      ...swOptions,
    }),
  ];
};
