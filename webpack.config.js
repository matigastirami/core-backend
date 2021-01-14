const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    mode: "development",
    output: {
        path: path.join( __dirname,'/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader','css-loader'],
                test: /\.css$/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            { 
                test: /\.ejs$/, loader: 'ejs-loader', 
                query: {
                interpolate: /<\$=([\s\S]+?)\$>/g,
                evaluate: /<\$([\s\S]+?)\$>/g,
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/client/index.ejs'
        }),
        new LiveReloadPlugin()
    ]
}