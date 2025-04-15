const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.config");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const { EnvironmentPlugin } = require("webpack");

const { GENERAL, PATHS } = require("../settings");

module.exports = (env) => {
  return merge(common(env), {
    mode: "production",
    //devtool: 'source-map',
    cache: {
      type: "filesystem",
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          exclude: /node_modules/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            "postcss-loader", // Compiles Sass to CSS
            "sass-loader",
          ],
          // use: [
          //   MiniCssExtractPlugin.loader,
          //   {
          //     loader: 'css-loader',
          //     options: {
          //       importLoaders: 2,
          //       modules: {
          //       localIdentName: '[local]',
          //       },
          //       modules: true,
          //       sourceMap: true,
          //     },
          //   },
          // ],
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
      ],
    },

    optimization: {
      minimize: true,
      usedExports: true,
      concatenateModules: false,
      minimizer: [new TerserPlugin()],

      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        threshold: 4240,
        minRatio: 0.7,
      }),

      new OptimizeCSSAssetsPlugin({}),
      new CleanWebpackPlugin(),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: PATHS.client + "/.htaccess",
      //       to: PATHS.output,
      //     },
      //   ],
      // }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
      }),
      new EnvironmentPlugin({
        // * explicitly setting the node environment variable for clarity
        NODE_ENV: "production",
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  });
};
