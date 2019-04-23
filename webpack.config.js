const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    bundle: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src', 'sw.js'),
    }),
    new WebpackPwaManifest({
      name: 'Twitter',
      short_name: 'Twitter',
      description: 'Twitter',
      background_color: '#1DA1F2',
      crossorigin: 'use-credentials',
      theme_color: '#1DA1F2',
      icons: [
        {
          src: path.resolve(
            __dirname,
            'src',
            'assets',
            'images',
            'logo-48.png'
          ),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'src', 'sw.js'),
    }),
  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },

      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
