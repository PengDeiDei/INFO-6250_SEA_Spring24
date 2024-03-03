const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'source-map',
    output: {
        filename: 'cart.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env'] },
            }
            }
        ],
    },
};