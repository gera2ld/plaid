const { defaultOptions } = require('@gera2ld/plaid/util');

defaultOptions.styleOptions.fallback = 'vue-style-loader';
defaultOptions.vueOptions = {
  compilerOptions: {
    whitespace: 'condense',
  },
};
defaultOptions.purgecssOptions.content.push(
  './src/**/*.vue',
);
