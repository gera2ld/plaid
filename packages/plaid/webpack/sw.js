const fs = require('fs').promises;
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = async (config, options) => {
  const {
    tmpDir,
    swOptions,
  } = options;
  if (!swOptions) return;
  const { runtimeCaching, ...rest } = swOptions;

  await fs.mkdir(tmpDir, { recursive: true });
  const runtimeCachingCode = (runtimeCaching || [])
  .map(({ urlPattern, handler }) => `workbox.routing.registerRoute(${urlPattern}, new workbox.strategies.${handler}(), 'GET');`)
  .join('\n');
  const swCode = `\
importScript('https://cdn.jsdelivr.net/npm/workbox-sw@4.1.1/build/workbox-sw.min.js');
workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-sw@4.1.1/build',
});
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
${runtimeCachingCode}`;
  await fs.writeFile(`${tmpDir}/sw.js`, swCode, 'utf8');

  config.plugins = [
    ...config.plugins || [],
    new InjectManifest({
      swSrc: `${tmpDir}/sw.js`,
      importWorkboxFrom: 'disabled',
      ...rest,
    }),
  ];
};
