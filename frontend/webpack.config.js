/* eslint-disable */
var path = require("path");
var webpack = require("webpack");

var isProduction = process.env.NODE_ENV === "production";

var r = path.resolve;
var BASE_DIR = r(__dirname);
var BUILD_DIR = r(BASE_DIR, "build");
var SRC_DIR = r(BASE_DIR, "src");
var CONTENTBASE_DIR = r(BASE_DIR, "html");

var entrypoint = function(source) {
  if (isProduction) {
    return source;
  }
  return [
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "webpack-dev-server/client?http://0.0.0.0:3000"
  ].concat(source);
};

module.exports = {
  entry: {
    index: entrypoint([
      "babel-polyfill",
      r(SRC_DIR, "index.js")
    ])
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/lib/",
    filename: "[name].bundle.js",
    library: "[name]",
    libraryTarget: "var"
  },
  devServer: {
    contentBase: CONTENTBASE_DIR,
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  devtool: isProduction ? "cheap-module-source-map" : "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(isProduction ? "production" : "development")
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.(jsx|js)$/, loader: "babel-loader", include: SRC_DIR },
      { test: /\.css$/, use: ["style-loader", "css-loader"], include: SRC_DIR }
    ]
  }
};
