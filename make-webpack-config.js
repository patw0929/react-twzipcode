var path = require("path");
var webpack = require("webpack");
var loadersByExtension = require("./config/loadersByExtension");

module.exports = function(options) {
  var entry = {
    main: "./app/index.jsx"
  };
  var loaders = {
    "jsx": "jsx-loader",
    "json": "json-loader"
  };
  var modulesDirectories = ["node_modules"];
  var extensions = ["", ".js", ".jsx"];
  var root = path.join(__dirname, "app");
  var publicPath = options.devServer ?
    "http://localhost:2992/_assets/" :
    "/_assets/";
  var output = {
    path: path.join(__dirname, "build", options.prerender ? "prerender" : "public"),
    publicPath: publicPath,
    filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    pathinfo: options.debug || options.prerender
  };
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
  ];
  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ];
  if(options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
  }

  if(options.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    module: {
      loaders: loadersByExtension(loaders)
    },
    resolveLoader: {
      root: path.join(__dirname, "node_modules")
    },
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};
