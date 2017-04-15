const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
console.log(config.PATHS.templates + "/**")
config.plugins.unshift(new BrowserSyncPlugin(
    {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3100,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:8000/',
        files: [config.PATHS.templates + "/**"]
    },
    {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
    }
));


config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://localhost:3000');

config.devtool = "eval";

config.output.publicPath = 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name

config.module.preLoaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel?presets[]=react", "eslint"]
    }
];

//hotload sass rather than text extract
config.module.loaders[0].loader = "style!css?sourceMap!sass?sourceMap";

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
        "/static/*" : "http://localhost:8000/" // <- backend
    },
}).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at 0.0.0.0:3000');
});
