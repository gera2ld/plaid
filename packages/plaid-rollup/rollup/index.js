const path = require('path');
const { defaultOptions, isProd } = require('@gera2ld/plaid');
const babel = require('@rollup/plugin-babel').default;
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const importHttp = require('import-http/rollup');
const { terser } = require('rollup-plugin-terser');
const pkg = require(path.resolve('package.json'));

const values = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.VERSION': pkg.version,
};

const rollupPlugins = {
  postcss: (config, minimize = false) => {
    if (config === true) {
      config = require('@gera2ld/plaid/config/postcssrc');
    }
    return postcss({
      minimize,
      ...config,
    });
  },
  alias: aliases => alias(aliases),
  babel: ({ babelConfig, esm, extensions }) => babel({
    root: process.env.BABEL_ROOT || process.cwd(),
    // import helpers from '@babel/runtime'
    babelHelpers: 'runtime',
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime'), {
        useESModules: esm,
        version: '^7.5.0', // see https://github.com/babel/babel/issues/10261#issuecomment-514687857
      }],
    ],
    exclude: 'node_modules/**',
    extensions,
    ...babelConfig,
  }),
  replace: (replaceValues) => replace({
    values: {
      ...values,
      ...replaceValues,
    },
  }),
  resolve: options => resolve(options),
  commonjs: () => commonjs(),
  json: () => json(),
  importHttp: () => importHttp(),
};

function getRollupPlugins({
  babelConfig,
  esm,
  aliases,
  extensions = defaultOptions.extensions,
  replaceValues,
  postcss = true,
  browser = false,
  importHttp = defaultOptions.importHttp,
  minimize = isProd,
} = {}) {
  return [
    aliases && rollupPlugins.alias(aliases),
    postcss && rollupPlugins.postcss(postcss, minimize),
    rollupPlugins.babel({ babelConfig, esm, extensions }),
    rollupPlugins.replace(replaceValues),
    rollupPlugins.resolve({ browser, extensions }),
    rollupPlugins.commonjs(),
    rollupPlugins.json(),
    importHttp && rollupPlugins.importHttp(importHttp),
    minimize && terser(),
  ].filter(Boolean);
}

function getRollupExternal(externals = []) {
  return id => externals.some(pattern => {
    if (typeof pattern === 'function') return pattern(id);
    if (pattern && typeof pattern.test === 'function') return pattern.test(id);
    if (path.isAbsolute(pattern)) return !path.relative(pattern, path.resolve(id)).startsWith('..');
    return id === pattern || id.startsWith(pattern + '/');
  });
}

function rollupMinify(config) {
  return {
    input: {
      ...config.input,
      plugins: [
        ...config.input.plugins || [],
        terser(),
      ],
    },
    output: {
      ...config.output,
      file: config.output.file.replace(/\.js$/, '.min.js'),
    },
  };
}

exports.rollupPlugins = rollupPlugins;
exports.getRollupPlugins = getRollupPlugins;
exports.getRollupExternal = getRollupExternal;
exports.rollupMinify = rollupMinify;
