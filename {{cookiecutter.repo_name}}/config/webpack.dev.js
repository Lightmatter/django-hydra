const webpack = require('webpack');
const config = require('./webpack.base');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const merge = require('webpack-merge');
var {PATHS, PROJECT_NAME} = require('./paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var os = require('os');
var ifaces = os.networkInterfaces();
var local_ip = 'localhost';

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // TODO figure out what do to here
    } else {
      // this interface has only one ipv4 adress
      local_ip = iface.address;
    }
  });
});

module.exports = merge(config, {
  mode: 'none',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development
        host: local_ip,
        port: 3100,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:8000/',
        files: [PATHS.templates + "/**"]
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new webpack.HotModuleReplacementPlugin({}),
  ],
  devtool: "eval-source-map",
  output: {
    // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    publicPath: 'http://' + local_ip + ':3000/assets/bundles/'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "eslint-loader",
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: PATHS.sass
      }]
  },
  devServer: {
    compress: true,
    port: 3000,
    clientLogLevel: 'info',
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: local_ip,
    hot: true,
    overlay: true,
    stats: 'normal',
  }
});
