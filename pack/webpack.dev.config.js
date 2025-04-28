const CircularDependencyPlugin = require("circular-dependency-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const { EnvironmentPlugin, HotModuleReplacementPlugin } = require("webpack");

const { GENERAL, PATHS } = require("../settings");

module.exports = merge(common({ development: true }), {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: PATHS.output,
      watch: true,
    },
    historyApiFallback: true,
    port: 8080,
    host: "0.0.0.0",
  },
  resolve: {
    fallback: {
      vm: require.resolve("vm-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: PATHS.devIndex.output,
      template: PATHS.devIndex.input,
      title: GENERAL.name,
    }),
    new EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          to: "static/assets/",
          context: PATHS.assets,
        },
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  output: {
    path: PATHS.output,
    filename: "[name].[hash].js",
    publicPath: "/",
  },
});
