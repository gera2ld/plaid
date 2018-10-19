const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defaultOptions } = require('../../util');

module.exports = options => config => {
  const {
    pages,
    htmlOptions,
  } = {
    ...defaultOptions,
    ...options,
  };
  const entries = Object.entries(pages)
  .reduce((res, [key, { entry }]) => ({ ...res, [key]: entry }), {});
  const htmlPlugins = Object.entries(pages)
  .map(([key, { html }]) => {
    let options;
    if (html) {
      options = {
        ...htmlOptions,
        filename: `${key}.html`,
        chunks: [key],
      };
      if (typeof html === 'function') {
        options = html(options);
      } else {
        options = {
          ...options,
          ...html,
        };
      }
    }
    if (options) {
      if (options.inlineSource) options.inject = false;
      return new HtmlWebpackPlugin(options);
    }
  })
  .filter(Boolean);
  config.entries = entries;
  config.plugins = [
    ...config.plugins || [],
    ...htmlPlugins,
  ];
};
