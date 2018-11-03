const { defaultOptions } = require('webpack-util/util');

defaultOptions.styleOptions.fallback = 'vue-style-loader';
defaultOptions.vueOptions = {
  compilerOptions: {
    preserveWhitespace: false,
  },
};

module.exports = {
  vue: require.resolve('./vue'),
};
