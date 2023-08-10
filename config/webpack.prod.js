const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
    mode: 'production',
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
        new MiniCssExtractPlugin({
          filename: 'css/[name].[chunkhash].css',
        }),
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin(),
        new CleanWebpackPlugin(),
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
                },
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
    optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin() , new TerserWebpackPlugin({})],
    },
  };