const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const appConfig = require('../client/appConfig.json');

const API_URL = {
  production: appConfig.production,
  development: appConfig.development,
};

const { NamedModulesPlugin, DefinePlugin } = require('webpack');

const { GENERAL, PATHS } = require('../settings');

module.exports = (env) => {
  console.log(env);
  const envirement = env.production ? 'production' : 'development';
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
      },
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },

        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: 'svg-url-loader',
            options: {
              limit: 8192,
              stripdeclarations: true,
              iesafe: true,
              encoding: 'base64',
            },
          },
        },
        {
          test: /\.(png|gif|jpg|cur)$/,
          loader: 'url-loader',
          options: {
            iesafe: true,
            // encoding: 'base64',
          },
        },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff2',
          },
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
        {
          test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          query: {},
        },
      ],
    },
    plugins: [
      new NamedModulesPlugin(),
      new HTMLWebpackPlugin({
        filename: PATHS.index.output,
        template: PATHS.index.input,
      }),
      new DefinePlugin({
        'process.env.API_URL': API_URL[envirement],
      }),
      new CopyWebpackPlugin([
        {
          context: PATHS.assets,
          from: '**/*',
          to: 'assets/',
        },
      ]),
    ],
    target: 'web',
    output: {
      path: PATHS.static,
      filename: '[name].[hash].js',
      publicPath: '/static/',
    },
  };
};
