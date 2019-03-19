const fs = require('fs').promises;
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = async (config, options) => {
  const {
    tmpDir,
    swOptions,
  } = options;
  if (!swOptions) return;
  const { importWorkboxFrom, runtimeCaching, ...rest } = swOptions;

  await fs.mkdir(tmpDir, { recursive: true });
  const swCode = [
    importWorkboxFrom == null && `\
importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@4.1.1/build/workbox-sw.min.js');
workbox.setConfig({
  modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-sw@4.1.1/build',
});`,

    'workbox.precaching.precacheAndRoute(self.__precacheManifest, {});',

    // runtimeCaching
    ...(runtimeCaching || [])
    .map(({ urlPattern, handler }) => `workbox.routing.registerRoute(${urlPattern}, new workbox.strategies.${handler}(), 'GET');`),
  ].filter(Boolean).join('\n');
  await fs.writeFile(`${tmpDir}/sw.js`, swCode, 'utf8');

  config.plugins = [
    ...config.plugins || [],
    new InjectManifest({
      swSrc: `${tmpDir}/sw.js`,
      importWorkboxFrom: importWorkboxFrom == null ? 'disabled' : importWorkboxFrom,
      ...rest,
    }),
  ];
};
