 const path = require('path')

module.exports = {
    mode: 'development',
    entry: './app/assets/scripts/App.js',
    output: {
        path: path.resolve(__dirname, 'app/temp/scripts'),
        filename: 'App.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}