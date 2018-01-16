const webpack = require('webpack');
const path = require('path');

const LIBRARY_NAME = 'index';
const OUTPUT_FILE = `${LIBRARY_NAME}.js`;

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/lib',
    filename: OUTPUT_FILE,
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  performance: {
    hints: false
  }
};
