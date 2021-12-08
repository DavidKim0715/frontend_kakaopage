const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('Html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode : 'development',
    devtool: 'source-map',
    output: {
        asyncChunks:true, //요청시 로드되는 비동기 청크
        filename: process.env.NODE_ENV === 'production'?
            '[name].[contenthash].js'
            : '[name].bundle.js',
        chunkFilename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // 내보내기 전에 output 디렉토리를 정리합니다.
    },
    target: 'web',
    optimization: {
        usedExports: true
    },
    stats: {
        children: true,
    },
    devServer: {
        port: 8080,
        open : true,
        compress: true,
        client: {
            overlay: true,
            progress: true,
        },
        // proxy: {
        //     context: () => true,
        //     '/api/*' : {
        //         target: 'http://localhost:8080',
        //         changeOrigin : true
        //     }
        // }
    },
    stats:{
        preset: 'minimal',
        builtAt: true,
        children: true,
        entrypoints: true,
        hash: true,
        modules: true,
        version: true,
        warningsFilter: [/exceed/, /performance/]
    },
    module: {
        rules: [
            //html
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: { minimize : true}
            },
            //js, ts
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader :'ts-loader',
                        options: {
                            transpileOnly : true
                        }
                    }
                ]
            },
            //url
            {
                test: /\.(bmp|gif|png|jpe?g|svg)$/i,
                loader: "url-loader",
                options: {
                    outputPath : 'static/media',
                    name : '[name].[contenthash:8]?.[ext]',
                    limit : 10000
                }
            },
            //file
            {
                test: /\.(bmp|gif|png|jpe?g|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'static/media',
                    name: '[name].[contenthash:8].[ext]',
                },
            },
            //css
            {
                test: /\.(scss|css)$/i,
                use: [
                    process.env.NODE_ENV !== 'production' ?
                        'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap : true
                        }
                    }

                ],
            },

            //font
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                type: "assets/resource"
            },
            //csv
            {
                test: /\.(csv|tsv)$/i,
                use:['csv-loader']
            },
            //xml
            {
                test:/\.xml$/i,
                use:['xml-loader']
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts','.js', '.jsx', '.tsx'],
        fallback: {
            path : false
        }
    },
    optimization :{
        minimize: false,
        splitChunks: {
            chunks: "all",
            name : false
        },
        runtimeChunk: { //런타임 코드를 별도의 청크로 분할
            name : (entrypoint) => `runtime-${entrypoint.name}`
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template : './src/index.html',
            filename : 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new MiniCssExtractPlugin({
            linkType: false,
            filename: 'static/css/[name].[contenthash:8]css',
            chunkFilename:'static/css/[name].[contenthash:8].chunk.css'
        }),
        new CopyWebpackPlugin({
            patterns : [
                {
                    from : `${__dirname}/src/assets`,
                    to : 'assets',
                    noErrorOnMissing : true
                }
            ]
        }),
        new ESLintPlugin({
            extensions: ['.ts','.js'],
            exclude : 'node_modules'
        })
    ]
}
