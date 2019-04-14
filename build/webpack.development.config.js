const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
require('./serve');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/demo/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    devtool: false,
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
          ]
    },
    
    plugins: [
        new CopyWebpackPlugin( [ {from: path.resolve(__dirname, '../source'), to:'source'}]),
        new webpack.SourceMapDevToolPlugin({  filename: '[name].js.map', }),
        new HtmlWebpackPlugin({template: path.resolve(__dirname, '../src/demo/index.html')}),
        // new webpack.HotModuleReplacementPlugin(),
      ]
};
