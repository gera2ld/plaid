const { findConfigFile, parseConfig } = require('@gera2ld/plaid/util/helpers');

const DEFAULT_WEBPACK = require.resolve('../config/webpack.conf');

async function findWebpackConfig() {
  let filepath;
  try {
    filepath = await findConfigFile('webpack', 'No webpack.conf.js is found');
  } catch (err) {
    filepath = DEFAULT_WEBPACK;
  }
  return filepath;
}

async function loadWebpackConfig() {
  const filepath = await findWebpackConfig();
  const config = await parseConfig(require(filepath));
  return config;
}

function loadDefaultWebpackConfig() {
  return parseConfig(require(DEFAULT_WEBPACK));
}

function formatMessage(item) {
  return item.message;
}

function webpackCallback(resolve, reject) {
  return (err, stats) => {
    if (err) {
      console.error('[FATAL]', err);
      return reject(err);
    }
    const { errors, warnings } = stats.toJson();
    const formattedErrors = errors.map(formatMessage);
    if (formattedErrors.length) {
      console.error([
        '[ERROR] webpack compilation failed',
        '',
        ...formattedErrors,
        '',
      ].join('\n'));
      return reject(new Error('Webpack compilation failed'));
    }
    const formattedWarnings = warnings.map(formatMessage);
    if (formattedWarnings.length) {
      console.warn([
        '[WARNING] webpack compilation has warnings',
        '',
        ...formattedWarnings,
        '',
      ].join('\n'));
    }
    (Array.isArray(stats.stats) ? stats.stats : [stats])
    .forEach(stat => {
      const timeCost = (stat.endTime - stat.startTime) / 1000;
      const chunks = Object.keys(stat.compilation.namedChunks).join(' ');
      console.log(`Webpack built: [${timeCost.toFixed(3)}s] ${chunks}`);
    });
    resolve();
  };
}

exports.findWebpackConfig = findWebpackConfig;
exports.loadWebpackConfig = loadWebpackConfig;
exports.loadDefaultWebpackConfig = loadDefaultWebpackConfig;
exports.webpackCallback = webpackCallback;
