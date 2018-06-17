'use strict';

var path = require('path');
var webpack = require('webpack');

const jsSourceFolder = path.join(__dirname, 'src/main/javascript');

module.exports = {
    mode: 'development',
    devtool: false,//No point generating source maps since Nashorn can't understand them
    entry: {
        "bootstrap": path.join(jsSourceFolder, 'global-bootstrap.js')
    },
    output: {
        path: path.join(__dirname, 'build/resources/main/scripts'),
        filename: 'bundle.[name].js',
        library: '[name]Module',
        libraryTarget: 'var'
    },
    plugins: [

    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.ts?$/,
            use: ['babel-loader', 'awesome-typescript-loader'],
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        alias: {
            shared: path.join(jsSourceFolder, 'shared'),
            engine: path.join(jsSourceFolder, 'engine')
        }
    }
};
