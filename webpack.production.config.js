var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, './app/App');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build', 'public');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!autoprefixer-loader?browsers=last 2 versions'
      },
      //{
      //  test: /\.scss$/,
      //  loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      //},
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
};