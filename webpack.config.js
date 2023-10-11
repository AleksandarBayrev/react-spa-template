const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const cssRegex = /\.css$/;
const typescriptRegex = /\.tsx?$/;
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
            filename: isProduction ? 'static/app.bundle.css' : 'static/app.bundle.dev.css',
        }),
    ],
    module: {
        rules: [
            {
                test: cssRegex,
                sideEffects: true,
                use: [
                    'style-loader',
                    'css-loader',
                    MiniCssExtractPlugin.loader
                ]
            },
            {
                test: typescriptRegex,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.js', '.jsx'],
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
