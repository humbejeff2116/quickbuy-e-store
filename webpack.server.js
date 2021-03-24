const path =require('path');
const nodeExternals = require('webpack-node-externals');




module.exports = {
    entry: './server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve('server-build'),
        filname: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                   loader: 'babel-loader',
                   options: {
                       presets: [' @babel/preset-env']
                   }
                }
            }
        ]
    }
};