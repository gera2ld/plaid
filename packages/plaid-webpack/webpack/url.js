module.exports = (config, options) => {
  const {
    svgDir,
  } = options;
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }],
      exclude: [svgDir],
    },
  ];
  return config;
};
