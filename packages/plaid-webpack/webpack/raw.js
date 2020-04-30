module.exports = (config, options) => {
  const {
    srcDir,
    testDir,
  } = options;
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.(html|vert|frag)$/,
      use: require.resolve('raw-loader'),
      include: [srcDir, testDir],
    },
  ];
  return config;
};
