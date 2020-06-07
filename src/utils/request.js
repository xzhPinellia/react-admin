import axios from "axios";

//创建实例
const service = axios.create({
    baseURL: '/devApi',// process.env.REACT_APP_API
    timeout: 5000,
  });

  //添加请求拦截器
  service.interceptors.request.use(function(config) { 
     //在发送请求之前做一些事情
     console.log(process.env)
        return config;   
    }, function(error) {
    //做一些有请求错误的事情
        return Promise.reject(error ); 
  });
    

 //添加响应拦截器
 service.interceptors.response.use(function(response) { 
      //使用响应数据返回响应； 
      return response;
 },function(error) {
      //使用响应错误返回
      Promise.reject(error) ; 
  });

export default service;