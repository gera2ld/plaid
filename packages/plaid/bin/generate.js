const { writeFile } = require('fs/promises');
const { exists } = require('../util/helpers');

const templateInfo = [
  {
    name: 'postcss',
    filepath: 'postcss.config.cjs',
    template: `\
module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-calc': {},
    'postcss-nested': {},
    '@unocss/postcss': {},
  },
};`,
  },
  {
    name: 'unocss',
    filepath: 'uno.config.ts',
    template: `\
import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  presets: [presetUno()],
});`,
  },
];


async function generateOne(name, opts) {
  const info = templateInfo.find(info => info.name === name);
  if (!info) {
    console.error(`Only the following types are supported: ${templateInfo.map(t => t.name).join(', ')}`);
    throw new Error(`Unknown config type: ${name}`);
  }
  if (!opts.force && await exists(info.filepath, { file: true })) {
    throw new Error(`File already exists: ${info.filepath}`);
  }
  await writeFile(info.filepath, info.template, 'utf8');
  console.info(`${name} config is successfully generated at ${info.filepath}`);
}

async function generate(names, opts) {
  for (const name of names) {
    await generateOne(name, opts);
  }
}

exports.templateInfo = templateInfo;
exports.generate = generate;
