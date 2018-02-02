const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const LIBRARY_NAME = 'index';
const OUTPUT_FILE = `${LIBRARY_NAME}.js`;

module.exports = {
  entry: [__dirname + '/src/index.js'],
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    // Short-circuit all warning code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // Minify with dead-code elimination.
    new webpack.optimize.UglifyJsPlugin({
      mangle: { except: ['exports'] }
    }),
    // Enable scope hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Visualize size of webpack output files with an interactive zoomable treemap.
    new BundleAnalyzerPlugin()
  ],
  performance: {
    hints: false
  }
};
