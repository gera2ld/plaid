const fs = require('fs').promises;
const { exists } = require('../util/helpers');

const templateInfo = [
  {
    name: 'postcss',
    filepath: '.postcssrc.js',
    template: `\
const { combineConfigSync } = require('@gera2ld/plaid/util/helpers');
const precss = require('@gera2ld/plaid/postcss/precss');

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

generate.templateInfo = templateInfo;
module.exports = generate;
