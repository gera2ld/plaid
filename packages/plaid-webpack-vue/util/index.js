const { defaultOptions } = require('@gera2ld/plaid/util');

defaultOptions.styleOptions.fallback = require.resolve('vue-style-loader');
defaultOptions.vueOptions = {
  compilerOptions: {
    whitespace: 'condense',
  },
};
defaultOptions.extensions.push('.vue');
