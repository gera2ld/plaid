const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectorPlugin = require('./injector-plugin');

module.exports = (config, options) => {
  const {
    pages,
    htmlOptions,
  } = options;
  const entry = Object.entries(pages)
  .reduce((res, [key, { entry }]) => ({
    ...res,
    [key]: entry || `./src/pages/${key}`,
  }), {});
  const htmlPlugins = Object.entries(pages)
  .map(([key, { html }]) => {
    let page;
    if (html) {
      page = {
        ...htmlOptions,
        filename: `${key}.html`,
        chunks: [key],
      };
      if (typeof html === 'function') {
        page = html(page);
      } else {
        page = {
          ...page,
          ...html,
        };
      }
    }
    if (page) return new HtmlWebpackPlugin(page);
  })
  .filter(Boolean);
  config.entry = entry;
  config.plugins = [
    ...config.plugins || [],
    ...htmlPlugins,
    new InjectorPlugin(),
  ];
  return config;
};
