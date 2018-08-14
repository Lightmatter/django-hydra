var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var glob = require('glob');
var {PATHS, PROJECT_NAME} = require('./paths');

module.exports = {
  context: __dirname,
  entry: {
    style: [
      path.join(PATHS.sass, "style.scss")
    ],
    js: [
      "babel-polyfill",
      path.join(PATHS.js, "main")
    ].concat(glob.sync(PATHS.templates + '/**/*.njk'))
  },
  output: {
    path: PATHS.build,
    filename: "[name]-[hash].js",
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: { test: /jquery/, name: "vendor_common", chunks: "all", priority: -20}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(njk|nunjucks)$/,
        use: [
          {
            loader: 'nunjucks-loader',
            query: {
              root: PATHS.templates,
              jinjaCompat: true
            }
          }
        ]
      },
      {
        // allows importing of images and fonts into css
        test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
    new BundleTracker({filename:'./{{cookiecutter.repo_name}}/webpack-stats.json'}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    modules: ['node_modules', PATHS.templates],
    extensions: ['.js', 'jsx', '.json']
  }
};
