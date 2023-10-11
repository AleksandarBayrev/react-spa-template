// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './build/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? 'app.bundle.js' : 'app.bundle.dev.js'
    },
    devtool: !isProduction && 'eval-source-map',
    plugins: [
        isProduction &&
        new WebpackObfuscator({
            compact: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            identifierNamesGenerator: 'hexadecimal',
            selfDefending: true,
            splitStrings: true,
            splitStringsChunkLength: 2,
            stringArrayEncoding: ['rc4'],
            target: 'browser',
            unicodeEscapeSequence: true
        }),
    ],
    module: {
        rules: [],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
