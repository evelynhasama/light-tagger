const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,

    resolve: {
        extensions: ['.js'],
        alias: {
            'AllertaStencil-Regular-normal': path.resolve(__dirname, 'AllertaStencil-Regular-normal.js'),
        },
    },
};

