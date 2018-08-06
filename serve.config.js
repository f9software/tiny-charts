const serve = require('webpack-serve');
const argv = {};
const config = require('./webpack.config.js');
const path = require('path');

const co = config(undefined, {mode: 'development'});

serve(argv, {
    config: co,

    hotClient: true,
    logLevel: 'trace',
    port: 3100,
    content: path.resolve(__dirname, './examples/'),
    // devMiddleware: {
    //     publicPath: '/',
    //     content: './assets'
    // }
});
