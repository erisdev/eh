const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const debug = process.env.NODE_ENV !== 'production';

const js_dir = path.join(__dirname, 'js');
const css_dir = path.join(__dirname, 'css');
const data_dir = path.join(__dirname, 'data');

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        'js/BUNDLE.js': path.join(__dirname, 'js/entrypoint.js'),
        // 'css/BUNDLE.css': path.join(__dirname, 'css/entrypoint.scss'),
    },
    output: {
        path: __dirname,
        filename: '[name]',
    },
    module: {
        loaders: [
            { test:/\.js$/,   include:js_dir,   loader:'babel-loader' },
            { test:/\.html$/, include:js_dir,   loader:'handlebars-loader' },
            { test:/\.yml$/,  include:data_dir, loader:['json-loader', 'yaml-loader'] },
            // { test:/\.scss$/, include:css_dir,  loader:ExtractTextPlugin.extract('css-loader!sass-loader') },
        ]
    },
    plugins: [
        // new ExtractTextPlugin('[name]'),
    ],
};
