const fs = require('fs-extra');
const { exists } = require('../util/helpers');

module.exports = generate;

const templateInfo = [
  {
    name: 'webpack',
    filepath: 'scripts/webpack.conf.js',
    template: `\
const { modifyWebpackConfig } = require('webpack-util/util');

module.exports = modifyWebpackConfig(async (config) => {
  return config;
});`,
    successMessage: 'Webpack config is generated successfully at scripts/webpack.conf.js',
  },
  {
    name: 'postcss',
    filepath: '.postcssrc.js',
    template: `\
const { combineConfigSync } = require('webpack-util/util');
const precss = require('webpack-util/postcss/precss');

module.exports = combineConfigSync({}, [precss]);`,
    successMessage: 'PostCSS config is generated successfully at .postcssrc.js',
  },
];


async function generate(cmd, name) {
  const info = templateInfo.find(info => info.name === name);
  if (info) {
    await handleConflict(info.filepath, info.template);
    console.info(info.successMessage);
    return;
  }
  throw new Error(`Unknown type to generate: ${name}`);
}

async function handleConflict(filepath, content) {
  if (await exists(filepath, { file: true })) {
    throw new Error(`File already exists: ${filepath}`);
  }
  return fs.writeFile(filepath, content, 'utf8');
}
