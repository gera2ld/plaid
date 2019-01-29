const { defaultOptions } = require('@gera2ld/plaid/util');

defaultOptions.styleOptions.fallback = 'vue-style-loader';
defaultOptions.vueOptions = {
  compilerOptions: {
    preserveWhitespace: false,
  },
};

module.exports = {
  vue: require.resolve('./vue'),
};
