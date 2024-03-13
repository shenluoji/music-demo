const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    //执行入口文件
    entry: './src/index.js',
    output: {
        clean: true,
        //将所有的依赖模块合并输出到bundle.js文件中
        filename: 'bundle.js',
        path:path.resolve(__dirname,'../dist')


    },
    module: {
        rules: [
            {
                //通过正则表达式去匹配该用loader去转换的css文件
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                //通过正则表达式去匹配该用loader去转换的less文件
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','less-loader']
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: 'audios/[name].[ext]'
                }
            },
            {
                // 匹配 JSON 文件，并使用 file-loader 进行处理
                test: /\.json$/,
                loader: 'file-loader',
                options: {
                    name: 'json/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname,'../index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}