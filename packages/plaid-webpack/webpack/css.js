const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { isProd, styleRule, loadConfig } = require('@gera2ld/plaid/util');

module.exports = async (config, options) => {
  const {
    nodeModules,
    postcssLoader,
    styleOptions,
    cssFilename,
    cssModules,
  } = options;
  if (!postcssLoader.options) {
    // Initialize postcss config
    postcssLoader.options = {
      postcssOptions: await loadConfig('postcss'),
    };
  }

  config.module.rules = [
    ...config.module.rules || [],
    {
      oneOf: [
        // library CSS files: node_modules/**/*.css
        styleRule(styleOptions, {
          include: [nodeModules],
        }),
        // CSS modules: src/**/*.module.css
        styleRule({
          ...styleOptions,
          loaders: [postcssLoader],
          modules: cssModules,
        }, {
          test: /\.module\.css$/,
        }),
        // normal CSS files: src/**/*.css
        styleRule({
          ...styleOptions,
          loaders: [postcssLoader],
        }),
      ],
    },
  ];
  config.optimization = {
    ...config.optimization,
  };
  config.optimization.minimizer = [
    ...config.optimization.minimizer || [],
    isProd && new CssMinimizerPlugin(),
  ].filter(Boolean);
  const filename = typeof cssFilename === 'function' ? cssFilename(options) : cssFilename;
  config.plugins = [
    ...config.plugins || [],
    styleOptions.extract && new MiniCssExtractPlugin({
      filename,
    }),
  ].filter(Boolean);
  return config;
};
