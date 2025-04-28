const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const { EnvironmentPlugin } = require("webpack");

const { GENERAL, PATHS } = require("../settings");

module.exports = (env) => {
  return merge(common(env), {
    mode: "production",
    cache: {
      type: "filesystem",
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
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
    optimization: {
      minimize: true,
      usedExports: true,
      splitChunks: {
        chunks: "all",
      },
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        threshold: 4240,
        minRatio: 0.7,
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new EnvironmentPlugin({
        NODE_ENV: "production",
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    output: {
      path: PATHS.output,
      filename: "[name].[contenthash].js",
      publicPath: "/", // adjust if serving from a subdirectory
    },
  });
};
