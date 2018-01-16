const base = require('./webpack.base.config');
const webpack = require('webpack');
const merge = require('webpack-merge');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  plugins: [
    // Short-circuit all warning code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // Minify with dead-code elimination.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      parallel: true
    }),
    // Enable scope hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Create compressed version of bundle using gzip.
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devtool: '#source-map'
});
