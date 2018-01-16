const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const portfinder = require('portfinder');

const config = merge(base, {
  devServer: {
    historyApiFallback: true, // Serve your index.html in place of 404 responses.
    hot: true, // Enable Hot Module Replacement feature.
    noInfo: true, // With noInfo enabled, messages like the webpack bundle information that is shown when starting up and after each save, will be hidden. Errors and warnings will still be shown.
    open: true, // When open is enabled, the dev server will open the browser.
    overlay: true // Show a full-screen overlay in the browser when there are compiler errors or warnings.
  },
  devtool: '#eval-source-map'
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      config.devServer.port = port;
      resolve(config);
    }
  });
});
