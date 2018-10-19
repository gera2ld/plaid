const { defaultOptions } = require('webpack-util/util');

defaultOptions.styleOptions.fallback = 'vue-style-loader';

module.exports = {
  vue: require.resolve('./vue'),
};
