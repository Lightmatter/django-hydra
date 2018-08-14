const merge = require('webpack-merge');
var webpack = require("webpack");
const config = require('./webpack.base');
var {PATHS, PROJECT_NAME} = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = merge(config, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.scss$/,
      use:  [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => autoprefixer({
              browsers: ['last 3 versions', '> 1%']
            })
          }
        },
        'sass-loader'
      ],
      include: PATHS.sass
      }],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
  }
});
