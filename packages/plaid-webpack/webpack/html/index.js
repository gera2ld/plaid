const HtmlWebpackPlugin = require('html-webpack-plugin');

const util = {
  escapeScript: content => content.replace(/<(\/script>)/g, '\\x3c$2'),
};

module.exports = (config, options) => {
  const {
    pagesConfig,
    htmlOptions,
  } = options;
  const entry = Object.entries(pagesConfig)
  .reduce((res, [key, { entry }]) => ({
    ...res,
    [key]: entry || `./src/pages/${key}`,
  }), {});
  const htmlPlugins = Object.entries(pagesConfig)
  .map(([key, { html }]) => {
    let options;
    if (html) {
      options = {
        ...htmlOptions,
        inject: false,
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
      options.js = options.js
      .map(item => {
        if (typeof item === 'string') return { src: item };
        if (item && item.content) return { content: util.escapeScript(item.content) };
        return item;
      })
      .filter(Boolean);

      options.css = options.css
      .map(item => {
        if (typeof item === 'string') return { href: item };
        if (item && item.content) return { content: item.content };
        return item;
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
