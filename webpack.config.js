const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EsLintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//이미지 파일 크기 최적화
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;
  const config = {
    entry: './src/index.ts',
    mode: 'development', //default
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.js', '.jsx', '.tsx'],
      fallback: {
        path: false,
      },
    },
    output: {
      asyncChunks: true, //요청시 로드되는 비동기 청크
      filename: isProd ? '[name].[contenthash].js' : '[name].bundle.js',
      chunkFilename: '[name].[contenthash:8].js',
      clean: true, // 내보내기 전에 output 디렉토리 정리
      path: path.resolve(__dirname, 'dist'), //webpack5 기본값 제거 필요
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
    optimization: {
      //압축
      // minimize: isDevMode ? false : true,
      //미니마이저
      minimizer: [
        new CssMinimizerPlugin({
          // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
          parallel: os.cpus().length - 1,
        }),
        // new ImageMinimizerPlugin({
        //     // 제외 설정
        //     exclude: /node_modules/,
        //     //최적화 옵션
        //     minimizer: {
        //         // Implementation
        //         implementation: ImageMinimizerPlugin.imageminMinify,
        //         options: {
        //             plugins: [

        //             ]
        //         }
        //     }
        // }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
      runtimeChunk: {
        //런타임 코드를 별도의 청크로 분할
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
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
                plugins: ['transform-custom-element-classes'],
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
            isDev
              ? 'style-loader' //충돌 대비 조건부 분기
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'node_modules')],
                },
              },
            },
          ],
        },
        //url
        {
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'url-loader',
          options: {
            publicPath: 'static/media',
            // outputPath: 'static/media',
            // (url, resourcePath) => {
            //      if (/subfolder/.test(resourcePath)) {
            //          return `images/subfolder/${url}`;
            //      }
            //  return `images/${url}`;
            //  }
            name: '[name].[contenthash:8]?.[ext]',
            limit: 10000,
            fallback: require.resolve('file-loader'),
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
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
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
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: 'static/media',
      //       to: 'static/media',
      //       noErrorOnMissing: true,
      //     },
      //   ],
      // }),
      // 플러그인 옵션 셜정
      new CleanWebpackPlugin({
        // dry 기본 값: false
        dry: true,
        // verbose 기본 값: false
        verbose: true,
        // cleanOnceBeforeBuildPatterns 기본 값: ['**/*']
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          // dist 폴더 안의 모든 것을 지우도록 설정
          path.resolve(process.cwd(), 'dist/**/*'),
        ],
      }),
      new MiniCssExtractPlugin({
        linkType: false,
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      // //런타임마다 생성되는 chuck hash 번들 경로
      new WebpackManifestPlugin({
        // fileName: './manifest.json', // default
        publicPath: '/dist/',
      }),
    ],
  };
  if (isDev) {
    config.plugins = [
      new HTMLWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        showErrors: true, // 에러 발생시 메세지가 브라우저 화면에 노출
      }),
    ];
    config.devtool = 'inline-source-map';
    config.devServer = {
      hot: true, // 서버에서 HMR을 켠다.
      // static: './dist', //dist default
      port: 8080,
      client: {
        overlay: true,
        progress: true,
      },
      compress: true,
      // host: '0.0.0.0', // 디폴트로는 "localhost" 로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정
      open: true,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:5000',
      //     changeOrigin: true,
      //   },
      // },
    };
    config.optimization.minimize = false;
  } else {
    // production
    config.mode = 'production';
    config.optimization.minimize = true;
  }
  return config;
};
