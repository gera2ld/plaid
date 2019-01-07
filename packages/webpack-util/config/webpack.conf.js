const webpackUtil = require('../webpack');
const { exists, defaultOptions, combineConfig, loadPagesConfig } = require('../util');

module.exports = async () => {
  const enableTs = await exists('tsconfig.json', { file: true });
  const baseConfig = {};
  return combineConfig(baseConfig, [
    webpackUtil.common,
    webpackUtil.css,
    webpackUtil.url,
    webpackUtil.raw,
    webpackUtil.svg,
    webpackUtil.devServer,
    process.env.RUN_ENV === 'analyze' && webpackUtil.analyze,
    webpackUtil.vue,
    webpackUtil.html,
  ], {
    ...defaultOptions,
    ...enableTs && {
      jsOptions: {
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        test: /\.(jsx?|tsx?)$/,
      },
    },
    pagesConfig: await loadPagesConfig(),
  });
};
