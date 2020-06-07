import service from '../../src/utils/request'

// 登陆接口
export function Login(data){
   return service.request({
        url:"/login/",
        method:"post",
        data,//post 写法  //params:data  get 写法
       
    })
}

//获取验证码
export function GetCode(data){
    return service.request({
         url:"/getSms/",
         method:"post",
         data,//post 写法  //params:data  get 写法
        
     })
 }