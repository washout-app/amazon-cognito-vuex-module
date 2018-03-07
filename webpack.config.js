const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: [__dirname + '/src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: `index.js`,
    library: 'index',
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
  optimization: {
    minimize: false,
  },
  plugins: [
    // Short-circuit all warning code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // Visualize size of webpack output files with an interactive zoomable treemap.
    new BundleAnalyzerPlugin()
  ],
  performance: {
    hints: false
  }
};
