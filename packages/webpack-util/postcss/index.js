const path = require('path');

exports.config = {
  // Transform inline comments
  parser: require('postcss-scss'),
  plugins: [
    // Transform @import, resolve `#` to `$PWD/src`
    require('postcss-import')({
      resolve(id) {
        if (id.startsWith('#/')) return path.resolve(`src/${id.slice(2)}`);
        return id;
      },
    }),
    // Transform SCSS into CSS
    require('precss'),
    // Transform colors
    require('postcss-color-function'),
    // Calculate at compile time
    require('postcss-calc'),
    // px to rem
    require('postcss-plugin-px2rem')({ rootValue: 100, minPixelValue: 2 }),
  ],
};
