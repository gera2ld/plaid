const path = require('path');

const aliases = {
  '#': path.resolve('src'),
};

module.exports = config => {
  config.parser = require('postcss-scss');
  config.plugins = [
    ...config.plugins || [],
    // Transform @import, resolve `#` to `$PWD/src`
    require('postcss-import')({
      resolve(id) {
        if (id.startsWith('~')) {
          const parts = id.slice(1).split('/');
          parts[0] = aliases[parts[0]] || parts[0];
          return require.resolve(parts.join('/'));
        }
        return id;
      },
    }),
    // Transform SCSS into CSS
    require('precss'),
    // Transform colors
    require('postcss-color-function'),
    // Calculate at compile time
    require('postcss-calc'),
  ];
  return config;
};
