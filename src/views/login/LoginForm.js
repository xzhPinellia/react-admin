import React, { Component, Fragment } from "react";
// ANTD
import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//验证
import {validate_password,validate_email} from '../../utils/validate'
//api 接口
import {Login,GetCode} from '../../api/account'
class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username:'',
            code_button_loading:false,
            code_button_text:"获取验证码",
        };
    }
    //提交表单
    onFinish = (values) => {
        Login().then(response=>{
            console.log(response)
        }).catch(error=>{

        })
        console.log('1', values);
    };
    //获取验证码
    getCode =() =>{
        if(!this.state.username){
            message.warning('用户名不为空！',1)
            return false;
        }
        this.setState({
            code_button_loading:true,
            code_button_text:"发送中"
        })
        const requestData={
            username:this.state.username,
            module:"login"
        }
        GetCode(requestData).then(response=>{
            console.log(response)
        }).catch(error=>{
            this.setState({
                code_button_loading:false,
                code_button_text:"重新获取"
            })
        })
    }
    //input 输入值
    inputChange=(e)=>{
        let value=e.target.value;
        this.setState({
            username:value
        })
    }
    toggleForm = () => {
        // 调父级的方法
        this.props.switchForm("register");
    }

    render(){
        const {username,code_button_loading,code_button_text} =this.state;
        const _this= this;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>帐号注册</span>
                </div>
                <div className="form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' },
                                // { type: "email", message: '邮箱格式不正确!' }
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if(validate_email(value)){
                                            _this.setState({
                                                code_button_disabled:false
                                            })
                                            return Promise.resolve();
                                        }
                                      return Promise.reject('邮箱格式不正确!');
                                    },
                                  }),
                            ]
                        } >
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不为空!' },
                                // { min:6, message:'不能小于6位'},
                                {pattern: validate_password ,message:'请输入大于6位小于20位数字+字母'}
                            ]
                        } >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={
                            [
                                { required: true, message: '验证码不为空!' },
                                { len:6, message:'请输入长度位为6位的验证码'},
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger" loading={code_button_loading}  onClick={this.getCode} block>{code_button_text}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block> 登录 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default LoginForm;