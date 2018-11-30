exports.config = {
  // Transform inline comments
  parser: require('postcss-scss'),
  plugins: [
    require('autoprefixer'),
    // Transform SCSS into CSS
    require('precss'),
    // Calculate at compile time
    require('postcss-calc'),
    // px to rem
    require('postcss-plugin-px2rem')({ rootValue: 100, minPixelValue: 2}),
  ].filter(Boolean),
};
