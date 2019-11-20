
module.exports = {
  devServer: {
          open: true,
          host: 'localhost',
          port: 8081,
          https: false,
          hotOnly: false,
          proxy: { // 配置跨域
              '/api': {
                  target: 'http://localhost:3000/api/',
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