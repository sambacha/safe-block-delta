// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',

  output: {
    path: path.resolve('dist'),
    filename: 'blocktime.js'
  },

  node: {
    fs: "empty"
 }

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
};
