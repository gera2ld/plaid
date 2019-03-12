const webpackUtil = require('../webpack');
const { combineConfig, loadProjectConfig, shallowMerge } = require('../util');

module.exports = async () => {
  const baseConfig = {};
  const projectConfig = await loadProjectConfig();
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
  ], shallowMerge(projectConfig.global, {
    pagesConfig: projectConfig.pages,
  }));
  return config;
};
