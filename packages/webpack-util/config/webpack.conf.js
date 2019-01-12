const webpackUtil = require('../webpack');
const { defaultOptions, combineConfig, loadPagesConfig } = require('../util');

module.exports = async () => {
  const baseConfig = {};
  const config = await combineConfig(baseConfig, [
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
    pagesConfig: await loadPagesConfig(),
  });
  return config;
};
