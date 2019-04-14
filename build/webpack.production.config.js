const path = require('path');
module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        path: path.resolve(__dirname, '../release'),
        filename: 'index.js'
    },
    devtool: false,
};
