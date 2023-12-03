import { isAbsolute, relative, resolve } from 'path';
import { createRequire } from 'module';
import babelPlugin from '@rollup/plugin-babel';
import replacePlugin from '@rollup/plugin-replace';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import aliasPlugin from '@rollup/plugin-alias';
import jsonPlugin from '@rollup/plugin-json';
import terserPlugin from '@rollup/plugin-terser';
import postcssPlugin from 'rollup-plugin-postcss';

const values = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
};

const require = createRequire(import.meta.url);

export function definePlugins(options) {
  const {
    babelConfig,
    esm = true,
    aliases,
    extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    replaceValues,
    postcss = { minimize: true },
    browser = false,
    minimize = isProd,
    commonjs,
  } = options;
  return [
    aliases && aliasPlugin(aliases),
    postcss && postcssPlugin(postcss),
    babelPlugin({
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
    replacePlugin({
      values: {
        ...values,
        ...replaceValues,
      },
      preventAssignment: true,
    }),
    resolvePlugin({ browser, extensions }),
    commonjsPlugin(commonjs),
    jsonPlugin(),
    minimize && terserPlugin({ ...minimize }),
  ].filter(Boolean);
}

export function defineExternal(externals) {
  return id => externals.some(pattern => {
    if (typeof pattern === 'function') return pattern(id);
    if (pattern && typeof pattern.test === 'function') return pattern.test(id);
    if (isAbsolute(pattern)) return !relative(pattern, resolve(id)).startsWith('..');
    return id === pattern || id.startsWith(pattern + '/');
  });
}
