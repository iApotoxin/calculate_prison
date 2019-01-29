import React, { Component } from 'react';
import { Layout,Form, Icon, Input, Button,notification, Spin } from 'antd';
import './login.css';
import Auth from '../shared/auth'
import {Redirect} from "react-router-dom";
const FormItem = Form.Item;


const {  Footer } = Layout;

const errorNoti = (type) => {
    let desc = '';
    if (type === 'no_connect') {
      desc = 'ไม่สามารถเข้าสู่ระบบได้ โปรดตรวจสอบให้แน่ใจว่าคุณได้เชื่อมต่ออินเตอร์เน็ตอยู่!';
    }
    else if (type === 'get_err_true') {
      desc = 'ไม่สามารถเข้าสู่ระบบได้ โปรดตรวจสอบความถูกต้องของ username และ password!';
    }
    notification.open({
        message: 'ไม่สามารถเข้าสู่ระบบได้',
        description: desc,
        icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
        duration: 8,
    });
};


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            usr:'',
            pass:'',
            login:false,
            loading:false,
        };
    }

    login(username,password){
        this.setState({ loading: true }); //enable loading
        fetch(`https://cal-prison-api.herokuapp.com/login.php/?username="${username}"&&password="${password}"`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        ).then((response) => response.json())
        .then(response=>{
          console.log("get detail response: ", response);
          Auth.setCookies(response.login[0].username)

          if (response.error === false) {
            //set data to state
            this.setState({login:true});
            this.setState({ loading: false }); //disable loading
            //goto next page
          
          }
          else {
            //notify faail get err
            errorNoti('get_err_true')
            this.setState({ loading: false }); //disable loading
 
          }
    
        }).catch(error=>{
          //notify fail no connect
          errorNoti('no_connect')
          this.setState({ loading: false }); //disable loading

        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({usr:values.userName});
                this.setState({pass:values.password});
                this.login(values.userName,values.password);
                // console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (Auth.checkUsername()) return <Redirect to="/Add"/>;
        return (
            <Layout>
            <div style={{ width:'100%', marginBottom:'20vh', backgroundColor:'#F0F1F1'}}>
            <Spin  size="large" tip="กำลังเข้าสู่ระบบ..." spinning={this.state.loading} delay={500}>
            <div className="loginForm">
                <Form onSubmit={this.handleSubmit}>
                <h2 className="loginTitle">เข้าสู่ระบบ Prison Calculate</h2>
                <br></br>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                            Log in
                      </Button>
                    </FormItem>
                </Form>
            </div>
            </Spin>
                            
            </div>
            <Footer style={{ textAlign: 'center', bottom: 0, left: 0, width: '100%' }}>
                        Prison Calculate ©2018 Created by Apotoxin
             </Footer>
            </Layout>
        );
    }
}
export default Form.create()(LoginPage);