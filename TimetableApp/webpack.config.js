const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    devServer: {
        contentBase: '.',
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                secure: false,
                pathRewrite: {
                    "^/api" : ""
                },
                changeOrigin: true,
            }
        },
    }
}