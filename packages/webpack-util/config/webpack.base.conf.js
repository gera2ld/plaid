const webpackUtil = require('../webpack');
const { exists, defaultOptions, combineConfig } = require('../util');

module.exports = async () => {
  const enableTs = await exists('tsconfig.json', { file: true });
  if (enableTs) {
    defaultOptions.jsOptions = {
      resolve: {
        extensions: ['.ts', '.js'],
      },
      test: /\.(js|ts)$/,
    };
  }
  const baseConfig = {
    resolve: {
      extensions: ['.wasm', '.ts', '.mjs', '.js', '.json'],
    },
  };
  return combineConfig(baseConfig, [
    webpackUtil.common(),
    webpackUtil.css(),
    webpackUtil.url(),
    webpackUtil.raw(),
    webpackUtil.svg(),
    webpackUtil.devServer(),
    process.env.RUN_ENV === 'analyze' && webpackUtil.analyze(),
    webpackUtil.vue && webpackUtil.vue(),
  ]);
};
