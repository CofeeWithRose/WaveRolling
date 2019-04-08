const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    // context: path.join(__dirname, 'src'),
    devtool: false,
    mode: 'development',

    plugins: [
        new webpack.SourceMapDevToolPlugin({  filename: '[name].js.map', }),
        new HtmlWebpackPlugin({template: './src/index.html'}),
        // new CopyWebpackPlugin( [ {from: './src/source/**/*' , to: './source/**/*'}]),
      ]
};