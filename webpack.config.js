const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const cssRegex = /\.css$/;
const typescriptRegex = /\.(ts|tsx)?$/;
const imagesRegex = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/];
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const getMode = (isProduction) => isProduction ? 'production' : 'development';

const config = {
    entry: {
        app: './src/app/index.tsx',
        appLoader: './src/loader/index.ts'
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist', 'static'),
        filename: isProduction ? '[name].bundle.js' : '[name].bundle.dev.js'
    },
    devtool: !isProduction && 'eval-source-map',
    plugins: [
        isProduction &&
        new WebpackObfuscator({
            compact: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            identifierNamesGenerator: 'mangled',
            selfDefending: true,
            splitStrings: true,
            splitStringsChunkLength: 2,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            target: 'browser',
            unicodeEscapeSequence: true
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? 'app.bundle.css' : 'app.bundle.dev.css',
        }),
    ],
    module: {
        rules: [
            {
                test: cssRegex,
                sideEffects: true,
                include: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: typescriptRegex,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: imagesRegex,
              type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.js', '.jsx'],
        alias: {
            '@app-root': path.join(__dirname, 'src', 'app'),
            '@app-loader': path.join(__dirname, 'src', 'loader'),
            '@app-styles': path.join(__dirname, 'src', 'styles')
        }
    }
};

module.exports = () => {
    config.mode = getMode(isProduction);
    return config;
};
