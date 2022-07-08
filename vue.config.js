const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置静态资源
  //lintOnSave: false, //设置是否在开发环境下每次保存代码时都启用 eslint验证
  devServer: {
    //disableHostCheck: true, //是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查
    //host: '0.0.0.0',
    host:'localhost',
    port: 9000,
    https: false, // https:{type:Boolean}配置前缀
    open: true, //配置自动启动浏览器
   //设置代理
    proxy: { //目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
      '/yh': { // 拦截以 /yh 开头的url接口
        target: 'http://yh.softtone.cn/API', //目标接口域名
        changeOrigin: true, //是否跨域
        //ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        // 标识替换
        pathRewrite: { // 标识替换
          '^/yh': ''   //重写接口 后台接口指向不统一  所以指向所有/
        }
      },

      '/yq': { // 拦截以 /yq 开头的url接口
        target: 'http://api.yunql.cn/', //目标接口域名
        changeOrigin: true, //是否跨域
        //ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        // 标识替换
        pathRewrite: { // 标识替换
          '^/yq': ''   //重写接口 后台接口指向不统一  所以指向所有/
        }
      },
    }
  }
})
