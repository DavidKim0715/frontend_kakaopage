const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EsLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        asyncChunks: true, //요청시 로드되는 비동기 청크
        filename:
            process.env.NODE_ENV === 'production'
                ? '[name].[contenthash].js'
                : '[name].bundle.js',
        chunkFilename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 내보내기 전에 output 디렉토리를 정리합니다.
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
        fallback: {
            path: false,
        }
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: {
            //런타임 코드를 별도의 청크로 분할
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    },
    devServer: {
        port: 8080,
        open: true,
        compress: true,
        client: {
            overlay: true,
            progress: true,
        },
    },
    stats: {
        preset: 'minimal',
        builtAt: true,
        children: true,
        entrypoints: true,
        hash: true,
        modules: true,
        version: true,
        warningsFilter: [/exceed/, /performance/],
    },
    module: {
        rules: [
            //js, ts
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            //html
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: { minimize: true },
            },
            //css
            {
                test: /\.(scss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            //url
            {
                test: /\.(bmp|gif|png|jpe?g|svg)$/i,
                loader: 'url-loader',
                options: {
                    outputPath: 'static/media',
                    name: '[name].[contenthash:8]?.[ext]',
                    limit: 10000,
                    fallback: require.resolve('file-loader')
                },
            },
            // use style-loader for browsers target and file-loader for node target 
            //font
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'assets/resource',
            },
            //xml
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            //csv
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
        new EsLintWebpackPlugin({
            extensions: ['.ts', '.js'],
            exclude: 'node_modules',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${__dirname}/src/assets`,
                    to: 'assets',
                    noErrorOnMissing: true,
                },
            ],
        }),
    ]
}