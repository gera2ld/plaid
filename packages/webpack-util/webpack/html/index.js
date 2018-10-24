const HtmlWebpackPlugin = require('html-webpack-plugin');

const util = {
  escapeScript: content => content.replace(/<(\/script>)/g, '\\x3c$2'),
};

module.exports = options => config => {
  const {
    pages,
    htmlOptions,
  } = options;
  const entry = Object.entries(pages)
  .reduce((res, [key, { entry }]) => ({ ...res, [key]: entry }), {});
  const htmlPlugins = Object.entries(pages)
  .map(([key, { html }]) => {
    let options;
    if (html) {
      options = {
        ...htmlOptions,
        util,
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
      options.js = (options.js || [])
      .map(item => {
        if (typeof item === 'string') return { src: item };
        if (item && item.content) return { content: util.escapeScript(item.content) };
      })
      .filter(Boolean);
      return new HtmlWebpackPlugin(options);
    }
  })
  .filter(Boolean);
  config.entry = entry;
  config.plugins = [
    ...config.plugins || [],
    ...htmlPlugins,
  ];
  return config;
};
