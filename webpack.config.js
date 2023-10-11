const fs = require('fs');
const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const cssRegex = /\.css$/;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist', 'static'),
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
        new MiniCssExtractPlugin({
            filename: 'app.bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: cssRegex,
                sideEffects: true,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css'],
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
