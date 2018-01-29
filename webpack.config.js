const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

let plugins = [
    new HtmlWebpackPlugin({
        template: './pages/index.html',
    }),
    new CopyWebpackPlugin([
        {
            from: './assets',
            to: './assets',
        },
    ]),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(env),
        },
    }),
];

if (env === 'development') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
}

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins,
}