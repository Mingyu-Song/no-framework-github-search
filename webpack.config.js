const path = require("path");
const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new HtmlWebpackPlugin({ template: "./public/index.html" }),
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: "static/css/[name].[contenthash].css",
  }),
];

const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevMode ? "development" : "production",
  entry: "/src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devServer: {
    open: true,
    compress: true,
    hot: true,
    inline: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, "src"),
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    liveReload: false,
    publicPath: "/",
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
