const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(process.env.MODE)

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[fullhash]-bundle.js',
        clean: true
    },
    devServer: {
        port: 3666,
        hot: true,
        open: false,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
        alias: {
            "@Public": path.resolve(__dirname, 'public'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[a|c]ss$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        inject: 'body',
        title: "Webpack App",
    }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })]
}