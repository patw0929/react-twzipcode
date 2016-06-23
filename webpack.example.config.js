/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  output: {
    publicPath: './assets/',
    path: 'example/assets/',
    filename: '[name].js'
  },

  debug: false,
  devtool: false,
  entry: {
    example: ['./src/example.js']
  },

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      components: path.join(__dirname, '/src/components/'),
      'react-twzipcode': '../dist/main.js'
    }
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'uglify!babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss/,
      loader: 'style!css!sass?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url?limit=8192'
    }]
  }
};
