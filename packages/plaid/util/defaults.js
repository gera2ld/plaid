const path = require('path');

exports.defaultOptions = {
  srcDir: path.resolve('src'),
  testDir: path.resolve('test'),
  distDir: path.resolve('dist'),
  nodeModules: path.resolve('node_modules'),
  // Babel accepts both absolute paths and relative paths
  // Webpack accepts only absolute paths
  alias: {
    '@': path.resolve('src'),
  },
  extensions: [
    '.ts', '.tsx', '.mjs', '.js', '.jsx',
  ],
  tailwindcss: {
    content: [
      './src/**/*.@(js|ts|tsx|vue|svelte|html)',
    ],
  },
};
