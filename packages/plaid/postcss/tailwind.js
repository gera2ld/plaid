module.exports = config => {
  config.plugins = [
    ...config.plugins || [],
    require('tailwindcss')({
      purge: [
        './src/**/*.js',
        './src/**/*.ts',
        './src/**/*.vue',
        './src/**/*.svelte',
      ],
    }),
  ];
  return config;
};
