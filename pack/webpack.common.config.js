const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { DefinePlugin } = require("webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const appConfig = require("../client/appConfig.json");
const { GENERAL, PATHS } = require("../settings");

const API_URL = {
  production: appConfig.production,
  development: appConfig.development,
};

module.exports = (env) => {
  console.log(env, "env");
  const environment = env.production ? "production" : "development";

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
      extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
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
        {
          test: /\.(png|gif|jpg|jpeg|webp|cur)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|ttf|eot|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      // Uncomment this only when needed for bundle analysis
      // new BundleAnalyzerPlugin(),

      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        filename: PATHS.index.output,
        template: PATHS.index.input,
        title: GENERAL.name,
      }),
      new DefinePlugin({
        "process.env.API_URL": JSON.stringify(API_URL[environment]),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: PATHS.assets,
            from: "**/*",
            to: "assets/",
          },
          {
            from: `${PATHS.client}/sitemap.xml`,
            to: PATHS.output,
          },
          {
            from: `${PATHS.client}/robots.txt`,
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
