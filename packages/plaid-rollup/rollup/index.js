const path = require('path');
const { defaultOptions, isProd } = require('@gera2ld/plaid');
const babel = require('@rollup/plugin-babel').default;
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');
const importHttp = require('import-http/rollup');
const pkg = require(path.resolve('package.json'));

const values = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.VERSION': pkg.version,
};

const rollupPlugins = {
  postcss: (config) => postcss(config),
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
    preventAssignment: true,
  }),
  resolve: options => resolve(options),
  commonjs: options => commonjs(options),
  json: () => json(),
  importHttp: () => importHttp(),
};

function getRollupPlugins(options) {
  const {
    babelConfig,
    esm,
    aliases,
    extensions = defaultOptions.extensions,
    replaceValues,
    postcss = { minimize: true },
    browser = false,
    importHttp = defaultOptions.importHttp,
    minimize = isProd,
    commonjs,
  } = options;
  return [
    aliases && rollupPlugins.alias(aliases),
    postcss && rollupPlugins.postcss(postcss),
    rollupPlugins.babel({ babelConfig, esm, extensions }),
    rollupPlugins.replace(replaceValues),
    rollupPlugins.resolve({ browser, extensions }),
    rollupPlugins.commonjs(commonjs),
    rollupPlugins.json(),
    importHttp && rollupPlugins.importHttp(importHttp),
    minimize && terser({ ...minimize }),
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

exports.rollupPlugins = rollupPlugins;
exports.getRollupPlugins = getRollupPlugins;
exports.getRollupExternal = getRollupExternal;
