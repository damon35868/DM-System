
module.exports = {
  devServer: {
          open: true,
          https: false,
          hotOnly: false,
          proxy: { // 配置跨域
              '/api': {
                  target: 'http://localhost:8888/api/',
                  ws: true,
                  changOrigin: true,
                  pathRewrite: {
                      '^/api': ''
                  }
              }
          }
      },
  lintOnSave:false
}