const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/devApi', { 
      target: 'http://www.web-jshtml.cn/api/react', //target是请求接口的根地址    /v1是请求的url地址中的前缀
      changeOrigin:true,
      pathRewrite:{
          "^/devApi":"",
      }
    }));                                             
  //eg：https://www.google.com/v1/count/common/list  完整的接口地址
//   app.use(createProxyMiddleware([process.env.REACT_APP_API], { 
//     target: 'http://www.web-jshtml.cn/api/react', //target是请求接口的根地址    /v1是请求的url地址中的前缀
//     changeOrigin:true,
//     pathRewrite:{
//         [`^${process.env.REACT_APP_API}`]:"",
//     }
//   }));   
};