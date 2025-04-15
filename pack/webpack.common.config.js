const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const appConfig = require("../client/appConfig.json");

const API_URL = {
  production: appConfig.production,
  development: appConfig.development,
};

const { DefinePlugin } = require("webpack");

const { GENERAL, PATHS } = require("../settings");

module.exports = (env) => {
  console.log(env, "env");
  const envirement = env.production ? "production" : "development";
  return {
    entry: { app: PATHS.entry },
    resolve: {
      alias: {
        app: PATHS.app,
        assets: PATHS.assets,
        settings: PATHS.settings,
        styles: PATHS.styles,
        utils: PATHS.utils,
        pages: PATHS.pages,
        components: PATHS.components,
        contexts: PATHS.contexts,
        adminpages: PATHS.adminpages,
        admincomponent: PATHS.admincomponent,
      },
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
      extensions: [".ts", ".tsx", ".js", ".css"],
    },
    module: {
      rules: [
        {
          test: /\.(png|gif|jpg|cur|webp)$/,
          type: "asset/resource",
        },
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },

        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: "svg-url-loader",
            options: {
              limit: 8192,
              stripdeclarations: true,
              iesafe: true,
              encoding: "base64",
            },
          },
        },
        // {
        //   test: /\.(png|gif|jpg|cur|webp)$/,
        //   loader: "url-loader",
        //   options: {
        //     limit: false,
        //     // encoding: 'base64',
        //   },
        // },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
        },
        {
          test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),

      new webpack.optimize.ModuleConcatenationPlugin(),
      new HTMLWebpackPlugin({
        filename: PATHS.index.output,
        template: PATHS.index.input,
      }),
      new DefinePlugin({
        "process.env.API_URL": API_URL[envirement],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: PATHS.assets,
            from: "**/*",
            to: "assets/",
          },
          {
            from: PATHS.client + "/sitemap.xml",
            to: PATHS.output,
          },
          {
            from: PATHS.client + "/robots.txt",
            to: PATHS.output,
          },
        ],
      }),
    ],
    target: "web",
    output: {
      path: PATHS.static,
      filename: "[name].[hash].js",
      publicPath: "/static/",
    },
  };
};
