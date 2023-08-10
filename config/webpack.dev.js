const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const PATHS = {
  src: path.join(__dirname, '../src/'),
  dist: path.join(__dirname, '../dist/'),
  build: path.join(__dirname, './build/'),
  assets: 'assets/',
};
const PAGES_DIR = `${PATHS.src}/pug/`;


module.exports = {
    externals: {
        paths: PATHS,
    },
    mode: 'development',
    stats: 'none',
    entry: {
        app: `${PATHS.src}index.tsx`,
    },
     output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].[chunkhash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: false }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx",]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            esModule: true,
                            },
                        },
                    'css-loader',
                ],
            }
        ]
    },
};

