module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss'),
  ];
  return config;
};
