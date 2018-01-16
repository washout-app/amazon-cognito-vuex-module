const webpack = require('webpack');
const path = require('path');

const SRC = path.resolve(__dirname, './src');
const LIB = path.resolve(__dirname, './lib');

module.exports = {
  entry: path.resolve(SRC, 'index.js'),
  output: {
    filename: 'index.js',
    path: LIB
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC,
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
