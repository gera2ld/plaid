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
  map[key] = require(value);
  return map;
}, {});

function requireSilent(modulePath) {
  try {
    return require(modulePath);
  } catch (err) {
    // ignore
  }
}
