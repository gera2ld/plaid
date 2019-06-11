const HtmlWebpackPlugin = require('html-webpack-plugin');

const util = {
  escapeScript: content => content.replace(/<(\/script>)/g, '\\x3c$2'),
};

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
        inject: false,
        util,
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
    if (page) {
      page.js = page.js
      .map(item => {
        if (typeof item === 'string') return { src: item };
        if (item && item.content) return { content: util.escapeScript(item.content) };
        return item;
      })
      .filter(Boolean);

      page.css = page.css
      .map(item => {
        if (typeof item === 'string') return { href: item };
        if (item && item.content) return { content: item.content };
        return item;
      })
      .filter(Boolean);

      return new HtmlWebpackPlugin(page);
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
