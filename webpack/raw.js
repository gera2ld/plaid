const { defaultOptions } = require('../util');

module.exports = options => config => {
  const {
    srcDir,
    testDir,
  } = {
    ...defaultOptions,
    ...options,
  };
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
};
