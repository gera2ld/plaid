const style = require('./style');
const webpack = require('./webpack');
const defaults = require('./defaults');

Object.assign(
  exports,
  style,
  webpack,
  defaults,
);
