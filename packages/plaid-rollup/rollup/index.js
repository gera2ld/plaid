const path = require('path');
const { combineConfigSync, defaultOptions, isProd } = require('@gera2ld/plaid');
const babel = require('@rollup/plugin-babel').default;
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const pkg = require(path.resolve('package.json'));

const values = {
  'process.env.VERSION': pkg.version,
};

const rollupPlugins = {
  postcss: config => {
    if (config === true) {
      config = combineConfigSync({}, [
        require('@gera2ld/plaid/postcss/precss'),
      ]);
    }
    return postcss({
      minimize: isProd,
      ...config,
    });
  },
  alias: aliases => alias(aliases),
  babel: ({ babelConfig, esm, extensions }) => babel({
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
};

function getRollupPlugins({
  babelConfig,
  esm,
  aliases,
  extensions = defaultOptions.extensions,
  replaceValues,
  postcss = true,
  browser = false,
} = {}) {
  return [
    aliases && rollupPlugins.alias(aliases),
    postcss && rollupPlugins.postcss(postcss),
    rollupPlugins.babel({ babelConfig, esm, extensions }),
    rollupPlugins.replace(replaceValues),
    rollupPlugins.resolve({ browser, extensions }),
    rollupPlugins.commonjs(),
    rollupPlugins.json(),
  ].filter(Boolean);
}

function getRollupExternal(externals = []) {
  return id => {
    if (/^@babel\/runtime[-/]/.test(id)) return true;
    return externals.some(pattern => {
      if (pattern && typeof pattern.test === 'function') return pattern.test(id);
      return id === pattern || id.startsWith(pattern + '/');
    });
  };
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
