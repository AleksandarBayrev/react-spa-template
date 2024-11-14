const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const cssRegex = /\.css$/;
const typescriptRegex = /\.(ts|tsx)?$/;
const imagesRegex = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/];
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const getMode = (isProduction) => isProduction ? 'production' : 'development';

const config = {
    entry: ['./src/index.tsx'],
    target: 'web',
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
              type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '.js', '.jsx'],
        alias: {
            '@app-constants': path.join(__dirname, 'src', 'constants'),
            '@app-pages': path.join(__dirname, 'src', 'pages'),
            '@app-base': path.join(__dirname, 'src', 'base'),
            '@app-context': path.join(__dirname, 'src', 'AppContext'),
            '@app-services': path.join(__dirname, 'src', 'services'),
            '@app-ui': path.join(__dirname, 'src', 'ui'),
            '@app-navigation': path.join(__dirname, 'src', 'navigation'),
            '@app-resources': path.join(__dirname, 'src', 'resources'),
            '@app-helpers': path.join(__dirname, 'src', 'helpers'),
            '@app-stores': path.join(__dirname, 'src', 'stores'),
        }
    }
};

module.exports = () => {
    config.mode = getMode(isProduction);
    return config;
};
