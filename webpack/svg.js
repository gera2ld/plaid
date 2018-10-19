// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { defaultOptions } = require('../util');
// const extractSVG = isProd;

module.exports = options => config => {
  const {
    svgDir,
  } = {
    ...defaultOptions,
    ...options,
  };
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          // extract: extractSVG,
        },
      }],
      include: [svgDir],
    },
  ];
  config.plugins = [
    ...config.plugins || [],
    // extractSVG && new SpriteLoaderPlugin(),
  ].filter(Boolean);
};
