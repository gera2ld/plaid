function resolveBabelConfig(config, resolve) {
  const resolveItem = item => {
    if (typeof item === 'string') return resolve(item);
    item = [...item];
    item[0] = resolve(item[0]);
    return item;
  };
  if (config && config.presets) {
    config.presets = config.presets.map(resolveItem);
  }
  if (config && config.plugins) {
    config.plugins = config.plugins.map(resolveItem);
  }
  return config;
}

exports.resolveBabelConfig = resolveBabelConfig;
