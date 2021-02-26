const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack'); 
const { EnvironmentPlugin } = require('webpack');

const { GENERAL, PATHS } = require('../settings');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    //devtool: 'source-map',
    cache: {
      type: 'filesystem',
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
            "css-loader?url=false",
            "resolve-url-loader",
            // Compiles Sass to CSS
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
          //   {
          //     loader: 'postcss-loader',
          //     options: { sourceMap: true,  },
          //   },
          //   {
          //     loader: 'fast-sass-loader',
          //     options: {
          //       sourceMap: true,
          //     },
          //   },
          // ],
        },
      ],
    },
    optimization: {
      minimize: true,
      mangleWasmImports: true,
      removeAvailableModules: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/](stripe)[\\/](react-bootstrap)[\\/](react-stripe-js)[\\/]/,
            name: 'vendors',
            chunks: 'all',
            
          }
        },
      
      },
      
      
      minimizer: [
        new TerserPlugin({
          cache: path.resolve(PATHS.cache, 'terser-webpack-plugin'),
          parallel: true,
          sourceMap: false,
          extractComments: "all",
        }),
        new OptimizeCSSAssetsPlugin({}),
        new CssMinimizer({minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },}),
        new UglifyJsPlugin({ // minify js file
          cache: true,
          parallel: true,
          sourceMap: false,
          extractComments: 'all',
          uglifyOptions: {
              compress: true,
              loops: false,
          inline: false,
          dead_code: true,
          evaluate: true,
              output: null
          }
      }),
      ],
    },
   
    plugins: [
          new CompressionPlugin({ algorithm: "gzip",
         
          threshold: 4240,
          minRatio: 0.7}),
          new OptimizeCSSAssetsPlugin({
          }),
     new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: PATHS.client + "/.htaccess",
          to: PATHS.output,
        }
      ]),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
      new EnvironmentPlugin({
        // * explicitly setting the node environment variable for clarity
        NODE_ENV: 'production',
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
    ],
  });
};
