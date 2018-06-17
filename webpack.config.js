'use strict';

var path = require('path');
var webpack = require('webpack');

const modulesFolder = path.join(__dirname, 'repository/scripts/node_modules');

module.exports = {
    mode: 'development',
    devtool: false,//No point generating source maps since Nashorn can't understand them
    entry: {
        "bootstrap": path.join(__dirname, 'repository/scripts/global-bootstrap.js')
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
        alias: {
            shared: path.join(modulesFolder, 'shared'),
            engine: path.join(modulesFolder, 'engine')
        }
    }
};
