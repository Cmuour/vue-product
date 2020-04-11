const path = require("path")
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    lintOnSave: false,
    chainWebpack: () => { },
    configureWebpack: () => { },
    productionSourceMap: false,
    css: {
        // 是否提取css生成单独的文件 默认 true
        extract: true,
        // 使用 CSS source maps?
        sourceMap: false,
        // loader配置
        loaderOptions: {
            scss: {
                prependData: '@import "./src/styles/main.scss";'
            }
        },
        // 使用 css Modules
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
        host: '0.0.0.0',
        port: 3030,
        https: false,
        hot: true,
        hotOnly: false,
        proxy: null,
        overlay:{
            warning: true,
            errors: true
        }
    }
}