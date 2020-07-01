import React, { Component} from "react";
// ANTD
import { Button,message } from 'antd';
//api 接口
import {GetCode} from '../../api/account'
//验证
import {validate_email} from '../../utils/validate'
//定时器
let timer= null;
//class 组件
class Code extends Component{
    constructor(props){
        super(props);//初始默认值
        this.state = {
            username:props.username,
            button_text:"获取验证码",
            button_loading:false,
            button_disabled:false,
            module:props.module
        };
    }
    //接收父组件 传来的值    this.props.username 每次都会获取的值
    componentWillReceiveProps({username}){
        this.setState({
            username  //数据变量和key一样 用一个
        })
    }
    // 销毁组件
    componentWillUnmount(){
        clearInterval(timer)
    }
    //获取验证码 
    getCode =() =>{
        const username=this.state.username;
        if(!username){
            message.warning('用户名不为空！',1)
            return false;
        }
        if(!validate_email(username)){
            message.warning('邮箱格式不正确！',1)
            return false;
        }
        this.setState({
            button_loading:true,
            button_text:"发送中"
        })
        const requestData={
            username,
            module:this.state.module
        }
        GetCode(requestData).then(response=>{
            console.log(response);
            message.success(response.data.message)
            //执行倒计时
            this.countDown();
        }).catch(error=>{
            this.setState({
                button_loading:false,
                button_text:"重新获取"
            })
        })
    }
    countDown=() =>{
        //倒计时
        let sec =60;
        //修改状态
        this.setState({
            button_loading:false,
            button_disabled:true,
            button_text:`${sec}S`,
        })
        timer =setInterval(()=>{
            sec--;
            if(sec<0){
                this.setState({
                    button_text:"重新获取",
                    button_disabled:false,
                })
                clearInterval(timer)
                return false;
            }
            this.setState({
                button_text:`${sec}S`,
            })
        },1000)
    }
    render(){
        return <Button type="danger" disabled={this.state.button_disabled} loading={this.state.button_loading} block onClick={this.getCode}>{this.state.button_text}</Button>
    }
}

export default Code;