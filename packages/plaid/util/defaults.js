const path = require('path');
const globby = require('globby');

exports.defaultOptions = {
  srcDir: path.resolve('src'),
  testDir: path.resolve('test'),
  distDir: path.resolve('dist'),
  nodeModules: path.resolve('node_modules'),
  // Babel accepts both absolute paths and relative paths
  // Webpack accepts only absolute paths
  alias: {
    '#': path.resolve('src'),
  },
  extensions: [
    '.ts', '.tsx',
    '.mjs', '.js', '.jsx',
  ],
  purgecssOptions: options => ({
    paths: () => globby.sync(`${options.srcDir}/**/*.@(js|html|vue|svelte)`),
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  }),
};
