const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
    mode: 'development',
    entry: { app: './src/App.jsx' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    optimization: {
        splitChunks:{
            name: 'vendor',
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
        }),
    ],
    devtool: 'source-map'
};