const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = (env, argv) => {

    const mode = argv ? argv.mode : 'production';
    const isDevelopment = mode === 'development';
    const isProduction = mode === 'production';
    const isNone = mode === 'none';
    
    const config = {
        mode: mode,

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
    
        entry: {
            main: './examples/index.ts'
        },
    
        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name].[hash].js',
            publicPath: '/'
        },
    
        externals: {},
        
        // devtool: "source-map",
    
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            // }, {
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 minimize: true,
            //                 publicPath: './static/'
            //             }
            //         },
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 minimize: true
            //             }
            //         },
            //         "sass-loader"
            //     ]
            }]
        },
    
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        ecma: 8,
                        cache: true,
                        sourceMap: true,
                        parallel: true,
                        compress: true,
                        output: {
                            comments: false,
                            beautify: false
                        }
                    }
                }),
    
                new OptimizeCSSAssetsPlugin({})
            ]
        },
    
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].css"
            }),
    
            new HtmlWebpackPlugin({
                template: "examples/index.html"
            }),
    
            new CheckerPlugin()
        ]
    };

    if (!isProduction) {
        config.devtool = 'source-map';
    }

    return config;
}
