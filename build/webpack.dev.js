const path = require('path');
const {merge} = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    mode: "development",
    devServer: {
        hot: true,
        port: 3000,
        open: true,
        static: {
            directory: path.join(__dirname, "../")
        }
    },
}
)