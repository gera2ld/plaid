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
      use: 'raw-loader',
      include: [srcDir, testDir],
    },
  ];
  return config;
};
