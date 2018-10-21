const { defaultOptions } = require('../util');

const mappings = {
  html: './html',
  analyze: './analyze',
  common: './common',
  css: './css',
  less: './less',
  raw: './raw',
  svg: './svg',
  sw: './sw',
  url: './url',
  devServer: './dev-server',
  ...requireSilent('webpack-util-vue/webpack'),
};

module.exports = Object.entries(mappings)
.reduce((map, [key, value]) => {
  map[key] = getApplier(key, value);
  return map;
}, {});

function getApplier(name, modulePath) {
  return options => {
    const apply = require(modulePath);
    return apply({
      ...defaultOptions,
      ...options,
    });
  };
}

function requireSilent(modulePath) {
  try {
    return require(modulePath);
  } catch (err) {
    // ignore
  }
}
