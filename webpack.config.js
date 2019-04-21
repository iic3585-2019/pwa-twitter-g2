const path = require('path');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:8080/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
    port: 8080,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  watch: true,
};
