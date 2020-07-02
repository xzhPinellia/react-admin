import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom'
// ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//验证
import {validate_password,validate_email} from '../../utils/validate'
//api 接口
import {Login} from '../../api/account'
// 组件
import Code from '../../components/code/index'
//加密
import CryptoJs from 'crypto-js'
class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username:'',
            password:"",
            code:"",
            module:"login",
            loading:false,
        };
    }
    //提交表单
    onFinish = (values) => {
        const requestData={
            username:this.state.username,
            password:CryptoJs.MD5(this.state.password).toString(),
            code:this.state.code,
        }
        this.setState({
            loading:true
        })
        Login(requestData).then(response=>{
            console.log(response)
            this.setState({
                loading:false
            })
            //路由跳转
            this.props.history.push('/index')
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    };
   
    //input 输入值
    inputChangeUsername=(e)=>{
        let value=e.target.value;
        this.setState({
            username:value
        })
    }
    inputChangePassword=(e)=>{
        let value=e.target.value;
        this.setState({
            password:value
        })
    }
     inputChangeCode=(e)=>{
        let value=e.target.value;
        this.setState({
            code:value
        })
    }
    toggleForm = () => {
        // 调父级的方法
        this.props.switchForm("register");
    }

    render(){
        const {username,module,loading} =this.state;
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
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不为空!' },
                                // { min:6, message:'不能小于6位'},
                                {pattern: validate_password ,message:'请输入大于6位小于20位数字+字母'}
                            ]
                        } >
                            <Input prefix={<UnlockOutlined  className="site-form-item-icon" />} onChange={this.inputChangePassword} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={
                            [
                                { required: true, message: '验证码不为空!' },
                                { len:6, message:'请输入长度位为6位的验证码'},
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} onChange={this.inputChangeCode} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>登录 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(LoginForm);