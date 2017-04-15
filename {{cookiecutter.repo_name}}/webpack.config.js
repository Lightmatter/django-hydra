var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


const PROJECT_NAME = "{{cookiecutter.repo_name}}";

const PATHS = {
  app: path.join(__dirname, PROJECT_NAME),
};

PATHS.static_source = path.join(PATHS.app, "static_source");
PATHS.templates = path.join(PATHS.app, "templates");
PATHS.js = path.join(PATHS.static_source, "js");
PATHS.build = path.join(PATHS.static_source, "bundles");
PATHS.sass = path.join(PATHS.static_source, "sass");
PATHS.css = path.join(PATHS.static_source, "css");
PATHS.fonts = path.join(PATHS.static_source, "fonts");



module.exports = {
  PATHS: PATHS,
  context: __dirname,
  entry: [
    path.join(PATHS.js, "main"),
    path.join(PATHS.sass, "style.scss")
  ],
  output: {
    path: PATHS.build,
    filename: "[name]-[hash].js",
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("[name]-[hash].css", {allChunks:true}),
    new BundleTracker({filename:'./{{ cookiecutter.repo_name }}/webpack-stats.json'}),
  ],
  module: {
    loaders: [
      {
        //keep this one first, as in dev-server we depend on the ordering
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", ["css?sourceMap", "postcss", "sass?sourceMap"], {publicPath:'.'}),
        include: PATHS.sass
      },{
        test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        include: PATHS.fonts
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", ["css?sourceMap", "postcss"]),
        include: PATHS.css
      },{
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=464600&minetype=application/font-woff",
        include: PATHS.fonts
      },{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react', 'airbnb']
        }
      }]
  },

  eslint: {
    //failOnError: false,
  },

  postcss: function () {
    return [autoprefixer({browsers:"last 10 versions"})];
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', 'jsx']
  },
};
