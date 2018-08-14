const webpack = require('webpack');
const serve = require('webpack-serve');
const config = require('./webpack.base');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const merge = require('webpack-merge');
var {PATHS, PROJECT_NAME} = require('./paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(config, {
  mode: 'none',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
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
    )
  ],
  devtool: "eval-source-map",
  output: {
    // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    publicPath: 'http://localhost:3000/assets/bundles/'
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
  }
});

serve({
  config: module.exports,
  dev: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    publicPath: module.exports.output.publicPath,
  },
  add: (app, middleware, options) => {
    app.use(convert(proxy('/static', { target: 'http://localhost:8000' })));
    app.use(convert(history()));
  },
  port: '3000'
});
