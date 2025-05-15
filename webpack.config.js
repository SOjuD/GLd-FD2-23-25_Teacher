const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        extensions: ['.js', '.css', '.scss']
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        inject: 'body',
        title: "Webpack App",
    })]
}