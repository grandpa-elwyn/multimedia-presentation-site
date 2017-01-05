var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var HOME_DIR = path.resolve(__dirname, 'src/app');

var config = {
  entry: HOME_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: HOME_DIR,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
